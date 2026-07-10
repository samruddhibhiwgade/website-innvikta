<?php
require __DIR__ . '/config.php';
setCORSHeaders();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($method === 'GET') {
    try {
        $db = getDB();
        
        // Fetch summary stats
        $stats = [];
        $stmt = $db->query("SELECT COUNT(*) as total_events FROM user_events");
        $stats['total_events'] = $stmt->fetchColumn();

        $stmt = $db->query("SELECT COUNT(DISTINCT session_id) as total_sessions FROM user_events");
        $stats['total_sessions'] = $stmt->fetchColumn();

        $stmt = $db->query("SELECT COUNT(*) as total_clicks FROM user_events WHERE event_type = 'click'");
        $stats['total_clicks'] = $stmt->fetchColumn();

        // Fetch top clicked elements
        $stmt = $db->query("
            SELECT target_element, COUNT(*) as clicks 
            FROM user_events 
            WHERE event_type = 'click' 
            GROUP BY target_element 
            ORDER BY clicks DESC 
            LIMIT 10
        ");
        $top_clicks = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch recent events
        $stmt = $db->query("
            SELECT session_id, event_type, page_url, target_element, created_at 
            FROM user_events 
            ORDER BY created_at DESC 
            LIMIT 50
        ");
        $recent_events = $stmt->fetchAll(PDO::FETCH_ASSOC);

        jsonResponse([
            'success' => true,
            'stats' => $stats,
            'top_clicks' => $top_clicks,
            'recent_events' => $recent_events
        ]);
    } catch (PDOException $e) {
        jsonResponse(['error' => 'Database error', 'details' => $e->getMessage()], 500);
    }
}

jsonResponse(['error' => 'Method not allowed'], 405);

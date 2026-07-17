<?php
require __DIR__ . '/config.php';
setCORSHeaders();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($method === 'GET') {
    // Simple API Key Security
    $api_key = $_GET['api_key'] ?? '';
    if ($api_key !== 'INX_ADMIN_API_KEY_77') {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }

    try {
        $db = getDB();
        
        // Fetch summary stats
        $stats = [];
        $stmt = $db->query("SELECT COUNT(*) FROM user_events");
        $stats['total_events'] = $stmt->fetchColumn();

        $stmt = $db->query("SELECT COUNT(DISTINCT session_id) FROM user_events");
        $stats['total_sessions'] = $stmt->fetchColumn();

        $stmt = $db->query("SELECT COUNT(*) FROM user_events WHERE event_type = 'click'");
        $stats['total_clicks'] = $stmt->fetchColumn();
        
        $stmt = $db->query("SELECT COUNT(DISTINCT session_id) FROM user_events WHERE event_type = 'form_submission'");
        $form_sessions = $stmt->fetchColumn();
        
        $stats['conversion_rate'] = $stats['total_sessions'] > 0 
            ? round(($form_sessions / $stats['total_sessions']) * 100, 2) . '%' 
            : '0%';

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
            SELECT session_id, event_type, page_url, target_element, utm_source, country, created_at 
            FROM user_events 
            ORDER BY created_at DESC 
            LIMIT 50
        ");
        $recent_events = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Time Series (last 7 days sessions)
        $stmt = $db->query("
            SELECT DATE(created_at) as date, COUNT(DISTINCT session_id) as sessions
            FROM user_events
            WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            GROUP BY DATE(created_at)
            ORDER BY date ASC
        ");
        $time_series = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Traffic Sources (Top Referrers)
        $stmt = $db->query("
            SELECT referrer, COUNT(DISTINCT session_id) as sessions
            FROM user_events
            WHERE referrer IS NOT NULL AND referrer != ''
            GROUP BY referrer
            ORDER BY sessions DESC
            LIMIT 5
        ");
        $top_referrers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Top UTM Campaigns
        $stmt = $db->query("
            SELECT utm_campaign, COUNT(DISTINCT session_id) as sessions
            FROM user_events
            WHERE utm_campaign IS NOT NULL
            GROUP BY utm_campaign
            ORDER BY sessions DESC
            LIMIT 5
        ");
        $top_campaigns = $stmt->fetchAll(PDO::FETCH_ASSOC);

        jsonResponse([
            'success' => true,
            'stats' => $stats,
            'top_clicks' => $top_clicks,
            'recent_events' => $recent_events,
            'time_series' => $time_series,
            'top_referrers' => $top_referrers,
            'top_campaigns' => $top_campaigns
        ]);
    } catch (PDOException $e) {
        jsonResponse(['error' => 'Database error', 'details' => $e->getMessage()], 500);
    }
}

jsonResponse(['error' => 'Method not allowed'], 405);

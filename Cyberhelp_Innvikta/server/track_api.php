<?php
require __DIR__ . '/config.php';
setCORSHeaders();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($method === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        jsonResponse(['error' => 'Invalid JSON'], 400);
    }

    $session_id = $data['session_id'] ?? '';
    $event_type = $data['event_type'] ?? '';
    $page_url = $data['page_url'] ?? '';
    $target_element = $data['target_element'] ?? null;
    $additional_data = isset($data['additional_data']) ? json_encode($data['additional_data']) : null;
    
    // Attempt to get client IP
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? null;
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip_address = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    }
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? null;

    if (empty($session_id) || empty($event_type) || empty($page_url)) {
        jsonResponse(['error' => 'Missing required fields: session_id, event_type, page_url'], 400);
    }

    try {
        $db = getDB();
        $stmt = $db->prepare("INSERT INTO user_events 
            (session_id, event_type, page_url, target_element, additional_data, ip_address, user_agent) 
            VALUES (:sess, :type, :url, :target, :additional, :ip, :ua)");
        
        $stmt->execute([
            ':sess' => $session_id,
            ':type' => $event_type,
            ':url' => $page_url,
            ':target' => $target_element,
            ':additional' => $additional_data,
            ':ip' => trim($ip_address),
            ':ua' => $user_agent
        ]);

        jsonResponse(['success' => true, 'message' => 'Event tracked successfully']);
    } catch (PDOException $e) {
        // We do not want to expose db errors to the frontend, but we log it internally or just return false
        jsonResponse(['error' => 'Database error', 'details' => $e->getMessage()], 500);
    }
}

jsonResponse(['error' => 'Method not allowed'], 405);

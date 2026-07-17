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
    
    $referrer = $data['referrer'] ?? $_SERVER['HTTP_REFERER'] ?? null;
    
    // Attempt to get client IP
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? null;
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip_address = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    }
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? null;
    
    // Parse UTM parameters from page_url
    $utm_source = null;
    $utm_medium = null;
    $utm_campaign = null;
    $parsed_url = parse_url($page_url);
    if (isset($parsed_url['query'])) {
        parse_str($parsed_url['query'], $query_params);
        $utm_source = $query_params['utm_source'] ?? null;
        $utm_medium = $query_params['utm_medium'] ?? null;
        $utm_campaign = $query_params['utm_campaign'] ?? null;
    }

    // Get Geo Location via ip-api (with 1s timeout so it doesn't block)
    $country = null;
    $city = null;
    if (!empty(trim($ip_address)) && $ip_address !== '127.0.0.1' && $ip_address !== '::1') {
        $ctx = stream_context_create(['http' => ['timeout' => 1]]);
        $geoJson = @file_get_contents("http://ip-api.com/json/" . trim($ip_address), false, $ctx);
        if ($geoJson) {
            $geoData = json_decode($geoJson, true);
            if (isset($geoData['status']) && $geoData['status'] === 'success') {
                $country = $geoData['country'] ?? null;
                $city = $geoData['city'] ?? null;
            }
        }
    }

    if (empty($session_id) || empty($event_type) || empty($page_url)) {
        jsonResponse(['error' => 'Missing required fields: session_id, event_type, page_url'], 400);
    }

    try {
        $db = getDB();
        $stmt = $db->prepare("INSERT INTO user_events 
            (session_id, event_type, page_url, target_element, additional_data, ip_address, user_agent, utm_source, utm_medium, utm_campaign, referrer, country, city) 
            VALUES (:sess, :type, :url, :target, :additional, :ip, :ua, :us, :um, :uc, :ref, :country, :city)");
        
        $stmt->execute([
            ':sess' => $session_id,
            ':type' => $event_type,
            ':url' => $page_url,
            ':target' => $target_element,
            ':additional' => $additional_data,
            ':ip' => trim($ip_address),
            ':ua' => $user_agent,
            ':us' => $utm_source,
            ':um' => $utm_medium,
            ':uc' => $utm_campaign,
            ':ref' => $referrer,
            ':country' => $country,
            ':city' => $city
        ]);

        jsonResponse(['success' => true, 'message' => 'Event tracked successfully']);
    } catch (PDOException $e) {
        // We do not want to expose db errors to the frontend, but we log it internally or just return false
        jsonResponse(['error' => 'Database error', 'details' => $e->getMessage()], 500);
    }
}

jsonResponse(['error' => 'Method not allowed'], 405);

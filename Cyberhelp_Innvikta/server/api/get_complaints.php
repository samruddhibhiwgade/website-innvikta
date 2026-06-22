<?php
/**
 * api/get_complaints.php
 * GET /server/api/get_complaints.php
 * Returns all complaint entries for admin view.
 */

require __DIR__ . '/../config.php';
setCORSHeaders();

// Note: In a production environment, this SHOULD be protected by authentication.
// For this request, we are providing the endpoint directly as requested.

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(array('success' => false, 'error' => 'Method not allowed'), 405);
}

try {
    $db = getDB();
    
    // Fetch all complaints, newest first
    $stmt = $db->query('SELECT * FROM complaints ORDER BY submitted_at DESC');
    $complaints = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Decode JSON fields for easier frontend use
    foreach ($complaints as &$c) {
        $c['answers_json'] = json_decode($c['answers_json'] ?: '[]', true);
        $c['clicks_json']  = json_decode($c['clicks_json']  ?: '[]', true);
    }
    
    jsonResponse(array(
        'success' => true,
        'count'   => count($complaints),
        'data'    => $complaints
    ));
    
} catch (Exception $e) {
    jsonResponse(array('success' => false, 'error' => 'DB error: ' . $e->getMessage()), 500);
}

<?php
/**
 * api/update_complaint_clicks.php
 * POST /server/api/update_complaint_clicks.php
 * Appends a single click to the clicks_json array of an existing complaint.
 */

require __DIR__ . '/../config.php';
setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(array('success' => false, 'error' => 'Method not allowed'), 405);
}

$body = json_decode(file_get_contents('php://input'), true);
$id    = isset($body['complaint_id']) ? (int)$body['complaint_id'] : 0;
$click = isset($body['click'])        ? $body['click']             : null;

if (!$id || !$click) {
    jsonResponse(array('success' => false, 'error' => 'Missing complaint_id or click data'), 400);
}

try {
    $db = getDB();
    
    // 1. Fetch current clicks
    $stmt = $db->prepare('SELECT clicks_json FROM complaints WHERE id = :id');
    $stmt->execute(array(':id' => $id));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$row) {
        jsonResponse(array('success' => false, 'error' => 'Complaint not found'), 404);
    }
    
    $clicks = json_decode($row['clicks_json'] ?: '[]', true);
    if (!is_array($clicks)) $clicks = array();
    
    // 2. Append new click
    $clicks[] = $click;
    
    // 3. Save back
    $upd = $db->prepare('UPDATE complaints SET clicks_json = :clicks WHERE id = :id');
    $upd->execute(array(
        ':clicks' => json_encode($clicks, JSON_UNESCAPED_UNICODE),
        ':id'     => $id
    ));
    
    jsonResponse(array('success' => true, 'message' => 'Click appended successfully.'));
    
} catch (Exception $e) {
    jsonResponse(array('success' => false, 'error' => 'DB error: ' . $e->getMessage()), 500);
}

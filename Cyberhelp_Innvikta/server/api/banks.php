<?php
/**
 * api/banks.php
 * GET /server/api/banks.php
 * Returns all bank helplines grouped by sector.
 */

require __DIR__ . '/../config.php';
ob_start();
ini_set('display_errors', 0);
setCORSHeaders();

try {
    $db = getDB();

    $banks = $db->query("
        SELECT id, name, sector, fraud_helpline, general_helpline, email, color, website
        FROM bank_helplines
        ORDER BY sector, name
    ")->fetchAll();

    $grouped = ['public_sector' => [], 'private_sector' => [], 'specialized_banks' => []];
    $sectorMap = ['public' => 'public_sector', 'private' => 'private_sector', 'specialized' => 'specialized_banks'];

    foreach ($banks as $b) {
        $key = $sectorMap[$b['sector']] ?? 'public_sector';
        $grouped[$key][] = $b;
    }

    jsonResponse(['success' => true, 'banks' => $grouped]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}

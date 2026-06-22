<?php
/**
 * api/fraud_types.php
 * GET /server/api/fraud_types.php
 * Returns all fraud types with their additional questions.
 */

require __DIR__ . '/../config.php';
ob_start();
ini_set('display_errors', 0);
setCORSHeaders();

try {
    $db = getDB();

    $types = $db->query("
        SELECT ft.id, ft.fraud_type, ft.category,
               GROUP_CONCAT(fq.question ORDER BY fq.sort_order ASC SEPARATOR '||') AS questions
        FROM fraud_types ft
        LEFT JOIN fraud_questions fq ON fq.fraud_type_id = ft.id
        GROUP BY ft.id
        ORDER BY ft.id
    ")->fetchAll();

    foreach ($types as &$t) {
        $t['additional_questions'] = $t['questions'] ? explode('||', $t['questions']) : [];
        unset($t['questions']);
    }

    jsonResponse(['success' => true, 'fraud_types' => $types]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}

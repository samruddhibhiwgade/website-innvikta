<?php
/**
 * api/test.php  — diagnostic endpoint
 * Open in browser: https://yourdomain.com/server/api/test.php
 */
require __DIR__ . '/../config.php';
setCORSHeaders();

$result = array(
    'php_version' => PHP_VERSION,
    'tests'       => array(),
);

// 1. DB connection
try {
    $db = getDB();
    $result['tests']['db_connection']    = 'OK';
    $result['tests']['fraud_types_count']= (int)$db->query('SELECT COUNT(*) FROM fraud_types')->fetchColumn();
    $result['tests']['bank_count']       = (int)$db->query('SELECT COUNT(*) FROM bank_helplines')->fetchColumn();
    $result['tests']['complaints_count'] = (int)$db->query('SELECT COUNT(*) FROM complaints')->fetchColumn();

    // Test INSERT permission
    $db->prepare(
        'INSERT INTO complaints (fraud_type,triage_category,details,priority) VALUES (:ft,:cat,:d,:p)'
    )->execute(array(':ft'=>'TEST',':cat'=>'test',':d'=>'diagnostic test',':p'=>'TEST'));
    $tid = $db->lastInsertId();
    $db->prepare('DELETE FROM complaints WHERE id = :id')->execute(array(':id' => $tid));
    $result['tests']['db_write'] = 'OK (inserted and deleted test row #' . $tid . ')';
} catch (Exception $e) {
    $result['tests']['db_write'] = 'FAILED: ' . $e->getMessage();
}

// 2. SMTP full AUTH test
try {
    $sock = @fsockopen('tcp://' . MAIL_HOST, MAIL_PORT, $errno, $errstr, 10);
    if (!$sock) throw new Exception('Connect failed: ' . $errstr . ' (' . $errno . ')');
    stream_set_timeout($sock, 10);

    $readAll = function() use ($sock) {
        $resp = '';
        while (!feof($sock)) {
            $line = fgets($sock, 1024);
            if ($line === false) break;
            $resp .= $line;
            if (strlen($line) >= 4 && $line[3] === ' ') break;
        }
        return trim($resp);
    };
    $cmd = function($c) use ($sock, $readAll) { fwrite($sock, $c . "\r\n"); return $readAll(); };

    $result['tests']['smtp_greeting'] = $readAll();
    $result['tests']['smtp_ehlo']     = $cmd('EHLO localhost');
    $result['tests']['smtp_starttls'] = $cmd('STARTTLS');

    stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT);

    $result['tests']['smtp_ehlo2']    = $cmd('EHLO localhost');
    $result['tests']['smtp_auth']     = $cmd('AUTH LOGIN');
    $result['tests']['smtp_user']     = $cmd(base64_encode(MAIL_USERNAME));
    $r = $cmd(base64_encode(MAIL_PASSWORD));
    $result['tests']['smtp_pass']     = $r;
    $result['tests']['smtp_login_ok'] = (strpos($r, '235') !== false) ? 'YES - Login successful!' : 'NO - Login failed';

    $cmd('QUIT');
    fclose($sock);
} catch (Exception $e) {
    $result['tests']['smtp_error'] = $e->getMessage();
}

// 3. JSON file presence
$dataDir = __DIR__ . '/../../src/data/';
foreach (array('fraudTypes.json','bankHelplines.json','stateNodalOfficers.json','districtDirectory.json','socialMediaGrievance.json','contactDatabase.json') as $f) {
    $result['tests']['file_' . $f] = file_exists($dataDir . $f) ? 'found' : 'MISSING';
}

jsonResponse(array('success' => true, 'diagnostics' => $result));

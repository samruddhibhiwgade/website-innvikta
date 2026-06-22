<?php
// ── Database Configuration ────────────────────────────────────────────────
define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'Helpline');
define('DB_USER', 'platform1');
define('DB_PASS', 'Himanshu@1272');

// ── Mail Configuration ────────────────────────────────────────────────────
define('MAIL_HOST',       'mail.innvikta.com');
define('MAIL_PORT',        587);
define('MAIL_USERNAME',   'mahesh.hattimare@innvikta.com');
define('MAIL_PASSWORD',   '@^NZgXrBdC[G');
define('MAIL_FROM',       'mahesh.hattimare@innvikta.com');
define('MAIL_FROM_NAME',  'Cyberhelp Innvikta');
define('MAIL_TO',         'samruddhi.bhiwgade@innvikta.com');

// Start output buffering immediately so stray PHP output never corrupts JSON
if (!ob_get_level()) ob_start();
ini_set('display_errors', 0);
error_reporting(E_ALL);

// ── Get PDO connection ────────────────────────────────────────────────────
function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $pdo = new PDO($dsn, DB_USER, DB_PASS, array(
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ));
    }
    return $pdo;
}

// ── CORS headers ──────────────────────────────────────────────────────────
function setCORSHeaders() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// ── JSON response helper ──────────────────────────────────────────────────
function jsonResponse($data, $status = 200) {
    // Discard any stray output (PHP warnings/notices) buffered so far
    while (ob_get_level()) ob_end_clean();
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

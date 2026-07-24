<?php
require __DIR__ . '/config.php';

$to = 'samruddhi.bhiwgade@innvikta.com';
$subject = 'Test SMTP Newsletter Broadcast';
$htmlBody = '<h1>Test Newsletter</h1><p>This is a test of the broadcast SMTP mailer.</p>';

$host     = MAIL_HOST;
$port     = MAIL_PORT;
$port     = 465;
$username = MAIL_USERNAME;
$password = MAIL_PASSWORD;
$from     = MAIL_FROM;
$fromName = MAIL_FROM_NAME;

echo "Connecting to ssl://$host:$port...\n";
try {
    $sock = fsockopen('ssl://' . $host, $port, $errno, $errstr, 15);
    if (!$sock) {
        throw new Exception('Cannot connect to ' . $host . ':' . $port . ' — ' . $errstr);
    }
    stream_set_timeout($sock, 15);

    $readAll = function() use ($sock) {
        $resp = '';
        while (!feof($sock)) {
            $line = fgets($sock, 1024);
            if ($line === false) break;
            echo "S: " . $line;
            $resp .= $line;
            if (strlen($line) >= 4 && $line[3] === ' ') break;
        }
        return $resp;
    };

    $cmd = function($command) use ($sock, $readAll) {
        echo "C: " . $command . "\n";
        fwrite($sock, $command . "\r\n");
        return $readAll();
    };

    $readAll(); // 220 Greeting
    $cmd('EHLO ' . (gethostname() ?: 'localhost'));

    $r = $cmd('AUTH LOGIN');
    $cmd(base64_encode($username));
    $r = $cmd(base64_encode($password));
    if (strpos($r, '235') === false) {
        throw new Exception('Password rejected');
    }

    $cmd('MAIL FROM:<' . $from . '>');
    $r = $cmd('RCPT TO:<' . $to . '>');
    $cmd('DATA');

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $encodedFrom    = '=?UTF-8?B?' . base64_encode($fromName) . '?=';

    $message  = 'Date: ' . date('r') . "\r\n";
    $message .= 'From: ' . $encodedFrom . ' <' . $from . ">\r\n";
    $message .= 'To: ' . $to . "\r\n";
    $message .= 'Subject: ' . $encodedSubject . "\r\n";
    $message .= 'MIME-Version: 1.0' . "\r\n";
    $message .= 'Content-Type: text/html; charset=UTF-8' . "\r\n";
    $message .= "\r\n";
    $message .= $htmlBody . "\r\n.\r\n";

    echo "Sending payload...\n";
    fwrite($sock, $message);
    $readAll();

    $cmd('QUIT');
    fclose($sock);
    echo "SMTP test completed successfully!\n";
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}

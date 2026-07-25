<?php
require __DIR__ . '/config.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$db = getDB();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data || !isset($data['action']) || $data['action'] !== 'broadcast') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid action. "broadcast" is required.']);
        exit;
    }

    $title = $data['title'] ?? 'Weekly Security Update';
    $description = $data['description'] ?? '';
    $slug = $data['slug'] ?? '';
    $content = $data['content'] ?? '';

    try {
        // Query unique subscriber emails
        $stmt = $db->query("SELECT DISTINCT email FROM form_submissions WHERE form_type = 'newsletter' OR form_type = 'newsletter_subscribe' OR form_type = 'Newsletter'");
        $subscribers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($subscribers)) {
            echo json_encode(['success' => true, 'message' => 'No active subscribers found.', 'sent_count' => 0]);
            exit;
        }

        $sentCount = 0;
        $errors = [];

        foreach ($subscribers as $sub) {
            $email = $sub['email'];
            if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                continue;
            }

            // Build dynamic newsletter email template
            $subject = "Innvikta Weekly Alert: " . $title;
            
            $emailContent = "
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f1f5f9; border-radius: 12px;'>
                <div style='text-align: center; margin-bottom: 20px;'>
                    <img src='https://innvikta.co.in/images/logo.png' alt='Innvikta Logo' style='height: 40px;' />
                </div>
                <h2 style='color: #0f172a; font-size: 20px; margin-bottom: 10px; font-weight: bold;'>{$title}</h2>
                <p style='color: #475569; font-size: 14px; line-height: 1.6; margin-bottom: 20px;'>{$description}</p>
                
                <div style='background-color: #fff7f3; border-left: 4px solid #f15a24; padding: 15px; margin-bottom: 25px; border-radius: 4px;'>
                    <p style='color: #334155; font-size: 13px; line-height: 1.6; font-style: italic; margin: 0;'>
                        " . strip_tags(substr($content, 0, 300)) . "...
                    </p>
                </div>
                
                <div style='text-align: center; margin-bottom: 25px;'>
                    <a href='https://innvikta.co.in/resources/weekly-newsletter/{$slug}' 
                       style='background-color: #f15a24; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 14px; font-weight: bold; border-radius: 8px; display: inline-block;'>
                       Read Full Newsletter Online
                    </a>
                </div>
                
                <hr style='border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;' />
                <p style='color: #94a3b8; font-size: 11px; text-align: center; line-height: 1.5;'>
                    You received this because you subscribed to weekly cybersecurity insights at Innvikta.<br/>
                    <a href='https://innvikta.co.in/unsubscribe' style='color: #f15a24; text-decoration: underline;'>Unsubscribe</a>
                </p>
            </div>
            ";

            $success = smtpSend($email, $subject, $emailContent);
            if ($success) {
                $sentCount++;
            } else {
                $errors[] = $email;
            }
        }

        echo json_encode([
            'success' => true,
            'message' => 'Broadcast processing complete.',
            'sent_count' => $sentCount,
            'failures' => $errors
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

function smtpSend($to, $subject, $htmlBody) {
    $host     = MAIL_HOST;
    $port     = MAIL_PORT;
    $username = MAIL_USERNAME;
    $password = MAIL_PASSWORD;
    $from     = MAIL_FROM;
    $fromName = MAIL_FROM_NAME;

    try {
        $context = stream_context_create([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ]);
        $protocol = ($port == 465) ? 'ssl://' : 'tcp://';
        $sock = @stream_socket_client($protocol . $host . ':' . $port, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context);
        if (!$sock) {
            throw new Exception('Cannot connect to ' . $host . ':' . $port . ' — ' . $errstr);
        }
        stream_set_timeout($sock, 15);

        $readAll = function() use ($sock) {
            $resp = '';
            while (!feof($sock)) {
                $line = fgets($sock, 1024);
                if ($line === false) break;
                $resp .= $line;
                if (strlen($line) >= 4 && $line[3] === ' ') break;
            }
            return $resp;
        };

        $cmd = function($command) use ($sock, $readAll) {
            fwrite($sock, $command . "\r\n");
            return $readAll();
        };

        $readAll(); // 220 Greeting
        $cmd('EHLO ' . (gethostname() ?: 'localhost'));

        if ($port != 25 && $port != 465) {
            $r = $cmd('STARTTLS');
            if (strpos($r, '220') === false) {
                throw new Exception('STARTTLS rejected: ' . $r);
            }
            if (!stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT)) {
                if (!stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                    throw new Exception('TLS upgrade failed');
                }
            }
            $cmd('EHLO ' . (gethostname() ?: 'localhost'));
        }

        $r = $cmd('AUTH LOGIN');
        if (strpos($r, '334') === false) {
            throw new Exception('AUTH LOGIN not accepted: ' . $r);
        }

        $r = $cmd(base64_encode($username));
        if (strpos($r, '334') === false) {
            throw new Exception('Username not accepted: ' . $r);
        }

        $r = $cmd(base64_encode($password));
        if (strpos($r, '235') === false) {
            throw new Exception('Password rejected (check credentials): ' . $r);
        }

        $r = $cmd('MAIL FROM:<' . $from . '>');
        if (strpos($r, '250') === false) {
            throw new Exception('MAIL FROM rejected: ' . $r);
        }

        $r = $cmd('RCPT TO:<' . $to . '>');
        if (strpos($r, '250') === false) {
            throw new Exception('RCPT TO rejected: ' . $r);
        }

        $r = $cmd('DATA');
        if (strpos($r, '354') === false) {
            throw new Exception('DATA not accepted: ' . $r);
        }

        $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
        $encodedFrom    = '=?UTF-8?B?' . base64_encode($fromName) . '?=';

        $message  = 'Date: ' . date('r') . "\r\n";
        $message .= 'From: ' . $encodedFrom . ' <' . $from . ">\r\n";
        $message .= 'To: ' . $to . "\r\n";
        $message .= 'Subject: ' . $encodedSubject . "\r\n";
        $message .= 'MIME-Version: 1.0' . "\r\n";
        $message .= 'Content-Type: text/html; charset=UTF-8' . "\r\n";
        $message .= 'X-Mailer: FormsAPI/1.0' . "\r\n";
        $message .= "\r\n";
        $message .= $htmlBody . "\r\n.\r\n";

        fwrite($sock, $message);
        $r = $readAll();
        if (strpos($r, '250') === false) {
            throw new Exception('Message not accepted: ' . $r);
        }

        $cmd('QUIT');
        fclose($sock);
        return true;
    } catch (Exception $e) {
        error_log('[Forms SMTP Error] ' . $e->getMessage());
        return false;
    }
}

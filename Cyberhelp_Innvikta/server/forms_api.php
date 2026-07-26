<?php
ini_set('display_errors', 0);
error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE & ~E_DEPRECATED);
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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Admin fetching leads
    try {
        $form_type = $_GET['form_type'] ?? null;
        if ($form_type) {
            $stmt = $db->prepare("SELECT * FROM form_submissions WHERE form_type = :form_type ORDER BY created_at DESC");
            $stmt->execute([':form_type' => $form_type]);
        } else {
            $stmt = $db->query("SELECT * FROM form_submissions ORDER BY created_at DESC");
        }
        $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'leads' => $leads]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data || !isset($data['form_type'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid data. form_type is required.']);
        exit;
    }

    $form_type = $data['form_type'];
    $name = $data['name'] ?? null;
    $email = $data['email'] ?? null;
    $phone = $data['phone'] ?? null;
    $company = $data['company'] ?? null;
    $designation = $data['designation'] ?? null;
    $team_size = $data['team_size'] ?? null;
    $message = $data['message'] ?? null;
    $payload = isset($data['payload']) ? json_encode($data['payload']) : null;

    try {
        $stmt = $db->prepare("INSERT INTO form_submissions (form_type, name, email, phone, company, designation, team_size, message, payload_json) VALUES (:form_type, :name, :email, :phone, :company, :designation, :team_size, :message, :payload)");
        
        $stmt->execute([
            ':form_type' => $form_type,
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone,
            ':company' => $company,
            ':designation' => $designation,
            ':team_size' => $team_size,
            ':message' => $message,
            ':payload' => $payload
        ]);
        
        $id = $db->lastInsertId();

        // Send Email using robust SMTP helper
        $subject = "New Form Submission: " . $form_type;
        
        $email_content = "<h2>New Form Submission: {$form_type}</h2>";
        $email_content .= "<table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse;'>";
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $value = json_encode($value);
            }
            $email_content .= "<tr><th>" . htmlspecialchars(ucfirst(str_replace('_', ' ', $key))) . "</th><td>" . htmlspecialchars($value) . "</td></tr>";
        }
        $email_content .= "</table>";
        
        $mailSent = smtpSend(MAIL_TO, $subject, $email_content);

        // Webhook integration for Start Free
        $platform_response = null;
        if ($form_type === 'Start Free') {
            $platform_response = postToPlatform($data);
        }

        echo json_encode([
            'success' => true, 
            'id' => $id, 
            'message' => 'Form submitted successfully',
            'email_sent' => $mailSent,
            'platform_sync' => $platform_response
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

// Send user data directly to the InSAT Platform database
function postToPlatform($data) {
    $url = defined('PLATFORM_SIGNUP_API_URL') ? PLATFORM_SIGNUP_API_URL : null;
    $apiKey = defined('PLATFORM_API_KEY') ? PLATFORM_API_KEY : null;
    if (!$url) {
        return ['success' => false, 'error' => 'Platform URL not configured'];
    }

    $payload = json_encode([
        'name' => $data['name'] ?? '',
        'email' => $data['email'] ?? '',
        'phone' => $data['phone'] ?? '',
        'company' => $data['company'] ?? '',
        'designation' => $data['designation'] ?? '',
        'team_size' => $data['team_size'] ?? ''
    ]);

    $options = [
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/json\r\n" .
                         "x-api-key: " . $apiKey . "\r\n",
            'content' => $payload,
            'ignore_errors' => true,
            'timeout' => 15
        ]
    ];

    $context  = stream_context_create($options);
    $response = @file_get_contents($url, false, $context);
    if ($response === false) {
        $error = error_get_last();
        return ['success' => false, 'error' => $error['message'] ?? 'Connection failed'];
    }
    
    $resData = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return ['success' => false, 'error' => 'Invalid JSON from platform: ' . substr($response, 0, 100)];
    }
    
    return $resData;
}

// SMTP mailer function (copied from submit_complaint.php)
function smtpSend($to, $subject, $htmlBody) {
    $host     = MAIL_HOST;
    $port     = MAIL_PORT;
    $username = MAIL_USERNAME;
    $password = MAIL_PASSWORD;
    $from     = MAIL_FROM;
    $fromName = MAIL_FROM_NAME;

    try {
        $protocol = ($port == 465) ? 'ssl://' : 'tcp://';
        $sock = @fsockopen($protocol . $host, $port, $errno, $errstr, 15);
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
            if (!@stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT)) {
                if (!@stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
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
        if (isset($sock) && is_resource($sock)) fclose($sock);
        return false;
    }
}
?>

<?php
/**
 * api/submit_complaint.php
 * POST /server/api/submit_complaint.php
 * Saves complaint to DB and sends notification email via SMTP.
 */

ob_start();
ini_set('display_errors', 0);
error_reporting(E_ALL);

require __DIR__ . '/../config.php';
setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(array('success' => false, 'error' => 'Method not allowed'), 405);
}

// ── Parse request body ────────────────────────────────────────────────────
$body = json_decode(file_get_contents('php://input'), true);

if (!$body || empty($body['fraud_type'])) {
    jsonResponse(array('success' => false, 'error' => 'Missing required field: fraud_type'), 400);
}

$fraudType      = trim(isset($body['fraud_type'])      ? $body['fraud_type']      : '');
$triageCategory = trim(isset($body['triage_category']) ? $body['triage_category'] : '');
$timeframe      = trim(isset($body['timeframe'])        ? $body['timeframe']       : '');
$bankName       = trim(isset($body['bank_name'])        ? $body['bank_name']       : '');
$answers        = isset($body['answers'])               ? $body['answers']         : array();
$details        = trim(isset($body['details'])          ? $body['details']         : '');
$userName       = trim(isset($body['user_name'])        ? $body['user_name']       : '');
$userContact    = trim(isset($body['user_contact'])     ? $body['user_contact']    : '');
$priority       = trim(isset($body['priority'])         ? $body['priority']        : '');
$clicks         = isset($body['clicks'])               ? $body['clicks']          : array();

// ── Save to database ──────────────────────────────────────────────────────
try {
    $db   = getDB();
    $stmt = $db->prepare(
        'INSERT INTO complaints
            (fraud_type, triage_category, timeframe, bank_name, answers_json, details, user_name, user_contact, priority, clicks_json)
         VALUES
            (:ft, :cat, :time, :bank, :answers, :details, :uname, :ucontact, :priority, :clicks)'
    );
    $stmt->execute(array(
        ':ft'       => $fraudType,
        ':cat'      => $triageCategory,
        ':time'     => $timeframe,
        ':bank'     => $bankName,
        ':answers'  => json_encode($answers, JSON_UNESCAPED_UNICODE),
        ':details'  => $details,
        ':uname'    => $userName,
        ':ucontact' => $userContact,
        ':priority' => $priority,
        ':clicks'   => json_encode($clicks, JSON_UNESCAPED_UNICODE),
    ));
    $complaintId = (int)$db->lastInsertId();
} catch (Exception $e) {
    jsonResponse(array('success' => false, 'error' => 'DB error: ' . $e->getMessage()), 500);
}

// ── Send email ────────────────────────────────────────────────────────────
$emailSent  = sendComplaintEmail($complaintId, $fraudType, $triageCategory, $timeframe, $bankName, $answers, $details, $priority, $userName, $userContact, $clicks);
$emailError = '';
if (!$emailSent) {
    $emailError = 'Email could not be sent (complaint saved to DB).';
}

// Update email_sent flag
try {
    $db->prepare('UPDATE complaints SET email_sent = :s WHERE id = :id')
       ->execute(array(':s' => $emailSent ? 1 : 0, ':id' => $complaintId));
} catch (Exception $e) { /* non-fatal */ }

jsonResponse(array(
    'success'      => true,
    'complaint_id' => $complaintId,
    'email_sent'   => $emailSent,
    'email_note'   => $emailError,
    'message'      => 'Complaint submitted successfully.',
));

// ─────────────────────────────────────────────────────────────────────────────
// Build and send HTML email
// ─────────────────────────────────────────────────────────────────────────────
function sendComplaintEmail($id, $fraudType, $category, $timeframe, $bankName, $answers, $details, $priority, $userName = '', $userContact = '', $clicks = array()) {
    $date = date('d M Y, h:i A');

    if (strtoupper($priority) === 'CRITICAL')      $priorityColor = '#DC2626';
    elseif (strtoupper($priority) === 'HIGH')      $priorityColor = '#D97706';
    elseif (strtoupper($priority) === 'MODERATE')  $priorityColor = '#4682B4';
    else                                            $priorityColor = '#6B7280';

    $answersHtml = '';
    foreach ($answers as $q) {
        $answersHtml .= '<li style="margin-bottom:6px;">' . htmlspecialchars($q, ENT_QUOTES, 'UTF-8') . '</li>';
    }

    $detailsHtml = $details ? nl2br(htmlspecialchars($details, ENT_QUOTES, 'UTF-8')) : '';

    $body  = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>';
    $body .= '<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4;">';
    $body .= '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;"><tr><td align="center">';
    $body .= '<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.1);">';

    // Header
    $body .= '<tr><td style="background:#1e3a5f;padding:24px 32px;">';
    $body .= '<h1 style="margin:0;color:#fff;font-size:22px;">Cyberhelp Innvikta</h1>';
    $body .= '<p style="margin:4px 0 0;color:#93c5fd;font-size:13px;">New Complaint #' . $id . '</p>';
    $body .= '</td></tr>';

    // Priority badge
    $body .= '<tr><td style="padding:20px 32px 0;">';
    $body .= '<span style="display:inline-block;background:' . $priorityColor . ';color:#fff;font-weight:bold;font-size:12px;padding:4px 14px;border-radius:100px;">' . htmlspecialchars($priority, ENT_QUOTES, 'UTF-8') . ' PRIORITY</span>';
    $body .= '</td></tr>';

    // Details table
    $body .= '<tr><td style="padding:20px 32px;">';
    $body .= '<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;">';
    $body .= '<tr><td style="color:#6b7280;width:140px;border-bottom:1px solid #f0f0f0;">Submitted</td><td style="color:#111827;border-bottom:1px solid #f0f0f0;">' . $date . '</td></tr>';
    $body .= '<tr><td style="color:#6b7280;border-bottom:1px solid #f0f0f0;">Complainant</td><td style="color:#111827;font-weight:700;border-bottom:1px solid #f0f0f0;">' . htmlspecialchars($userName, ENT_QUOTES, 'UTF-8') . '</td></tr>';
    $body .= '<tr><td style="color:#6b7280;border-bottom:1px solid #f0f0f0;">Contact</td><td style="color:#111827;border-bottom:1px solid #f0f0f0;">' . htmlspecialchars($userContact, ENT_QUOTES, 'UTF-8') . '</td></tr>';
    $body .= '<tr><td style="color:#6b7280;border-bottom:1px solid #f0f0f0;">Fraud Type</td><td style="color:#111827;font-weight:600;border-bottom:1px solid #f0f0f0;">' . htmlspecialchars($fraudType, ENT_QUOTES, 'UTF-8') . '</td></tr>';
    $body .= '<tr><td style="color:#6b7280;border-bottom:1px solid #f0f0f0;">Category</td><td style="color:#111827;border-bottom:1px solid #f0f0f0;">' . htmlspecialchars($category, ENT_QUOTES, 'UTF-8') . '</td></tr>';
    $body .= '<tr><td style="color:#6b7280;border-bottom:1px solid #f0f0f0;">Timeframe</td><td style="color:#111827;border-bottom:1px solid #f0f0f0;">' . htmlspecialchars($timeframe, ENT_QUOTES, 'UTF-8') . '</td></tr>';
    $body .= '<tr><td style="color:#6b7280;">Bank</td><td style="color:#111827;">' . htmlspecialchars($bankName, ENT_QUOTES, 'UTF-8') . '</td></tr>';
    $body .= '</table></td></tr>';

    // Answers
    if ($answersHtml) {
        $body .= '<tr><td style="padding:0 32px 16px;">';
        $body .= '<h3 style="font-size:14px;color:#374151;margin:0 0 10px;">Confirmed by user:</h3>';
        $body .= '<ul style="margin:0;padding-left:18px;color:#374151;font-size:13px;line-height:1.8;">' . $answersHtml . '</ul>';
        $body .= '</td></tr>';
    }

    // Clicks/Actions
    if (!empty($clicks)) {
        $body .= '<tr><td style="padding:0 32px 16px;">';
        $body .= '<h3 style="font-size:14px;color:#374151;margin:0 0 10px;">Actions Taken (Clicks):</h3>';
        $body .= '<ul style="margin:0;padding-left:18px;color:#0369a1;font-size:13px;line-height:1.8;list-style-type:none;padding-left:0;">';
        foreach ($clicks as $c) {
            $label = htmlspecialchars($c['label'] ?? 'Unknown Action', ENT_QUOTES, 'UTF-8');
            $time  = htmlspecialchars($c['time']  ?? '', ENT_QUOTES, 'UTF-8');
            $body .= '<li style="margin-bottom:6px;">';
            $body .= '<span style="display:inline-block;background:#e0f2fe;color:#036fb1;padding:2px 8px;border-radius:4px;font-size:11px;margin-right:8px;font-weight:bold;">' . $label . '</span>';
            if ($time) $body .= '<span style="color:#6b7280;font-size:11px;">clicked at ' . $time . '</span>';
            $body .= '</li>';
        }
        $body .= '</ul></td></tr>';
    }

    // Full description
    if ($detailsHtml) {
        $body .= '<tr><td style="padding:0 32px 24px;">';
        $body .= '<h3 style="font-size:14px;color:#374151;margin:0 0 10px;">Incident Description:</h3>';
        $body .= '<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:14px;font-size:13px;color:#374151;line-height:1.7;">' . $detailsHtml . '</div>';
        $body .= '</td></tr>';
    }

    // Footer
    $body .= '<tr><td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">';
    $body .= '<p style="margin:0;font-size:12px;color:#9ca3af;">Auto-generated by Cyberhelp Innvikta complaint system.</p>';
    $body .= '</td></tr></table></td></tr></table></body></html>';

    $subject = 'New Complaint #' . $id . ': ' . $fraudType . ' [' . $priority . ']';
    return smtpSend(MAIL_TO, $subject, $body);
}

// ─────────────────────────────────────────────────────────────────────────────
// Robust SMTP mailer — PHP 7.2+ compatible, proper STARTTLS + AUTH LOGIN
// ─────────────────────────────────────────────────────────────────────────────
function smtpSend($to, $subject, $htmlBody) {
    $host     = MAIL_HOST;       // mail.innvikta.com
    $port     = MAIL_PORT;       // 587
    $username = MAIL_USERNAME;
    $password = MAIL_PASSWORD;
    $from     = MAIL_FROM;
    $fromName = MAIL_FROM_NAME;

    try {
        // 1. Connect (plain TCP, STARTTLS upgrades later)
        $sock = @fsockopen('tcp://' . $host, $port, $errno, $errstr, 15);
        if (!$sock) {
            throw new Exception('Cannot connect to ' . $host . ':' . $port . ' — ' . $errstr);
        }
        stream_set_timeout($sock, 15);

        // Helper: read ONE full response (handles multi-line like "250-...")
        $readAll = function() use ($sock) {
            $resp = '';
            while (!feof($sock)) {
                $line = fgets($sock, 1024);
                if ($line === false) break;
                $resp .= $line;
                // Multi-line: "250-..." continues; "250 ..." is the last line
                if (strlen($line) >= 4 && $line[3] === ' ') break;
            }
            return $resp;
        };

        // Helper: send a command and read response
        $cmd = function($command) use ($sock, $readAll) {
            fwrite($sock, $command . "\r\n");
            return $readAll();
        };

        // 2. Greeting
        $readAll(); // 220 ...

        // 3. EHLO
        $cmd('EHLO ' . (gethostname() ?: 'localhost'));

        // 4. STARTTLS — only for port 587/465, NOT for plain port 25
        if ($port != 25) {
            $r = $cmd('STARTTLS');
            if (strpos($r, '220') === false) {
                throw new Exception('STARTTLS rejected: ' . $r);
            }
            // Upgrade to TLS
            if (!stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT)) {
                if (!stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                    throw new Exception('TLS upgrade failed');
                }
            }
            // Re-EHLO after TLS
            $cmd('EHLO ' . (gethostname() ?: 'localhost'));
        }

        // 5. AUTH LOGIN
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

        // 8. Envelope
        $r = $cmd('MAIL FROM:<' . $from . '>');
        if (strpos($r, '250') === false) {
            throw new Exception('MAIL FROM rejected: ' . $r);
        }

        $r = $cmd('RCPT TO:<' . $to . '>');
        if (strpos($r, '250') === false) {
            throw new Exception('RCPT TO rejected: ' . $r);
        }

        // 9. DATA
        $r = $cmd('DATA');
        if (strpos($r, '354') === false) {
            throw new Exception('DATA not accepted: ' . $r);
        }

        // 10. Headers + body
        $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
        $encodedFrom    = '=?UTF-8?B?' . base64_encode($fromName) . '?=';

        $message  = 'Date: ' . date('r') . "\r\n";
        $message .= 'From: ' . $encodedFrom . ' <' . $from . ">\r\n";
        $message .= 'To: ' . $to . "\r\n";
        $message .= 'Subject: ' . $encodedSubject . "\r\n";
        $message .= 'MIME-Version: 1.0' . "\r\n";
        $message .= 'Content-Type: text/html; charset=UTF-8' . "\r\n";
        $message .= 'X-Mailer: CyberhelpInnvikta/2.0' . "\r\n";
        $message .= "\r\n";
        $message .= $htmlBody . "\r\n.\r\n";

        fwrite($sock, $message);
        $r = $readAll();
        if (strpos($r, '250') === false) {
            throw new Exception('Message not accepted: ' . $r);
        }

        // 11. Quit
        $cmd('QUIT');
        fclose($sock);

        return true;

    } catch (Exception $e) {
        error_log('[Cyberhelp SMTP] ' . $e->getMessage());
        if (isset($sock) && is_resource($sock)) fclose($sock);
        return false;
    }
}

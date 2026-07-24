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

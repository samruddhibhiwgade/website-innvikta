const { Client } = require('ssh2');

const phpCode = `<?php
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
        $stmt = $db->query("SELECT * FROM form_submissions ORDER BY created_at DESC");
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

        // Send Email using PHP mail()
        $to = 'sales@innvikta.com';
        $subject = "New Form Submission: " . $form_type;
        $headers = "From: noreply@innvikta.com\\r\\n";
        $headers .= "Reply-To: " . ($email ? $email : 'noreply@innvikta.com') . "\\r\\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\\r\\n";
        
        $email_content = "<h2>New Form Submission: {$form_type}</h2>";
        $email_content .= "<table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse;'>";
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $value = json_encode($value);
            }
            $email_content .= "<tr><th>" . htmlspecialchars(ucfirst(str_replace('_', ' ', $key))) . "</th><td>" . htmlspecialchars($value) . "</td></tr>";
        }
        $email_content .= "</table>";
        
        @mail($to, $subject, $email_content, $headers);

        echo json_encode(['success' => true, 'id' => $id, 'message' => 'Form submitted successfully']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
?>`;

const cmd = `
cat << 'EOF' > /home/platform/public_html/Innvikta-Website/Cyberhelp_Innvikta/server/forms_api.php
${phpCode}EOF
echo "Created forms_api.php"
`;

const conn = new Client();
conn.on('ready', () => {
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Done with code: ' + code);
      conn.end();
    })
    .on('data', (data) => console.log('STDOUT: ' + data.toString()))
    .stderr.on('data', (data) => console.log('STDERR: ' + data.toString()));
  });
}).connect({
  host: 'vps.innvikta.com',
  port: 22,
  username: 'platform',
  password: '8g2A0&jU5h'
});

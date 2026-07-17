const { Client } = require('ssh2');

const phpCode = `<?php
require __DIR__ . '/config.php';
$db = getDB();

$db->exec("
CREATE TABLE IF NOT EXISTS form_submissions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    form_type VARCHAR(100) NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(100),
    company VARCHAR(255),
    designation VARCHAR(255),
    team_size VARCHAR(100),
    message TEXT,
    payload_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");
echo "Table form_submissions created successfully.\\n";
?>`;

const cmd = `
cat << 'EOF' > /home/platform/public_html/Innvikta-Website/Cyberhelp_Innvikta/server/create_forms_table.php
${phpCode}EOF
php /home/platform/public_html/Innvikta-Website/Cyberhelp_Innvikta/server/create_forms_table.php
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

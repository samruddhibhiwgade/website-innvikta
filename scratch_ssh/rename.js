const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  conn.exec('php -r "require \'/home/platform/public_html/Innvikta-Website/Cyberhelp_Innvikta/server/config.php\'; \\$db = getDB(); \\$stmt = \\$db->prepare(\\"UPDATE blogs SET filename = \'how-innvikta-uses-gamification-to-improve-security-awareness.md\' WHERE filename = \'dsds.md\'\\"); \\$stmt->execute(); echo \'Renamed dsds.md to new URL!\\n\';"', (err, stream) => {
    if (err) throw err;
    stream.on('close', () => conn.end())
          .on('data', (data) => console.log(data.toString()))
          .stderr.on('data', (data) => console.error(data.toString()));
  });
}).connect({
  host: 'vps.innvikta.com',
  port: 22,
  username: 'platform',
  password: '8g2A0&jU5h'
});

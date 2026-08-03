const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const cmd = `
    echo "=== Website folder contents ==="
    ls -la /home/platform/public_html/website/
    echo "=== Checking if uploads is a symlink or folder ==="
    ls -la /home/platform/public_html/website/uploads || echo "No uploads folder in website"
    ls -la /home/platform/public_html/website/Cyberhelp_Innvikta || echo "No Cyberhelp_Innvikta in website"
  `;
  
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

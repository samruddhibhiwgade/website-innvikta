const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const cmd = `
    echo "Checking files in website.innvikta.co.in"
    ls -la /home/platform/public_html/website.innvikta.co.in/
    echo "Checking .htaccess"
    cat /home/platform/public_html/website.innvikta.co.in/.htaccess
    echo "Checking index.html"
    cat /home/platform/public_html/website.innvikta.co.in/index.html || true
    echo "Checking index.php"
    cat /home/platform/public_html/website.innvikta.co.in/index.php || true
    echo "Checking public/.htaccess"
    cat /home/platform/public_html/Innvikta-Website/public/.htaccess || true
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

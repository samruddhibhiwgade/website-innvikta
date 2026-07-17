const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
    ls -la /home/platform/public_html/
    echo "Checking website directory"
    ls -la /home/platform/public_html/website/
    echo "Checking .htaccess in website"
    cat /home/platform/public_html/website/.htaccess || true
  `;
  
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      conn.end();
    })
    .on('data', (data) => console.log(data.toString()))
    .stderr.on('data', (data) => console.error(data.toString()));
  });
}).connect({
  host: 'vps.innvikta.com',
  port: 22,
  username: 'platform',
  password: '8g2A0&jU5h'
});

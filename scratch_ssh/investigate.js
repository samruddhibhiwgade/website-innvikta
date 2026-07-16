const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.exec('ls -la /home/platform/public_html/website/ && ls -la /home/platform/public_html/Innvikta-Website/ && cat /home/platform/public_html/website/.htaccess', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      conn.end();
    })
    .on('data', (data) => console.log('STDOUT: ' + data))
    .stderr.on('data', (data) => console.log('STDERR: ' + data));
  });
}).connect({
  host: 'vps.innvikta.com',
  port: 22,
  username: 'platform',
  password: '8g2A0&jU5h'
});

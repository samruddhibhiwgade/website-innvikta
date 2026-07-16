const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  conn.exec('find /home/platform/public_html/Innvikta-Website/.next/static -name "page-899a5258c31c49e5.js"', (err, stream) => {
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

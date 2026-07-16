const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  conn.exec('echo "8g2A0&jU5h" | sudo -S pm2 logs innvikta --lines 50', (err, stream) => {
    if (err) throw err;
    stream.on('close', () => conn.end())
          .on('data', (data) => console.log('STDOUT: ' + data.toString()))
          .stderr.on('data', (data) => console.log('STDERR: ' + data.toString()));
  });
}).connect({
  host: 'vps.innvikta.com',
  port: 22,
  username: 'platform',
  password: '8g2A0&jU5h'
});

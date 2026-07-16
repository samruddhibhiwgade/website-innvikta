const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const cmd = `curl -s -H "RSC: 1" "https://website.innvikta.co.in/solutions/insat" | head -n 20`;
  
  console.log("Running CMD:", cmd);
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('data', (data) => console.log('STDOUT: ' + data.toString()))
          .stderr.on('data', (data) => console.log('STDERR: ' + data.toString()))
          .on('close', () => conn.end());
  });
}).connect({
  host: 'vps.innvikta.com',
  port: 22,
  username: 'platform',
  password: '8g2A0&jU5h'
});

const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
    echo "8g2A0&jU5h" | sudo -S kill -9 4128714 4128739 4128740 || true
    cd /home/platform/public_html/Innvikta-Website
    . ~/.nvm/nvm.sh
    npx pm2 start npm --name "innvikta" -- start
  `;
  conn.exec(cmd, (err, stream) => {
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

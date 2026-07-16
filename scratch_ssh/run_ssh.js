const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.exec('cd /home/platform/public_html/Innvikta-Website && git pull https://github.com/Himanshutadse114/innvikta-website.git main && php Cyberhelp_Innvikta/server/setup_db.php && . ~/.nvm/nvm.sh && rm -rf .next && npm run build', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Build Stream :: close :: code: ' + code);
      const copyCmd = 'rm -rf /home/platform/public_html/website/_next && mkdir -p /home/platform/public_html/website/_next && cp -R /home/platform/public_html/Innvikta-Website/.next/static /home/platform/public_html/website/_next/ && cp -R /home/platform/public_html/Innvikta-Website/public/* /home/platform/public_html/website/ 2>/dev/null || true';
      conn.exec(copyCmd + ' && . ~/.nvm/nvm.sh && npx pm2 restart innvikta', (err2, stream2) => {
        if (err2) throw err2;
        stream2.on('close', () => conn.end())
               .on('data', (data) => console.log('STDOUT2: ' + data))
               .stderr.on('data', (data) => console.log('STDERR2: ' + data));
      });
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

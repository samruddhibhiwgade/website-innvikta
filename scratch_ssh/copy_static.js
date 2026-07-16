const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const cmd = `
    rm -rf /home/platform/public_html/website/_next &&
    mkdir -p /home/platform/public_html/website/_next &&
    cp -R /home/platform/public_html/Innvikta-Website/.next/static /home/platform/public_html/website/_next/ &&
    cp -R /home/platform/public_html/Innvikta-Website/public/* /home/platform/public_html/website/ 2>/dev/null || true
  `;
  conn.exec(cmd, (err, stream) => {
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

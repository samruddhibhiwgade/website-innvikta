const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.exec('php /home/platform/public_html/Innvikta-Website/Cyberhelp_Innvikta/server/test_smtp.php', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Done with code: ' + code);
      conn.end();
    })
    .on('data', (data) => console.log(data.toString()))
    .stderr.on('data', (data) => console.log('STDERR: ' + data.toString()));
  });
}).connect({
  host: 'vps.innvikta.com',
  port: 22,
  username: 'platform',
  password: '8g2A0&jU5h'
});

const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Check config.php content and run the php script manually to see output
  const cmd = `
    cat /home/platform/public_html/Innvikta-Website/Cyberhelp_Innvikta/server/config.php
    echo "--- Running create_forms_table.php ---"
    php /home/platform/public_html/Innvikta-Website/Cyberhelp_Innvikta/server/create_forms_table.php
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

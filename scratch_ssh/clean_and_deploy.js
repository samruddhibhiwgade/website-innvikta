const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const cmd = `
    # Clean the conflicting file and pull the code cleanly
    cd /home/platform/public_html/Innvikta-Website
    rm -f Cyberhelp_Innvikta/server/forms_api.php
    git checkout -- Cyberhelp_Innvikta/server/forms_api.php || true
    git pull https://github.com/Himanshutadse114/innvikta-website.git main
    
    # Run the build
    . ~/.nvm/nvm.sh
    rm -rf .next
    npm run build
    rm -rf /home/platform/public_html/website/_next
    mkdir -p /home/platform/public_html/website/_next
    cp -R /home/platform/public_html/Innvikta-Website/.next/static /home/platform/public_html/website/_next/
    cp -R /home/platform/public_html/Innvikta-Website/public/* /home/platform/public_html/website/ 2>/dev/null || true
    echo "8g2A0&jU5h" | sudo -S npx pm2 restart innvikta
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

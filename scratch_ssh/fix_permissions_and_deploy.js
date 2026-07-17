const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const cmd = `
    # Fix permissions using sudo
    echo "8g2A0&jU5h" | sudo -S chown -R platform:platform /home/platform/public_html/Innvikta-Website
    
    # Verify .next is deleted cleanly
    cd /home/platform/public_html/Innvikta-Website
    echo "8g2A0&jU5h" | sudo -S rm -rf .next
    
    # Build Next.js app
    . ~/.nvm/nvm.sh
    npm run build
    
    # Copy static files to website/
    rm -rf /home/platform/public_html/website/_next
    mkdir -p /home/platform/public_html/website/_next
    cp -R /home/platform/public_html/Innvikta-Website/.next/static /home/platform/public_html/website/_next/
    cp -R /home/platform/public_html/Innvikta-Website/public/* /home/platform/public_html/website/ 2>/dev/null || true
    
    # Restart PM2
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

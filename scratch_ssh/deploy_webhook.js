const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  const cmd = `
    # Add platform webhook variables to server .env if not exists
    if ! grep -q "PLATFORM_SIGNUP_API_URL" /home/platform/public_html/Innvikta-Website/.env; then
      echo "PLATFORM_SIGNUP_API_URL=https://insat.innvikta.com/api/signup" >> /home/platform/public_html/Innvikta-Website/.env
      echo "Added PLATFORM_SIGNUP_API_URL to server .env"
    fi
    if ! grep -q "PLATFORM_API_KEY" /home/platform/public_html/Innvikta-Website/.env; then
      echo "PLATFORM_API_KEY=inv_sf_prod_8g2A0jU5h" >> /home/platform/public_html/Innvikta-Website/.env
      echo "Added PLATFORM_API_KEY to server .env"
    fi

    # Fix permissions and pull
    echo "8g2A0&jU5h" | sudo -S chown -R platform:platform /home/platform/public_html/Innvikta-Website
    cd /home/platform/public_html/Innvikta-Website
    git pull https://github.com/Himanshutadse114/innvikta-website.git main
    echo "Deployment completed successfully!"
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

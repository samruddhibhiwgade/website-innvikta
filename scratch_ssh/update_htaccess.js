const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const htaccess = `Options -MultiViews
RewriteEngine On

RewriteRule ^\\.well-known/acme-challenge/ - [L]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3008/$1 [P,QSA,B,L]

RequestHeader set X-Forwarded-Proto "https"
RequestHeader set X-Forwarded-Port  "443"
RequestHeader set X-Forwarded-Host  "expr=%{HTTP_HOST}"

Header always edit Set-Cookie ^(.*)$ "$1; Secure; SameSite=Lax"
`;
  conn.exec(`echo '${htaccess}' > /home/platform/public_html/website/.htaccess`, (err, stream) => {
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

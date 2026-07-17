const { Client } = require('ssh2');

const htaccessContent = `Options -MultiViews -Indexes
DirectoryIndex disabled
RewriteEngine On

RewriteRule ^\\.well-known/acme-challenge/ - [L]

# Use REQUEST_URI instead of backreferences to preserve exact path encoding
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ http://127.0.0.1:3008%{REQUEST_URI} [P,QSA,L]

RequestHeader set X-Forwarded-Proto "https"
RequestHeader set X-Forwarded-Port  "443"
RequestHeader set X-Forwarded-Host  "expr=%{HTTP_HOST}"

Header always edit Set-Cookie ^(.*)$ "$1; Secure; SameSite=Lax"
`;

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // Write the new .htaccess content to a temp file then upload it
  const cmd = `
    cat << 'EOF' > /home/platform/public_html/website/.htaccess
${htaccessContent}EOF
    echo "Updated .htaccess"
    cat /home/platform/public_html/website/.htaccess
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

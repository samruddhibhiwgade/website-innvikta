const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  // Test 1: Direct Next.js port
  const cmd1 = `curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:3008/solutions/insat"`;
  // Test 2: Through Apache Proxy
  const cmd2 = `curl -s -o /dev/null -w "%{http_code}" "https://website.innvikta.co.in/solutions/insat"`;
  
  console.log("Running CMD 1:", cmd1);
  conn.exec(cmd1, (err, stream) => {
    if (err) throw err;
    stream.on('data', (data) => console.log('STDOUT 1: ' + data.toString()))
          .stderr.on('data', (data) => console.log('STDERR 1: ' + data.toString()))
          .on('close', () => {
             console.log("Running CMD 2:", cmd2);
             conn.exec(cmd2, (err2, stream2) => {
                 if (err2) throw err2;
                 stream2.on('data', (data) => console.log('STDOUT 2: ' + data.toString()))
                        .stderr.on('data', (data) => console.log('STDERR 2: ' + data.toString()))
                        .on('close', () => conn.end());
             });
          });
  });
}).connect({
  host: 'vps.innvikta.com',
  port: 22,
  username: 'platform',
  password: '8g2A0&jU5h'
});

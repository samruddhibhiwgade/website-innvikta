const { execSync } = require('child_process');

const SSH_CMD = `ssh -o StrictHostKeyChecking=no -i scratch_ssh/key.pem platform@103.86.177.53`;

try {
  console.log("Checking files in public_html...");
  const lsOut = execSync(`${SSH_CMD} "ls -la /home/platform/public_html/website.innvikta.co.in/"`);
  console.log(lsOut.toString());

  console.log("Checking .htaccess...");
  const htaccess = execSync(`${SSH_CMD} "cat /home/platform/public_html/website.innvikta.co.in/.htaccess"`);
  console.log(htaccess.toString());
} catch (e) {
  console.error(e.toString());
  if (e.stdout) console.error("STDOUT:", e.stdout.toString());
  if (e.stderr) console.error("STDERR:", e.stderr.toString());
}

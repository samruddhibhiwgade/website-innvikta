const fs = require('fs');

const filePath = 'd:\\Innvikta_website_clone\\innvikta-website\\src\\app\\resources\\case-studies\\[slug]\\page.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace className="..." with className={`...`} for ${alignClass}
content = content.replace(
  /className="text-\[\#334155\](.*)\$\{alignClass\}"/g,
  "className={`text-[#334155]$1${alignClass}`}"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Quotes fixed successfully!');

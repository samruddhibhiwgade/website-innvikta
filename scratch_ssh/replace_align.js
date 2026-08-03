const fs = require('fs');
const path = require('path');

const filePath = 'd:\\Innvikta_website_clone\\innvikta-website\\src\\app\\resources\\case-studies\\[slug]\\page.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all occurrences of prose-slate text-justify
content = content.replace(/prose-slate text-justify/g, 'prose-slate ${alignClass}');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Case studies details page alignment updated successfully!');

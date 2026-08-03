const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\ADMIN\\.gemini\\antigravity-ide\\brain\\94239c01-64b0-4f3f-891c-4c4f95b79f23\\phishing_report_button_mockup_1785052135175.png';
const dest = 'd:\\Innvikta_website_clone\\innvikta-website\\public\\images\\phishing_report_button.png';

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log('Image copied successfully!');

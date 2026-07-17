const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('c:/website/website-innvikta/app');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('We’re here to help')) {
        let updated = false;
        
        // Update the wrapper div
        content = content.replace(/<div className="faq-title-col animate from-left[^"]*">/g, () => {
            updated = true;
            return '<div className="faq-title-col animate from-left flex flex-col justify-center self-center items-center text-center">';
        });
        
        // Update the h2 heading
        content = content.replace(/<h2 className="text-40-heading[^"]*">We’re here to help<\/h2>/g, () => {
            updated = true;
            return '<h2 className="text-40-heading text-center">We’re here to help</h2>';
        });

        if (updated) {
            fs.writeFileSync(file, content, 'utf8');
            console.log('Updated', file);
        }
    }
});
console.log('Done!');

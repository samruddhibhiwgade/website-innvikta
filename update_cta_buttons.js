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

// Regex to match the button group div and its contents up to its closing div
// Since regex across multiple lines can be tricky if we don't know the exact contents,
// we'll look for `<section className="cta"` and replace everything between `<div className="flex flex-wrap justify-center gap-4 mt-10"` and the next `</div>`
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Only process files that have the cta section
    if (content.includes('className="cta"')) {
        let updated = false;
        
        // Match the button container: <div className="flex flex-wrap justify-center gap-4 mt-10"...>...</div>
        // Use a regex that matches the div start, any attributes, the closing >, then anything lazy until </div>
        const regex = /(<div className="flex flex-wrap justify-center gap-4 mt-10"[^>]*>)([\s\S]*?)(<\/div>)/g;
        
        const newButtons = `
                  <Link href="/start-free" className="btn btn-outline-primary">
                    Start Free
                  </Link>
                  <Link href="/book-demo" className="btn btn-primary">
                    Book a demo &rarr;
                  </Link>
                `;
        
        content = content.replace(regex, (match, p1, p2, p3) => {
            updated = true;
            return p1 + newButtons + p3;
        });

        if (updated) {
            fs.writeFileSync(file, content, 'utf8');
            console.log('Updated', file);
        }
    }
});
console.log('Done!');

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

const replacements = [
    // Text colors - dark to CSS var
    [/color:\s*'#000000'/g, "color: 'var(--color-text-primary)'"],
    [/color:\s*'#111111'/g, "color: 'var(--color-text-primary)'"],
    [/color:\s*'#1F2937'/g, "color: 'var(--color-text-primary)'"],
    [/color:\s*'#333333'/g, "color: 'var(--color-text-primary)'"],
    [/color:\s*'#374151'/g, "color: 'var(--color-text-secondary)'"],
    [/color:\s*'#444444'/g, "color: 'var(--color-text-secondary)'"],
    [/color:\s*'#555555'/g, "color: 'var(--color-text-secondary)'"],
    [/color:\s*'#666666'/g, "color: 'var(--color-text-muted)'"],
    [/color:\s*'#6B7280'/g, "color: 'var(--color-text-muted)'"],
    [/color:\s*'#7F1D1D'/g, "color: 'var(--color-text-secondary)'"],
    [/color:\s*'#888888'/g, "color: 'var(--color-text-muted)'"],
    [/color:\s*'#9CA3AF'/g, "color: 'var(--color-text-muted)'"],

    // Background colors - light to CSS var
    [/background:\s*'#FFFFFF'/g, "background: 'var(--color-bg-card)'"],
    [/background:\s*'#F5F5F5'/g, "background: 'var(--color-bg-secondary)'"],
    [/background:\s*'#FAFAFA'/g, "background: 'var(--color-bg-card-hover)'"],
    [/background:\s*'#F9FAFB'/g, "background: 'var(--color-bg-secondary)'"],

    // Border colors
    [/border:\s*'1px solid #E5E7EB'/g, "border: '1px solid var(--color-border)'"],
    [/borderBottom:\s*'1px solid #E5E7EB'/g, "borderBottom: '1px solid var(--color-border)'"],
    [/borderTop:\s*'1px solid #E5E7EB'/g, "borderTop: '1px solid var(--color-border)'"],
    [/borderColor:\s*'#E5E7EB'/g, "borderColor: 'var(--color-border)'"],
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [pattern, replacement] of replacements) {
        const newContent = content.replace(pattern, replacement);
        if (newContent !== content) {
            changed = true;
            content = newContent;
        }
    }
    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated:', path.relative(__dirname, filePath));
    }
}

function walkDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walkDir(full);
        else if (entry.name.endsWith('.jsx')) processFile(full);
    }
}

walkDir(dir);
console.log('Done!');

const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('src');
const replacements = [
    { search: /bg-\[#1e293b\]/g, replace: 'bg-[#131921]' },
    { search: /bg-\[#111827\]/g, replace: 'bg-[#131921]' },
    { search: /bg-\[#1a1f2e\]/g, replace: 'bg-[#131921]' },
    { search: /bg-\[#1f2937\]/g, replace: 'bg-[#131921]' }
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    replacements.forEach(r => {
        if (r.search.test(content)) {
            content = content.replace(r.search, r.replace);
            changed = true;
        }
    });
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});

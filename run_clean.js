const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    let dirFile = path.join(dir, file);
    try {
      if (fs.statSync(dirFile).isDirectory()) {
        if (!['node_modules', '.git'].includes(file)) filelist = walkSync(dirFile, filelist);
      } else if (dirFile.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    } catch(e) {}
  });
  return filelist;
}

const files = walkSync(path.join(__dirname, 'src'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // 1: Handle inline export default React.memo(Component, (p,n) => { ... });
  // This matches up to the closing brace/parenthesis carefully
  content = content.replace(/export\s+default\s+React\.memo\(([A-Za-z0-9_]+),\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\}\s*\);/g, "export default React.memo($1);");
  
  // 1.b: Handle single-line arrow function in export default React.memo(Component, (p,n) => n === p);
  content = content.replace(/export\s+default\s+React\.memo\(([A-Za-z0-9_]+),\s*\([^)]*\)\s*=>\s*[^;{]+?\);/g, "export default React.memo($1);");

  // 2: Handle named const MemoizedComponent = React.memo(Component, (p,n) => { ... });
  content = content.replace(/const\s+Memoized([A-Za-z0-9_]+)\s*=\s*React\.memo\(\1,\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\}\s*\);/g, "const Memoized$1 = React.memo($1);");

  // 2.b: Handle single-line arrow function in named component
  content = content.replace(/const\s+Memoized([A-Za-z0-9_]+)\s*=\s*React\.memo\(\1,\s*\([^)]*\)\s*=>\s*[^;{]+?\);/g, "const Memoized$1 = React.memo($1);");

  // 3: Remove .displayName anywhere
  content = content.replace(/^[ \t]*[A-Za-z0-9_]+\.displayName\s*=\s*['"][A-Za-z0-9_]+['"];[ \t]*\n?/gm, "");

  // 4: If we want to replace const MemoizedX = React.memo(X); and export default MemoizedX; with export default React.memo(X);
  // (Optional, to make the code truly flat as the user requested)
  content = content.replace(/const\s+Memoized([A-Za-z0-9_]+)\s*=\s*React\.memo\(\1\);(?:[\s\S]*?)export\s+default\s+Memoized\1;/g, "export default React.memo($1);");

  // Another form: const Menu = React.memo(...) without Memoized prefix. We keep it if it's not exported default, replacing just the comparator
  
  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Cleaned: ' + f);
  }
});
console.log('Finished everything');

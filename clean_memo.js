const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const srcDir = path.join(__dirname, 'src');
const files = walkSync(srcDir);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Pattern 1:
  // const MemoizedComponent = React.memo(Component, (prev, next) => { ... });
  // MemoizedComponent.displayName = 'Component';
  // export default MemoizedComponent;
  content = content.replace(
    /const\s+Memoized([A-Za-z0-9_]+)\s*=\s*React\.memo\(\1\s*,\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\}\);\s*Memoized\1\.displayName\s*=\s*['"]\1['"];\s*export\s+default\s+Memoized\1;/g,
    'export default React.memo($1);'
  );

  // Pattern 2 (Single line return):
  // const MemoizedComponent = React.memo(Component, (prev, next) => prev === next);
  // MemoizedComponent.displayName = 'Component';
  // export default MemoizedComponent;
  content = content.replace(
    /const\s+Memoized([A-Za-z0-9_]+)\s*=\s*React\.memo\(\1\s*,\s*\([^)]*\)\s*=>\s*[^;{]+;\s*Memoized\1\.displayName\s*=\s*['"]\1['"];\s*export\s+default\s+Memoized\1;/g,
    'export default React.memo($1);'
  );

  // Pattern 3:
  // export default React.memo(Component, (prev, next) => { ... });
  content = content.replace(
    /export\s+default\s+React\.memo\(([A-Za-z0-9_]+)\s*,\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\}\);/g,
    'export default React.memo($1);'
  );

  // Pattern 4 (Single line return):
  // export default React.memo(Component, (prev, next) => prev === next);
  content = content.replace(
    /export\s+default\s+React\.memo\(([A-Za-z0-9_]+)\s*,\s*\([^)]*\)\s*=>\s*[^;{]+\);/g,
    'export default React.memo($1);'
  );

  // Pattern 5:
  // const MemoizedComponent = React.memo(Component);
  // MemoizedComponent.displayName = 'Component';
  // export default MemoizedComponent;
  content = content.replace(
    /const\s+Memoized([A-Za-z0-9_]+)\s*=\s*React\.memo\(\1\);(?:[\s\S]*?)Memoized\1\.displayName\s*=\s*['"]\1['"];\s*export\s+default\s+Memoized\1;/g,
    'export default React.memo($1);'
  );

  // Pattern 6:
  // Component.displayName = 'Component';
  // export default React.memo(Component);
  content = content.replace(
    /([A-Za-z0-9_]+)\.displayName\s*=\s*['"][^'"]+['"];\s*export\s+default\s+React\.memo\(\1\);/g,
    'export default React.memo($1);'
  );

  // Additional catch: Any standalone `.displayName = ` assignments 
  content = content.replace(/^[ \t]*[A-Za-z0-9_]+\.displayName\s*=\s*['"][A-Za-z0-9_]+['"];[ \t]*\n?/gm, '');


  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Cleaned up React.memo in ${file}`);
  }
}
console.log('Done!');

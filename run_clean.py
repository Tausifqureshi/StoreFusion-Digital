import os
import re

def walk_tree(dir_path):
    files_to_check = []
    for root, dirs, files in os.walk(dir_path):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')
        for file in files:
            if file.endswith('.jsx'):
                files_to_check.append(os.path.join(root, file))
    return files_to_check

src_dir = os.path.join(os.path.dirname(__file__), 'src')
files = walk_tree(src_dir)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content

    # 1. export default React.memo(Component, (p,n) => { ... });
    content = re.sub(r'export\s+default\s+React\.memo\(([A-Za-z0-9_]+),\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\}\s*\);', r'export default React.memo(\1);', content)

    # 1.b: export default React.memo(Component, (p,n) => prev === next);
    content = re.sub(r'export\s+default\s+React\.memo\(([A-Za-z0-9_]+),\s*\([^)]*\)\s*=>\s*[^;{]+?\);', r'export default React.memo(\1);', content)

    # 2. const MemoizedX = React.memo(X, (p,n) => { ... });
    content = re.sub(r'const\s+Memoized([A-Za-z0-9_]+)\s*=\s*React\.memo\(\1,\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\}\s*\);', r'const Memoized\1 = React.memo(\1);', content)

    # 2.b: Same but single line
    content = re.sub(r'const\s+Memoized([A-Za-z0-9_]+)\s*=\s*React\.memo\(\1,\s*\([^)]*\)\s*=>\s*[^;{]+?\);', r'const Memoized\1 = React.memo(\1);', content)

    # 3. .displayName = ...
    content = re.sub(r'^[ \t]*[A-Za-z0-9_]+\.displayName\s*=\s*[\'"][^\'"]+[\'"];?[ \t]*\n?', '', content, flags=re.MULTILINE)

    # 4. Collapse const MemoizedX = React.memo(X);\n export default MemoizedX; -> export default React.memo(X);
    content = re.sub(r'const\s+Memoized([A-Za-z0-9_]+)\s*=\s*React\.memo\(\1\);(?:[\s\S]*?)export\s+default\s+Memoized\1;', r'export default React.memo(\1);', content)

    # 5. Commented out instances: // export default React.memo(...)
    content = re.sub(r'//\s*export\s+default\s+React\.memo\(([A-Za-z0-9_]+),\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\}\s*\);', '', content)

    if content != original:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Cleaned " + file)

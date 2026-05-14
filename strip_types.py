import re

with open('layouts/components/Scene.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Strip type annotations
content = re.sub(r'<THREE\.Group>', '', content)
content = re.sub(r'<THREE\.Mesh>', '', content)
content = re.sub(r'<THREE\.Points>', '', content)
content = re.sub(r'<any>', '', content)
content = re.sub(r': { hookRef: React\.RefObject<THREE\.Group> }', '', content)
content = re.sub(r': { type: string; color: string }', '', content)
content = re.sub(r': { position: \[number, number, number\]; id: string; type: string }', '', content)
content = re.sub(r'\(e: KeyboardEvent\)', '(e)', content)
content = re.sub(r'as \[number, number, number\]', '', content)
content = re.sub(r'as THREE\.Mesh', '', content)
content = re.sub(r'as keyof typeof ICON_PATHS', '', content)
content = re.sub(r': THREE\.ExtrudeGeometry\[\]', '', content)
content = re.sub(r': \[number, number, number\]', '', content)
content = re.sub(r'\(x: number, y: number\)', '(x, y)', content)

with open('layouts/components/Scene.js', 'w', encoding='utf-8') as f:
    f.write(content)

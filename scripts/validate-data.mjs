import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/content');
if (!fs.existsSync(root)) process.exit(0);
const files = [];
function walk(dir) { for (const entry of fs.readdirSync(dir, { withFileTypes: true })) { const full = path.join(dir, entry.name); if (entry.isDirectory()) walk(full); else if (/\.(md|mdx)$/.test(entry.name)) files.push(full); } }
walk(root);
const required = ['title:', 'description:'];
const invalid = files.filter(file => required.some(field => !fs.readFileSync(file, 'utf8').includes(field)));
if (invalid.length) { console.error('Missing frontmatter:', invalid.join(', ')); process.exit(1); }
console.log(`Validated ${files.length} content file(s).`);

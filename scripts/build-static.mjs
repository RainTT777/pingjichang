import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'dist');

const rootFiles = [
  'index.html',
  'ranking.html',
  'recommend.html',
  'faq.html',
  'guide.html',
  'tutorials.html',
  'alerts.html',
  'disclosure.html',
  'about.html',
  'airport-edgenova.html',
  'airport-guangnianti.html',
  'airport-jilianyun.html',
  'robots.txt',
  'sitemap.xml',
];

const directories = ['assets', 'articles', 'src/styles'];

function copyFile(relativeSource, relativeTarget = relativeSource) {
  const source = path.join(root, relativeSource);
  const target = path.join(outDir, relativeTarget);
  if (!fs.existsSync(source)) throw new Error(`Missing build input: ${relativeSource}`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyDirectory(relativeDir) {
  const source = path.join(root, relativeDir);
  const target = path.join(outDir, relativeDir);
  if (!fs.existsSync(source)) throw new Error(`Missing build directory: ${relativeDir}`);
  fs.cpSync(source, target, { recursive: true });
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

rootFiles.forEach((file) => copyFile(file));
directories.forEach((directory) => copyDirectory(directory));

for (const publicFile of ['_headers', 'favicon.svg', 'og-cover.svg']) {
  const source = path.join('public', publicFile);
  if (fs.existsSync(path.join(root, source))) copyFile(source, publicFile);
}

const htmlFiles = [];
function findHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) findHtml(absolute);
    else if (entry.name.endsWith('.html')) htmlFiles.push(path.relative(outDir, absolute));
  }
}
findHtml(outDir);

if (!fs.existsSync(path.join(outDir, 'index.html'))) {
  throw new Error('Build failed: dist/index.html was not generated.');
}

console.log(JSON.stringify({
  output: 'dist',
  htmlPages: htmlFiles.length,
  homepage: true,
  robots: fs.existsSync(path.join(outDir, 'robots.txt')),
  sitemap: fs.existsSync(path.join(outDir, 'sitemap.xml')),
}));

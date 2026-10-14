import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const siteUrl = 'https://raintt777.github.io/pingjichang';
const lastmod = '2026-10-14';

function collectHtml(dir, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') return [];
    const absolute = path.join(dir, entry.name);
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) return collectHtml(absolute, relative);
    return entry.isFile() && entry.name.endsWith('.html') ? [relative] : [];
  });
}

const pages = collectHtml(root).sort((a, b) => {
  if (a === 'index.html') return -1;
  if (b === 'index.html') return 1;
  return a.localeCompare(b, 'zh-CN');
});

const priority = (page) => {
  if (page === 'index.html') return '1.0';
  if (['recommend.html', 'ranking.html', 'faq.html', 'guide.html', 'tutorials.html'].includes(page)) return '0.9';
  if (page.startsWith('airport-')) return '0.8';
  if (page.startsWith('articles/')) return '0.7';
  return '0.6';
};

const frequency = (page) => page === 'index.html' || page === 'recommend.html' ? 'weekly' : page.startsWith('articles/') ? 'monthly' : 'weekly';
const urlFor = (page) => page === 'index.html' ? `${siteUrl}/` : `${siteUrl}/${page.split('/').map(encodeURIComponent).join('/')}`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url>\n    <loc>${urlFor(page)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${frequency(page)}</changefreq>\n    <priority>${priority(page)}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(root, 'robots.txt'), robots, 'utf8');
console.log(JSON.stringify({ pages: pages.length, sitemap: 'sitemap.xml', robots: 'robots.txt', siteUrl }));

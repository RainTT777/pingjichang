import {readdir,readFile,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const articleDir=join(root,'articles');
const articleFiles=(await readdir(articleDir)).filter(f=>f.endsWith('.html'));
const hashes=new Set();let brokenToc=0,min=Infinity,max=0,minH2=Infinity,minH3=Infinity,minFaq=Infinity;
for(const file of articleFiles){const s=await readFile(join(articleDir,file),'utf8');const body=s.match(/<article class="article-body">([\s\S]*?)<div class="article-links">/)?.[1]||'';const plain=body.replace(/<[^>]+>/g,'').replace(/\s+/g,'');hashes.add(createHash('sha256').update(body).digest('hex'));min=Math.min(min,plain.length);max=Math.max(max,plain.length);minH2=Math.min(minH2,(body.match(/<h2/g)||[]).length);minH3=Math.min(minH3,(body.match(/<h3/g)||[]).length);minFaq=Math.min(minFaq,(body.match(/<details/g)||[]).length);const ids=new Set([...s.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));const toc=s.match(/<aside class="article-toc">([\s\S]*?)<\/aside>/)?.[1]||'';for(const m of toc.matchAll(/href="#([^"]+)"/g))if(!ids.has(m[1]))brokenToc++}
const rootFiles=(await readdir(root)).filter(f=>f.endsWith('.html')).map(f=>join(root,f));const all=[...rootFiles,...articleFiles.map(f=>join(articleDir,f))];let brokenLinks=0;
for(const file of all){const s=await readFile(file,'utf8');for(const m of s.matchAll(/(?:href|src)="([^"#?]+)"/g)){const v=m[1];if(/^(?:https?:|mailto:|tel:|data:)/.test(v))continue;try{await access(resolve(dirname(file),v))}catch{brokenLinks++}}}
console.log(JSON.stringify({articles:articleFiles.length,uniqueBodies:hashes.size,minChars:min,maxChars:max,minH2,minH3,minFaq,brokenToc,brokenLinks}));

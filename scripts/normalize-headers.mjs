import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, basename } from 'node:path';

const root=new URL('../',import.meta.url);
const rootPath=decodeURIComponent(root.pathname).replace(/^\/(?:([A-Za-z]:))/, '$1');
const articlePath=join(rootPath,'articles');
const rootFiles=(await readdir(rootPath)).filter(name=>name.endsWith('.html')).map(name=>join(rootPath,name));
const articleFiles=(await readdir(articlePath)).filter(name=>name.endsWith('.html')).map(name=>join(articlePath,name));

function pageKey(file){
 const name=basename(file);
 if(file.includes(`${join('','articles')}\\`)||file.replaceAll('\\','/').includes('/articles/'))return 'guide';
 if(name==='index.html'||name==='ranking.html')return 'ranking';
 if(name==='recommend.html'||name.startsWith('airport-'))return 'recommend';
 if(name==='faq.html')return 'faq';
 if(name==='guide.html')return 'guide';
 if(name==='tutorials.html')return 'tutorials';
 if(name==='alerts.html')return 'alerts';
 if(name==='disclosure.html')return 'disclosure';
 if(name==='about.html')return 'about';
 return '';
}

function header(prefix,active){
 const item=(key,href,label)=>`<a data-page="${key}" href="${prefix}${href}">${label}</a>`;
 return `<header class="global-head"><div class="global-nav-wrap"><a class="global-brand" href="${prefix}index.html"><span>评</span><b>评机场<small>PING JI CHANG</small></b></a><button class="global-toggle" aria-expanded="false">栏目</button><nav class="global-nav">${item('ranking','index.html#ranking','机场排行')}${item('recommend','recommend.html','机场推荐')}${item('faq','faq.html','机场常见问题')}${item('guide','guide.html','机场使用指南')}${item('tutorials','tutorials.html','机场使用教程')}${item('alerts','alerts.html','机场跑路预警')}${item('disclosure','disclosure.html','返佣披露')}${item('about','about.html','关于我们')}</nav><a class="global-cta" href="${prefix}recommend.html">查看推荐</a></div></header>`;
}

let updated=0;
for(const file of [...rootFiles,...articleFiles]){
 let html=await readFile(file,'utf8');
 const isArticle=file.replaceAll('\\','/').includes('/articles/');
 const prefix=isArticle?'../':'';
 const css=`<link rel="stylesheet" href="${prefix}assets/header.css">`;
 if(!html.includes('assets/header.css'))html=html.replace('</head>',`${css}</head>`);
 const unified=header(prefix,pageKey(file));
 if(/<header class="(?:site-head|page-head|global-head)"[\s\S]*?<\/header>/.test(html)){
   html=html.replace(/<header class="(?:site-head|page-head|global-head)"[\s\S]*?<\/header>/,unified);
 }else{
   html=html.replace(/(<body[^>]*>)/,`$1${unified}`);
 }
 await writeFile(file,html,'utf8');
 updated++;
}
console.log(JSON.stringify({updated}));

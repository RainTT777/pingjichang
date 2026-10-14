import rss from '@astrojs/rss';
export const GET = () => rss({ title:'评机场', description:'机场评测与风险观察', site:'https://pingjichang.com', items:[{title:'2026 年 10 月机场风险观察',description:'演示数据',pubDate:new Date('2026-10-01'),link:'/reports/october-2026/'}] });

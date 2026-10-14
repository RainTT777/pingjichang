import { mkdir, writeFile } from 'node:fs/promises';

const topics = [
['2026-stable-airport','2026 稳定机场推荐怎么选','选购指南','重视长期连接稳定性的普通用户','线路稳定、晚高峰和售后透明度'],
['monthly-airport','月付机场推荐：为什么新手应优先月付','套餐选择','第一次购买机场的用户','购买周期、退款规则和试错成本'],
['low-latency-airport','低延迟机场推荐与节点选择方法','线路知识','视频会议、远程办公和游戏用户','延迟、抖动、丢包与本地运营商适配'],
['iepl-airport','IEPL 专线机场推荐与判断标准','线路知识','重视晚高峰表现的用户','入口质量、专线负载和节点维护'],
['iplc-vs-iepl','IPLC 与 IEPL 专线机场有什么区别','线路知识','正在比较专线类型的用户','线路名称、实际路由与使用体验'],
['clash-subscription','Clash 机场订阅推荐与导入注意事项','客户端教程','Windows 和 macOS 用户','订阅格式、规则模式和配置更新'],
['shadowrocket-airport','Shadowrocket 小火箭机场推荐怎么选','客户端教程','iPhone 与 iPad 用户','订阅兼容、策略组和按需连接'],
['iphone-subscription','iPhone 小火箭订阅使用完整教程','客户端教程','初次使用 iOS 代理客户端的用户','安装来源、订阅导入与故障排查'],
['windows-clash','Windows Clash 机场使用与测速教程','客户端教程','Windows 桌面用户','客户端安全、系统代理和延迟测试'],
['mac-airport-client','Mac 机场客户端推荐与配置方法','客户端教程','macOS 用户','Apple 芯片兼容、系统代理和规则选择'],
['android-subscription','Android 机场订阅导入与使用教程','客户端教程','Android 手机和平板用户','客户端权限、电池优化和订阅更新'],
['chatgpt-airport','ChatGPT 节点机场推荐与可用性判断','AI 工具','需要访问 ChatGPT 的用户','地区、IP 信誉、登录稳定性与风控'],
['claude-airport','Claude 可用机场节点怎么选','AI 工具','使用 Claude 的写作和开发用户','支持地区、账号风控和节点纯净度'],
['gemini-airport','Gemini 可用机场与节点切换方法','AI 工具','使用 Google AI 服务的用户','Google 账号地区、DNS 和节点一致性'],
['streaming-unlock','流媒体解锁机场推荐与测试方法','流媒体','观看多地区流媒体的用户','解锁范围、带宽、缓存和节点维护'],
['netflix-airport','Netflix 机场节点怎么选才稳定','流媒体','重视高清视频播放的用户','分区解锁、码率、晚高峰与设备兼容'],
['tiktok-native-ip','TikTok 原生 IP 机场与节点选择','流媒体','运营海外短视频账号的用户','原生 IP、地区一致性和账号安全'],
['peak-hour-airport','晚高峰稳定机场如何测试','测速方法','晚上使用网络较多的用户','20 点至 23 点的丢包、速度和抖动'],
['gaming-airport','游戏加速机场推荐与延迟优化','使用场景','海外游戏和联机玩家','UDP 支持、路由、抖动和节点距离'],
['remote-work-airport','跨境办公机场推荐与备用方案','使用场景','远程办公与视频会议用户','可靠性、多设备、会议稳定和备用线路'],
['overseas-study-airport','留学生常用机场节点选择指南','使用场景','留学与海外学习资料访问用户','设备数量、学校网络和常用地区'],
['multi-device-airport','多设备机场推荐与家庭使用建议','使用场景','家庭和小团队用户','设备限制、流量共享和客户端兼容'],
['unlimited-device-airport','不限设备机场是否值得购买','套餐选择','拥有多台设备的用户','公平使用、并发连接和账号规则'],
['annual-vs-monthly','机场年付和月付套餐怎么选','套餐选择','准备续费或长期购买的用户','折扣、风险、服务变化和现金成本'],
['subscription-failed','机场订阅失效怎么办：排查步骤','问题排查','遇到订阅更新失败的用户','订阅地址、客户端缓存、域名与服务状态'],
['airport-warning-signs','机场跑路前兆与风险识别方法','风险预警','担心服务突然停止的用户','公告、客服、支付、节点维护和异常促销'],
['speed-test-guide','机场测速怎么测才有参考价值','测速方法','希望客观比较多个机场的用户','测试环境、测速工具、时间段和记录方法'],
['bgp-transit-airport','BGP 中转机场是什么意思','线路知识','比较中转线路与专线的用户','入口调度、跨网质量和成本差异'],
['native-ip-airport','原生 IP 机场适合哪些用户','线路知识','需要流媒体与海外平台的用户','IP 归属、信誉、共享程度和地区一致性'],
['beginner-pitfalls','新手购买机场的十大避坑建议','选购指南','第一次接触机场订阅的用户','长期预付、虚假测速、客服与隐私风险']
];

const nav = `<header class="page-head"><div class="wrap nav-row"><a class="page-brand" href="../index.html"><span>评</span><b>评机场</b></a><button class="nav-toggle">栏目</button><nav class="page-nav"><a data-page="ranking" href="../index.html#ranking">机场排行</a><a data-page="recommend" href="../recommend.html">机场推荐</a><a data-page="faq" href="../faq.html">机场常见问题</a><a data-page="guide" href="../guide.html">机场使用指南</a><a data-page="tutorials" href="../tutorials.html">机场使用教程</a><a data-page="alerts" href="../alerts.html">机场跑路预警</a><a data-page="disclosure" href="../disclosure.html">返佣披露</a><a data-page="about" href="../about.html">关于我们</a></nav></div></header>`;

function articleParagraphs(title,audience,focus,keyword){
 return `
<p>围绕“${keyword}”搜索的读者，通常不是只想看一张测速截图，而是希望知道某项服务能否适配自己的设备、运营商、时间段与长期使用习惯。本文面向${audience}，重点讨论${focus}。由于机场线路、节点和套餐会持续变化，文章不会把任何品牌描述成永久稳定，也不会用单次测速代替长期体验。更合理的方法是先建立筛选条件，再用月付或短周期套餐完成验证。</p>
<h2 id="needs">一、先明确需求，而不是先看广告</h2>
<p>选择之前应列出每天大概使用多少流量、主要连接哪些地区、同时在线设备数量、是否需要视频会议、高清视频、AI 工具或海外游戏平台。轻度网页浏览与持续下载的需求完全不同，同样的套餐在不同人手中可能得出相反评价。若经常移动办公，还要分别测试家庭宽带、公司网络和手机热点，因为入口路由改变后，延迟与丢包也可能明显变化。</p>
<p>预算也不应只看月费。需要同时计算流量倍率、超额流量价格、节点是否限速、重置周期以及优惠码能否长期使用。有些看似便宜的方案流量倍率较高，实际可用流量并不充足；有些套餐价格略高，但提供更清楚的退款条款、维护公告和工单渠道。对于重要工作场景，透明度往往比几元差价更值得重视。</p>
<h2 id="line">二、理解线路名称与真实体验的差距</h2>
<p>IEPL、IPLC、BGP、中转、直连和原生 IP 都是常见描述，但名称本身不能证明质量。入口所在城市、接入运营商、跨网调度、出口负载和维护能力都会影响结果。即使两家服务都写着“专线”，晚高峰表现也可能不同；同一家服务在电信、联通和移动网络下，也可能出现不同体验。因此，判断${focus}时必须结合自己的本地网络。</p>
<p>节点数量同样不是越多越好。大量重复或长期不可用的节点并不能提升体验。更值得关注的是常用地区是否持续维护、节点命名是否清楚、故障是否有公告、订阅更新是否稳定。对于只使用日本、新加坡和美国节点的读者，稳定维护十几个常用节点，往往比展示上百个但状态不明的节点更实用。</p>
<h2 id="test">三、建立可重复的测试流程</h2>
<p>测试应固定设备、客户端版本、网络环境和时间段。建议在上午、晚高峰和周末分别记录延迟、抖动、丢包、下载速度、网页首次打开时间以及视频拖动后的恢复速度。不要同时开启多个测速任务，也不要只选择距离最近的节点。每次记录至少三个节点，并持续数天，才能减少偶然波动带来的误判。</p>
<p>与${keyword}相关的测试还应包含真实应用。例如需要 AI 工具，就测试登录、连续对话、文件上传和长时间保持连接；需要流媒体，就测试分区识别、清晰度提升速度和高峰期缓冲；需要远程办公，则重点观察会议通话、代码仓库、云文档和远程桌面。真实任务比测速数字更能反映是否适合。</p>
<div class="article-note">建议建立简单表格，记录日期、运营商、设备、客户端、节点、延迟、丢包、实际速度和异常情况。连续记录比单次截图更有价值。</div>
<h2 id="client">四、客户端与订阅安全</h2>
<p>客户端应从可信渠道获取，并确认是否仍在维护。导入订阅后，先检查配置中是否包含异常脚本、未知地址或不必要的权限。不要把包含身份信息的订阅地址提交到陌生转换网站，也不要在公开群组分享完整订阅链接。订阅一旦泄露，应尽快在服务商后台重置。</p>
<p>规则模式、全局模式和直连规则会影响测试结果。初次使用时可先按服务商文档导入，再检查 DNS、系统代理和策略组是否生效。出现无法连接时，不要反复购买新套餐，应依次检查系统时间、订阅是否过期、客户端内核、节点状态、本地防火墙和服务公告。</p>
<h2 id="risk">五、购买周期与风险控制</h2>
<p>首次购买优先月付。即使年付折扣很大，也应先完成至少一周的真实测试。服务可能因为上游线路、用户增长、政策、维护和支付渠道发生变化，长期预付会放大无法退款的风险。若页面只强调限时促销，却缺少服务条款、公告记录和联系方式，应保持谨慎。</p>
<p>常见风险信号包括：节点大面积离线且长期无公告、工单持续不回复、频繁更换域名、突然推出异常低价的多年套餐、停止维护客户端、删除历史公告或关闭交流群。单一信号不等于已经停止运营，但多个异常同时出现时，应暂停续费、备份必要信息并准备替代方案。</p>
<h2 id="compare">六、如何比较候选服务</h2>
<p>可以把候选服务放在同一张表中，对比月费、流量、倍率、线路、节点地区、设备限制、客户端、退款规则、客服渠道和最近更新时间。评分不必复杂，可按稳定性 35%、晚高峰 20%、实际应用 20%、价格 15%、透明度与售后 10% 进行记录。权重应按照自己的场景调整，而不是照搬别人的结论。</p>
<p>评机场当前将 EdgeNova 边缘节点作为主推选择，并把光年梯和极连云作为次推候选，但这只是筛选起点。读者仍应核对官网最新套餐，并在所在地完成测试。对于关键工作，可以同时准备主用和备用服务，避免单一节点故障影响全部任务。</p>
<h2 id="faq">七、常见问题</h2>
<h3>测速很快，为什么网页仍然卡顿？</h3><p>测速服务器距离、DNS、丢包、节点负载和目标网站路由都会产生影响。峰值速度高不代表连接质量稳定，应同时观察抖动、丢包和首次连接时间。</p>
<h3>优惠码是否意味着长期价格不变？</h3><p>不一定。优惠码可能有期限、适用套餐和续费条件，购买前应查看结算页与公告。本文出现的价格与优惠仅作记录，最终以官网为准。</p>
<h3>是否应该只选择排名第一的机场？</h3><p>不建议。排名反映统一维度下的综合比较，无法覆盖每个地区和运营商。最适合自己的服务，需要通过短周期购买和真实场景测试确认。</p>
<h2 id="checklist">八、可以直接照着执行的检查清单</h2>
<p>购买前先完成五项确认：第一，打开官网套餐页，记录月费、流量、倍率、设备数量和重置周期；第二，查看最近三个月公告，确认是否持续维护线路与客户端；第三，核对退款、试用和工单规则，避免只看推广页面；第四，确认常用系统是否有可靠客户端，以及订阅格式能否直接使用；第五，把准备购买的页面、优惠码和结算金额截图保存，方便后续核对。</p>
<p>购买后的第一天不要急于下结论。先更新订阅，测试三个常用地区节点，再分别记录网页、视频、下载和目标应用的表现。第二至第三天增加晚高峰测试，并切换一次本地网络，例如从宽带切换到手机热点。第七天汇总异常次数、客服响应和节点维护情况。如果连续出现高丢包、订阅无法更新或工单无回复，应在续费前重新评估。</p>
<p>决定续费时，可使用“是否满足主要场景、是否有清楚公告、是否存在备用节点、价格是否在预算内、风险是否可接受”五个问题复盘。只有多数答案明确为“是”，才考虑延长周期。即使体验良好，也不建议把所有预算放在同一家服务上。对于办公、学习或长期项目，主用与备用方案应分开，订阅地址和客户端配置也要定期备份。</p>
<h2 id="summary">九、总结</h2>
<p>${title}的核心不是寻找一句“绝对稳定”的承诺，而是建立可验证、可复查的选择流程。先明确需求，再理解线路与套餐，最后通过多个时间段和真实任务测试。保留月付、备用线路和风险意识，可以显著降低选择成本。本文会根据公开信息与实际页面变化持续更新，读者也应在购买前再次核对价格、节点、协议与退款规则。</p>`;
}

function header(title,category){return `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}｜评机场</title><meta name="description" content="${title}，评机场整理线路、套餐、测试方法与风险提示。"><link rel="stylesheet" href="../assets/pages.css"><link rel="stylesheet" href="../assets/seo-library.css"></head><body data-page="guide">${nav}<main class="page-main"><section class="page-hero"><div class="wrap"><span class="eyebrow">${category} · SEO ARTICLE</span><h1>${title}</h1><p>从实际需求、线路判断、测速方法、客户端兼容和购买风险五个方向展开，提供可执行的选择思路。</p><div class="meta"><span>约 2500 字</span><span>更新于 2026-10-14</span><span>评机场原创整理</span></div></div></section>`}

await mkdir(new URL('../articles/', import.meta.url),{recursive:true});
const cards=[];
for(const [slug,title,category,audience,focus] of topics){
 const body=articleParagraphs(title,audience,focus,title);
 const toc=`<aside class="article-toc"><strong>文章目录</strong><a href="#needs">明确需求</a><a href="#line">判断线路</a><a href="#test">测试流程</a><a href="#client">客户端安全</a><a href="#risk">风险控制</a><a href="#compare">候选比较</a><a href="#faq">常见问题</a><a href="#checklist">执行清单</a><a href="#summary">总结</a></aside>`;
 const html=`${header(title,category)}<section class="section"><div class="wrap article-shell"><article class="article-body">${body}<div class="article-links"><a href="../recommend.html">查看机场推荐</a><a href="../index.html#ranking">查看完整排行</a><a href="../faq.html">机场常见问题</a></div></article>${toc}</div></section></main><footer class="page-footer"><div class="wrap copyright">© 2026 评机场 · 内容仅供参考</div></footer><script src="../assets/pages.js"></script></body></html>`;
 await writeFile(new URL(`../articles/${slug}.html`,import.meta.url),html,'utf8');
 const plain=body.replace(/<[^>]+>/g,'').replace(/\s+/g,'');
 cards.push(`<article class="seo-card" data-category="${category}"><span class="category">${category}</span><h2>${title}</h2><p>面向${audience}，重点说明${focus}，并提供测试与风险控制步骤。</p><div class="card-meta"><span>${plain.length} 字</span><a href="articles/${slug}.html">阅读全文 →</a></div></article>`);
}

const homeNav=`<header class="page-head"><div class="wrap nav-row"><a class="page-brand" href="index.html"><span>评</span><b>评机场</b></a><button class="nav-toggle">栏目</button><nav class="page-nav"><a data-page="ranking" href="index.html#ranking">机场排行</a><a data-page="recommend" href="recommend.html">机场推荐</a><a data-page="faq" href="faq.html">机场常见问题</a><a data-page="guide" href="guide.html">机场使用指南</a><a data-page="tutorials" href="tutorials.html">机场使用教程</a><a data-page="alerts" href="alerts.html">机场跑路预警</a><a data-page="disclosure" href="disclosure.html">返佣披露</a><a data-page="about" href="about.html">关于我们</a></nav></div></header>`;
const categories=[...new Set(topics.map(t=>t[2]))];
const guide=`<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>机场使用指南文章库｜评机场</title><meta name="description" content="评机场使用指南，收录 30 个机场相关长尾关键词与深度指南文章。"><link rel="stylesheet" href="assets/pages.css"><link rel="stylesheet" href="assets/seo-library.css"></head><body data-page="guide">${homeNav}<main class="page-main"><section class="page-hero"><div class="wrap"><span class="eyebrow">AIRPORT GUIDE LIBRARY</span><h1>机场使用指南文章库</h1><p>围绕机场选择、线路知识、客户端教程、AI 工具、流媒体、测速与风险预警持续更新。当前已发布 30 篇约 2500 字的独立指南。</p><div class="meta"><span>30 个长尾主题</span><span>30 篇独立指南</span><span>持续更新</span></div></div></section><section class="section"><div class="wrap"><div class="seo-toolbar"><button class="active" data-filter="全部">全部</button>${categories.map(c=>`<button data-filter="${c}">${c}</button>`).join('')}</div><div class="seo-grid">${cards.join('')}</div></div></section></main><footer class="page-footer"><div class="wrap copyright">© 2026 评机场 · 机场使用指南持续更新</div></footer><script src="assets/pages.js"></script><script>const buttons=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('.seo-card')];buttons.forEach(button=>button.addEventListener('click',()=>{buttons.forEach(b=>b.classList.toggle('active',b===button));cards.forEach(card=>card.hidden=button.dataset.filter!=='全部'&&card.dataset.category!==button.dataset.filter)}));</script></body></html>`;
await writeFile(new URL('../guide.html',import.meta.url),guide,'utf8');
console.log(JSON.stringify({articles:topics.length,categories:categories.length}));
await import('./normalize-headers.mjs');

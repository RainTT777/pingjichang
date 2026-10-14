import {writeFile} from 'node:fs/promises';

const groups=[
{id:'buy',title:'机场选择与套餐购买',desc:'从需求、价格、流量、周期和售后判断套餐是否适合。',qs:[
'新手第一次应该如何选择机场？','价格越高的机场就一定越稳定吗？','为什么建议第一次优先购买月付套餐？','什么时候可以考虑购买年付套餐？','机场试用一般需要测试哪些内容？','购买前应该怎样查看退款规则？','如何判断套餐支持的设备数量是否够用？','机场套餐流量应该怎样估算？','节点流量倍率是什么意思？','不限速套餐真的完全不限速吗？','机场优惠码应该在什么位置填写？','低价套餐和标准套餐主要差在哪里？','新手应该选择多少节点的机场？','购买机场支持哪些常见付款方式？','如何避免套餐自动续费？','应该根据所在地区选择机场吗？','怎样判断机场客服是否可靠？','套餐价格和节点信息以哪里为准？','如何同时比较三家机场套餐？','什么样的机场更适合长期使用？']},
{id:'line',title:'线路、节点与网络知识',desc:'解释 IEPL、IPLC、BGP、中转、原生 IP 和节点质量。',qs:[
'IEPL 专线机场是什么意思？','IPLC 和 IEPL 专线有什么区别？','BGP 中转机场是什么意思？','直连机场和中转机场有什么区别？','原生 IP 节点有什么用途？','住宅 IP 和机房 IP 有什么区别？','ASN 信息为什么会影响节点判断？','香港、日本、新加坡和美国节点怎么选？','节点延迟越低就一定越好吗？','网络抖动会造成什么影响？','机场节点丢包多少算严重？','节点倍率为什么有 1 倍和 2 倍？','机场节点数量越多越好吗？','怎样判断节点是否负载过高？','为什么晚高峰节点容易变慢？','电信、联通和移动应该选不同入口吗？','游戏节点为什么需要关注 UDP？','机场支持 IPv6 有什么作用？','DNS 和节点地区不一致会怎样？','为什么同一节点不同用户体验不同？']},
{id:'client',title:'客户端、订阅与配置',desc:'覆盖 Clash、Mihomo、Shadowrocket、sing-box 和多平台配置。',qs:[
'Clash 和 Mihomo 客户端有什么关系？','Shadowrocket 小火箭适合哪些设备？','sing-box 客户端有什么特点？','Windows 应该选择什么机场客户端？','macOS 应该选择什么机场客户端？','Android 如何导入机场订阅？','iPhone 如何添加小火箭订阅？','Linux 系统可以使用机场订阅吗？','路由器可以直接导入机场订阅吗？','机场订阅链接应该怎样导入？','订阅节点列表多久更新一次？','订阅转换工具是否安全？','订阅链接泄露后应该怎么办？','策略组应该选择自动还是手动？','规则模式和全局模式有什么区别？','TUN 模式什么时候需要开启？','系统代理开启后为什么部分软件无效？','客户端 DNS 应该怎样设置？','同一个订阅可以在多个设备使用吗？','如何备份客户端配置和订阅？']},
{id:'test',title:'测速、故障与问题排查',desc:'建立可复现的测速流程，并处理无法连接、超时和更新失败。',qs:[
'机场测速应该重点看哪些指标？','Ping 延迟应该怎样正确测试？','怎样测试节点的实际丢包率？','网络抖动应该使用什么方法测试？','晚高峰测速应该选择什么时间？','测速服务器应该怎样选择？','Fast.com 和 Speedtest 测速有什么区别？','为什么测速很快但网页仍然打开很慢？','怎样使用真实应用测试机场节点？','节点显示可用但无法连接怎么办？','机场订阅更新失败应该怎样排查？','连接节点一直超时是什么原因？','DNS 错误导致无法访问网站怎么办？','为什么浏览器能用但其他软件不能用？','为什么客户端能连接但系统没有网络？','Wi-Fi 可用但手机流量无法连接怎么办？','所有节点突然变红应该先检查什么？','机场连接频繁断开怎样处理？','客户端更新后速度变慢怎么办？','如何查看客户端日志定位问题？']},
{id:'media-ai',title:'流媒体、AI 工具与平台访问',desc:'讨论 ChatGPT、Claude、Gemini、TikTok 和流媒体的地区及 IP 问题。',qs:[
'什么样的机场节点更适合 ChatGPT？','Claude 提示地区不支持应该怎么办？','Gemini 无法使用可能是什么原因？','TikTok 运营为什么重视原生 IP？','Netflix 节点应该怎样测试解锁？','Disney+ 无法播放应该检查什么？','YouTube 画质上不去是什么原因？','Spotify 显示地区错误怎么办？','AI 工具为什么会频繁要求验证？','节点切换会影响 AI 账号安全吗？','ChatGPT 文件上传失败和节点有关吗？','API 可以访问但网页不能访问为什么？','流媒体解锁成功但播放卡顿怎么办？','电视端和手机端解锁结果为什么不同？','怎样确认 Netflix 内容分区？','流媒体节点会永久保持解锁吗？','Google 账号地区和节点地区需要一致吗？','Microsoft Copilot 无法使用怎么办？','Midjourney 使用机场节点需要注意什么？','使用 AI 工具时应该固定节点吗？']},
{id:'risk',title:'安全、退款与跑路风险',desc:'识别失联、异常促销、隐私泄露和返佣内容中的风险。',qs:[
'机场跑路前通常有哪些异常信号？','机场频繁更换域名是否意味着不安全？','机场突然关闭支付通道应该怎么办？','客服长期不回复时应该如何处理？','节点大面积离线多久需要警惕？','机场突然推出超低价年付套餐可靠吗？','申请退款前应该保存哪些证据？','机场拒绝退款时还可以做什么？','为什么需要保存订单和套餐截图？','机场会记录用户访问内容吗？','免费机场节点有哪些安全风险？','把机场账号分享给别人有什么风险？','订阅链接泄露会造成什么后果？','机场后台密码应该如何设置？','机场账号是否需要开启双重验证？','使用机场 VPN 需要遵守哪些规则？','网站中的推广链接会影响排名吗？','怎样判断机场评测信息是否过期？','发现机场异常应该怎样向本站反馈？','为什么重要场景需要准备备用机场？']}
];

const rules=[
[/新手|第一次/,q=>'先明确设备、流量、常用地区和主要用途，再选月付套餐。不要因为节点数量或限时折扣直接年付，购买后至少覆盖晚高峰、周末和常用应用完成测试。'],
[/价格越高/,q=>'不一定。价格包含线路成本、流量、售后和运营投入，但体验仍受所在地、运营商、节点负载和维护能力影响。价格只能作为比较维度之一。'],
[/月付/,q=>'月付可以降低服务变化、线路波动和退款困难带来的损失。连续稳定使用两到三个月后，再比较季度或年付折扣是否值得。'],
[/年付/,q=>'只有在已经连续使用、公告透明、售后正常且折扣足以覆盖风险时才考虑年付。投入金额应限制在即使服务变化也能承受的范围。'],
[/退款/,q=>'购买前查看退款期限、已用流量扣除方式、特殊套餐限制和申请渠道。需要退款时保存订单、结算页面、服务异常记录和工单沟通。'],
[/设备|多个设备/,q=>'先区分“允许登录的设备数量”和“同时在线连接数”。家庭使用还要确认是否允许路由器、是否禁止账号共享，以及所有设备共用的总流量。'],
[/流量|倍率/,q=>'按视频、下载、AI 文件和多设备使用估算月流量。倍率表示使用某些节点时扣除更多套餐流量，例如 2 倍节点使用 1GB 可能扣除 2GB。'],
[/不限速/,q=>'通常表示套餐没有写死速度上限，不代表任何时间都能跑满本地带宽。入口容量、节点负载、目标服务器和公平使用规则仍会限制实际速度。'],
[/优惠码/,q=>'一般在注册、创建订单或结算页面填写。提交付款前应确认优惠已生效、续费是否继续有效，并保存最终金额截图。'],
[/客服/,q=>'可查看工单入口、公告更新频率、故障说明和历史回复。购买前提出一个具体问题，观察回复速度与内容是否清楚，比只看群聊人数更可靠。'],
[/IEPL/,q=>'IEPL 通常指以太网专线传输的一段线路，但用户到入口和出口到目标网站仍可能经过其他网络。判断时要结合入口、容量、晚高峰和实际路由。'],
[/IPLC/,q=>'IPLC 常用于描述国际私有租用线路，IEPL 更强调以太网专线交付。市场名称并不统一，不能只凭标签判断质量，应以路由、测试和维护记录为准。'],
[/BGP/,q=>'BGP 中转通过多运营商路由选择改善用户到入口的路径。它解决的主要是入口调度问题，不代表后续跨境段一定使用专线。'],
[/直连|中转/,q=>'直连通常从本地网络直接前往出口，中转则先连接优化入口再转发。直连成本较低但易受跨网影响，中转体验取决于入口质量和后续线路。'],
[/原生 IP|住宅 IP|机房 IP|ASN/,q=>'应通过多个数据库核对 IP 归属、ASN、用途和地区。原生或住宅标签不保证永久解锁，平台还会根据共享程度、信誉和账号行为判断。'],
[/香港|日本|新加坡|美国/,q=>'优先考虑与目标服务地区、物理距离和实际路由匹配的节点。距离近通常有利于延迟，但美国等远端节点可能更适合特定内容或 AI 服务。'],
[/延迟|Ping/,q=>'延迟应在相同设备和网络下连续测试，并同时观察抖动和丢包。一次最低值没有代表性，真实应用的持续响应比单次 Ping 更重要。'],
[/抖动/,q=>'抖动是延迟的波动幅度，会直接影响语音、视频会议和游戏。应连续采样而不是只看平均值，波动频繁时即使平均延迟不高也可能卡顿。'],
[/丢包/,q=>'持续丢包会造成重传、画面卡顿和连接中断。偶发单个丢包需复测；若多个节点在不同时间持续丢包，应同时排查本地网络和服务状态。'],
[/节点数量/,q=>'节点多不等于质量高。更应关注常用地区是否持续维护、故障是否有公告、节点命名是否清楚，以及晚高峰是否可用。'],
[/负载|晚高峰/,q=>'晚间用户集中上线最能暴露容量不足。建议在 20:00 至 23:00 连续多天测试速度、丢包和真实应用，并与白天结果比较。'],
[/电信|联通|移动/,q=>'三家运营商到不同入口的路由可能完全不同。应优先测试与自己本地运营商匹配的入口，并准备一个不同入口作为备用。'],
[/UDP|游戏/,q=>'游戏和部分通话依赖 UDP。需要确认节点和客户端支持 UDP 转发，并在真实对局中观察抖动、丢包和 NAT 情况。'],
[/IPv6/,q=>'IPv6 可以改善部分网络的直连能力，但若客户端、DNS 或节点配置不完整，也可能造成泄漏或访问异常。开启前应确认整条链路支持。'],
[/DNS/,q=>'DNS 决定域名解析结果，也可能影响 CDN 和地区判断。出现异常时可对比系统 DNS、客户端 DNS 与节点出口地区，并避免同时启用多个冲突方案。'],
[/Clash|Mihomo/,q=>'Mihomo 是常见的 Clash 兼容内核之一。应选择仍在维护、来源可信的客户端，导入订阅后检查策略组、DNS、系统代理和更新功能。'],
[/Shadowrocket|小火箭|iPhone/,q=>'Shadowrocket 主要用于 iOS 和 iPadOS。通过可信渠道安装，导入订阅后分别测试 Wi-Fi 与蜂窝网络，并避免导入来源不明的模块。'],
[/sing-box/,q=>'sing-box 支持多种协议和平台，配置能力较强。新手应优先使用可信图形客户端或服务商文档，避免直接复制不理解的复杂配置。'],
[/Windows|macOS|Android|Linux|路由器/,q=>'选择与系统版本和芯片架构兼容、仍在维护的客户端。路由器部署还要确认固件性能、协议支持和家庭成员的流量需求。'],
[/订阅链接|订阅节点|订阅转换|订阅更新/,q=>'订阅地址相当于访问凭证，不应上传到陌生转换网站或公开分享。更新失败时先检查到期时间、地址、客户端缓存、网络和服务公告。'],
[/策略组|规则模式|全局模式|TUN|系统代理/,q=>'这些设置决定哪些应用和流量进入节点。排查时一次只改变一个选项，并分别验证浏览器、系统应用和命令行，避免多个代理同时运行。'],
[/备份/,q=>'保存客户端配置、订阅来源、套餐信息和必要的规则说明，但不要把完整订阅上传到公共网盘。备份应加密并限制访问。'],
[/测速|Fast.com|Speedtest|测速服务器/,q=>'固定设备、网络、时间和测试服务器，每项至少执行三次并记录中位数。Fast.com 更接近 Netflix 链路，Speedtest 适合选择不同服务器进行通用带宽比较。'],
[/网页.*慢|真实应用/,q=>'测速服务器与目标网站的路由可能不同。还应测试网页首次连接、视频拖动、文件上传、会议和目标 AI 服务，才能判断真实体验。'],
[/无法连接|超时|变红|断开|没有网络|速度变慢/,q=>'先判断是单节点、单客户端、单网络还是全部故障，再依次检查订阅有效期、系统时间、DNS、代理模式、本地防火墙和服务公告。'],
[/日志/,q=>'日志中的连接目标、错误代码、DNS 失败和超时信息可帮助定位层级。分享日志前要删除订阅地址、账号和其他敏感信息。'],
[/ChatGPT/,q=>'选择服务支持地区、信誉较好且连接稳定的节点。测试不能只打开首页，还要验证登录、连续对话、文件上传和长会话。'],
[/Claude/,q=>'先核对 Claude 支持地区，再保持账号、出口和会话地区相对一致。频繁跨国切换或使用高风险共享 IP 可能触发验证。'],
[/Gemini|Google 账号/,q=>'检查 Google 账号地区、节点出口和 DNS 是否一致。网页、API 和不同产品的开放范围可能不同，应分别验证。'],
[/TikTok/,q=>'平台会综合 IP、SIM、语言、时区和行为判断地区。原生 IP 只是其中一项，运营账号应尽量固定环境并避免频繁跨区。'],
[/Netflix|Disney|YouTube|Spotify|流媒体/,q=>'先确认内容分区是否正确，再测试持续码率、拖动恢复和晚高峰表现。手机、电视和浏览器可能因缓存与 DNS 得到不同结果。'],
[/验证|账号安全|固定节点/,q=>'频繁改变国家、IP 和设备环境会增加验证概率。常用账号应固定一个可靠地区，异常时不要连续快速切换多个节点。'],
[/API/,q=>'API 与网页可能使用不同域名、权限和地区规则。应分别检查 DNS、令牌权限、出口地区、错误代码和服务端状态。'],
[/跑路|更换域名|关闭支付|不回复|离线|超低价/,q=>'单一现象不足以下结论。应结合公告、节点范围、工单、支付状态和持续时间交叉确认；多项异常同时出现时暂停续费并准备备用方案。'],
[/证据|订单|截图/,q=>'保存订单编号、付款金额、套餐页面、退款条款、公告和工单沟通。记录应包含日期，且不要公开包含个人信息或完整订阅的截图。'],
[/隐私|访问内容|免费机场|分享|泄露|密码|双重验证/,q=>'使用强密码并避免复用，订阅泄露后及时重置。免费和共享服务缺少透明运营成本，重要账号和敏感业务不应依赖来源不明的节点。'],
[/规则|法律/,q=>'应遵守所在地法律法规、平台条款、校园或公司网络政策。本站内容用于技术学习与产品比较，不代表对任何用途作出授权。'],
[/推广链接|排名/,q=>'推广链接可能为本站带来佣金，因此需要明确披露。排名应以线路、稳定性、价格透明度和风险记录为依据，而不能只由返佣决定。'],
[/过期|反馈/,q=>'查看页面更新时间，并与服务商官网公告交叉核对。发现价格、域名或状态变化时，可附上公开来源和日期进行反馈。'],
[/备用机场/,q=>'任何线路都可能维护或故障。重要办公和学习场景应准备不同入口或不同服务商的备用方案，并定期验证仍然可用。']
];
function answer(group,q){for(const [re,fn] of rules)if(re.test(q))return fn(q);return `${group.desc}针对“${q}”，建议先核对服务商最新说明，再在自己的运营商、设备和常用时间段完成实际测试。不要依赖单次测速或绝对化宣传，重要场景应保留备用方案。`}
function header(){const item=(k,h,l)=>`<a data-page="${k}" href="${h}">${l}</a>`;return `<header class="global-head"><div class="global-nav-wrap"><a class="global-brand" href="index.html"><span>评</span><b>评机场<small>PING JI CHANG</small></b></a><button class="global-toggle" aria-expanded="false">栏目</button><nav class="global-nav">${item('ranking','index.html#ranking','机场排行')}${item('recommend','recommend.html','机场推荐')}${item('faq','faq.html','机场常见问题')}${item('guide','guide.html','机场使用指南')}${item('tutorials','tutorials.html','机场使用教程')}${item('alerts','alerts.html','机场跑路预警')}${item('disclosure','disclosure.html','返佣披露')}${item('about','about.html','关于我们')}</nav><a class="global-cta" href="recommend.html">查看推荐</a></div></header>`}
const items=groups.flatMap((g,gi)=>g.qs.map((q,qi)=>({g,gi,qi,q,a:answer(g,q)})));
const groupHtml=groups.map((g,gi)=>`<section class="faq-group" id="group-${g.id}" data-group="${g.id}"><header class="faq-group-head"><div><span>GROUP ${String(gi+1).padStart(2,'0')}</span><h2>${g.title}</h2></div><b>20 个问题</b></header><div class="faq-items">${g.qs.map(q=>{const it=items.find(x=>x.g===g&&x.q===q);return `<details class="faq-item" data-group="${g.id}" data-search="${q} ${it.a}"><summary>${q}</summary><div class="faq-answer">${it.a}</div></details>`}).join('')}</div></section>`).join('');
const tabs=`<button class="active" data-faq-filter="all">全部 120</button>${groups.map(g=>`<button data-faq-filter="${g.id}">${g.title}</button>`).join('')}`;
const jsonLd=JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:items.map(x=>({'@type':'Question',name:x.q,acceptedAnswer:{'@type':'Answer',text:x.a}}))});
const html=`<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>机场 VPN 常见问题大全｜评机场</title><meta name="description" content="120 个机场 VPN 常见问题，分为选择购买、线路节点、客户端配置、测速排障、流媒体 AI 和安全风险六组。"><link rel="stylesheet" href="assets/pages.css"><link rel="stylesheet" href="assets/header.css"><link rel="stylesheet" href="assets/faq-library.css"><script type="application/ld+json">${jsonLd}</script></head><body data-page="faq">${header()}<main class="page-main"><section class="page-hero"><div class="wrap"><span class="eyebrow">AIRPORT VPN FAQ KNOWLEDGE BASE</span><h1>机场 VPN 常见问题大全</h1><p>共 6 个分组、120 个问题，覆盖机场选择、套餐、线路、节点、客户端、订阅、测速、流媒体、AI 工具和运营风险。</p><div class="meta"><span>6 个知识分组</span><span>120 个 FAQ</span><span>支持实时搜索</span></div></div></section><section class="section"><div class="wrap"><div class="faq-search-panel"><div class="faq-search-row"><input id="faq-search" type="search" placeholder="搜索问题或答案，例如：IEPL、Clash、ChatGPT、退款……" autocomplete="off"><button id="faq-clear" type="button">清空</button></div><div class="faq-result-meta" id="faq-result">当前显示全部 120 个问题</div></div><div class="faq-tabs">${tabs}</div><div id="faq-groups">${groupHtml}</div><div class="faq-empty" id="faq-empty">没有找到相关问题，请尝试更短的关键词。</div></div></section></main><footer class="page-footer"><div class="wrap copyright">© 2026 评机场 · FAQ 持续更新</div></footer><script src="assets/pages.js"></script><script>const input=document.querySelector('#faq-search'),clear=document.querySelector('#faq-clear'),result=document.querySelector('#faq-result'),empty=document.querySelector('#faq-empty'),tabs=[...document.querySelectorAll('[data-faq-filter]')],groups=[...document.querySelectorAll('.faq-group')],faqs=[...document.querySelectorAll('.faq-item')];let active='all';function update(){const key=input.value.trim().toLowerCase();let count=0;groups.forEach(group=>{let groupCount=0;group.querySelectorAll('.faq-item').forEach(item=>{const matchGroup=active==='all'||item.dataset.group===active;const matchText=!key||item.dataset.search.toLowerCase().includes(key);item.hidden=!(matchGroup&&matchText);if(!item.hidden){count++;groupCount++}});group.hidden=groupCount===0});result.textContent=key||active!=='all'?'找到 '+count+' 个相关问题':'当前显示全部 120 个问题';empty.style.display=count?'none':'block'}input.addEventListener('input',update);clear.addEventListener('click',()=>{input.value='';active='all';tabs.forEach((b,i)=>b.classList.toggle('active',i===0));update();input.focus()});tabs.forEach(button=>button.addEventListener('click',()=>{active=button.dataset.faqFilter;tabs.forEach(b=>b.classList.toggle('active',b===button));update()}));</script></body></html>`;
await writeFile(new URL('../faq.html',import.meta.url),html,'utf8');
console.log(JSON.stringify({groups:groups.length,questions:items.length}));

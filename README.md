# 评机场

基于 Astro、TypeScript、Markdown Content Collections 的中文机场评测静态博客。当前全部文章与测试均为“演示数据”，不会构成真实推荐。

## 本地运行

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## Cloudflare Pages

连接 Git 仓库，构建命令使用 `npm run build`，输出目录使用 `dist`，Node.js 版本建议 20。绑定 `pingjichang.com` 后在 DNS 中添加 Cloudflare Pages 提供的记录。

## 扩展

评分和机场类型已集中在 `src/content/config.ts`，后续可替换为 JSON/SQLite、自动测速、评分曲线和后台管理。

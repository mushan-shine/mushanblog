---
title: "开始写作：这个博客怎么发新文章"
desc: "记录一下这个站点的文章发布流程，也当作第一篇示例文章。"
date: "2026-07-09"
---

## 为什么写这篇

这是 `content/columns/business/` 目录下的一篇文章。它的作用是验证整套 Markdown 发布流程能不能跑通。

## 发新文章的三步

1. 在 `content/columns/<栏目>/` 里新建一个 `.md` 文件，文件名用日期加英文短标题，比如 `2026-07-09-hello-world.md`。
2. 文件顶部写好 frontmatter（标题、分类、摘要、日期），下面正文用 Markdown 写。
3. `git add . && git commit -m "新文章" && git push`，Vercel 自动上线。

## Markdown 能写什么

支持**加粗**、*斜体*、[链接](https://mushanblog.vercel.app)、列表、引用等常见格式：

> 写作是把模糊的想法逼成清晰句子的过程。

```
代码块也支持。
```

栏目分为技术学习、业务思考、商业价值。技术学习下还有细分标签（服务器/云计算/大模型/网络/存储），填 frontmatter 的 `subtag` 时用其中之一，列表页的筛选按钮就能对上；其它栏目暂不需要 `subtag`。

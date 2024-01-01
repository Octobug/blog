---
date: 2024-01-01
spot: 宝安图书馆
sort: Computer Science
tags:
  - Blog
  - VitePress
---

# 基于 VitePress 开发博客主题

![Vaquita Porpoises](./vaquita.jpg "A public domain image. [**Paula Olson**](https://www.fisheries.noaa.gov/contact/paula-olson). [*commons.wikimedia.org*](https://commons.wikimedia.org/wiki/File:Vaquita6_Olson_NOAA.jpg).")

前两天完成了这个博客的最后一个功能 (Atom Feed)。本来打算在 2023 年最后一天写一篇总结，但刚好有朋友邀约去爬大南山 [[1]]，所以推迟到新年的第一天。对于爬山我的态度很明确，不愿爬，不怕爬，必要时不得不爬：

![View from the Top](./view-from-the-top-of-nanshan.jpg "请欣赏二〇二三年最后一天深圳市南山区~~最美丽~~的风景")

言归正传，这篇总结主要列举基于 VitePress 做一个博客主题需要解决的问题。我还没系统地学过 Vite、Vue 和 TypeScript，所以注定有些代码实现不是最佳实践。目前写文章是我的第一需要，也许等到下个阶段我会抽出时间来重构。

## 开发环境

- Node.js & VS Code: [Octobug/blog - Contributing Guide](https://github.com/Octobug/blog/blob/main/.github/contributing.md)
- Git Hooks
  - [typicode/husky](https://github.com/typicode/husky)
  - [lint-staged/lint-staged](https://github.com/lint-staged/lint-staged)
- Linters
  - [eslint/eslint](https://github.com/eslint/eslint)
  - [igorshubovych/markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli)

## 自定义 VitePress 主题

VitePress 的官方文档相当详细，对于新手直接按顺序阅读 [Guide](https://vitepress.dev/guide/getting-started) 部分即可，需要查阅接口信息时往往可以通过搜索进入 [Reference](https://vitepress.dev/reference/site-config) 部分。

写代码扩展 VitePress 功能时需要注意两个概念：“构建时 (Build-Time)”和“运行时 (Runtime)”。这两个概念最根本的区别是其执行环境：

- 构建时：本地 Node.js 提供的运行、构建环境
- 运行时：构建打包后的代码运行于浏览器环境

更细致的区别是由 VitePress 的生命周期决定的，但目前官方文档没有详细介绍其生命周期。不过有时候理解错了也能通过报错来区分出是哪个阶段的问题。

### 自定义 CSS

- 自定义 CSS 直接参考：[Extending the Default Theme - Customizing CSS](https://vitepress.dev/guide/extending-default-theme#customizing-css)
- 颜色建议使用 VitePress 预定义的变量名，后续想改变颜色只需要覆盖默认的变量值：[src/client/theme-default/styles/vars.css](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css)

⚠️ 在 `<style module></style>`（即打开 `module` 模式）中，嵌套的 CSS 似乎不兼容 Safari 浏览器。

### 页面布局

VitePress 的 Markdown 文件有几个类型，通过 `frontmatter` 中的 `layout` 指定，比如 `layout: home`、`layout: page`。

自定义布局主要参考这几个部分：

- [Using a Custom Theme - Building a Layout](https://vitepress.dev/guide/custom-theme#building-a-layout)
- Extending the Default Theme
  - [Registering Global Components](https://vitepress.dev/guide/extending-default-theme#registering-global-components)
  - [Layout Slots](https://vitepress.dev/guide/extending-default-theme#layout-slots)

当你用 Vue 组件自行实现了某个页面，可以根据 "Registering Global Components" 将其注册为全局组件。这样就可以在 Markdown 页面（区别于作为文章的 Markdown）中使用这个页面组件，避免在自定义 Layout 时混杂太多不同页面的实现。详情请看：[blog/.vitepress/theme/pages](https://github.com/Octobug/blog/tree/main/.vitepress/theme/pages)

### SSR 兼容性

构建生成的静态网站中，如果存在动态内容的页面（比如在页面上显示时间），浏览器 console 会报如下错误：

:::danger
Hydration completed but contains mismatches.
:::

这种情况可以使用 `<ClientOnly><NonSSRFriendlyComponent /></ClientOnly>` 将动态部分包裹起来：[SSR Compatibility - `<ClientOnly>`](https://vitepress.dev/guide/ssr-compat#clientonly)

## 常见的博客功能

### 归档，分类与标签

### Markdown 文章

#### 文章要素

我在每篇文章的标题下方加了时间、地点和文章长度（阅读时长）三个要素。

文章标题和正文在 VitePress 中是一个 `<Content />` 整体，不可拆分。要在文章标题下方插入其他 HTML 元素有几个方案：

1. **在每篇 Markdown 文章中插入全局注册的 Vue 组件**：这个方案对于后续写文章来说过于繁琐 ❌
2. **使用 frontmatter title，而不使用 Markdown 一级标题**：VitePress 为文章建立索引时将段落和其前面最近的一个标题归入同个 section，如果不使用 Markdown 一级标题，会导致第一个标题前面的内容不被索引而搜索不到 ❌
   - [src/node/plugins/localSearchPlugin.ts](https://github.com/vuejs/vitepress/blob/27f60e0b7784603c6fb300bd8dce64515eb98962/src/node/plugins/localSearchPlugin.ts#L226C35-L226C35)
   - 这一点我不认为是 bug，因为规范的 Markdown 就是要有一个 `# 一级标题`。
3. **通过 VitePress 的 markdown-it 接口写类插件代码**：[markdown-it API](https://markdown-it.github.io/markdown-it/) 挺复杂的，而且需要想办法将 frontmatter 中的信息传递给插件代码 ❌
   - [Markdown Extensions - Advanced Configuration](https://vitepress.dev/guide/markdown#advanced-configuration)
4. **使用 JavaScript 操作 DOM 元素**：先将 Vue 组件放在 Layout 的 doc slots 里面，再用 JS 把渲染后的 DOM 元素搬运到标题之下。这个方案很丑陋，但似乎是这几个方案里面最好的一个。

#### 图片注解

#### 图片文件

对于部署在 GitHub Pages、Netlify 这些免费托管平台上的静态网站来说，图片文件如果太大十分影响用户体验，如果每次都要手动用 Photoshop 之类的软件处理图片大小会很繁琐。macOS 系统用户可以用 `sips` 命令来处理，比使用 GUI 软件快捷很多。比如将一张图的长边分辨率转成 `1080`：

```sh
sips -Z 1080 origin.jpg -o resized.jpg
```

神奇的是，`sips` 压缩图片大小的效果特别好。在生成同样大小的图片时，`sips` 保留原图视觉效果的能力比 Photoshop 还强。

### 中文搜索

VitePress 自带全文搜索：[Search - Local Search](https://vitepress.dev/reference/default-theme-search#local-search)，这个搜索是通过 [lucaong/minisearch](https://github.com/lucaong/minisearch/) 实现的。

不幸的是，minisearch 默认不支持中文分词，所以中文搜索效果很差。要实现比较好的中文搜索，需要自行实现 minisearch 的 `tokenize` 函数：[Issue: how to correctly search for phone numbers](https://github.com/lucaong/minisearch/issues/130#issuecomment-1046658483)。

在 [Issue: Excuse me, how to support other language search, such as Chinese search, thank you](https://github.com/lucaong/minisearch/issues/201) 中，有人推荐使用 [yanyiwu/nodejieba](https://github.com/yanyiwu/nodejieba) 和 [`Intl.Segmenter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter) 做中文分词。其中 nodejieba 似乎不支持浏览器端运行，目前没找到在 VitePress 中使用它的方案。`Intl.Segmenter` 目前还没有被 Firefox 支持，且移动端的分词效果也一般。

由于 `Intl.Segmenter` 是我目前找到的唯一可行的方案，所以最终还是采用了它。详情请看：[blog/.vitepress/theme/search.ts](https://github.com/Octobug/blog/blob/main/.vitepress/theme/search.ts)

### 订阅流

---

以上大部分功能是在最近三个月内抽空零散地实现，如果集中在一起高强度开发大概是 1~2 周的工作量。在时间上拆得这么分散的原因是，大部分功能点是慢慢思考到我觉得能接受才开始动手。

这个博客还有一些计划中的页面没实现，不过它们不属于典型的博客功能。本文到此结束。

---

:::details Vaquita Porpoise
w:::

## References

1. [大南山 (深圳)][1]. *zh.wikipedia.org*.

[1]: <https://zh.wikipedia.org/zh-cn/大南山_(深圳)>

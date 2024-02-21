---
date: 2020-01-12
spot: 大冲新城花园
sort: Computer Science
tags:
  - RFC
  - IETF
  - JWT
  - Network
  - Internet
draft: true
---

# 跟着 How to Read an RFC 读 RFC7519

:::info `:(`

这篇本来是朋友 `@Shady` 和我共同翻译的译文。后来才注意到作者网站上并没有明确的版权许可信息，所以就先将译文撤掉了。

我尝试写邮件询问作者是否允许我将译文公开发布，但是没有回音。所以改为发布重新整理的笔记。

- [How to Read an RFC](https://www.mnot.net/blog/2018/07/31/read_rfc)
- [mnot’s blog (Mark Nottingham)](https://www.mnot.net/)

:::

[rfc7519]: https://datatracker.ietf.org/doc/rfc7519/

读 *How to Read an RFC* 这篇文章缘起于阅读 [RFC7519: JSON Web Token (JWT)][rfc7519]——对新手来说，尤其是对非英语母语者来说，阅读 RFC 文档是挺痛苦的一件事。

## 从哪儿开始？

几个常用的查阅 RFC 的网站：

- [datatracker.ietf.org](https://datatracker.ietf.org/)
- [rfc-editor.org](https://www.rfc-editor.org/)
- [httpwg.org](https://httpwg.org/specs/)：由 HTTP 工作组（HTTP Working Group）维护的与 HTTP 相关的 RFC 列表
- [greenbytes.de](https://greenbytes.de/tech/webdav/)：与 WebDAV (Web-based Distributed Authoring and Versioning)[^wiki_webdav] 相关的 RFC 列表
- tools.ietf.org
  - 2024.02.17 更新：tools.ietf.org 会跳转到 [authors.ietf.org](https://authors.ietf.org/)；原本 tools 的部分功能的新页面为 [author-tools.ietf.org](https://author-tools.ietf.org/)。
- everyrfc.org
  - 2024.02.17 更新：域名已过期

[^wiki_webdav]: [WebDAV](https://zh.wikipedia.org/zh-cn/WebDAV)

## RFC7519 属于哪一类？

RFC7519 的顶部标注如下：

```txt
Internet Engineering Task Force (IETF)                          M. Jones
Request for Comments: 7519                                     Microsoft
Category: Standards Track                                     J. Bradley
ISSN: 2070-1721                                            Ping Identity
                                                             N. Sakimura
                                                                     NRI
                                                                May 2015
```

- **"Internet Engineering Task Force (IETF)"**：互联网工程任务组。表明这是由 IETF 组织制定的标准。
  - 除了 IETF，还有其他独立提交渠道[^indepent_stream]。
  - 只有经由 IETF 发表的文稿，才表明该协议规范已经过 IETF 组织审核并做出共识声明。
  - 大约在 RFC5705 之前，这一项写的是 "Network Working Group"。
- **"Request for Comments: 7519"**：“请求意见稿”编号。
  - 如果写的是 "Internet-Draft"（互联网草案），则说明它不是 RFC 而只是一个提议，最终不一定会被 IETF 采用。
  - ***任何人***都可以写一个 Internet-Draft[^datatracker]。
- **"Category: Standards Track"**：类别为 Standards Track。
  - 一共有以下几类：
    - **Standards Track**：标准记录
    - **Informational**：报告性的
    - **Experimental**：实验性的
    - **Best Current Practice**：当前最佳实践
  - 它们之间的区别有时是模糊的，如果是 IETF 产出的则表明该文稿已经过合理的评审。
- **"ISSN: 2070-1721"**：RFC 系列文稿的 ISSN (International Standard Serial Number) 编号[^wiki_issn][^issn_rfc]。
- **标注右侧**是文档的作者以及日期。
  - 此处不会列出完整的贡献者名单。通常，完整名单写在“致谢”部分的末尾。

[^indepent_stream]: [Independent Submissions](https://www.rfc-editor.org/about/independent/)
[^datatracker]: [Internet-Draft submission](https://datatracker.ietf.org/submit/)
[^wiki_issn]: [ISSN](https://en.wikipedia.org/wiki/ISSN)
[^issn_rfc]: [The RFC Series (ISSN 2070-1721)](https://portal.issn.org/resource/ISSN/2070-1721)

## RFC7519 是最新版本吗？

[^diff_7158_7159]: [Diff between RFC 7158 and RFC 7159](https://author-tools.ietf.org/iddiff?url1=rfc7158&url2=rfc7159)

RFC 是系列文档的存档，一经发布就不会改变。如果出现错误则会发布新版本更正（或更新勘误表），而不是修改原文档。因此，确保看到的是最新的、有效的文档很重要。

- 比如 RFC7158 和 RFC7159 之间的差异仅仅是前者搞错了年份[^diff_7158_7159]。

在 [RFC7519: JSON Web Token (JWT)][rfc7519] 页面中，可以看到：

> Updated by [RFC 8725](https://datatracker.ietf.org/doc/rfc8725/), [RFC 7797](https://datatracker.ietf.org/doc/rfc7797/)

这表明 RFC7519 中有部分内容被 RFC8725 与 RFC7797 更新了。相应地，在 RFC8725 中的这部分内容则是：

> Updates [RFC 7519][rfc7519]

表明它更新了 RFC7519 中的内容。除了 "Updates"（被更新的文档写的是 "Updated by"），还有 "Obsoletes"（被废弃的文档写的是 "Obsoleted by"）。

- 需要注意的是，新版本的协议不一定会淘汰旧版本的协议。
  - 例如 HTTP/2 不会替代 HTTP/1.1，因为它仍然是旧协议的有效规范。
  - 而 RFC7230 淘汰了 RFC2616，因为它是该协议 (HTTP/1.1) 新的标准。
- 有些 RFC 文档的状态栏中还标有 **"Errata"（勘误）**。
  - 勘误是在没必要发布新 RFC 文件时对相应文档的更正和澄清。

## 用语要求

几乎所有 RFC 开头都有用语模板。RFC 7519 的 [1.1. Notational Conventions](https://datatracker.ietf.org/doc/html/rfc7519#section-1.1) 小节如下：

```txt
The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
"SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and
"OPTIONAL" in this document are to be interpreted as described in
"Key words for use in RFCs to Indicate Requirement Levels" [RFC2119].
The interpretation should only be applied when the terms appear in
all capital letters.
```

这段话可译为：

> 本文档中的关键字 "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY" 与 "OPTIONAL"，当且仅当它们的所有字母都是大写形式时，才解释为 "Key words for use in RFCs to Indicate Requirement Levels" [RFC2119] 中表述的含义。

- RFC2119[^rfc_2119] 定义的这些关键字有助于定义**互通性 (interoperability)**[^interoperability]。

[^rfc_2119]: [RFC 2119: Key words for use in RFCs to Indicate Requirement Levels](https://tools.ietf.org/html/rfc2119)
[^interoperability]: [Interoperability](https://en.wikipedia.org/wiki/Interoperability)

### 关键字 "SHOULD"

RFC2119 中对 "SHOULD" 的描述如下：

```txt
SHOULD  This word, or the adjective "RECOMMENDED", mean that there
        may exist valid reasons in particular circumstances to ignore a
        particular item, but the full implications must be understood and
        carefully weighed before choosing a different course.

        这个词或是形容词“推荐的”，它们的意思是在特定情况下可能存在正当理由而忽略特定条
        款，前提是必须理解其全部含义并在选择其他方案之前经过审慎的权衡。
```

例如，在 RFC7519 的 [7.2. Validating a JWT](https://datatracker.ietf.org/doc/html/rfc7519#section-7.2) 小节中，有：

```text
  Finally, note that it is an application decision which algorithms may
  be used in a given context.  Even if a JWT can be successfully
  validated, unless the algorithms used in the JWT are acceptable to
  the application, it SHOULD reject the JWT.

  最后，注意在给定上下文中可以使用哪些算法是由应用程序决定的。除非一个 JWT 中使用的
  算法是应用程序所允许的，否则即使该 JWT 可以成功通过校验，它也应该拒绝该 JWT。
```

“应该”不是必须遵守的，因为应用程序可能会有合理的原因而采取其他措施。在以上例子中还有“除非”这个词——它指定了“应该”允许的“特殊情况”。可以说，此处也可以将“应该”替换成“必须”。

> RFC 的作者们经常使用“应该 (SHOULD)”和“不应该 (SHOULD NOT)”来表示“我们希望你这样做，但是我们知道我们并不总是要求你做到。”

## 阅读规范实例

另一个非常常见的陷阱是通过浏览规范示例，并参照范例进行具体实现。

不幸的是，示例通常是作者最少关注的部分，因为示例需要随着协议的每次更改而进行更新。

结果就是，它们通常是规范中最不可靠的部分。是的，作者绝对应该在发布之前仔细检查示例，但是疏忽总是难以避免。

另外，即使是一个完美的示例，也可能无法阐述清楚你关心的每个协议特性；为了简洁起见，在范例中通常会将它们截断，或者在解码步骤之后才显示。

即使会花费更多时间，最好的方式还是阅读实际的文本；因为示例终究不是规范。

## 使用 ABNF（Augmented Backus–Naur Form，增强型巴科斯-瑙尔范式）

[abnf]: https://tools.ietf.org/html/rfc5234

[增强型巴科斯-瑙尔范式][abnf] 常被用于定义协议工件实例。例如：

```text
FooHeader = 1#foo
foo       = 1*9DIGIT [ ";" "bar" ]
```

一旦你习惯了这种表示法，ABNF 会提供一个易于理解的“草图”，概述一个协议实例的结构与格式。

然而，ABNF 是“理想化”定义——它标示一条消息的理想形式，那么对应生成的那些消息就需要与之完全匹配。它没有指定如何处理匹配失败的消息。实际上，许多规范都*无法*说明 ABNF 与消息处理要求之间的关系。

如果你尝试严格执行 ABNF，大多数协议都会严重不匹配，但有时 ABNF 的确很重要。在上面的示例中，指明不允许在分号周围使用空格，但是可以打赌还是会有某些人会将空格放在分号周围，并且某些协议的实现会接受它。

因此，请确保你阅读了 ABNF 周边的说明以了解其他要求或需要的上下文，假如你发现到没有直白的规范要求，你可能需要调整解析严格程度以使其比 ABNF 所暗示的更容易接受输入。

一些规范开始承认 ABNF 的理想性，并指定了包含错误处理的显式解析算法。当这些被指定时，应严格遵循这些规定，以确保互通性。

## 安全注意事项

[rfc_3552]:https://tools.ietf.org/html/rfc3552

自 [RFC3552][rfc_3552] 以来，RFC 模板就开始包含“安全注意事项”部分。

因此，很少有发布的 RFC 会缺少关于安全性的实质性部分；评审中不允许草案出现“此协议没有安全注意事项”的情况。

所以需要阅读并确保你了解“安全注意事项”部分，无论你是要实施还是部署协议；如果不这样做，那么你接下来很可能会被安全性问题困扰。

拓展阅读其它引用（如果有的话）也是一个好主意。如果没有，请尝试查找那些用于理解所讨论的问题的术语。

## 了解更多

[working_group]: https://datatracker.ietf.org/wg/
[ietf_area]: https://ietf.org/topics/areas/

如果 RFC 无法回答你的问题，或者你不清楚其文本的含义，那么最好的办法是找到最相关的 [工作组][working_group]，并在其邮件列表中提出问题。如果没有活跃的工作组讨论相关主题，请尝试相应 [区域][ietf_area] 的邮件列表。

提交勘误表通常不是你应该采取的第一步——建议你先和他人进行交流确认。

现在许多工作组都在使用 GitHub 来管理其规范；如果你对现行规范存在疑问，请提出问题。如果它已经成为 RFC 文件，通常最好是使用邮件列表来反馈，除非你找到其他截然相反的指示。

我相信还有更多关于如何阅读 RFC 的文章，有些人会质疑我写的这篇文章，但这就是我对它们的看法。我希望它能发挥作用。

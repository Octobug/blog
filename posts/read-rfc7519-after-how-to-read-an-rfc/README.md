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

- tools.ietf.org
  - 2024.02.17 更新：新的域名应该是 [datatracker.ietf.org](https://datatracker.ietf.org/)
- [rfc-editor.org](https://www.rfc-editor.org/)
- [httpwg.org](https://httpwg.org/specs/)：由 HTTP 工作组（HTTP Working Group）维护的与 HTTP 相关的 RFC 列表
- [greenbytes.de](https://greenbytes.de/tech/webdav/)：与 WebDAV (Web-based Distributed Authoring and Versioning)[^wiki_webdav] 相关的 RFC 列表
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

RFC 是系列文档的存档，一经发布就不会改变。如果出现错误则发布新版本更正，而不是修改原文档。因此，确保看到的是正确的文档很重要。

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

## 理解上下文

对于开发者来说，查看 RFC 并依照内容进行实施，最终结果却执行了与作者意图相反的操作，这种情况比你想像的要普遍得多。

这是因为在读者选择性阅读（就像读任何“圣经”一样）时，要以一种不被误读的方式编写规范是极其困难的。

因而，无论是否在同一份规范中，读者不仅要阅读直接相关的文本，（至少）阅读其引用的任何内容也是有必要的。假如你是在紧要关头，即使无法阅读整个文档，阅读所有可能相关的部分也会大有帮助。

[http_crlf]: https://httpwg.org/specs/rfc7230.html#http.message
[http_lf]:https://httpwg.org/specs/rfc7230.html#message.robustness

例如，HTTP 消息头部被 [定义][http_crlf] 为由 CRLF 分隔，但是如果你跳过这部分文档到 [这里][http_lf]，显而易见你会看到“a recipient MAY recognize a single LF as a line terminator and ignore any preceding CR.（接收端**也许**会将 LF 符作为行分隔符，并忽略前面的 CR 符。）”的提示。

[iana]:https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E5%8F%B7%E7%A0%81%E5%88%86%E9%85%8D%E5%B1%80
[http_registry]: https://www.iana.org/assignments/http-methods/http-methods.xhtml

另一点需要谨记的是，许多协议都设置了 IANA（[Internet Assigned Numbers Authority，互联网号码分配局][iana]）登记列表管理它们的规范扩展；这些才是事实标准的来源，而不是规范文档。例如，HTTP 方法的权威列表包含在这个 [登记表][http_registry] 中，而不是在 HTTP 规范文档中。

## 用语要求

几乎所有 RFC 在其顶部附近都有模板，看起来像这样：

```text
The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
"SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and
"OPTIONAL" in this document are to be interpreted as described in
BCP 14 [RFC2119] [RFC8174] when, and only when, they appear in all
capitals, as shown here.

本文档中的关键字 "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
"SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", 与
"OPTIONAL"，当且仅当它们的所有字母都是大写形式时，它们取的即是 BCP 14 [RFC2119]
[RFC8174] 中表述的含义。
```

[rfc_2119]: https://tools.ietf.org/html/rfc2119

这些 [RFC2119][rfc_2119] 关键字有助于定义互通性，但有时也会使开发者感到困惑。规范中有以下类似表述是常见的情况：

```text
The Foo message MUST NOT contain a Bar header.
消息 Foo 中不能包含头部 Bar。
```

该要求限制的对象是协议工件（artefact，可理解为协议的某种实现的实例，或者“协议伪实例”，类似于编程中的“伪代码”），即“Foo 消息”。如果你要发送一个该协议的实例对象，那么很显然它不应该包含 Bar 头部；如果它包含了，则它不是符合规范的消息。

但是，接收者收到该消息后将采取的行为则缺乏清晰的规定；如果你看到带有 Bar 头部的 Foo 消息，你会怎么办？

有些开发者会拒绝处理包含 Bar 头部的 Foo 消息，即便规范没有说明应该这样做。其他开发者可能仍将处理该消息，但是会先解析丢弃 Bar 头部，或者忽略它——即使规范中明确指出需要处理所有头部。

所有这些处理方式的差异都可能（无意间）导致互通性问题。正确的做法是遵循消息头部的常规处理，除​​非有相反的特定要求。

因为一般来说，规范会在编写时明确指出相应行为的；换句话说，未被明确禁止的行为都是被允许的。因此，过度解读规范可能会在无意中带来一些坏处，因为你可能引入一些其他人必须处理的新行为。

在理想情况下，该规范需要额外新增定义消息接受方行为，比如：

```text
Senders of the Foo message MUST NOT include a Bar header. Recipients
of a Foo message that includes a Bar header MUST ignore the Bar header,
but MUST NOT remove it.

Foo 消息的发送者不得在其中包含 Bar 头部。包含 Bar 头部的 Foo 消息的接收者必须忽略
Bar 头部，但不得移除它。
```

[http_conformance]: https://httpwg.org/specs/rfc7230.html#conformance

如果没有相关规定，最好在规范中（例如，HTTP 协议的 [一致性与错误处理][http_conformance] 部分）的其他地方寻求有关错误处理的一般建议。

另外需要记住的是要求的*目标*对象是什么；大多数规范都有一套高度完善的术语，用于区分协议中的不同角色。

[http_proxy]: https://httpwg.org/specs/rfc7230.html#intermediaries

例如，HTTP 具有 [代理][http_proxy] 的定义，它是一种中介，既实现了客户端又实现了服务器（但它不是 User-Agent 或真正的服务器）；他们需要注意针对所有这些角色的要求。

同样地，HTTP 会根据特定情况在某些要求中区分“生成（generating）”消息和仅“转发（forwarding）”消息。关注这种特定的术语可以免去大量的猜测。

### 关键字 “SHOULD”

是的，关键字 “SHOULD”值得单独说一下。尽管在移除这个关键字上面做了很多努力，这个含义模糊的词仍困扰着许多 RFC 文件。RFC2119 将其描述为：

```text
SHOULD  This word, or the adjective "RECOMMENDED", mean that there
        may exist valid reasons in particular circumstances to ignore a
        particular item, but the full implications must be understood and
        carefully weighed before choosing a different course.

应该     这个词或是形容词“推荐”，它们的意思是在特定情况下可能存在正当理由而忽略特定条款，
        前提是必须理解其全部含义并在选择其他方案之前经过请仔细权衡。
```

实际上，作者经常使用“应该（SHOULD）”和“不应该（SHOULD NOT）”来表示“我们希望你这样做，但是我们知道我们并不总是要求你做到。”

[http_method_overview]: https://httpwg.org/specs/rfc7231.html#method.overview

例如，在 [HTTP 方法概述][http_method_overview] 中，我们可以看到：

```text
When a request method is received that is unrecognized or not
implemented by an origin server, the origin server SHOULD respond
with the 501 (Not Implemented) status code. When a request method
is received that is known by an origin server but not allowed for
the target resource, the origin server SHOULD respond with the 405
(Method Not Allowed) status code.

当收到无法识别或未经服务器实现的请求方法时，服务器**应该**响应状态代码 501（未
实现）。当收到一个请求方法为服务器所知但目标资源不被允许访问时，服务器**应该**
响应状态码 405（不允许的方法）。
```

这些“应该”不是必须遵守的，因为服务器也许有合理的理由决定采取其他措施；如果请求来自被认为是攻击者的客户端，则它可能会断开连接，或者请求的资源要求使用 HTTP 身份验证授权，则它可能会使用 401（未经身份验证）响应请求来取代 405 响应请求。

“应该”也*不*意味着服务器就可以随意忽略规范要求，因为这让它给人带来一种不尊重规范的感觉。

[multipart]: https://httpwg.org/specs/rfc7231.html#multipart.types

有时我们会 [看到][multipart] 遵循如下形式的 “应该”：

```text
A sender that generates a message containing a payload body SHOULD
generate a Content-Type header field in that message unless the
intended media type of the enclosed representation is unknown to
the sender.

在发送方生成了包含有效载荷（payload）体的消息时，“应该”同时在该消息中头部中生
成 Content-Type 字段，除非有效载荷的媒体类型对发送方来说是未知的。
```

注意“除非”这个词——它指定了“应该”允许的“特殊情况”。可以说，这里将“应该”替换成“必须”，除非子句仍然适用，然而这种规范风格仍然普遍存在。

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

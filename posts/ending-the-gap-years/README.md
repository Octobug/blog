---
date: 2024-04-01
spot: 宝安图书馆
sort: Miscellaneous
tags:
  - Causerie
  - Study
  - Work
  - Life
  - System Design
  - Open Source
  - LeetCode
  - 2ndLA
  - English
  - Spanish
---

# Gap Years 尾声

![Two Humpbacks](./two-humpbacks.jpg "Permitted under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) (image rotated). © [**fdetaille**](https://www.inaturalist.org/people/fdetaille). [*inaturalist.org*](https://www.inaturalist.org/photos/239817627).")

::: info 其实我一开始只想 gap 两个月

从 2022 年 10 月 31 日离职至今，刚好满 1 年 5 个月。本文原定的题目也从 Gap Year 变成了 Gap Years，难绷。

:::

离职后我改变了主意，最开始的两个月几乎只学英语，所以不得不将 gap 期扩展到半年；在复习一些专业内容之后感觉越复习越没底，越发觉得时间不够：一方面要面向找工作复习，另一方面又想面向兴趣新学自己更想了解的东西，于是又扩展为一年……然后，它就过年了。最后我把底线定为今年的“金三银四”，再拖下去我自己也无法容忍。

其实究竟是不是“尾声”也难说，**主动 gap** 期算是正式结束了，大概率还要**被动 gap** 一些时间，毕竟目前的就业行情似乎是不金不银不三不四。

上个月初前同事`黄总`帮我内推面试了他的新东家，三轮面试聊得都还行，工作内容也符合我接下来期望的方向，无奈在几天后的谈薪环节谈崩了。说起来这还是我第一次谈薪讲价，以往都是对方给多少我觉得能接受就接。所以谈崩了可以理解，算是累积了一次经验。也可能是那时候我对就业环境冰冷的感知还不够深刻。这个面试是这一年多里唯一一次面试。

此外，第一面有个简单的随机发牌我没答出最优解，当时我没跟面试官要纸笔，直接搁那儿想没想出来。回家后想起来这个面试题，在纸上划拉了几下就做出来了。面试的时候没答出来虽然有一些紧张的成分，但如果有纸笔帮助冷静思考应该会好很多，*纸上谈兵*还是比*空想*要强一些。

[^nanfang]: [南方（达达乐队演唱歌曲）](https://baike.sogou.com/v64512954.htm)

“时间过得飞快，转眼这些已成回忆。”[^nanfang]在这段时间里，我主要做了以下这些事请（结合收获以及重要程度排序）：

## 专业相关

### 系统设计 (System Design)

系统设计是我觉得收获最大的部分，因为我一直希望能参与中大型系统的设计和实现。上一份工作缺少这种场景也是我辞职的原因之一。

- [The Twelve-Factor App](https://12factor.net/): 由 [Heroku](http://www.heroku.com/) 发布的一组最佳实践，这些最佳实践从 12 个方面讲述构建可扩展、易维护的 SaaS 应用程序的方法（可以理解为应用程序级别的解耦），它们对构建现代云原生应用程序至关重要。读完这份文档只需要花几十分钟，但是它解决了我在上一份工作中产生的不少疑问（前司缺少部分它们依赖的现代化基础设施……）。
- [System Design Interview: An insider's guide](https://www.goodreads.com/book/show/54109255-system-design-interview-an-insider-s-guide) `还没读完`: 这本书的视角比 *The Twelve-Factor App* 高一些，目前我看到的内容都涉及架构级别的设计。书名包含“面试 (Interview)”这样的字眼很容易让人觉得这是一本水书。里面确实也有讲述一些面试技巧，但目前看的几章基本都是技术干货，尤其适合没做过架构设计的同学。
- [Designing Data-Intensive Applications (DDIA)](https://dataintensive.net/) `即将读完`: 这本书在后端领域知名度非常高，前几章相对易读，就算不能说是醍醐灌顶也可以说是渐入佳境。然而从第七章开始我脸上的笑容逐渐消失，没接触过的概念越来越多，经常看到后面忘了前面。它和 *System Design Interview* 的主要区别是更偏理论，也更贴近底层，除了讲述各类组件解决什么问题，还详细介绍它们是如何解决的。而后者更偏工程，要易读得多。DDIA 这本书我注定要读第二遍。

这三本书在 [Goodreads](https://www.goodreads.com/) 的评分都超过 4 星，`4+` 星的技术书籍属于**公认**的好书。如果没读过，推荐按上面列出的顺序读。

### 特定细分主题

- [Redis 开发与运维](https://book.douban.com/subject/26971561/) `还没读完`：以前工作中虽然用到 Redis，但一直没时间系统地学一遍。这本书目前看了前几章，内容质量还不错，作者会在适当时机介绍 Redis 的内部机制和实现细节；根据目录内容也能看出它足够系统全面。它好像是我这段时间看的唯一一本以中文出版的技术书？等完全看完了再更新这部分。
- [Solving Identity Management in Modern Applications: Demystifying OAuth 2.0, OpenID Connect, and SAML 2.0](https://www.goodreads.com/book/show/49950389-solving-identity-management-in-modern-applications): 非常全面地介绍了现代应用是如何做身份管理的。这本书的不足之处是提供的示例项目维护质量不太行。看这方面的书也是因为上一份工作中涉及到账户系统而留下一些疑问。
- [The Docker Book: Containerization is the new virtualization](https://www.goodreads.com/book/show/34399420-the-docker-book): 非常适合入门 Docker 的一本书，这本书最后一版是 2017 年，Docker 从那时起到现在已经有不少改动，书里的很多示例需要修改才能跑起来（基本上都是软件、库依赖问题），但核心内容仍然不过时。读这本书和读《Redis 开发与运维》的原因一样，都是工作中用过，但是没系统地学过，因而对最佳实践是什么样心里没底。
- [The Definitive Guide to Single Sign-On](https://auth0.com/resources/whitepapers/definitive-guide-to-single-sign-on) `不推荐`: [auth0](https://auth0.com/) 出的免费电子书，主要讲单点登录。

### 开源相关

[^dragon_book]: [Compilers: Principles, Techniques, and Tools](https://www.goodreads.com/book/show/703102.Compilers)
[^tiger_book]: [Modern Compiler Implementation in C](https://www.goodreads.com/book/show/1190651.Modern_Compiler_Implementation_in_C)
[^gtf]: [GTF - Great Teacher Friedman](https://www.yinwang.org/blog-cn/2012/07/04/dan-friedman)
[^pl_d_and_i]: [Programming language design and implementation](https://en.wikipedia.org/wiki/Programming_language_design_and_implementation)

- [Apache 基金会](https://apache.org/)：去年五月份想找找看有没有适合自己参与的开源项目，先是读了 Apache 基金会的文档，这几份文档对了解 Apache 的社区文化非常有帮助：
  - [Getting started](https://community.apache.org/gettingStarted/101.html)
  - [GET INVOLVED](https://www.apache.org/foundation/getinvolved.html)
  - [The Apache Incubator](https://incubator.apache.org/): 孵化阶段的 Apache 项目，最后不一定能成为正式项目。但因为孵化阶段属于项目早期，所以会有更多的参与机会。
- [pingcap/tidb](https://github.com/pingcap/tidb): Apache 的很多项目都是基础设施组件，这些软件用的编程语言如 C, C++, Java, Rust, Go 都不是我熟悉的，其中只有 Go 是我近期想深入学习的语言。当时我在 Apache 的项目列表中并没有找到我感兴趣的 Go 语言项目，所以将目光转向了别处。非常偶然地，我不知道从哪看到了 TiDB 这个分布式数据库项目。在简单了解之后我认为这是一个很好的了解数据库的切入点，因为 [PingCAP 课程中心](https://learn.pingcap.cn/learner/course)做了相当多的课程，并且感觉他们对开源社区的运营也很用心。我先是看了 [TiDB 快速起步](https://learn.pingcap.com/learner/course/6) 简单了解 TiDB 的系统架构，之后就开始看官方的开发文档 [pingcap/tidb-dev-guide](https://github.com/pingcap/tidb-dev-guide)。看到 SQL Parser 部分的时候，我意识到终于是时候学我心心念念的编译原理了……
  - 在调研编译原理入门书籍的时候，除了经常听说的龙书[^dragon_book]虎书[^tiger_book]，我还想起王垠博客中提到过[^gtf]的 [Essentials of Programming Languages](https://eopl3.com/)。严格来说这几本书分属不同的细分科目，*Essentials of Programming Languages* 属于 language design，龙书虎书属于 language implementation [^pl_d_and_i]，而 syntax parser 属于两边都不可避免的部分。在了解这几本书的过程中，又刚好看到有人推荐将 [CS61A](https://cs61a.org/) 作为前置课程。CS61A 虽然是 UC Berkeley 面向 CS 新生的课程，但它的难度其实并不算很低（和我大一的课程相比）。鉴于它的知名度非常高，我一直有想一探究竟的冲动……所以最后定下来的学习路线如下：
    - [CS 61A: Structure and Interpretation of Computer Programs](https://inst.eecs.berkeley.edu/~cs61a/sp23/) `实验进度 50%`
    - [南京大学编译原理](https://csdiy.wiki/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86/NJU-Compilers/) `没开始`
    - [南京大学软件分析](https://csdiy.wiki/%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%88%86%E6%9E%90/NJU-SoftwareAnalysis/) `没开始`
    - [Essentials of Programming Languages](https://eopl3.com/) `没开始`
  - 结合现状，这几门课程不可能在一年内学完，所以我将这个分支的学习转成长线，按固定周期慢慢抽空推进。回头看这个路线的学习进度非常喜感，我当然知道这种乱开任务支线的行为会严重影响短期目标，但是没关系，这又不是工作需要背 KPI，而且这条线是我一直以来很想学的，缘分到了我没理由挡住。
  - **阅读 TiDB 开发文档的其他收获**
    - 了解了不少分布式数据库的概念
    - 了解了一款数据库软件是如何做架构设计的
    - 了解了一款大型软件是如何做发版管理的
    - 了解了一个开源项目是如何做社区运营的
- [apache/incubator-answer](https://github.com/apache/incubator-answer): 上个月不知道在哪偶然看到这个新的 Apache Incubator 项目，它的类型（从技术角度）和我先前工作中的项目非常相似。此时已经临近我出去找工作的时候，正好我需要实践 Go 语言，所以就把它纳入目前的学习主线了。
  - 这个项目是国内问答平台 [SegmentFault](https://segmentfault.com/) 发起的，目前项目核心成员似乎都是中国人。
  - 由于项目方的文档已经比较成熟，社区有一定活跃度，核心团队对 beginners 也非常友好，所以我目前参与的状况还算顺利，三月份领的 1 个 feature 和 2 个 bug 都已经发版：[v1.3.0-RC1](https://github.com/apache/incubator-answer/releases/tag/v1.3.0-RC1)
- **本站**：前面发过一篇博文[《基于 VitePress 开发博客主题》](./building-a-vitepress-blog-theme)讲述本站是如何搭建的，而这段时间写的大部分文章都是从以前的工作笔记中整理出来的，内容都是我觉得有意思的事件。当然，事后看才觉得有意思，当事时只能给我造成不少的困扰和压力。目前还有大约 5 篇没整理出来。

在接触这些开源生态的过程中，我向相关社区提了不少问题，或快或慢最后都能得到解决。我相当喜欢开源社区的沟通协作方式，公开、异步、易追溯（感谢 GitHub）。其实这种方式也很适合用在工作中（公开范围变成公司内部或者小组内部），用 IM 火急火燎地表达效果并不一定好（除了急事），就算最后讨论出方案，也很容易忘记将前因后果固化到容易追溯的系统里，日子久了这些信息就会丢失，不可避免地伤害到后面无辜的接盘侠，并且往往自己也逃不过伤害——计算机有 robust 的记忆，人没有。

### 算法与数据结构 (Algorithms and Data Structures)

我做 LeetCode 算法题的原因比较淳朴，大三选修的算法课是水过去的，导致我对经典算法一直以来都没什么底。截至目前[做了 `407` 题](https://leetcode.com/Octobug/)：

| 难度   | 数量  | 自主完成率 |
| ------ | ----- | ---------- |
| Easy   | `217` | `99%`     |
| Medium | `159` | `80%`      |
| Hard   | `31`  | `60%`      |

有些 Hard 题之间的难度差距天差地别，真正难的看题解也要看半天才能看懂，这个等级的题目如果是在面试中遇到我肯定做不出来。不过目前我也不会追求一定要做出来，毕竟不是算法选手……

这部分看的资料是[代码随想录](https://programmercarl.com/)（印象中是前同事 `Spike` 同学推荐给我的）。这份资料包含数据结构和算法，不过由于是刷题向的教程，所以知识点的讲解质量感觉还是有些不足，但总体值得一看。

为什么不只做 [Hot 100](https://leetcode.cn/problem-list/2cktkvj/)？我目前不喜欢这种方式，也许以后会把 Hot 100 做熟，但现在确实没有这种欲望。

### 编程语言 (Programming Languages)

- Go `新学`
  - [A Tour of Go](https://go.dev/tour/)
  - [Go Developer](https://roadmap.sh/golang) `进度 42%`
- C `复习`: 我做 LeetCode 用的语言是 C++，其中用的很大一部分特性和 C 完全兼容，所以就决定复习一下 C。
  - [The C Programming Language](https://www.goodreads.com/book/show/515601.The_C_Programming_Language): 这本书很好，对新手有一定难度，不过我大一上过 C 语言课程，所以对我来说还好。
    - 了解到 C 语言中类似 `scanf` 这种参数数量不定的函数是如何实现的：使用 `<stdarg.h>` 提供的一系列宏定义 `va_list`, `va_start`, `va_end`, `va_arg` 并且定义函数时使用 `...` 符号表示参数数量不定。
    - 实践了库代码的封装和使用，刷题过程中确实也用到了这些特性去复用一些工具函数。
- JavaScript `复习`
  - [JavaScript Roadmap](https://roadmap.sh/javascript)
  - [Node.js Developer](https://roadmap.sh/nodejs)
- Python `复习`
  - [Composing Programs](https://www.composingprograms.com/) `进度 50%`: 这本免费的电子书是 CS61A 的实验教材，可以理解为 [SICP](https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html) 的 Python 版本。

### 想读还没来得及读的书

- [Concurrency in Go: Tools and Techniques for Developers](https://www.goodreads.com/book/show/30413199-concurrency-in-go)
- [High Performance MySQL: Proven Strategies for Operating at Scale](https://www.goodreads.com/book/show/60469941-high-performance-mysql)
- [TCP/IP Illustrated, Volume 1: The Protocols](https://www.goodreads.com/book/show/9176515-tcp-ip-illustrated-volume-1)
- [UNIX Network Programming, Volume 1: The Sockets Networking API](https://www.goodreads.com/book/show/239240.UNIX_Network_Programming_Volume_1)

## 人类语言

### 英语

- **词汇**
  - 2023 年 6 月 14 日，我在扇贝 App 打卡 `2,000` 天。
    - 后来由于扇贝有太多的短语查不到而积累不到生词本，所以我弃用扇贝改用[欧路词典](https://dict.eudic.net/)。为此我还试用了很多单词 App：
    > 0. 欧路词典：词库全面，单词书全面，功能齐全 `胜出`
    > 1. 有道词典：功能糟糕，单词书不全面，词库最强大
    > 2. 不背单词：功能最好，单词书最全面（包括短语），词库弱于有道
    > 3. 奶酪单词：功能还行，单词书较全面，画风清奇
    > 4. 扇贝单词 & 百词斩：两者各方面比较均衡，弱于 2. & 3.
    > 5. 墨墨背单词：感觉在全力阻止用户背单词
  - 背单词是缺少语言环境的无奈之举。但是，如果背单词用的主要是垃圾时间，那么投资回报率就会非常可观。截至目前我背过的词汇量大约是两万五，很大一部分是在上下班的地铁上背的。
  - 但是光背确实很容易遗忘，在日常中一定要千方百计使用英语，否则确实不如不背。从 2019 年开始我就很少看中文的技术书了。
  - 即便如此，我的单词遗忘率应该还是超过 50% 了。在扇贝和欧路测的词汇量都在一万三以上，但这俩 App 的测试结果都偏高。我自己预估的熟记词汇量应该在 `10,000`~`12,000` 之间。
  - 词汇量上去之后会发现，还能造成阅读困难的只有长难句和短语的熟词僻义。另外，如果要训练英语表达（中译英）也需要用到大量短语搭配。但网上全面的分阶段短语库少之又少，搜寻无果后我决定自己整理，于是就有了这个仓库：[英语短语列表合集](https://github.com/2ndLA/english-phrases)。
- **语法**：语法是训练表达能力不可能绕过的一关。看完下面这套书之后，我就很少遇到读不懂的长难句了。书面表达能力也有很大的提升，虽然表达不一定地道准确，但基本上很少再犯低级的语法错误。这个能力对参与开源项目也有帮助，GitHub 上面的开源项目大多数都以英语为第一语言。
  - [英语语法新思维初级教程：走近语法](https://book.douban.com/subject/30701505/)（gap 之前看的）
  - [英语语法新思维中级教程：通悟语法](https://book.douban.com/subject/30571037/)
  - [英语语法新思维高级教程：驾驭语法](https://book.douban.com/subject/30778541/)
- **听力**：和背单词一样，听力也能利用垃圾时间训练。最好的时机是睡前，听多少算多少，还有利于入眠。我使用的工具是播客，在 Google 宣布下架自家的 Podcasts App 之后，我改用 [AntennaPod](https://github.com/AntennaPod/AntennaPod)（免费且开源）。Native speakers 的语速真的很快，尤其是谈话类节目，这类节目我得用 0.8 倍速才能勉强听懂。演讲类、故事类的节目语速会慢一些，并且发音也更清晰，这类节目按照原来的速度播放就可以听懂。目前我收听得比较多的两个节目是：
  - [Easy Stories in English](https://easystoriesinenglish.com/) - Learn English the natural way: 故事按语言难度分等级，更容易入门。
  - [Storynory](https://www.storynory.com/) - Audio Stories for Kids: 音频制作更精良，故事也更有趣一些。

### 多邻国

关于第二语言的学习我前面写过另一篇文章：[《最值得学的 10 门语言》](./languages-worth-learning-top-10)。

- **英语**：做完了全部课程，日常表达熟练度有非常明显的提升。
- **粤语**：做完了全部课程，不过粤语课程本身比较短。最大的收获是无意间学会了粤拼打字。
- **西语**：打卡了近一年，目前即将完成第二阶段，词汇量接近 `700`。这个水平可以对标国内公办英语教育六年级的小学生（前提是没有经过教培熏陶）。考虑到每天平均只用了 5~10 分钟，这一项的投资回报率仍然非常高：$10 \times 365 \div 60 \approx 60.833 (hour)$，想象一下每天学习 8 小时西语，连续学 8 天能有什么成果？
  - 西语的大舌音非常难学，我至今还是没有完全掌握。不知道跟我以前因为戴牙套划破一小段舌下系带有没有关系……

## 最大的问题

Gap 这么久，最大的问题会是经济压力或是就业压力吗？都不是。

在 gap 的第一个冬天，每天早上我会去小区楼下的花园里一边溜达一边背单词刷多邻国，差不多半小时后回屋里学习。持续一段时间后我又改成在坪洲周边随机散步（字面意义上的街溜子），最远的一次走到宝安图书馆附近，来回差不多六公里。到了春天天气变热，我才停止出去散步，改成全天在家（字面意义上的家里蹲），除了买饭买东西基本很少出门。这样的日子过了一两个月，我开始觉得不可忍受。

### 孤独

最大的问题是孤独。如果你尝试过这种和外界停止建立联系的日子，你会对孤独有更深的感受。**停止联系**和**停止建立联系**是两回事，前者更为严重，但仅仅是后者也能给我造成一定程度的恐慌。大部分人从童年走出家门、走进学校、走进职场，在这二十多年里，你很难注意到自己其实从来没有脱离过某个群体。

孤独感达到顶峰的时候差不多 gap 了半年。

我几乎每天会出门去餐馆、商店买东西，这些都需要和人打交道。有些商店老板甚至已经认识我，平时遇到会互相打招呼。偶尔还会约见朋友一起吃饭，在微信也几乎每天都和朋友联系。但这些活动都和群体建立联系有本质区别。在茫茫人海中，如果身边的人和你没有关系，那么你就是孤独的。那段时间我常常想起电影[荒岛余生 Cast Away (2000)](https://movie.douban.com/subject/1298653/)，也更加理解为什么主人公会对一个排球产生感情。

当我觉得孤独不可忍受的时候，我开始改成去图书馆。虽然还是不能和人群建立联系，但是图书馆有其他奇妙的氛围加成，可以缓解这种孤独感。后来，暑假的图书馆充满了中学生，占座变得困难，我又恢复待在家里。为了维持氛围，我甚至还去小红书找那种“线上自习室”。

后来很神奇地，我逐渐适应了孤独。但我并不享受孤独，也就是在这段时间里，我知道自己并不适合做独立开发者，或者是长时间远程办公。到后期由于出门次数减少，和别人说话的频率降到很低（从没想过既不喜欢打电话也不喜欢发语音还有这个缺点），我的**中文**口语能力似乎也退化了一点点点，体现为说话容易嘴瓢。

#### 焦虑耐受

这一年多里，我竟然很少感到焦虑，这甚至出乎我自己的意料。压力当然会有，但这些压力很少影响到我的情绪。

也许是经历过极度焦虑之后就可以对焦虑免疫。

2017 年底跟 2019 年春天各有过一次极度焦虑，期间出现以星期为单位的连续失眠。但好在随着问题解决，焦虑自己也消失了。现在年纪大了不少，其实回头看我现在的境况并不比当时好，甚至因为当时更年轻，可能性要比现在宽广得多。

我对未来不是非常有信心，工作跟生活的现状也不太如意，但我真的焦虑不起来。目前我还远没到麻木的程度，也有自己的热爱和计划，但不焦虑好像也不是靠这些支撑着。

很好奇我到底是哪来的自信不焦虑。也不知道这是好事还是坏事。

### 失策与遗憾

上大学后我每年只回两次家，过年一次夏天一次。这两年我爸妈常来深圳，所以 2023 年也成为我陪伴父母最多的一年。希望以后就算上班了也能多陪他们。

如果我能早点料到会 gap 这么久，我会选择停止在深圳租房，改回老家的市区租房生活。一方面离家近，另一方面是我真的很想多吃点家乡的食物。深圳的饭菜啊，就算它不辣它也是重口味的啊，我的经济特区。

我的人生大概率没有机会再主动 gap 这么久了，我竟然就这么错过这个几乎是唯一的让我回老家感受生活的机会。这是这一年多里面最大的悔恨。

## 其他

### 闲书

- [把时间当作朋友](https://github.com/xiaolai/time-as-a-friend)：有一天我偶然看到李笑来这本书，那天我突然不想学习，所以就顺便看了这本书。当时还推荐给了失联多年之后突然恢复联系的`黛黛`。
  - 这本书的读后感是我看得太晚了，很多方法自己都已经通过经验教训习得，现在看的收益已经变得不明显。回头看，我自己看这本书的最佳年龄应该是 18~25 岁之间。
  - “笑来的币你可以不买，但是笑来的话你还是要听一听。”
- [Wild World: Photographing Iconic Wildlife](https://www.goodreads.com/book/show/62823910-wild-world) `还没读完`: 买这本书缘起于我发邮件询问作者能不能用他的一张摄影作品，作者非常慷慨友好地回复了我，并且表示同意免费使用。后来我觉得遇到这么好的人，我应该支持一下他的作品。这本书国内没有发售，网购流程长达一个月左右，花了我 40 美金。这辈子再也不会买这么贵的书了，~~买得起也不买~~。

### 影视

得益于三餐都能够在住所吃，我把吃饭时间用来看剧这个习惯发挥得淋漓尽致。这段时间一共看了 `80` 部电影/电视剧/音乐剧/纪录片/演唱会。

- **音乐剧**：Gap 早期偶然间看了这两部音乐剧，任何没有感受过音乐剧魅力的人都可以从这两部开始。后来深圳有[《剧院魅影》中文版](https://www.douban.com/location/drama/36199194/)和[《剧院魅影：真爱不死》](https://www.douban.com/location/drama/36784740/)的现场演出，这两场我都去看了。
  - [悲惨世界：十周年纪念演唱会 Les Misérables the Dream Cast in Concert (1995)](https://movie.douban.com/subject/35048691/)
  - [剧院魅影：25周年纪念演出 The Phantom of the Opera at the Royal Albert Hall (2011)](https://movie.douban.com/subject/24751811/)

### 支出

离职前我按照以往的消费水平做了预估，那时候我认为既有的支出水平是完全可以接受的，哪怕 gap 个一年两年。但是人算不如天算，由于多了不少意外支出，最后的数额是预估的两倍。写到这里我差点晕过去了。

失去工资之后我唯一的收入是“理财”收入（此处加引号是因为仓位实在是太小了），在 A 股与国内基金市场打滚与刀口舔血无异，不亏钱我已倍加感恩。这一年多的收益是：两万多人民币，本金七万左右，所以收益率差不多是 `30%`。

### 健康

- 跑了好多趟口腔医院，这个也是意外支出的主要来源。对于一个兢兢业业维护口腔卫生十余年的人来说，这样的结果明显是命运对我不公。
- 两次新冠 + 一次病毒性肠胃炎让我合计躺了近一个月。不过如果需要上班我应该不会躺这么久。
- 长时间久坐对身体不好，长时间用眼也不好。我的对策是当眼睛需要休息时，就出门散一下步，或者打扫卫生，可以说是一举两得了。

### 杂活儿

- **打字记录 `81 wpm`**：据我前直属领导说，他在网易的时候实习生转正有一项考核是打字速度要超过 `60 wpm`，即每分钟准确无误打出 60 个英文单词（Easy 级别），用的是这个网站：[TypingTest.com](https://www.typingtest.com/)。刚离职的时候我每天都练 20 分钟左右，在过年前几天我跟前同事 `Along` 开玩笑说，如果我打不到 80 以上今年就不回去过年了。结果过了两天我真的打到 81。虽然我隐隐感觉自己能打到 Pro 级别的 85，但是 80+ 我已经满足了，也就没有再继续训练。
  - 训练打字速度还有一个别的原因：我想验证自己的手指灵活度能到什么程度，因为我以后要学乐器。
- **流氓哨**：就是那个用手指可以吹出非常响的声音的口哨，也叫 OK 哨。练这个缘起于看音乐剧演出的时候我发现现场只有掌声和喝彩而没有吹哨声。
  - 吹出响声练了约 10 天
  - 稳定吹出响亮的哨声练了至少两个月

### 风险

什么状况会让我这一年多的努力白费？我想到的主要有两点：

- **生病**：假如在这期间倒了血霉生了重病，那么损失的就不只是这段时间不上班的机会成本，还有未来所有的上班收入，当然还有医药费。所以医疗保险很重要。虽然没上班了但我还是继续交每个月四百多的职工医保，同时也继续买重疾险和长期医疗险。
  - 交职工医保需要先办理灵活就业，后来职工医保还涨到了最低五百一个月。
- **过时**：另一个风险是我学的东西都过时了。ChatGPT 的出现确实引起不小的轰动，不过我认为短期内 AI 把行业的整个天给变了的可能性还比较低。而且我现在几乎天天用 ChatGPT，目前它给我带来的只有好处。

写到这里眼睛已经有些疲劳，我需要先休息一下然后开始改简历、找工作。

::: info 纪念

- 今天是愚人节。在这样的大环境里，主动 gap 确实算挺愚的，我愚我自己。
- 🕯️ 今天还是张国荣去世二十一周年。最近几年陆续地听他的歌、看他的电影以及一些采访片段，慢慢理解为什么会有那么多人那么地喜欢他了。

:::

## Cover

::: details Humpbacks' Gap Time

[^fasting]: [Intra-seasonal variation in feeding rates and diel foraging behaviour in a seasonally fasting mammal, the humpback whale](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9257586/)

封面图是两头大翅鲸在澳大利亚的珊瑚海游弋。据说，大翅鲸在迁徙过程中可以长达 6 个月不进食[^fasting]。

![Humpback Leaping](./humpback-leaping.jpg "Permitted under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) (image resized). © [**Robin Gwen Agarwal**](https://www.inaturalist.org/people/anudibranchmom). [*inaturalist.org*](https://www.inaturalist.org/photos/158479000).")

:::

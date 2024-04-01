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
  - 2ndLA
---

# Gap Years 尾声

![Two Humpbacks](./two-humpbacks.jpg "Permitted under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) (image rotated). © [**fdetaille**](https://www.inaturalist.org/people/fdetaille). [*inaturalist.org*](https://www.inaturalist.org/photos/239817627).")

::: info 其实我一开始只想 gap 两个月

从 2022 年 10 月 31 日离职至今，刚好满 1 年 5 个月。本文原定的题目也从 Gap Year 变成了 Gap Years，难绷。

:::

离职后我改变了主意，最开始的两个月几乎只学英语，所以不得不将 gap 期扩展到半年；在复习一些专业内容之后感觉越复习越没底，越发觉得时间不够：一方面要面向找工作复习，另一方面又想面向兴趣新学自己更想了解的东西，于是又扩展为一年……然后，它就过年了。最后我把底线定为今年的“金三银四”，再拖下去我自己也无法容忍。

其实究竟是不是“尾声”也难说，**主动 gap** 期算是正式结束了，大概率还要**被动 gap** 一些时间，毕竟目前的就业行情似乎是不金不银不三不四。

上个月初前同事黄总帮我内推面试了他的新东家，三轮面试聊得都还行，工作内容也符合我接下来期望的方向，无奈在几天后的谈薪环节谈崩了。说起来这还是我第一次谈薪讲价，以往都是对方给多少我觉得能接受就接。所以谈崩了可以理解，算是累积了一次经验。也可能是那时候我对冰冷的感知还不够深刻。这个面试是这一年多里唯一一次面试。

此外，第一面有个简单的随机发牌我没答出最优解，当时我没跟面试官要纸笔，直接搁那儿想没想出来。回家后想起来这个面试题，在纸上划拉了几下就做出来了。面试的时候没答出来虽然有一些紧张的成分，但如果有纸笔帮助冷静思考应该会好很多，*纸上谈兵*还是比*空想*要强一些。

[^nanfang]: [南方（达达乐队演唱歌曲）](https://baike.sogou.com/v64512954.htm)

“时间过得飞快，转眼这些已成回忆。”[^nanfang]在这段时间里，我主要做了以下这些事请（结合收获以及重要程度排序）：

## 专业相关

### 系统设计 (System Design)

系统设计是我觉得收获最大的部分，因为我一直希望能参与中大型系统的设计和实现。上一份工作缺少这种场景也是我辞职的主要原因。

- [The Twelve-Factor App](https://12factor.net/): 由 [Heroku](http://www.heroku.com/) 发布的一组最佳实践，这些最佳实践从 12 个方面讲述构建可扩展、易维护的 SaaS 应用程序的方法（可以理解为应用程序级别的解耦），它们对构建现代云原生应用程序至关重要。读完这份文档只需要花几十分钟，但是它解决了我在上一份工作中产生的不少疑问（前司缺少部分它们依赖的现代化基础设施……）。
- [System Design Interview: An insider's guide](https://www.goodreads.com/book/show/54109255-system-design-interview-an-insider-s-guide) `还没读完`: 这本书的视角比 *The Twelve-Factor App* 高一些，目前我看到的内容都涉及架构级别的设计。书名包含“面试 (Interview)”这样的字眼很容易让人觉得这是一本水书。里面确实也有讲述一些面试技巧，但目前看的几章基本都是技术干货，尤其适合没做过架构设计的同学。
- [Designing Data-Intensive Applications (DDIA)](https://dataintensive.net/) `即将读完`: 这本书在后端领域知名度非常高，前几章相对易读，就算不能说是醍醐灌顶也可以说是渐入佳境。然而从第七章开始我脸上的笑容逐渐消失，没接触过的概念越来越多，很容易看到后面忘了前面。它和 *System Design Interview* 的主要区别是更偏理论，也更贴近底层，除了讲述各类组件解决什么问题，还详细介绍它们是如何解决的。而后者更偏工程，要易读得多。DDIA 这本书我注定要读第二遍。

这三本书在 [Goodreads](https://www.goodreads.com/) 的评分都超过 4 星，`4+` 星的技术书籍属于**公认**的好书。如果没读过，推荐按上面列出的顺序读。

### 特定细分主题

- [Redis 开发与运维](https://book.douban.com/subject/26971561/) `还没读完`: 以前工作中虽然用到 Redis，但一直没时间系统地学一遍。这本书目前看了前几章，内容质量还不错，作者会在适当时机介绍 Redis 的内部机制和实现细节；根据目录内容也能看出它足够系统全面。它好像是我这段时间看的唯一一本以中文出版的技术书？等完全看完了再更新这部分。
- [Solving Identity Management in Modern Applications: Demystifying OAuth 2.0, OpenID Connect, and SAML 2.0](https://www.goodreads.com/book/show/49950389-solving-identity-management-in-modern-applications): 非常全面地介绍了现代应用是如何做身份管理的。这本书的不足之处是提供的示例项目维护质量不太行。看这方面的书也是因为上一份工作中涉及到账户系统而留下一些疑问。
- [The Docker Book: Containerization is the new virtualization](https://www.goodreads.com/book/show/34399420-the-docker-book) `即将读完`: 非常适合入门 Docker 的一本书，这本书最后一版是 2017 年，Docker 从那时起到现在已经有不少改动，书里的很多示例需要修改才能跑起来（基本上都是软件、库依赖问题），但核心内容仍然不过时。读这本书和读《Redis 开发与运维》的原因一样，都是工作中有用过，但是没系统地学过，因而对最佳实践是什么样心里没底。
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
      - [Composing Programs](https://www.composingprograms.com/) `阅读进度 50%`
    - [NJU 编译原理](https://csdiy.wiki/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86/NJU-Compilers/) `没开始`
    - [NJU 软件分析](https://csdiy.wiki/%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%88%86%E6%9E%90/NJU-SoftwareAnalysis/) `没开始`
    - [Essentials of Programming Languages](https://eopl3.com/) `没开始`
  - 结合现状，这几门课程不可能在一年内学完，所以我将这个分支的学习转成长线，按固定周期慢慢抽空推进。回头看这个路线的学习进度非常喜感，我当然知道这种乱开任务支线的行为会严重影响短期目标，但是没关系，这又不是工作需要背 KPI，而且这条线是我一直以来很想学的，缘分到了我没理由挡住。
  - **阅读 TiDB 开发文档的其他收获**
    - 了解了不少当前分布式数据库的概念
    - 了解了一款大型软件是如何做发版管理的
    - 了解了一款大型软件是如何做开源社区运营的
- [apache/incubator-answer](https://github.com/apache/incubator-answer): 上个月不知道在哪偶然看到这个新的 Apache Incubator 项目，它的类型（技术角度）和我先前工作中的项目非常相似。此时已经临近我出去找工作的时候，正好我需要实践 Go 语言，所以就把它纳入目前的学习主线了。
  - 这个项目是国内问答平台 [SegmentFault](https://segmentfault.com/) 发起的，目前项目核心成员似乎都是中国人。
  - 由于项目方的文档已经比较成熟，社区活跃，核心团队对 beginners 也非常友好，所以我目前参与的状况还比较顺利，三月份领的 2 个 bug 和 1 个 feature 都已经发版：[v1.3.0-RC1](https://github.com/apache/incubator-answer/releases/tag/v1.3.0-RC1)
- 基于 VitePress 的博客主题：`明天继续更新……`

### 算法与数据结构 (Algorithms and Data Structures)

- LeetCode
  - [x] [代码随想录](https://programmercarl.com/)
  - [x] 400 题
  
### 编程语言 (Programming Languages)

- [x] C: The C Programming Language `复习`
- [x] JavaScript: [JavaScript Roadmap](https://roadmap.sh/javascript) `复习`
- [x] Node.js: [Node.js Developer](https://roadmap.sh/nodejs) `复习`
- [ ] Golang `新学`
  - [x] A Tour of Go
  - [ ] [Go Developer](https://roadmap.sh/golang)

### 想读还没来得及读的书

- [ ] High Performance MySQL
- [ ] TCPIP Illustrated, Volume 1, The Protocols
- [ ] Network Programming

## 人类语言

### 英语

- 单词 App
- [x] 重背单词
- [x] 英语语法新思维 中级教程：通悟语法
- [x] 英语语法新思维 高级教程：驾驭语法
- [ ] 英语一
- [ ] 英语短语合集

### 多邻国

- [x] 英语
- [x] 粤语
- [ ] 西语 弹舌

## 最大的问题

### 孤独

- 陪伴父母

### 焦虑耐受

### 失策与遗憾

没有回老家生活。

## 其他

### 闲书

- [x] [把时间当作朋友](https://github.com/xiaolai/time-as-a-friend)
- [ ] [Wild World: Photographing Iconic Wildlife](https://www.goodreads.com/book/show/62823910-wild-world)

### 健康

- 新冠、病毒性肠胃炎躺了近一个月，处理口腔毛病

### 影视

#### 音乐剧

#### 音乐

### 杂活儿

- [x] 打字训练 81
- [x] 流氓哨

### 支出

离职前我按照以往的消费水平做了预估，那时候我认为既有的支出水平是完全可以接受的，哪怕 gap 个一年两年。但是人算不如天算，由于多了不少意外支出，最后的数额是预估的两倍。写到这里我差点晕过去了。

失去工资之后我唯一的收入是“理财”收入（此处加引号是因为仓位实在是太小了），在 A 股与基金打滚与刀口舔血无异，不亏钱我已倍加感恩。这一年多的收益是：

- 微微超过两万人民币
- 收益率为 25%+

### 风险

#### 生病？

#### 过时？

---

::: info 纪念

- 今天是愚人节。在这样的大环境里，主动 gap 确实算挺愚的，我愚我自己。
- 🕯️ 今天还是张国荣去世二十一周年。最近几年陆续地听他的歌、看他的电影以及一些采访片段，慢慢理解为什么会有那么多人那么地喜欢他了。

:::

::: details Humpbacks' Gap Time

![Humpback Leaping](./humpback-leaping.jpg "Permitted under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) (image resized). © [**Robin Gwen Agarwal**](https://www.inaturalist.org/people/anudibranchmom). [*inaturalist.org*](https://www.inaturalist.org/photos/158479000).")

:::

- <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9257586/>
- <https://www.inaturalist.org/photos/158479000>

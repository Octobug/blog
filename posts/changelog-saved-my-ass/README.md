---
date: 2024-10-24
spot: 汉京中心
sort: Computer Science
tags:
  - Node.js
  - OpenSSL
  - CVE
draft: true
---

# Changelog 救我狗命

![MS220 Log 368, Log of the ship Susan](./ms220-log368-0369.jpg "Permitted under [PDM 1.0](https://creativecommons.org/publicdomain/mark/1.0/) (cropped). © **Reuben Russell**. [*archive.org*](https://archive.org/details/ms220log368/page/n369/mode/2up).")

## 如果是你，你会怎么做？

某天，我负责的一个后端服务突然出现“随机”崩溃。

- 由于容器编排工具有自动重启机制，服务会在很短的时间内自动恢复；
- 但因为服务崩溃，即使故障的时间很短也导致了大量请求无法正常处理。

我通过容器 ID 找到了进程崩溃前最后的日志，并定位到相关的代码。进程在抛出 `ERR_SSL_WRONG_PUBLIC_KEY_TYPE` 错误之后退出，并且：

- 触发这个错误的代码写在 `try...catch` 之中
- 并不是每次执行到那一行代码都会触发错误
- 尝试了各种方法都没能在开发环境复现故障

更加不幸的是，无论是 Google 还是 GitHub，都搜不到这个具体错误相关的信息。也就是说，这个问题很可能没有现成的排错方案可以参考。

![No Google results](./no-google-results.jpg "Google 没有这个错误码的相关信息")

![No GitHub results](./no-github-results.jpg "GitHub 也没有，相关信息都是我后来提交的")

### 是新引用的第三方库有问题吗？

既然已经定位到出问题的代码，我开始怀疑是新引入的第三方库有问题。但是，这个库在其他服务中已经使用了很长时间，我询问了其他服务的负责人 `@Tony`，确认没有出现过类似的问题。

不过确实也存在差异：Node.js 大版本和第三方库的版本和另外一个服务都不同。在没有更多时间调研的前提下，此时还有这几个选项：

1. 降级第三方库版本为表现正常的版本
2. 升级解释器版本为表现正常的版本
3. 下架新上线的代码

基于项目的工程现状，直接升级解释器的大版本不现实，可能会引入其他问题；而新上线不久的代码是一个重要的功能，下架会影响业务。

所以我尝试降级第三方库版本，但是在观察了几个小时后，相同的故障又出现了。

### 处理 `uncaughtException` 并从中恢复？

然而这并不是 `process.on("uncaughtException", fn)` 的正确用法[^nodejs_uncaught]：

[^nodejs_uncaught]: [Warning: Using `'uncaughtException'` correctly](https://nodejs.org/docs/latest-v22.x/api/process.html#process_warning_using_uncaughtexception_correctly)

> Attempting to resume normally after an uncaught exception can be similar to pulling out the power cord when upgrading a computer. Nine out of ten times, nothing happens. But the tenth time, the system becomes corrupted.
>
> The correct use of `'uncaughtException'` is to perform synchronous cleanup of allocated resources (e.g. file descriptors, handles, etc) before shutting down the process. **It is not safe to resume normal operation after `'uncaughtException'`**.

而且，C++ 层的错误，JavaScript 层不一定能捕获[^exceptions_vs_errors]。

> Some exceptions are *unrecoverable* at the JavaScript layer. Such exceptions will *always* cause the Node.js process to crash. Examples include `assert()` checks or `abort()` calls in the C++ layer.

[^exceptions_vs_errors]: [Exceptions vs. errors](https://nodejs.org/docs/latest-v22.x/api/errors.html#exceptions-vs-errors)

## 在 Changelog 中寻找线索

### 旧事重提

在很多年前，我遇到过另一个类似的问题。

当时，我负责的一个服务在长时间的运行后，进程的连接数会逐渐增加，而这个连接数的增加规律并不符合预期。

在排查很多原因之后，同样定位到了具体的代码位置。问题就在于，代码写法看起来没有任何问题，写法和官方样例没什么差别。由于没有更多的时间去做深入的追踪，我只能先记录下排查进展，然后继续其他的工作。

在一次解释器升级之后大约过了十来天，我偶然发现连接数异常的现象消失了。通过历史监控数据可以大致确定，这个问题的修复和解释器升级直接相关。

后来我去看了对应版本 Node.js HTTP 模块所有相关的 Changelog，找到了疑似的故障源头：[Reusing HTTP connection lead to no destroy triggered](https://github.com/nodejs/node/issues/19859)

### 缩小查找范围

- 上文提到的另一个服务没出故障，假设真的是解释器本身的问题，那么它的解释器版本大概率已经包含了相应的修复
- `ERR_SSL_WRONG_PUBLIC_KEY_TYPE` 这个错误非常大可能和 [Crypto](https://nodejs.org/docs/latest-v22.x/api/crypto.html) 模块有关

于是，相关的 Changelog 锁定在：[node/doc/changelogs/CHANGELOG_V18.md](https://github.com/nodejs/node/blob/fa8f149c0a4f1d7f9b1de64ea2a6e2d2e38143af/doc/changelogs/CHANGELOG_V18.md)

我花了一个小时多查看和 Crypto 模块相关的近 200 条变更记录，最后在里面找到高度疑似的修复：[CVE-2023-23919: Node.js OpenSSL error handling issues in nodejs crypto library (Medium)](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-23919)

> A cryptographic vulnerability exists in Node.js <19.2.0, <18.14.1, <16.19.1, <14.21.3 that in some cases did does not clear the OpenSSL error stack after operations that may set it. This may lead to false positive errors during subsequent cryptographic operations that happen to be on the same thread. This in turn could be used to cause a denial of service.

找到了！看起来这个描述和我遇到的故障一模一样。进一步查看这个问题的相关发布及修复：

- [Node.js OpenSSL error handling issues in nodejs crypto library (Medium) (CVE-2023-23919)](https://nodejs.org/en/blog/vulnerability/february-2023-security-releases/#nodejs-openssl-error-handling-issues-in-nodejs-crypto-library-medium-cve-2023-23919)
- [crypto: clear OpenSSL error on invalid ca cert](https://github.com/nodejs/node/commit/004e34d046)

这个 bug 早已被修复，所以有对应的修复版本解释器，不需要跨大版本升级。在我们将解释器升级到对应的修复版之后，故障消失了。

## Cover

::: details *Log of the ship Susan*

The “Nantucket Sleigh Ride” pictured in the log of the ship Susan kept by Reuben Russell (1841–1846).

> The 19th-century whale hunt was a brutal business, awash with blubber, blood, and the cruel destruction of life. But between the frantic calls of “there she blows!”, there was plenty of time for creation too.
>
> From [*The Art of Whaling*](https://publicdomainreview.org/essay/the-art-of-whaling/) by [**Jessica Boyall**](https://publicdomainreview.org/contributors/#jessica-boyall)

:::

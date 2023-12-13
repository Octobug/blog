---
date: 2019-12-18
location: 深圳 粤海街道大冲社区
sort: Computer Science
tags:
  - Network
  - HTTPS
  - curl
  - OpenSSL
---

# 一次 ADAS 设备上的 HTTPS 排障过程

<!-- ![Spinner Dolphin](./long-snouted-spinner-dolphin-spin-cycle.jpg) -->
:::info
I'm requesting permission to use the photo.
:::

> 有一批设备总是软件升级失败，你看一下是怎么回事？

## 背景

这批设备是近期出货到某地的后装 ADAS [[1]] 产品，软件升级功能通过一个自研的运维平台实现。

::: warning “后装”？

- **后装**：指在汽车完成制造出厂后，额外安装非原厂配备的系统。行车记录仪就是常见的后装产品。
- **前装**：与后装相对应，即在整车设计制造阶段、汽车出厂之前集成安装。

目前没找到精确的定义，对应的英文单词可能是 "factory-installed" 与 "aftermarket"。
:::

### 车载设备网络环境

目前车载设备联网方式一般有两种：

1. 通过物联网卡直接上网
2. 通过其他车载设备代理上网

这批设备的联网方式是第二种。

### 具体故障

设备在交付后很长一段时间内往往会有升级软件的需求。这个故障是在升级软件时，运维平台总是报如下错误而无法安装升级。

::: danger Error
exit status 60
:::

这个错误码是设备端软件调用 [curl](https://curl.se/) 从运维平台下载软件包时的退出码。下载软件包是通过 HTTPS 协议，而调试时用的远程技术支持工具走的是其他网络协议，所以即使设备通过 HTTPS 不能正常下载文件，这个工具还是能正常工作。

对于熟悉 curl 相关工具链的软件/网络工程师来说，可能很快就能凭经验定位出原因。而我接手这个平台才两三个月，此前也很少处理这类问题，这个重要且有点紧急的故障着实让我头疼。

## 分析

这个软件升级功能相关的代码我没怎么看过，从 Git 记录能看出这套功能是我的直属 leader 很多年前实现的，所以先找他说了这个故障，请他大致给我讲解整个升级流程。了解升级流程之后便开始了繁琐的排查过程。

### curl 的报错

curl 的 `exit status 60` 退出码是 CA 证书 [[2]] 验证错误 [[3]]，结合设备所处网络环境，可能导致这个错误的因素非常多。比如：

- **设备端**
  - 操作系统时钟
  - CA 证书文件 (`cacert.pem` [[4], [5]])
  - 嵌入式软件（嵌入式软件有时会对系统网络做特殊的配置）
- **设备到服务器的网络链路**
  - 网络代理设备（据同事说，这批设备是通过部标一体机 [[6]] 代理上网）
  - 物联网运营商
  - 服务器所在的云服务商
- **平台服务器**
  - 操作系统网络配置
  - 反向代理服务器 NGINX 的 TLS/SSL 配置 [[7]]

这些设备的操作系统是 Linux，只能通过命令行操作。并且因为是嵌入式设备，能用的命令行工具比较有限。好在错误能稳定复现，而且出错的设备是同一批，软件、网络条件一致，所以有足够的环境来逐步试验排除无关因素。

**设备到服务器的网络链路**属于难以触及的环境，所以我把排查优先级放得比较低。

### 排除设备因素

#### 操作系统时钟

curl 在验证服务器证书的过程中，需要用到系统的当前时间 [[8]]，比如会检查当前时间是否在证书有效期范围内。然而我抽查了几台，系统时间都是正确的。

#### CA 证书文件

#### 嵌入式软件

这些设备在几天前有过成功的软件升级记录。

### 排除平台服务因素

既然故障设备是同一批，那么应该是由同样的因素造成。我在公司找了台相同型号的测试机，安装相同版本的软件，并且使用相同的联网方式。但是并不能复现问题。也许可能有其他差异点我没考虑到，不过从直觉上我认为，既然不能复现，那平台服务出问题的概率比较小。

### SSL

#### 协议握手过程

#### OpenSSL 调试工具

- <https://badssl.com/>

## References

1. [Advanced driver-assistance system][1]. *wikipedia.org*.
2. [Certificate authority - Issuing a certificate][2]. *wikipedia.org*.
3. [curl.1 the man page - Exit codes][3]. *curl.se*.
4. [CA certificates extracted from Mozilla][4]. *curl.se*.
5. [What is a Pem file and how does it differ from other OpenSSL Generated Key File Formats? - Answered by `@sysadmin1138`][5]. *serverfault.com*.
6. [搜狗百科 - 部标一体机][6]. *baike.sogou.com*.
7. [Configuring HTTPS servers][7]. *nginx.org*.
8. [What role does clock synchronization play in SSL communcation - Answered by `@Thomas Pornin`][8]. *security.stackexchange.com*.
9. [Ocean Wildlife: Spinner Dolphins][20]. *wildandwonderful.org*.

[1]: <https://en.wikipedia.org/wiki/Advanced_driver-assistance_system>
[2]: <https://en.wikipedia.org/wiki/Certificate_authority#Issuing_a_certificate>
[3]: <https://curl.se/docs/manpage.html>
[4]: <https://curl.se/docs/caextract.html>
[5]: <https://serverfault.com/a/9717/553550>
[6]: <https://baike.sogou.com/v63216644.htm>
[7]: <https://nginx.org/en/docs/http/configuring_https_servers.html>
[8]: <https://security.stackexchange.com/a/72871/255451>
[20]: <https://www.wildandwonderful.org/spinner-dolphins>

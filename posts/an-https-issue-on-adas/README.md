---
date: 2019-12-18
location: 深圳 创维半导体设计大厦西座
sort: Computer Science
tags:
  - Network
  - HTTPS
  - curl
  - OpenSSL
---

# [WIP] 一次 ADAS 设备上的 HTTPS 排障过程

:::info
I'm requesting permission to use the copyrighted content.
:::

<!-- ![Spinner Dolphin](../../temp/long-snouted-spinner-dolphin-spin-cycle.jpg "Used with permission from *[wildandwonderful.org]([wildandwonderful.org](https://www.wildandwonderful.org/))*.") -->

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

“设备到服务器的网络链路”属于难以触及的环境，我把它的排查优先级放得比较低。

## 试验

### 排除平台服务因素

既然故障设备是同一批，那么应该是由同样的因素造成。我在公司找了台相同型号的测试机，安装相同版本的软件，并且使用相同的联网方式。但是并不能复现问题。也许可能有其他差异点我没考虑到，不过从直觉上我认为，既然不能复现，那平台服务出问题的概率比较小。

### 排除设备因素

curl 在验证服务器证书的过程中，需要用到系统的当前时间 [[8]]，比如会检查当前时间是否在证书有效期范围内。然而我抽查了几台，系统时间都是正确的。

设备调用 curl 访问服务器时用 `--cacert` 指定了 CA 证书文件，也许是证书文件不对，或者是 curl 版本有问题？我检查了 curl 版本，并使用 `md5sum` 对比证书文件和可执行文件，这些也都是正确的。

这两项可疑的因素都排除了，只能从 curl 的执行结果入手。设备端调用 curl 从平台下载文件的命令大概是这样的（此处省略无关参数）：

```sh
$ curl --cacert /path/to/cacert.pem 'https://platform.domain/path/to/package'

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed

  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying IP.IP.IP.IP...
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (60) SSL certificate problem: self signed certificate
More details here: https://curl.haxx.se/docs/sslcerts.html

curl performs SSL certificate verification by default, using a "bundle"
 of Certificate Authority (CA) public keys (CA certs). If the default
 bundle file isn't adequate, you can specify an alternate file
 using the --cacert option.
If this HTTPS server uses a certificate signed by a CA represented in
 the bundle, the certificate verification probably failed due to a
 problem with the certificate (it might be expired, or the name might
 not match the domain name in the URL).
If you'd like to turn off curl's verification of the certificate, use
 the -k (or --insecure) option.
exit status 60
```

前面提到平台端记录的错误退出码，从这里可以看到更详细的错误信息 "curl: (60) SSL certificate problem: self signed certificate"。运维平台的 SSL 证书是正常购买的，这个“自签名证书”从何而来？如果使用 `-k` 忽略 SSL 证书的验证呢？

```sh
$ curl -k --cacert /path/to/cacert.pem 'https://platform.domain/path/to/package'

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed

  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying IP.IP.IP.IP...
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (60) SSL certificate problem: unable to get local issuer certificate
...
# 原稿没有记录这个细节，这个结果是从网上搜索补充的，应该没记错。
```

虽然使用 `-k` 会忽略证书验证过程，但因为指定了 HTTPS 协议，数据传输仍然需要加密 [[9]]。这个结果想来也合理，一个来路不明的自签名证书，本地的 CA 证书哪会有对应证书颁发机构的信息，所以验证不通过很正常。

以上种种迹象看起来很像是访问到了错误的服务器。所以我用 `ping` 命令看是不是域名解析出错了，结果显示域名解析也是正常的。

我不得不又怀疑是嵌入式软件对网络请求做了转发。嵌入式同事表示没有这种操作，前面公司的测试机用相同版本的软件也确实一切正常。这样看，设备端出问题的概率也比较小。我再次检查了服务器的设备访问日志，对应时间内也没有故障设备的访问记录。

排除到这里，只剩“设备到服务器的网络链路”了，既不是设备的问题，也不是服务器的问题。但是我没有更坚实的证据，如何说服客户？

### SSL

从上面 curl 的报错看，错误发生在 SSL 证书验证过程 [[10]]，先尝试用 `--verbose` 选项看看其详细过程。

```sh
$ curl --verbose ...

* Added platform.domain:443:IP.IP.IP.IP to DNS cache
* Hostname platform.domain was found in DNS cache
*   Trying IP.IP.IP.IP...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed

  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0* Connected to platform.domain (IP.IP.IP.IP) port 443 (#0)
* libcurl is now using a weak random seed!
* ALPN, offering http/1.1
* Cipher selection: ALL:!EXPORT:!EXPORT40:!EXPORT56:!aNULL:!LOW:!RC4:@STRENGTH
* successfully set certificate verify locations:
*   CAfile: /data/ssl/curl-cacert.pem
  CApath: none
* TLSv1.2 (OUT), TLS header, Certificate Status (22):
} [5 bytes data]
* TLSv1.2 (OUT), TLS handshake, Client hello (1):
} [512 bytes data]
* TLSv1.2 (IN), TLS handshake, Server hello (2):
{ [109 bytes data]
* TLSv1.2 (IN), TLS handshake, Certificate (11):
{ [521 bytes data]
* TLSv1.2 (OUT), TLS alert, Server hello (2):
} [2 bytes data]
* SSL certificate problem: self signed certificate

  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
* Closing connection 0
} [5 bytes data]
* TLSv1.2 (OUT), TLS alert, Client hello (1):
} [2 bytes data]
curl: (60) SSL certificate problem: self signed certificate
...
```

从上面的输出可以看到在 TLS 的握手过程中，有一步提示 "SSL certificate problem: self signed certificate"，之后客户端主动关闭了连接。但是，并不能看出客户端为什么会收到错误的证书信息，甚至连这个错误的证书是什么样也不知道。

#### SSL 握手过程

>>>>> pending

#### OpenSSL 调试工具

>>>>> pending

到这里我才想到用 curl 访问 baidu.com 试试看。前面我用 ping 命令测试访问了几个大网站，结果都正常之后就直接沉浸到 curl 的异常表现里。

## 结论

设备的上网代理被设置了这样的流量转发规则：“是 443 端口就转！”至于请求具体被如何篡改以及被转到哪里去就不得而知了。

这样的故障对有经验的工程师来说可能是一眼看穿，假如是发生在浏览器环境也相对更容易排查，因为浏览器的提示更加直观。但是发生在嵌入式设备上，对于一个没有相关经验的新手来说，能定位出来真的很考验耐心和运气。

SSL 协议相当复杂，哪怕只是配置使用 SSL 证书也很容易出错。这里有个网站展示了各种各样的 SSL 错误，供学习参考：<https://badssl.com/>

::: details 是海豚就转！

题图 [[20]] 是**一只**海豚跳跃出水面旋转的全过程合成图，这种海豚叫飞旋海豚 (Spinner Dolphin) [[21]]。

>>>>> pending

:::

## References

1. [Advanced driver-assistance system][1]. *wikipedia.org*.
2. [Certificate authority - Issuing a certificate][2]. *wikipedia.org*.
3. [curl.1 the man page - Exit codes][3]. *curl.se*.
4. [CA certificates extracted from Mozilla][4]. *curl.se*.
5. [What is a Pem file and how does it differ from other OpenSSL Generated Key File Formats? - Answered by `@sysadmin1138`][5]. *serverfault.com*.
6. [搜狗百科 - 部标一体机][6]. *baike.sogou.com*.
7. [Configuring HTTPS servers][7]. *nginx.org*.
8. [What role does clock synchronization play in SSL communcation - Answered by `@Thomas Pornin`][8]. *security.stackexchange.com*.
9. [curl - Is data encrypted when using the --insecure option? - Answered by `@Filip Roséen`][9]. *stackoverflow.com*.
10. [SSL Certificate Verification][10]. *curl.se*.
11. [Ocean Wildlife: Spinner Dolphins][20]. *wildandwonderful.org*.

[1]: <https://en.wikipedia.org/wiki/Advanced_driver-assistance_system>
[2]: <https://en.wikipedia.org/wiki/Certificate_authority#Issuing_a_certificate>
[3]: <https://curl.se/docs/manpage.html>
[4]: <https://curl.se/docs/caextract.html>
[5]: <https://serverfault.com/a/9717/553550>
[6]: <https://baike.sogou.com/v63216644.htm>
[7]: <https://nginx.org/en/docs/http/configuring_https_servers.html>
[8]: <https://security.stackexchange.com/a/72871/255451>
[9]: <https://stackoverflow.com/a/8520236/7267801>
[10]: <https://curl.se/docs/sslcerts.html>
[20]: <https://www.wildandwonderful.org/spinner-dolphins>

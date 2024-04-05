---
date: 2019-12-18
spot: 创维半导体设计大厦西座
sort: Computer Science
tags:
  - Network
  - HTTPS
  - curl
  - SSL/TLS
  - OpenSSL
---

# 一次 ADAS 设备上的 HTTPS 排障过程

![Spinner Dolphin](./spinner-dolphin.jpg "Permitted by © [**Richard Barrett**](https://www.wildandwonderful.org/). [*wildandwonderful.org*](https://www.wildandwonderful.org/spinner-dolphins).")

> 有一批设备总是软件升级失败，你看一下是怎么回事？

## 背景

这批设备是近期出货到某地的后装 ADAS[^adas] 产品，软件升级功能通过一个自研的运维平台实现。

[^adas]: [Advanced driver-assistance system](https://en.wikipedia.org/wiki/Advanced_driver-assistance_system)

::: warning “后装”？

- **后装**：指在汽车完成制造出厂后，额外安装非原厂配备的系统。行车记录仪就是常见的后装产品。
- **前装**：与后装相对应，即在整车设计制造阶段、汽车出厂之前集成安装。

目前没找到精确的定义，对应的英文单词可能是 "factory-installed" 与 "aftermarket"。
:::

### 车载设备网络环境

本文其实和 ADAS 关系不大，主要和 ADAS 所处的网络环境有关。目前车载设备联网方式一般有两种：

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

curl 的 `exit status 60` 退出码是 CA 证书[^issue_a_cert]验证错误[^curl_exit_codes]，结合设备所处网络环境，可能导致这个错误的因素非常多。比如：

[^issue_a_cert]: [Certificate authority - Issuing a certificate](https://en.wikipedia.org/wiki/Certificate_authority#Issuing_a_certificate)
[^curl_exit_codes]: [curl.1 the man page - Exit codes](https://curl.se/docs/manpage.html)

- **设备端**
  - 操作系统时钟
  - CA 证书文件 `cacert.pem`[^cacert][^cert_formats]
  - 嵌入式软件（嵌入式软件有时会对系统网络做特殊的配置）
- **设备到服务器的网络链路**
  - 网络代理设备（据同事说，这批设备是通过部标一体机[^bubiaoji]代理上网）
  - 物联网运营商
  - 服务器所在的云服务商
- **平台服务器**
  - 操作系统网络配置
  - 反向代理服务器 NGINX 的 SSL/TLS 配置[^nginx_ssltls]

[^cacert]: [CA certificates extracted from Mozilla](https://curl.se/docs/caextract.html)
[^cert_formats]: [What is a Pem file and how does it differ from other OpenSSL Generated Key File Formats? - Answered by `@sysadmin1138`](https://serverfault.com/a/9717/553550)
[^bubiaoji]: [部标一体机](https://baike.sogou.com/v63216644.htm)
[^nginx_ssltls]: [Configuring HTTPS servers](https://nginx.org/en/docs/http/configuring_https_servers.html)

这些设备的操作系统是 Linux，只能通过命令行操作。并且因为是嵌入式设备，能用的命令行工具比较有限。好在错误能稳定复现，而且出错的设备是同一批，软件、网络条件一致，所以有足够的环境来逐步试验排除无关因素。

“设备到服务器的网络链路”属于难以触及的环境，我把它的排查优先级放得比较低。

## 试验

### 排除平台服务因素

既然故障设备是同一批，那么应该是由同样的因素造成。我在公司找了台相同型号的测试机，安装相同版本的软件，并且使用相同的联网方式。但是并不能复现问题。也许是有其他差异点我没考虑到，不过从直觉上我认为，既然不能复现，那平台服务出问题的概率比较小。

### 排除设备因素

curl 在验证服务器证书的过程中，需要用到系统的当前时间[^ssl_clock]，比如会检查当前时间是否在证书有效期范围内。然而我抽查了几台，系统时间都是正确的。

[^ssl_clock]: [What role does clock synchronization play in SSL communcation - Answered by `@Thomas Pornin`](https://security.stackexchange.com/a/72871/255451)

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

前面提到平台端记录的错误退出码，从这里可以看到更详细的错误信息 `curl: (60) SSL certificate problem: self signed certificate`。运维平台的 SSL 证书是正常购买的，这个“自签名证书”从何而来？如果使用 `-k` 忽略 SSL 证书的验证呢？

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

虽然使用 `-k` 会忽略证书验证过程，但因为指定了 HTTPS 协议，数据传输仍然需要加密[^curl_insecure]。这个结果想来也合理，一个来路不明的自签名证书，本地的 CA 证书哪会有对应证书颁发机构的信息，所以验证不通过很正常。

[^curl_insecure]: [curl - Is data encrypted when using the --insecure option? - Answered by `@Filip Roséen`](https://stackoverflow.com/a/8520236/7267801)

以上种种迹象看起来很像是访问到了错误的服务器。所以我用 `ping` 命令看是不是域名解析出错了，结果显示域名解析也是正常的。

我不得不又怀疑是嵌入式软件对网络请求做了转发。嵌入式同事表示没有这种操作，前面公司的测试机用相同版本的软件也确实一切正常。这样看，设备端出问题的概率也比较小。我再次检查了服务器的设备访问日志，对应时间内也没有故障设备的访问记录。

排除到这里，只剩“设备到服务器的网络链路”了，既不是设备的问题，也不是服务器的问题。但是我没有更坚实的证据，如何说服客户？

### SSL/TLS

SSL 是 TLS 的旧称[^sslcerts]。从上面 curl 的报错看，错误发生在证书验证阶段[^sslcerts]，先尝试用 `--verbose` 选项看看其详细过程。

[^sslcerts]: [SSL Certificate Verification](https://curl.se/docs/sslcerts.html)

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

从以上输出可以看到在 TLS 握手过程中，有一步提示 `SSL certificate problem: self signed certificate`，之后客户端主动关闭了连接。但是，并不能看出客户端为什么会收到错误的证书信息，甚至连这个错误的证书是什么样也不知道。

#### SSL/TLS 握手过程

TLS 连接建立之前也有和 TCP 三次握手[^tcp_handshake][^tcp]相似的过程，只不过要复杂一些。既然证书验证是发生在这个阶段，就不得不了解这个过程中到底发生了什么，具体到哪一步出了问题。

[^tcp_handshake]: [TCP handshake](https://developer.mozilla.org/en-US/docs/Glossary/TCP_handshake)
[^tcp]: [RFC 793 (TRANSMISSION CONTROL PROTOCOL) - 3.4. Establishing a connection](https://datatracker.ietf.org/doc/html/rfc793#section-3.4)

TLS `v1.2` 握手的完整消息流[^handshake_flow]如下，可以看到在经过 4 个箭头之后才开始传输应用数据，比 TCP 多了一次握手：

[^handshake_flow]: [RFC 5246 (The Transport Layer Security (TLS) Protocol Version 1.2) - 7.3. Handshake Protocol Overview](https://datatracker.ietf.org/doc/html/rfc5246#section-7.3)

```txt
      Client                                               Server

      ClientHello                  -------->
                                                      ServerHello
                                                     Certificate*
                                               ServerKeyExchange*
                                              CertificateRequest*
                                   <--------      ServerHelloDone
      Certificate*
      ClientKeyExchange
      CertificateVerify*
      [ChangeCipherSpec]
      Finished                     -------->
                                               [ChangeCipherSpec]
                                   <--------             Finished
      Application Data             <------->     Application Data

             Figure 1.  Message flow for a full handshake
```

结合以上的 `curl --verbose` 输出以及这个消息流图，出错应该是在 `CertificateVerify*` 步骤。有没有什么办法可以观察这个步骤的细节？

#### OpenSSL 调试工具

我通过这个贴子找到了 OpenSSL 的客户端调试工具 `openssl s_client`：

[How to debug SSL handshake using cURL? - Answered by `@Christian Davén`](https://stackoverflow.com/a/22814663/7267801). *stackoverflow.com*.

这个命令可以直接在设备上观察 TLS 握手过程：

```sh
$ openssl s_client -connect platform.domain:443

depth=0 C = aa, L = Default City, O = Default Company Ltd
verify error:num=18:self signed certificate
verify return:1
depth=0 C = aa, L = Default City, O = Default Company Ltd
verify error:num=10:certificate has expired
notAfter=Jul 18 11:22:50 2017 GMT
verify return:1
depth=0 C = aa, L = Default City, O = Default Company Ltd
notAfter=Jul 18 11:22:50 2017 GMT
verify return:1
CONNECTED(00000003)
---
Certificate chain
 0 s:/C=aa/L=Default City/O=Default Company Ltd
   i:/C=aa/L=Default City/O=Default Company Ltd
---
Server certificate
-----BEGIN CERTIFICATE-----
MIIB+zCCAWQCCQDfkfPK0EYYmDANBgkqhkiG9w0BAQUFADBCMQswCQYDVQQGEwJh
DATA-MASKING-DATA-MASKING-DATA-MASKING-DATA-MASKING-DATA-MASKING
DATA-MASKING-DATA-MASKING-DATA-MASKING-DATA-MASKING-DATA-MASKING
DATA-MASKING-DATA-MASKING-...-DATA-MASKING-DATA-MASKING-==
-----END CERTIFICATE-----
subject=/C=aa/L=Default City/O=Default Company Ltd
issuer=/C=aa/L=Default City/O=Default Company Ltd
---
No client certificate CA names sent
Peer signing digest: SHA512
Server Temp Key: ECDH, P-256, 256 bits
---
SSL handshake has read 1058 bytes and written 433 bytes
---
New, TLSv1/SSLv3, Cipher is ECDHE-RSA-AES256-GCM-SHA384
Server public key is 1024 bit
Secure Renegotiation IS supported
No ALPN negotiated
SSL-Session:
    Protocol  : TLSv1.2
    Cipher    : ECDHE-RSA-AES256-GCM-SHA384
    Session-ID: D8156AD7E345B4C744EFCBC6A9C3D75DB2D291307F916654021CC2E8AD856093
    Session-ID-ctx: 
    Master-Key: 76A79F0630CD26992C802C32BB261C462DA6E45960B1E1629941B137247F151E69CE2975533AA30E8BA11403CDE81240
    Key-Arg   : None
    PSK identity: None
    PSK identity hint: None
    TLS session ticket lifetime hint: 300 (seconds)
    TLS session ticket:
    0000 - 75 55 17 c6 6d b4 82 38-56 68 a8 1d 97 5a de a0   uU..m..8Vh...Z..
    0010 - e0 f7 1f 42 27 2d 85 8d-9e 55 78 5c 71 07 47 18   ...B'-...Ux\q.G.
    0020 - 46 26 db 75 6e 63 53 b5-6e cc 64 87 a9 35 70 fa   F&.uncS.n.d..5p.
    0030 - 1b 19 23 3c 0f c0 ec 76-90 e8 a8 ee 17 4f d0 7a   ..#<...v.....O.z
    0040 - 3a ad 8b 0b 09 d1 ac 01-9c a9 23 5c d1 db 88 21   :.........#\...!
    0050 - 4d 69 2f c5 df 5b 37 b3-b9 6d ff 10 19 1f dd c5   Mi/..[7..m......
    0060 - a5 51 99 65 c9 2b d7 9e-f9 cd cb cd 43 04 51 e2   .Q.e.+......C.Q.
    0070 - 2c 4a dd b2 8d 1e 23 ed-eb e9 a3 b7 c2 3a 9c bf   ,J....#......:..
    0080 - 85 06 65 94 33 06 72 1d-f4 b2 e6 d0 4a b6 43 9e   ..e.3.r.....J.C.
    0090 - 6c 1a a2 75 67 b7 47 d0-67 be 97 5b c5 68 7c 61   l..ug.G.g..[.h|a
    00a0 - 11 2a 24 54 0d 47 3a cb-93 43 eb e1 a3 37 9b de   .*$T.G:..C...7..

    Start Time: 1576571529
    Timeout   : 300 (sec)
    Verify return code: 10 (certificate has expired)
---
DONE
```

终于看到这个莫名其妙的自签名证书了，运维平台正确的证书链是这样的：

```txt
Certificate chain
 0 s:/OU=Domain Control Validated/CN=*.platform.domain
   i:/C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./OU=http://certs.godaddy.com/repository//CN=Go Daddy Secure Certificate Authority - G2
 1 s:/C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./OU=http://certs.godaddy.com/repository//CN=Go Daddy Secure Certificate Authority - G2
   i:/C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./CN=Go Daddy Root Certificate Authority - G2
 2 s:/C=US/ST=Arizona/L=Scottsdale/O=GoDaddy.com, Inc./CN=Go Daddy Root Certificate Authority - G2
   i:/C=US/O=The Go Daddy Group, Inc./OU=Go Daddy Class 2 Certification Authority
 3 s:/C=US/O=The Go Daddy Group, Inc./OU=Go Daddy Class 2 Certification Authority
   i:/C=US/O=The Go Daddy Group, Inc./OU=Go Daddy Class 2 Certification Authority
```

显然，请求确实被转发到了某个神秘服务器，返回了那个奇怪的自签名证书。我还尝试增加选项 `-state -bugs -showcerts -tlsextdebug` 提取更多输出，但它们没有提供更有用的信息。

既然请求被转发，那必然有相应的转发规则，如果能确定转发规则就可以跟客户交代了。到这里我才想到：访问别人家的网站，证书验证会有问题吗？排查早期我用 `ping` 命令测试访问了几个大网站的域名，结果都正常。这给了我设备访问别人家网站没问题的错觉，之后就直接沉浸到 curl 的异常表现里。

```sh
$ openssl s_client -connect www.qq.com:443

depth=0 C = aa, L = Default City, O = Default Company Ltd
verify error:num=18:self signed certificate
verify return:1
depth=0 C = aa, L = Default City, O = Default Company Ltd
verify error:num=10:certificate has expired
notAfter=Jul 18 11:22:50 2017 GMT
verify return:1
depth=0 C = aa, L = Default City, O = Default Company Ltd
notAfter=Jul 18 11:22:50 2017 GMT
verify return:1
CONNECTED(00000003)
---
Certificate chain
 0 s:/C=aa/L=Default City/O=Default Company Ltd
   i:/C=aa/L=Default City/O=Default Company Ltd
---
Server certificate
-----BEGIN CERTIFICATE-----
...
...
---
DONE
```

访问 qq.com 的结果竟然和访问运维平台一模一样。其实到这一步已经 100% 确认和平台服务无关了，只是具体的转发规则还没确定。

这两个命令有什么不同？

```sh
$ openssl s_client -connect platform.domain:443 # [!code --]
$ openssl s_client -connect www.qq.com:443      # [!code ++]
...
```

没错，只有域名不一样。所以我改掉域名，随便写了个 ping 不可达的 IP: `openssl s_client -connect 33.22.22.11:443`

😅 响应结果一模一样。

至此，流量转发规则也可以确认了。用 curl 访问 `33.22.22.11:443` 的结果：

```sh
$ curl "33.22.22.11:443"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed

  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100   271  100   271    0     0  12119      0 --:--:-- --:--:-- --:--:-- 67750
<html>
<head><title>400 The plain HTTP request was sent to HTTPS port</title></head>
<body bgcolor="white">
<center><h1>400 Bad Request</h1></center>
<center>The plain HTTP request was sent to HTTPS port</center>
<hr><center>nginx/1.10.1</center>
</body>
</html>
```

## 结论

设备的上网代理被设置了这样的流量转发规则：“是 443 端口就转！”至于请求有没有被篡改以及被转到哪里去就不得而知了。

这样的故障对有经验的工程师来说可能是一眼看穿，假如发生在浏览器环境也相对更容易排查，因为浏览器的提示更加直观。但是发生在嵌入式设备上，对于一个没有相关经验的新手来说，能定位出来真的很考验耐心。还有运气。

SSL 协议相当复杂，哪怕只是配置使用证书也很容易出问题。有个网站展示了各种各样的 SSL 错误，供学习参考：<https://badssl.com/>

## Cover

::: details 是海豚就转

封面图是一只海豚跳跃出水面旋转的全过程合成图。

这种海豚叫飞旋海豚 (Spinner Dolphin)[^spinner]，因喜欢飞跃出水面旋转而得名。一次完整的旋转跳跃如下图：

[^spinner]: [Spinner dolphin](https://en.wikipedia.org/wiki/Spinner_dolphin)

![Spinner Dolphin](./spinner-dolphin.gif "Permitted under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/). © [**Dennis Rabeling**](https://www.inaturalist.org/people/dennisthediver). [*inaturalist.org*](https://www.inaturalist.org/photos/177838721).")

:::

---
date: 2019-12-15
spot: 大冲新城花园
sort: Computer Science
tags:
  - Network
  - iptables
  - NAT
  - TCP
  - MySQL
  - Unix domain socket
---

# 慎用 iptables：误用规则引发的疑问

![BCY0349 Masquerade](./bcy0094.jpg "Permitted under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) (brightness adjusted). © [**Debbie Patton**](https://happywhale.com/user/3248). [*happywhale.com*](https://happywhale.com/individual/18392).")

昨天去了一趟广州。在深圳安检排队时微信突然来了一串消息：

> 有个 Web 服务突然被数据库拒绝访问。

事态比较紧急，我们组长先做了临时处理，之后通知了我们几个相关的人。由于我前阵子接手了这个项目，所以也就承担调查事故原因的任务。

## 背景

这里涉及一些业务层面的东西，需要脱敏，所以只提取出涉事技术因素：

- Web 服务（下文以 `IDLE` 代称）：一个重要而不繁忙的内部网站，只有工作时间会有人使用。
- 数据库（MySQL，下文以 `DB` 代称）：一个重要且繁忙的数据库，`IDLE` 会对 `DB` 进行只读操作。
- 另一个 Web 服务（下文以 `BUSY` 代称）：持续对 `DB` 进行高频读写操作。
- `IDLE` 和 `BUSY` 位于同一个 Linux 服务器。

### 具体故障

`IDLE` 被 `DB` 拒绝访问。

在这之前，`IDLE` 对 `DB` 的访问是完全正常的。作为当前唯一的维护人员，我上周根本就没有对它做任何变更，出了这个故障实属让我摸不着头脑。

### 初步调查及临时措施

组长做了初步调查及临时措施，并提出疑问：

- Web 服务报错：`sqlMessage: "Host 'IP.IP.IP.IP' is not allowed to connect to this MySQL server"`
- 临时措施：
  - `GRANT ALL PRIVILEGES ON *.* TO 'USER'@'IP.IP.IP.IP';`
  - 对 `DB` 做了此变更之后 `IDLE` 恢复正常
- 疑问：
  > 1. MySQL 拒绝 `IDLE` 访问，为什么昨天没有出现，而今天早晨出现了？周五晚上有人修改了 MySQL 配置吗？
  > 2. `IDLE` 服务连接数据库的配置中，`host = "localhost"`，为什么 MySQL 的报错会是 `"IP.IP.IP.IP"`？

### 可能相关的运维变更

对于疑问 `1`，我并没有对服务器或服务做任何变更，所以应该是其他人做了相关操作。有位同事补充了周五晚上他对服务器做的变更，出于运维需要，给 iptables 加了如下规则：

```sh
sudo iptables -t nat -A POSTROUTING -j MASQUERADE
```

之后，又使用 `iptables-restore` 将变更前备份的 iptables 规则表重新导入。

### 我的疑问

得到以上信息之后，我也产生了新的疑问：为什么在同一台服务器上面，且使用同样配置连接 `DB` 的 `BUSY` 服务不受影响？

## 调查

同事对服务器 iptables 做了相关的配置，而刚好出了故障，从直觉上来说这两件事有关联的概率很大。但由于后续用 `iptables-restore` 导入了原来的配置，所以这个因素暂时就先搁置了。

对于疑问 `2`，按照正常情况，如果客户端使用 `localhost` 连接 `DB`，那么客户端自身的地址也会是 `localhost`[^127_ping_source]，现在却变成 `IP.IP.IP.IP`，导致被 `DB` 拒绝连接。

[^127_ping_source]: [What is the source IP address when we ping 127.0.0.1?](https://forum.networklessons.com/t/what-is-the-source-ip-address-when-we-ping-127-0-0-1/3643)

会是 `localhost` 指向有问题吗？

```sh
$ ping localhost
PING localhost (127.0.0.1) 56(84) bytes of data.
64 bytes from localhost (127.0.0.1): icmp_seq=1 ttl=64 time=0.026 ms
64 bytes from localhost (127.0.0.1): icmp_seq=2 ttl=64 time=0.024 ms
...
```

显然，`localhost` 正常。

### MySQL client 的连接方式

如果用 `mysql` 的命令行客户端登录呢？也正常：

```sh
$ mysql -uUSER -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g
...
```

之后跟朋友 `@Shady` 吐槽了这个现象，他告诉我在 Linux 上 `mysql` 命令行客户端默认使用 Unix domain socket[^unix_socket][^mysql_client_proto] 而不是 TCP 协议。这个信息很重要：

[^unix_socket]: [Unix domain socket](https://en.wikipedia.org/wiki/Unix_domain_socket)
[^mysql_client_proto]: [4.3.3 Connecting using Unix Sockets and Windows Named Pipes](https://dev.mysql.com/doc/mysql-shell/8.2/en/mysql-shell-connection-socket.html)

```sh
$ mysql -uUSER -h 127.0.0.1 -p --protocol=TCP
Enter password:
ERROR 1130 (HY000): Host 'IP.IP.IP.IP' is not allowed to connect to this MySQL server
```

可以看到，只要是通过 TCP 协议通过 `localhost` (`127.0.0.1`) 连接 `DB`，就会有问题。据此可以确定和 `IDLE` 服务本身无关。

这让我不得不怀疑起前面提到的 iptables 变更，增加的规则真的没留下任何影响吗？

### iptables 规则

前文说到前一晚服务器做了这个变更：

```sh
sudo iptables -t nat -A POSTROUTING -j MASQUERADE
```

这条命令的意思是：

- 对 `nat` 表 (`-t TABLE`) 增加针对 `POSTROUTING` 链 (`-A CHAIN`) 的 `-j MASQUERADE` 规则 (`-j TARGET`) [^iptables_man]
- 翻译成人话就是：将服务器发出的所有网络数据包源 IP 修改为网络出口（即网卡）的 IP [^iptables_masq]

[^iptables_man]: [iptables(8) — Linux manual page](https://man7.org/linux/man-pages/man8/iptables.8.html)
[^iptables_masq]: [Iptables Tutorial - Chapter 11. Iptables targets and jumps - 11.9. MASQUERADE target](https://www.frozentux.net/iptables-tutorial/chunkyhtml/x4422.html)

这非常符合故障特征，`DB` 报错中的 `IP.IP.IP.IP` 就是网卡地址。我用 `sudo iptables -L -t nat` 一看，规则果然还在。所以我将条规则移除：

```sh
sudo iptables -t nat -D POSTROUTING -j MASQUERADE
```

之后用 `mysql -uUSER -h 127.0.0.1 -p --protocol=TCP` 进行测试，结果正常了。我又将前面组长给 MySQL 权限做的临时措施撤销掉，`IDLE` 并没有报出原来的故障。说明确实就是这条 iptables 规则造成的故障。

#### iptables-restore

新的疑问来了：同事说前面已经用 `iptables-restore` 导入备份，为什么新增的规则还在？

我检查了他的 bash history，确实有过 `iptables-restore IPTABLES.bak` 的操作记录，备份文件 `IPTABLES.bak` 中确实也没有 `-A POSTROUTING -j MASQUERADE` 相关的内容。

直觉告诉我，大概率是因为 `iptables-restore` 不是预期中的完全按备份文件覆盖现有规则。在 `iptables-restore` 的 man page[^iptables_restore] 中， `-n, --noflush` 参数说：

[^iptables_restore]: [iptables-restore(8) — Linux manual page](https://man7.org/linux/man-pages/man8/iptables-restore.8.html)

```sh
-n, --noflush
    don't flush the previous contents of the table. If not
    specified, both commands flush (delete) all previous
    contents of the respective table.
```

即 `iptables-restore` 只会覆盖相应 table 的内容，备份中没有 `nat` 表的规则，因此在 `nat` 表中新增的规则不会被 `iptables-restore IPTABLES.bak` 覆盖。

### 解开我的疑问

> 为什么在同一台服务器上面，且使用同样配置连接 `DB` 的 `BUSY` 服务不受影响？

直觉上，大概率是因为新增的 `nat` 规则不影响现有的 TCP 连接。做了一番搜寻之后，确实如此[^iptables_nat][^iptables_nat_conn]：

[^iptables_nat]: [3. Netfilter Architecture - 3.2 Packet Selection: IP Tables - NAT](https://www.netfilter.org/documentation/HOWTO/netfilter-hacking-HOWTO-3.html)
[^iptables_nat_conn]: [iptables - redirecting established connections - Answered by `@Khaled`](https://serverfault.com/a/828705/553550)

> **NAT**
>
> This table is slightly different from the `filter' table, in that only the first packet of a new connection will traverse the table: the result of this traversal is then applied to all future packets in the same connection.

其实想来也合理，因为 TCP 的 socket pair 是一个四元组 `SRC_IP:SRC_PORT-DST_IP:DST_PORT`[^tcp_rfc_1_5]，如果 `SRC_IP` 变了，对连接的另一端来说，这根本就是另一个连接。如果修改原有连接的数据包会摧毁整个连接。

[^tcp_rfc_1_5]: [RFC 793 (TRANSMISSION CONTROL PROTOCOL) - 1.5. Operation](https://datatracker.ietf.org/doc/html/rfc793#section-1.5)

> **Connections**:
>
> Each connection is uniquely specified by a pair of sockets
  identifying its two sides.

另外，`DB` 的系统变量 `wait_timeout` 为默认的 8 小时[^mysql_sysvar]。而 `BUSY` 服务高频访问 `DB`，连接池长时间保持活跃，没有连接被 `DB` 关闭，所以 `BUSY` 服务也就不受 iptables 影响。

[^mysql_sysvar]: [MySQL 8.0 Reference Manual - 5.1.8 Server System Variables](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_wait_timeout)

## 结语

iptables 是个强大而复杂的系统软件，由于其工作机制偏系统低层，一旦使用错误可能会影响到服务器上所有的网络软件。如果服务器是其他网络流量的中转节点，甚至会影响整个服务群。

上面的例子仅仅误用了一条规则就导致一次比较紧急的事故。个人认为，如果没有系统地学过 iptables，最好不要轻易使用。实在不得已的话，也一定要仔细查阅文档，并做好相关的测试。

## Cover

:::details Masquerade

封面图是一头名为 Masquerade 的鲸鱼的尾鳍，这种鲸鱼叫座头鲸 (Humpback whale)，也叫大翅鲸[^humpback]。

:::

[^humpback]: [Humpback whale](https://en.wikipedia.org/wiki/Humpback_whale)

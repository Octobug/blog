---
date: 2020-10-17
spot: 紫寓公寓
sort: Computer Science
tags:
  - MySQL
  - Online DDL
  - InnoDB
  - Database
  - Refactoring
draft: true
---

# 现实遭遇：生产环境的 INT 自增 ID 真的不够用了

![A Common Dolphin jumping](./common_dolphin.jpg "Permitted under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) (image filpped). © [**willbrooks**](https://www.inaturalist.org/people/willbrooks). [*inaturalist.org*](https://www.inaturalist.org/photos/252142686).")

在 INT 类型不够用的案例中，我印象最深的是这个：[Gangnam Style broke YouTube's view counter](https://www.theverge.com/2014/12/3/7325819/gangnam-style-broke-youtube-view-counter)。不过 YouTube 团队在 [江南 Style (PSY - GANGNAM STYLE(강남스타일) M/V)](https://www.youtube.com/watch?v=9bZkp7q19f0) 的浏览量计数器真的溢出之前，及时将 32-bit INT 换成 64-bit INT 了。

题外话：上面提到的文章中说 "now not even a figure of `2,147,483,647` views is enough to contain..."，这个数字是 32-bit SIGNED INT 的上限。 据说 YouTube 不使用 UNSIGNED INT 是因为 Google 的 C++ Style Guide 中规定 [^reddit][^gg_cpp_guide]：

[^reddit]: [Gangnam Style overflows INT_MAX, forces YouTube to go 64-bit](https://www.reddit.com/r/ProgrammerHumor/comments/2o9hrq/comment/cmlakqv/?utm_source=share&utm_medium=web2x&context=3)
[^gg_cpp_guide]: [Google C++ Style Guide - Integer Types](https://google.github.io/styleguide/cppguide.html#Integer_Types)

> You should not use the unsigned integer types such as `uint32_t`, unless there is a valid reason such as representing a bit pattern rather than a number, or you need defined overflow modulo 2^N. In particular, do not use unsigned types to say a number will never be negative. Instead, use assertions for this.

而 YouTube 的后端部分确实有使用 C++ [^ytb_pls]，所以这个说法是有可能的。

[^ytb_pls]: [Programming languages used in most popular websites](https://en.wikipedia.org/wiki/Programming_languages_used_in_most_popular_websites)

## 背景

在前一段时间，我发现负责的项目有一个 MySQL 表的自增 `INT` 主键 `id` 也即将到达上限 (`2,147,483,647`) 。那时主键值是 16 亿多，已经超过了容量的 76%，按照既有的增长速度预估 6-8 个月之后会到达上限。这个表是挺多年前设计的，我估计当时的开发人员也没料到数据规模会变成这个等级、项目会存续这么久。

我没处理过这种问题，但好在它不算紧急，还有几个月的时间可以做计划。所以我在搬砖之余，逐步梳理调研解决方案。

### 自增主键到达上限时会发生什么？

```sh
# host shell
docker run -it -e "MYSQL_ROOT_PASSWORD=123456" mysql:5.7 /bin/bash

# mysql container shell
service mysql start
mysql -uroot -p

# mysql client
mysql> create database test;
mysql> use test;
mysql> create table t(id int auto_increment primary key) auto_increment=2147483647;

mysql> insert into t values(null);
Query OK, 1 row affected (0.01 sec)

mysql> show create table t;
CREATE TABLE `t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2147483647 DEFAULT CHARSET=latin1

mysql> insert into t values(null);
ERROR 1062 (23000): Duplicate entry '2147483647' for key 'PRIMARY'
```

可以看到，第一句 `insert` 执行后这个表的 `AUTO_INCREMENT` 值依然还是上限 `2147483647`。
因此，第二句 `insert` 拿到的自增 `id` 值依然是上限，所以执行结果是返回主键冲突错误。

### 表结构

以下是相关表的 ER 图（为了脱敏，和本文主题无关的表、字段都省略了），那个即将到达上限的表正是 `TASK_LOG` 表：

```mermaid
erDiagram
  TASK {
    int id PK
    string type
  }

  DEVICE {
    int id PK
    string name UK
  }

  TASK_LOG {
    int id PK
    int task_id FK
    int device_id FK
    tinyint status
    string result
  }

  TASK ||--o{ TASK_LOG : "generates"
  DEVICE ||--o{ TASK_LOG : "generates"
```

### 列数据类型变更

既然问题是因为 `INT` 类型的空间不够，那么把 `INT` 改为 `UNSIGNED BIGINT` 就可以了？

[^mysql_ol_ddl]: [14.13.1 Online DDL Operations - Column Operations](https://dev.mysql.com/doc/refman/5.7/en/innodb-online-ddl-operations.html#online-ddl-column-operations)
[^rebuild]: [13 | 为什么表数据删掉一半，表文件大小不变？ - 重建表](https://time.geekbang.org/column/article/72388)

**列数据类型变更 (Changing the column data type)** 的过程需要重建表 (Rebuilds Table) [^mysql_ol_ddl]。MySQL 从 5.6 开始支持 Online DDL，并引入了 `ALTER` 语句新的算法 `ALGORITHM=INPLACE`。这种新的“重建”发生在 InnoDB 内部，其过程大致如下 [^rebuild]：

> 1. 建立一个临时文件，扫描表 A 主键的所有数据页；
> 2. 用数据页中表 A 的记录生成 B+ 树，存储到临时文件中；
> 3. 生成临时文件的过程中，将所有对 A 的操作记录在一个日志文件 (row log) 中；
> 4. 临时文件生成后，将日志文件中的操作应用到临时文件，得到一个逻辑数据上与表 A 相同的数据文件；
> 5. 用临时文件替换表 A 的数据文件。

显然，其中最耗时的部分是“拷贝”数据到临时的新表文件中。在这个过程中（当然，同时还要看具体 DDL 变更允许的 `LOCK` 类型），允许对表 A 做增删改操作，从而不中断正常的业务运行。

然而，列数据类型变更并不支持 `ALGORITHM=INPLACE`，且期间不允许 DML 操作 (❌ Permits Concurrent DML)，而只支持原有的 `ALGORITHM=COPY` [^mysql_ol_ddl]：

> Changing the column data type is only supported with ALGORITHM=COPY.

其实即使期间允许 DML 操作，由于上面提到的 `TASK_LOG` 表数据量太大，直接在生产环境做 Online DDL 也可能会因为消耗额外的 I/O 跟 CPU 而影响正常业务运行。

#### 其他工具

[ALTERing a Huge MySQL Table](https://mysql.rjweb.org/doc.php/alterhuge) 这篇文章中提到了两个 Online DDL 工具：

[^dl_ddl_vs_pt_ol]: [ONLINE DDL VS PT-ONLINE-SCHEMA-CHANGE](https://fromdual.com/online-ddl_vs_pt-online-schema-change)
[^cmp_ol_tools]: [Comparison of Online Schema Change tools](https://planetscale.com/docs/learn/online-schema-change-tools-comparison)

- [pt-online-schema-change](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html) 实现的变更过程大致如下 [^dl_ddl_vs_pt_ol]：
  1. 创建一个结构和原表一样的新表；
  2. 对新表做期望的变更；
  3. 对原表创建触发器，使拷贝数据过程中所有的数据变更都应用到新的表上；
  4. 从原表拷贝数据到新表；
  5. 改变原表的名称、将新表重命名为原表名，最后丢弃原表。
- [github/gh-ost](https://github.com/github/gh-ost) 对原表数据变更的追踪不是使用触发器，而是 MySQL 的 binlog。它不是直接从磁盘读取 binlog，而是使自己以从库的身份去接收 binlog [^cmp_ol_tools]。

[^pt_ol_ct]: [pt-online-schema-change - OPTIONS](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html#cmdoption-pt-online-schema-change-chunk-time)

这类工具相较于 MySQL Online DDL 的优势在于，它们对 Online DDL 操作类型的支持更全面，同时可以根据生产环境系统资源的使用情况去调整数据拷贝粒度，以尽可能减小对生产环境的影响 [^dl_ddl_vs_pt_ol][^pt_ol_ct]。

补充：在 [Comparison of Online Schema Change tools](https://planetscale.com/docs/learn/online-schema-change-tools-comparison) 这篇文章中除了上面提到的两个工具，还额外对比了 [facebookincubator/OnlineSchemaChange](https://github.com/facebookincubator/OnlineSchemaChange) 和 [Vitess](https://vitess.io/docs/19.0/user-guides/schema-changes/) 这几个工具的设计与实现思路。

### 好消息

`TASK_LOG` 这个表是一个“日志类”的数据表，记录每台设备执行某个任务的结果。当任务执行失败时，它记录的错误信息可用于诊断出错原因。而那些执行成功的任务记录，以及已经过去很久的失败记录，从业务角度来说其实已经失去其原有的用途，可以直接丢弃。项目其他相关人员也确认这些老日志可以丢弃。

如此一来，最耗时的拷贝数据环节其实是可以节省大量时间的，只需要保留当前真正需要的数据。

### 坏消息

从上面的 ER 图可以看出，任务的执行状态是由 `TASK_LOG` 的 `status` 字段记录的，用来防止已成功执行任务的设备重复执行相应的任务。也就是说，现阶段不能简单地把历史日志丢弃了事……

## 方案

事到如今，不重构已经不行了：`TASK_LOG` 中的 `status` 应该额外记录到独立的表中，使 `TASK_LOG` 成为一个真正意义上的日志表，随时可丢弃。

### 新的表结构

`TASK_RESULT` 中的 `count` 表示任务成功执行的次数。

```mermaid
erDiagram
  TASK {
    int id PK
    string type
  }

  DEVICE {
    int id PK
    string name UK
  }

  TASK_LOG {
    bigint id PK
    int task_id FK
    int device_id FK
    tinyint status
    string result
  }

  TASK_RESULT {
    int task_id PK, FK
    int device_id PK, FK
    int count
  }

  TASK ||--o{ TASK_RESULT : "results in"
  TASK ||--o{ TASK_LOG : "generates"
  DEVICE ||--o{ TASK_RESULT : "results in"
  DEVICE ||--o{ TASK_LOG : "generates"
```

### 实施步骤

#### 1. 单纯新增 `TASK_RESULT` 表

#### 2. 从 `TASK_LOG` 表收集历史执行结果

#### 3. 移除兼容代码

#### 4. 切换到新的 `TASK_LOG` 表

#### 5. 清理原 `TASK_LOG` 表

- [Why you simply don't drop a huge InnoDB table in production...](https://dev.to/jung/why-you-simply-don-t-drop-a-huge-innodb-table-in-production-18j2)
- <http://mysql.rjweb.org/doc.php/partitionmaint>

### 后续措施

---

::: details Sakila

MySQL 的 Logo[^logo] 是一只名为 "Sakila" 的海豚 [^sakila]。不过 Sakila 单纯只是一个海豚图形，并不具体对应某一只真实的海豚，甚至连是哪个海豚物种也不确定。

[^logo]: [MySQL Logo Downloads](https://www.mysql.com/about/legal/logos.html)
[^sakila]: [1.2.3 History of MySQL](https://dev.mysql.com/doc/refman/8.0/en/history.html)

封面图是我见过的最像 MySQL Logo 的一只海豚，它是一只**真海豚 (Common Dolphin)**[^common_dolphin]，也译为**普通海豚**。

[^common_dolphin]: [Common dolphin](https://en.wikipedia.org/wiki/Common_dolphin)

:::

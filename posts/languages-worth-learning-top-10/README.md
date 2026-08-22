---
date: 2024-02-09
spot: 家里
sort: Linguistics
tags:
  - 2ndLA
  - English
  - Español
  - Français
  - Deutsch
  - 中文
  - 日本語
  - Italiano
  - Português
  - 한국어
  - Русский
---

# 最值得学的 10 门语言

![52-hertz Whale](./52-hertz-whale.jpg "A public domain image (cropped & resized). [**NOAA**](https://www.pmel.noaa.gov/acoustics/whales/sounds/sounds_52blue.html). [*commons.wikimedia.org*](https://commons.wikimedia.org/wiki/File:Akblue52a_256_064c.jpg).")

> 这里说的语言不是指编程语言。值得学的编程语言请看 [TIOBE Index](https://www.tiobe.com/tiobe-index/)，这个指数值得关注的地方除了编程语言的当前排行占比，还有其变化趋势。

🧨 今天刚好是过年，容我先拜个早年 🧧

2022 年底试用多邻国的英语课程之后便一发不可收拾——它让我的第二外语学习计划至少提早了十年。本来在我的长期计划中，起码得在生活工作状态相对稳定之后，能安排出固定的时间来才会开始学习第二门外语。然而多邻国的课程编排过于合理，单元被分割成足够细的粒度，只需要用手机就可以随时随地利用碎片时间学习。从那时起我就决定，今后能利用起来的碎片时间全都交给外语学习，入门阶段尽量不让它们占用其他时间。

问题来了：***在英语之后，我应该先学哪一门外语？***

对于有文化偏好的人来说这显然不是什么问题，爱看日漫或韩剧的人大概率会选择学习日语或韩语。我目前没有文化偏好，所以选择从实用角度来考虑这个问题。并且，这个“实用”的范围是整个地球，而不是局限于在中国。我相信生活在 21 世纪的大部分人，会有更多的机会去体验不同地区的生活、结识不同国度的朋友。

## 以经济指标为主

我想到的第一个指标是 GDP。根据马斯洛需求层次理论[^maslow_needs]可以大致认为，一个经济体的文化影响力和其发达程度正相关，而语言又与文化高度相关。但每个国家的人口规模不一样，单纯以国家为单位作比较不是很合理。所以在这一年多里，当我看到相关的指标时，就会把它们综合进来考量。目前有 4 个：

[^maslow_needs]: [Maslow's hierarchy of needs](https://en.wikipedia.org/wiki/Maslow%27s_hierarchy_of_needs)

1. **World languages by GDP, 2023 edition**[^langs_by_gdp] `权重 3`：按照相同的国家官方语言统计的 GDP 总和，即不同语言产生的 GDP 总和。从这个饼图可以看出，前 10 门语言产生了地球 77% 的 GDP。

    ```mermaid
    %%{
      init: {
        'theme': 'base',
        'themeVariables': {
          'pieTitleTextSize': '18px',
          'pieTitleTextColor': '#555555',
          'primaryTextColor': '#555555',
          'primaryColor': '#b8d3ca',
          'secondaryColor': '#a7ab86',
          'tertiaryColor': '#edd094',
          'pieOuterStrokeWidth': '1px'
        }
      }
    }%%

    pie title World Languages by GDP (percents)
      "English": 27
      "Chinese": 18
      "Spanish": 8
      "Japanese": 6
      "German": 5
      "French": 4
      "Arabic": 3
      "Italian": 2
      "Portuguese": 2
      "Korean": 2
      "Other": 23
    ```

2. **List of countries by GDP (nominal)**[^countries_by_gdp] `权重 2`：每个国家有各自的官方语言，所以国家 GDP 也可以作为一个判断依据。当一个国家经济体量足够大，即使人均 GDP 很低，也有很大概率催生出优秀的文化产业。最典型的是印度宝莱坞。
3. **Duolingo Language Report**[^duolingo_report] `权重 2`：多邻国年度语言报告，取其中的最受欢迎的语言 Top 10。
4. **Languages used on the Internet**[^internet_langs] `权重 1`：不同语言的互联网内容量统计。

[^langs_by_gdp]: [World languages by GDP, 2023 edition](https://www.reddit.com/r/languagelearning/comments/11xt73g/world_languages_by_gdp_2023_edition/)
[^countries_by_gdp]: [List of countries by GDP (nominal)](https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal))
[^duolingo_report]: [2025 Duolingo Language Report](https://blog.duolingo.com/2025-duolingo-language-report/)
[^internet_langs]: [Languages used on the Internet](https://en.wikipedia.org/wiki/Languages_used_on_the_Internet)

> 权重纯粹是我个人的主观设置，并没有什么依据。
>
> 但不管如何调整，基本上只影响前十的排序，而前十的成员变动很小。

### 简单粗暴糅合排名

排名综合处理比较粗暴，仅仅做了这几项：

- 按照排行倒序线性记分
- 记分做等比例归一化
- 按照权重累加记分
- 将第一名记为 100 分，其他记分按等比例缩放

写代码处理只是为了把流程固定下来，以后如果想到更好的折算方式会重写：[Octobug/notes/applied_linguistics/language_education/ranking.js](https://github.com/Octobug/notes/blob/main/applied_linguistics/language_education/ranking.js)

## Top 10

综合后的前十语言如下：

### 1. English (英语)

英语事实上的实用性与影响力不必多说。

### 2. Español (西班牙语)

目前以西班牙语为官方语言的国家有近 20 个，其中墨西哥的 GDP 已经超过西班牙。🚧

### 3. Français (法语)

### 4. Deutsch (德语)

### 5. 中文

中文产生的 GDP 排第二，中国 GDP 也是第二，综合排名被后两个指标严重拉低了，但这个排名还挺符合我的观感。在上文提到的 "Languages used on the Internet" 中，中文比例极低，只有 1.3%。这个不合理的比例大概率是 🧱 导致的统计错误，或者是内容确实没有传播出去导致在中文地区之外没有存在感。

对此我只感到可惜，甚至想说是作茧自缚。

### 6. 日本語 (日语)

### 7. Italiano (意大利语)

### 8. Português (葡萄牙语)

### 9. 한국어 (韩语)

### 10. Русский (俄语)

---

更多的结果：

```txt
1. English: 100.00
2. Spanish: 64.53
3. French: 59.07
4. German: 55.83
5. Chinese: 52.65
6. Japanese: 52.47
7. Italian: 43.38
8. Portuguese: 37.51
9. Korean: 36.13
10. Russian: 33.12
11. Arabic: 29.75
12. Dutch: 28.17
13. Turkish: 26.41
14. Malay-Indonesian: 24.48
15. Hindi: 22.67
16. Polish: 21.95
17. Swedish: 16.43
18. Vietnamese: 12.07
19. Bengali: 11.55
20. Thai: 10.49
21. Hebrew: 9.27
22. Farsi: 8.47
23. Norwegian: 7.41
24. Danish: 7.19
25. Punjabi: 6.16
26. Greek: 5.13
27. Persian: 4.62
28. Czech: 4.11
29. Romanian: 3.85
30. Javanese: 3.85
31. Ukrainian: 3.34
32. Hungarian: 2.82
33. Irish: 2.41
34. Finnish: 2.31
35. Tagalog: 2.31
36. Romansh: 1.56
37. Slovak: 1.03
38. Tamil: 0.60
39. Bulgarian: 0.51
40. Sami: 0.48
```

## Cover

::: details 52 Hz Whale

封面图是 52 Hz 声波信号的频谱图，这些声波被认为是一头鲸鱼发出的，它被称为 "52 Blue"[^52hz_whale]。52 Blue 的迁徙模式和蓝鲸 (Blue Whale)[^blue_whale]以及长须鲸 (Fin Whale)[^fin_whale]相似，但蓝鲸和长须鲸的声音频率均低于 52 Hz，这个频率与任何其他鲸鱼的频率都不一样，它们之间很可能根本无法互相沟通。因此这头拥有独特声音频率的鲸鱼也被称为“世界上最孤独的鲸鱼”[^52hz_whale]。

[^52hz_whale]: [52-hertz whale](https://en.wikipedia.org/wiki/52-hertz_whale)
[^blue_whale]: [Blue whale](https://en.wikipedia.org/wiki/Blue_whale)
[^fin_whale]: [Fin whale](https://en.wikipedia.org/wiki/Fin_whale)

纪录片 *The Loneliest Whale: The Search for 52* 讲述了寻找 52 Blue 的旅程[^search_52]。

[^search_52]: [The Loneliest Whale: The Search for 52](https://www.imdb.com/title/tt2401814/)

:::

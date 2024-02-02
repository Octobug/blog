# 🐳 WhaleVocal

[![Netlify Status](https://api.netlify.com/api/v1/badges/23e0b8dc-df98-491d-9885-d4229baa1ccb/deploy-status)](https://app.netlify.com/sites/octobug-blog/deploys)
[![Badge: GitHub](https://github.com/Octobug/blog/actions/workflows/deploy.yml/badge.svg)](https://octobug.github.io/blog/)

- <https://blog.octobug.site> (hosted on [Netlify](https://netlify.com/))

## The Theme

This blog is powered by [VitePress](https://vitepress.dev/) with a customized theme, which borrowed many ideas from these two projects:

- [airene/vitepress-blog-pure](https://github.com/airene/vitepress-blog-pure)
- [clark-cui/vitepress-blog-zaun](https://github.com/clark-cui/vitepress-blog-zaun)

### Features

- [x] Single Post
  - [x] Elements (with tooltips)
    - Publication Date
    - Location
    - Reading Time
  - [x] Prev/Next (without the built-in global sidebar)
  - [x] Comments ([giscus](https://github.com/giscus/giscus))
  - [x] Sort (Category)
  - [x] Tags
  - [x] Markdown Extensions
    - Auto-generated References ([markdown-it/markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote))
    - Images with Caption ([arve0/markdown-it-implicit-figures](https://github.com/arve0/markdown-it-implicit-figures))
    - Mermaid ([emersonbottero/vitepress-plugin-mermaid](https://github.com/emersonbottero/vitepress-plugin-mermaid))
- [x] Home
  - [x] Profile Card
    - Avatar
    - Nickname
    - Bio
    - Location
    - Timezone
  - [x] Paged Post List
- [x] Posts (Archives)
- [x] Sorts (Categories)
- [x] Tags
- [x] Atom Feed
- [x] Others
  - [x] Local Search (supports Chinese)
  - [x] [Google Analytics](https://analytics.google.com/)

## Contribution

This project is not going to be made an out-of-the-box blog theme. It's a very personal project, but any helps and advice are welcome.

Feel free to customize it based on your own ideas. Please check out the [Contributing Guide](./.github/contributing.md) for more details.

## License

Copyright © 2019-present. Shaobiao Lin.

- Contents in directories `posts/`, `public/`, and `visions/` are licensed under [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/).
- Others are licensed under [MIT](./LICENSE).

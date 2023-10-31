import { defineConfigWithTheme } from "vitepress";
import type { ThemeConfig } from "./theme-config";
import { getPostList } from "./theme/loader";

const year = new Date().getFullYear();

export default defineConfigWithTheme<ThemeConfig>({
  title: "WhaleVocal",
  description: "Octobug's blog.",
  cleanUrls: true,
  lastUpdated: true,
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: "/avatar.png",
      },
    ],
    [
      "meta",
      {
        name: "author",
        content: "Octobug",
      },
    ],
  ],
  ignoreDeadLinks: [
    "./LICENSE",
  ],
  themeConfig: {
    outline: "deep",
    docFooter: {
      prev: "Previous",
      next: "Next",
    },
    editLink: {
      pattern: "https://github.com/Octobug/blog/edit/main/:path",
    },
    footer: {
      message: 'All published under the <a href="https://github.com/Octobug/blog/blob/main/LICENSE">CC-BY-SA-4.0</a> license.',
      copyright: `Copyright © 2019-${year} <a href="https://github.com/Octobug">Octobug</a>`,
    },
    lastUpdated: {
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
      },
    },
    nav: [
      {
        text: "POSTS",
        link: "/pages/posts",
      },
      // {
      //   text: "VISIONS",
      //   link: "/pages/visions",
      // },
      {
        text: "TAGS",
        link: "/pages/tags",
      },
      {
        text: "SORTS",
        link: "/pages/sorts",
      },
      {
        text: "REPO",
        link: "https://github.com/Octobug/blog",
      },
    ],
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Octobug" },
      {
        icon: {
          svg: '<svg t="1698576475852" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6940" width="240" height="240"><path d="M768 554.666667a42.666667 42.666667 0 0 1-42.666667-42.666667 213.333333 213.333333 0 1 0-28.586666 106.666667A126.08 126.08 0 0 0 768 640a128 128 0 0 0 128-128 384 384 0 1 0-112.426667 271.573333l-60.586666-60.586666A298.666667 298.666667 0 1 1 810.666667 512a42.666667 42.666667 0 0 1-42.666667 42.666667z m-256 85.333333a128 128 0 1 1 128-128 128 128 0 0 1-128 128z" p-id="6941"></path></svg>',
        },
        link: "mailto:whalevocal@gmail.com",
      },
    ],
    // Extended configs
    avatar: "/avatar.png",
    nickname: "Octobug",
    bio: "Thoughts on everything.",
    location: "Shenzhen, China",
    timezone: "Asia/Shanghai",
    pageSize: 10,
    postList: await getPostList([
      "./posts",
    ]),
  },
});

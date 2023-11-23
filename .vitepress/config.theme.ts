import type { ThemeConfig } from "./theme/types/theme-config";
import { tokenize } from "./theme/search";
import emailSVGString from "./theme/svgs/email";
import { giscus, withBaseURL } from "./config.utils";

export default {
  outline: "deep",
  docFooter: {
    prev: "Prev",
    next: "Next",
  },
  editLink: {
    pattern: "https://github.com/Octobug/blog/edit/main/:path",
  },
  footer: {
    message: 'All published under the <a href="https://github.com/Octobug/blog/blob/main/LICENSE">CC-BY-SA-4.0</a> license.',
    copyright: `Copyright © 2019-${new Date().getFullYear()} <a href="https://github.com/Octobug">Octobug</a>`,
  },
  lastUpdated: {
    formatOptions: {
      dateStyle: "medium",
      timeStyle: "short",
    },
  },
  nav: [
    // {
    //   text: "POSTS",
    //   link: "/pages/posts",
    // },
    // {
    //   text: "VISIONS",
    //   link: "/pages/visions",
    // },
    // {
    //   text: "TAGS",
    //   link: "/pages/tags",
    // },
    // {
    //   text: "SORTS",
    //   link: "/pages/sorts",
    // },
    {
      text: "REPO",
      link: "https://github.com/Octobug/blog",
    },
  ],
  search: {
    provider: "local",
    options: {
      detailedView: true,
      miniSearch: {
        // https://lucaong.github.io/minisearch/modules/MiniSearch.html
        options: {
          tokenize
        },
        searchOptions: {
          combineWith: "AND",
          fuzzy: 0.1,
          prefix: true,
          boost: {
            title: 4,
            text: 2,
          },
        }
      },
    },
  },
  socialLinks: [
    { icon: "github", link: "https://github.com/Octobug" },
    {
      icon: {
        svg: emailSVGString,
      },
      link: "mailto:whalevocal@gmail.com",
    },
  ],
  // Extended configs
  avatar: withBaseURL("/avatar.png"),
  nickname: "Octobug",
  bio: "Thoughts on everything.",
  location: "Shenzhen, China",
  timezone: "Asia/Shanghai",
  pageSize: 13,
  mdfilePatterns: ["posts/**/*.md"],
  giscus
} satisfies ThemeConfig;

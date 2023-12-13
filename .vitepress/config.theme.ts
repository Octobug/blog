import type { ThemeConfig } from "./theme/types/theme-config";
import { tokenize } from "./theme/search";
import emailSVGString from "./theme/svgs/email";
import { giscus, withBaseURL } from "./config.utils";

export default {
  outline: "deep",
  docFooter: {
    prev: "Previous",
    next: "Next",
  },
  editLink: {
    pattern: "https://github.com/Octobug/blog/edit/main/:path",
  },
  footer: {
    message: 'All original contents are published under the <a href="https://github.com/Octobug/blog/blob/main/LICENSE">CC BY-SA 4.0</a> license.',
    copyright: `Copyright © 2019-${new Date().getFullYear()} <a href="https://github.com/Octobug">Octobug</a>`,
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
      link: "/posts",
    },
    {
      text: "SORTS",
      link: "/sorts",
    },
    // {
    //   text: "TAGS",
    //   link: "/pages/tags",
    // },
    // {
    //   text: "VISIONS",
    //   link: "/pages/visions",
    // },
    {
      text: "MORE",
      items: [
        // {
        //   text: "Blog Collection",
        //   link: "/bests",
        // },
        // {
        //   text: "Atom Feed",
        //   link: "/atom.xml",
        // },
        {
          text: "Repository",
          link: "https://github.com/Octobug/blog",
        }
      ]
    }
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
    { icon: "mastodon", link: "https://mastodon.online/@cyberwarmth" },
    {
      icon: {
        svg: emailSVGString,
      },
      link: "mailto:whalevocal@gmail.com",
    },
  ],
  // Extended configs
  avatar: withBaseURL("/avatar.png"),
  nickname: "Orca",
  bio: "Thoughts on everything.",
  location: "Shenzhen, China",
  timezone: "Asia/Shanghai",
  pageSize: 10,
  mdfilePatterns: ["posts/**/*.md"],
  giscus
} satisfies ThemeConfig;

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
    message: 'All original contents are licensed under <a href="http://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.',
    copyright: `© 2019-${new Date().getFullYear()} <a href="https://github.com/Octobug">Shaobiao Lin</a>`,
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
    {
      text: "TAGS",
      link: "/tags",
    },
    // {
    //   text: "VISIONS",
    //   link: "/pages/visions",
    // },
    {
      text: "MORE",
      items: [
        {
          text: "Acknowledgments",
          link: "/acknowledgments",
        },
        {
          text: "Blogmarks",
          link: "/blogmarks",
        },
        {
          text: "Atom Feed",
          link: withBaseURL("/atom.xml"),
          target: "_blank",
        },
        {
          text: "This Repository",
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

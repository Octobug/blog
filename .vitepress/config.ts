import { defineConfigWithTheme } from "vitepress";
import mdImageFigures from "markdown-it-image-figures";
import type { ThemeConfig } from "./theme/types/theme-config";
import themeConfig from "./config.theme";
import { BASE_PATH, withBaseURL } from "./config.utils";
import gaConfig from "./theme/ganalytics";
import { buildFeed } from "./theme/feed";

export default defineConfigWithTheme<ThemeConfig>({
  title: "WhaleVocal",
  description: "Octobug's blog.",
  base: BASE_PATH,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    [
      "meta",
      {
        name: "author",
        content: "Octobug",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: withBaseURL("/avatar.png")
      },
    ],
    [
      "link",
      {
        name: "mastodon",
        rel: "me",
        href: "https://mastodon.online/@cyberwarmth",
      }
    ],
    ...gaConfig
  ],
  rewrites: {
    ":postsdir/:title/README.md": ":postsdir/:title.md",
    ":pagesdir/:title.md": ":title.md",
  },
  srcExclude: [
    "./.github/",
    "./README.md",
  ],
  themeConfig,
  buildEnd: async ({ outDir }) => {
    await buildFeed(outDir);
  },
  markdown: {
    config: (md) => {
      // usage: ![alt](https://link-to-image 'title'){.class}
      md.use(mdImageFigures, {
        figcaption: "title",
        copyAttrs: "^class$",
      });
    },
    image: {
      // image lazy loading is disabled by default
      lazyLoading: true
    }
  },
});

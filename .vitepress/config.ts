import { defineConfigWithTheme } from "vitepress";
import type { ThemeConfig } from "./theme/types/theme-config";
import themeConfig from "./config.theme";
import { BASE_URL, withBaseURL } from "./config.utils";
import gaConfig from "./theme/ganalytics";

export default defineConfigWithTheme<ThemeConfig>({
  title: "WhaleVocal",
  description: "Octobug's blog.",
  base: BASE_URL,
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
  themeConfig
});

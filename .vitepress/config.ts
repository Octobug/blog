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
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: withBaseURL("/avatar.png")
      },
    ],
    [
      "meta",
      {
        name: "author",
        content: "Octobug",
      },
    ],
    ...gaConfig
  ],
  rewrites: {
    ":postsdir/:title/README.md": ":postsdir/:title.md",
  },
  srcExclude: [
    "./.github/",
    "./README.md",
  ],
  themeConfig
});

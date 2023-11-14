import { defineConfigWithTheme } from "vitepress";
import type { ThemeConfig } from "./theme/types/theme-config";
import themeConfig from "./config.theme";

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
  srcExclude: [
    "./.github/",
    "./README.md",
  ],
  themeConfig
});

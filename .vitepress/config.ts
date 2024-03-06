import { defineConfigWithTheme } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import type { ThemeConfig } from "./theme/types/theme-config";
import themeConfig from "./config.theme";
import { BASE_PATH, withBaseURL } from "./config.utils";
import gaConfig from "./theme/ganalytics";
import { buildFeed } from "./theme/feed";
import useMDItPlugins from "./theme/mdit";

const config = defineConfigWithTheme<ThemeConfig>({
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
    "pages/:title.md": ":title.md",
    "pages/:title/README.md": ":title.md",
    ":postsdir/:title/README.md": ":postsdir/:title.md",
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
      useMDItPlugins(md);
    },
    image: {
      // image lazy loading is disabled by default
      lazyLoading: true
    },
    math: true
  },
});

export default withMermaid({
  ...config,
  // MermaidConfig: https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults
  mermaid: {
  },
  mermaidPlugin: {
    // class: "mermaid my-class", // CSS classes for parent container 
  },
});

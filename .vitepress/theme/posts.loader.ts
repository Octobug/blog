// https://vitepress.dev/guide/data-loading
import { createContentLoader } from "vitepress";
import readingTime from "reading-time";
import extendedConfig from "../config.theme";
import { withBaseURL, isProduction } from "../config.utils";
import getLocation from "./locations";

// Title Workaround
function extractTile(text: string) {
  const titlePattern = /---\n\n# (?<title>.*)\n/;
  const match = text.match(titlePattern);
  return match?.groups?.title || "NonTitled";
}

export default async (options) => {
  const {
    includeSrc = true,
    render = false,
    excerpt = false,
  } = options;

  return createContentLoader(extendedConfig.mdfilePatterns, {
    includeSrc,
    render,
    excerpt,
    transform(rawData) {
      return rawData
        .map(p => {
          const rt = readingTime(p.src || "");
          const mdpath = p.url.replace("/README", "");
          p.url = withBaseURL(mdpath);
          p.frontmatter.title = extractTile(p.src || "");
          p.frontmatter.datetime = new Date(p.frontmatter.date);
          p.frontmatter.location = getLocation(p.frontmatter.spot);
          p.frontmatter.readingTime = rt.text;
          p.frontmatter.words = rt.words;
          p.frontmatter.mdpath = mdpath;
          return p;
        })
        .filter(p => !isProduction() || !p.frontmatter.draft)
        .sort((a, b) => {
          return b.frontmatter.datetime - a.frontmatter.datetime;
        });
    }
  });
};

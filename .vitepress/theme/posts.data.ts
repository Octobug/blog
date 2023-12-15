// https://vitepress.dev/guide/data-loading
import { createContentLoader, ContentData } from "vitepress";
import readingTime from "reading-time";
import extendedConfig from "../config.theme";
import { withBaseURL } from "../config.utils";
import getLocation from "./locations";

declare const data: ContentData[];
export { data };

// Title Workaround
function extractTile(text: string) {
  const titlePattern = /---\n\n# (?<title>.*)\n/;
  const match = text.match(titlePattern);
  return match?.groups?.title || "NonTitled";
}

export default createContentLoader(extendedConfig.mdfilePatterns, {
  includeSrc: true,
  transform(rawData) {
    return rawData.map(p => {
      const rt = readingTime(p.src || "");
      p.frontmatter.title = extractTile(p.src || "");
      p.frontmatter.datetime = new Date(p.frontmatter.date);
      p.frontmatter.location = getLocation(p.frontmatter.spot);
      p.frontmatter.readingTime = rt.text;
      p.frontmatter.words = rt.words;
      p.url = withBaseURL(p.url.replace("/README", ""));
      return p;
    }).sort((a, b) => {
      return b.frontmatter.datetime - a.frontmatter.datetime;
    });
  }
});

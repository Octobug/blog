// https://vitepress.dev/guide/data-loading
import { createContentLoader, ContentData } from "vitepress";
import readingTime from "reading-time";
import extendedConfig from "../config.theme";

declare const data: ContentData[];
export { data };

export default createContentLoader(extendedConfig.mdfilePatterns, {
  includeSrc: true,
  transform(rawData) {
    return rawData.map(p => {
      p.frontmatter.datetime = new Date(p.frontmatter.date);
      p.frontmatter.readingTime = readingTime(p.src || "").text;
      return p;
    }).sort((a, b) => {
      return b.frontmatter.datetime - a.frontmatter.datetime;
    });
  }
});

// // https://vitepress.dev/guide/data-loading
import type { ContentData } from "vitepress";
import { createContentLoader } from "vitepress";
import extendedConfig from "../config.theme";

declare const data: ContentData[];
export { data };

export default createContentLoader(extendedConfig.mdfilePatterns, {
  transform(rawData) {
    return rawData.map(p => {
      p.frontmatter.datetime = new Date(p.frontmatter.date);
      return p;
    }).sort((a, b) => {
      return b.frontmatter.datetime - a.frontmatter.datetime;
    });
  }
});

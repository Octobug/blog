import { ContentData, PageData } from "vitepress";

export function findPostIndex(postList: ContentData[], page: PageData) {
  return postList.findIndex(p => p.frontmatter.title === page.title) || 0;
}

export function findPost(postList: ContentData[], page: PageData) {
  return postList[findPostIndex(postList, page)];
}

export function toDashedHash(words: string = "") {
  return words.split(" ").join("-").toLowerCase();
}

import fs from "fs/promises";
import globby from "globby";
import matter from "gray-matter";
import moment from "moment-timezone";
import type { Post } from "./post";

export async function getPostList(postDirs: readonly string[]) {
  const mdList = await globby(postDirs);
  const postList = await Promise.all(
    mdList.map(async (item) => {
      const content = (await fs.readFile(item)).toString();
      const { data } = matter(content);
      data.datetime = moment(new Date(data.date));
      data.date = data.datetime.format("YYYY-MM-DD");
      return {
        frontMatter: data,
        regularPath: `/${item.replace(".md", "")}`,
      };
    })
  );
  postList.sort(_compareDate);
  return postList;
}

function _compareDate(a: Post, b: Post) {
  return b.frontMatter.datetime - a.frontMatter.datetime;
}

import Record from "vitepress";

export default interface Post {
  frontmatter: Record<string, any>,
  url: string
}

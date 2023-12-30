// https://vitepress.dev/guide/data-loading
import { ContentData } from "vitepress";
import postLoader from "./posts.loader";

declare const data: ContentData[];
export { data };

export default await postLoader({
  includeSrc: true,
  render: false,
  excerpt: false,
});

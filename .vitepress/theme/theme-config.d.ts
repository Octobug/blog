import { DefaultTheme } from "vitepress";
import type { Post } from "./post";

export interface ThemeConfig extends DefaultTheme.Config {
  avatar: string,
  nickname: string,
  bio: string,
  location: string,
  timezone: string,
  pageSize: number,
  postList: Array<Post>,
}

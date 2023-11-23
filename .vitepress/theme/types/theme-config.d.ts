import { DefaultTheme } from "vitepress";

export interface ThemeConfig extends DefaultTheme.Config {
  avatar: string,
  nickname: string,
  bio: string,
  location: string,
  timezone: string,
  pageSize: number,
  mdfilePatterns: Array<string>
  giscus: {
    repo_id: string,
    category_id: string
  }
}

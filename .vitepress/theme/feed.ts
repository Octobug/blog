import path from "path";
import { promises as fs } from "fs";
import { ContentData } from "vitepress";
import type { FeedOptions, Item } from "feed";
import { Feed } from "feed";
import themeConfig from "../config.theme";
import { BASE_PATH, withBaseURL, joinURL } from "../config.utils";
import postLoader from "./posts.loader";

const DOMAIN_PRODUCTION = "blog.octobug.site";
const DOMAIN_STAGING = "octobug.github.io";

const DOMAIN = BASE_PATH ? DOMAIN_STAGING : DOMAIN_PRODUCTION;
const BASE_URL = `https://${DOMAIN}${withBaseURL("/")}`;
const AUTHOR = {
  name: "Octobug",
  email: "whalevocal@gmail.com",
  link: BASE_URL,
};

const FEED = {
  ATOM: "atom.xml",
  RSS: "rss.xml",
};

const OPTIONS: FeedOptions = {
  title: "WhaleVocal",
  description: "Octobug's Blog",
  id: BASE_URL,
  link: BASE_URL,
  copyright: themeConfig.footer.copyright,
  feedLinks: {
    atom: joinURL(BASE_URL, FEED.ATOM),
    rss: joinURL(BASE_URL, FEED.RSS),
  },
  author: AUTHOR,
  image: joinURL(BASE_URL, "avatar.png"),
  favicon: joinURL(BASE_URL, "avatar.png"),
};

export async function buildFeed(outDir: string) {
  const posts = await generateContents();

  const feed = new Feed(OPTIONS);
  posts.forEach(item => feed.addItem(item));

  await fs.writeFile(path.join(outDir, FEED.ATOM), feed.atom1(), "utf8");
  await fs.writeFile(path.join(outDir, FEED.RSS), feed.rss2(), "utf8");
}

function withGitHubImages(post: ContentData) {
  const baseURL = "https://raw.githubusercontent.com/";
  const { frontmatter } = post;
  const imgBaseURL = joinURL(baseURL, "Octobug/blog/main", frontmatter.mdpath);
  return post.html?.replace(/<img src="./g, `<img src="${imgBaseURL}`);
}

async function generateContents(): Promise<Item[]> {
  const loader = await postLoader({
    render: true,
    excerpt: true,
  });
  const allPosts = await loader.load();
  return allPosts.map(p => ({
    title: p.frontmatter.title,
    id: p.url,
    link: joinURL(BASE_URL, p.url),
    date: p.frontmatter.date,
    content: withGitHubImages(p),
    category: [p.frontmatter.sort].map(s => { return { name: s }; }),
    author: [AUTHOR],
  }));
}

import { HeadConfig } from "vitepress";
import { env } from "process";

const G_M_ID = env.G_MEASUREMENT_ID;

const scriptGTag = [
  "script",
  {
    async: "async",
    src: `https://www.googletagmanager.com/gtag/js?id=${G_M_ID}`
  },
] satisfies HeadConfig;

const scriptGTagData = [
  "script",
  {},
  `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${G_M_ID}');`
] satisfies HeadConfig;

const gaConfig = [
  scriptGTag,
  scriptGTagData
];

export default gaConfig satisfies HeadConfig[];

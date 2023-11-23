import { HeadConfig } from "vitepress";
import { gMeasurementID } from "../config.utils";

const scriptGTag = [
  "script",
  {
    async: "async",
    src: `https://www.googletagmanager.com/gtag/js?id=${gMeasurementID}`
  },
] satisfies HeadConfig;

const scriptGTagData = [
  "script",
  {},
  `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gMeasurementID}');`
] satisfies HeadConfig;

const gaConfig = [
  scriptGTag,
  scriptGTagData
];

export default gaConfig satisfies HeadConfig[];

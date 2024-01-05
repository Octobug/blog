import "dotenv/config";
import { env } from "process";
import * as path from "path";

export const BASE_PATH = env.BASE_PATH || undefined;

export const giscus = {
  repo_id: env.GISCUS_REPO_ID || "",
  category_id: env.GISCUS_CATEGORY_ID || "",
};

export const gMeasurementID = env.G_MEASUREMENT_ID || "";

export function withBaseURL(urlPath: string) {
  if (BASE_PATH && urlPath.includes(BASE_PATH)) {
    return urlPath;
  }
  return path.join(BASE_PATH || "/", urlPath);
}

export function joinURL(baseURL: string, ...paths: string[]) {
  const urlPath = path.join(...paths);
  return new URL(urlPath, baseURL).href;
}

export function isProduction() {
  return !BASE_PATH;
}

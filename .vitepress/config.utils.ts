import "dotenv/config";
import { env } from "process";
import * as path from "path";

export const BASE_URL = env.BASE_URL || undefined;

export const giscus = {
  repo_id: env.GISCUS_REPO_ID || "",
  category_id: env.GISCUS_CATEGORY_ID || "",
};

export const gMeasurementID = env.G_MEASUREMENT_ID || "";

export function withBaseURL(urlPath: string) {
  return path.join(BASE_URL || "/", urlPath);
}

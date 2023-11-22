import { env } from "process";
import * as path from "path";

export const BASE_URL = env.BASE_URL || undefined;

export function withBaseURL(urlPath: string) {
  return path.join(BASE_URL || "/", urlPath);
}

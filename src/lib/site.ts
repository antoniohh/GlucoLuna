export const SITE = "https://antoniohh.github.io";
export const BASE = "/GlucoLuna";

export function withBase(path = "") {
  const clean = path.replace(/^\/+/, "");
  return `${BASE}/${clean}`;
}

export function absoluteUrl(path = "") {
  return new URL(withBase(path), SITE).href;
}

export const SITE = "https://glucoluna.antoniohorrillo.com";
export const BASE = "";

export function withBase(path = "") {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${clean}` : "/";
}

export function absoluteUrl(path = "") {
  return new URL(withBase(path), SITE).href;
}

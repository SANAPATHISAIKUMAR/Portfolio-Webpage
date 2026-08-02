import { siteConfig } from "./site";

/**
 * GitHub identity constants — safe to import from client *or* server code.
 * The fetching layer lives in `src/lib/github.ts` and is server-only.
 */

export const GITHUB_PROFILE_URL =
  siteConfig.links.find((l) => l.platform === "GitHub")?.url ??
  "https://github.com";

export const GITHUB_USERNAME =
  GITHUB_PROFILE_URL.split("/").filter(Boolean).pop() ?? "";

/**
 * Canonical repo URL from a bare repo name. Projects store only the repo name
 * so the "Code" link and the live stats can never point at different places.
 */
export function repoUrl(repo: string): string {
  return `https://github.com/${GITHUB_USERNAME}/${repo}`;
}

/** Brand colours for the language dots, matching GitHub's own palette. */
export const languageColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Java: "#B07219",
  "C++": "#F34B7D",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Shell: "#89E051",
  Vue: "#41B883",
  Dart: "#00B4AB",
  Dockerfile: "#384D54",
  "Jupyter Notebook": "#DA5B0B",
  Nix: "#7E7EFF",
};

export function languageColor(language: string | null | undefined): string {
  return (language && languageColors[language]) || "#8B949E";
}

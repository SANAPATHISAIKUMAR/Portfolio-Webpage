import "server-only";

import type { GitHubData, GitHubRepo, GitHubUser, RepoStats } from "../types";
import { GITHUB_USERNAME } from "../config/github";
import { relativeTime } from "./format";

/**
 * Server-side GitHub data layer.
 *
 * Why this exists: the site used to call api.github.com straight from the
 * browser. Unauthenticated GitHub requests are rate-limited to **60 per hour
 * per IP** — and every visitor spent two of them. Behind a corporate or mobile
 * NAT (exactly where a recruiter sits) that budget is gone in minutes and the
 * section renders its error state.
 *
 * Fetching here instead means:
 *   - one upstream request per hour for the whole site, not two per visitor;
 *   - an optional GITHUB_TOKEN raises the ceiling to 5,000/hr and is never
 *     exposed to the client;
 *   - the data lands in the server-rendered HTML, so it is crawlable.
 */

const GITHUB_API = "https://api.github.com";

/** Revalidate the GitHub snapshot hourly — fresh enough, nowhere near the limit. */
export const GITHUB_REVALIDATE_SECONDS = 3600;

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional — the app works without it, just on the lower rate limit.
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function githubFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${GITHUB_API}${path}`, {
      headers: githubHeaders(),
      next: { revalidate: GITHUB_REVALIDATE_SECONDS, tags: ["github"] },
    });
    if (!res.ok) {
      console.error(`[github] ${path} → ${res.status} ${res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error(`[github] ${path} failed`, error);
    return null;
  }
}

/**
 * A repo is worth showing only if it is my own work and actually has code in
 * it. `size === 0` filters out empty repos — linking a recruiter to an empty
 * repository is worse than not linking at all.
 */
function isShowable(repo: GitHubRepo): boolean {
  return !repo.fork && !repo.archived && repo.size > 0;
}

/**
 * Fetches the profile + public repos. Returns `null` when GitHub is
 * unreachable or rate-limited so callers can fall back to curated content
 * instead of rendering a broken section.
 */
export async function getGitHubData(): Promise<GitHubData | null> {
  if (!GITHUB_USERNAME) return null;

  const [user, allRepos] = await Promise.all([
    githubFetch<GitHubUser>(`/users/${GITHUB_USERNAME}`),
    githubFetch<GitHubRepo[]>(
      `/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`
    ),
  ]);

  if (!user || !Array.isArray(allRepos)) return null;

  const repos = allRepos.filter(isShowable);

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

  const langCount = new Map<string, number>();
  for (const repo of repos) {
    if (repo.language) {
      langCount.set(repo.language, (langCount.get(repo.language) ?? 0) + 1);
    }
  }
  const languages = [...langCount.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 6);

  const sorted = [...repos].sort(
    (a, b) =>
      (b.stargazers_count || 0) - (a.stargazers_count || 0) ||
      new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  );

  return {
    user,
    repos: sorted,
    totalStars,
    languages,
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Live stats keyed by lowercased repo name, for merging into curated project
 * cards. Repo names on GitHub are case-insensitive, so the lookup is too —
 * that's what keeps `SMART-MENTOR` matching a `smart-mentor` reference.
 */
export async function getRepoStats(): Promise<Record<string, RepoStats>> {
  const data = await getGitHubData();
  if (!data) return {};

  return Object.fromEntries(
    data.repos.map((repo) => [
      repo.name.toLowerCase(),
      {
        name: repo.name,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        pushedAt: repo.pushed_at,
        updatedLabel: relativeTime(repo.pushed_at),
      } satisfies RepoStats,
    ])
  );
}

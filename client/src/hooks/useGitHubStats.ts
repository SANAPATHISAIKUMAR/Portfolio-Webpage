import { useQuery } from "@tanstack/react-query";
import type { GitHubRepo, GitHubUser } from "../types";

interface ApiRepo extends GitHubRepo {
  fork?: boolean;
}

export interface GitHubStats {
  user: GitHubUser;
  /** Top repos by stars, then most recently updated. */
  repos: ApiRepo[];
  totalStars: number;
  /** Most-used languages across non-fork repos. */
  languages: { name: string; count: number }[];
}

async function fetchGitHubStats(
  username: string,
  signal?: AbortSignal
): Promise<GitHubStats> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { signal }),
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      signal,
    }),
  ]);

  if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

  const user: GitHubUser = await userRes.json();
  const reposData: ApiRepo[] = await reposRes.json();
  const ownRepos = reposData.filter((r) => !r.fork);

  const totalStars = ownRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

  const langCount: Record<string, number> = {};
  ownRepos.forEach((r) => {
    if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
  });
  const languages = Object.entries(langCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const repos = [...ownRepos]
    .sort(
      (a, b) =>
        (b.stargazers_count || 0) - (a.stargazers_count || 0) ||
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, 4);

  return { user, repos, totalStars, languages };
}

/**
 * Fetches + aggregates public GitHub stats via React Query — gives caching
 * (no refetch across remounts), a retry for the flaky unauthenticated API, and
 * automatic request cancellation. Keeps OpenSource purely presentational.
 */
export function useGitHubStats(username: string) {
  return useQuery({
    queryKey: ["github-stats", username],
    queryFn: ({ signal }) => fetchGitHubStats(username, signal),
    staleTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

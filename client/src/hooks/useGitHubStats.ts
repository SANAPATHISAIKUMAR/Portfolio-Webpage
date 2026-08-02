import { useQuery } from "@tanstack/react-query";
import type { GitHubData } from "../types";

/**
 * Reads the live GitHub snapshot from our own `/api/github` route.
 *
 * It deliberately does *not* call api.github.com: unauthenticated GitHub
 * requests are capped at 60/hour per IP, so hitting it from every visitor's
 * browser meant the section broke for anyone behind a shared/corporate IP.
 * The route handler fetches once an hour server-side for everyone.
 */
async function fetchGitHubStats(signal?: AbortSignal): Promise<GitHubData> {
  const res = await fetch("/api/github", { signal });
  if (!res.ok) throw new Error(`GitHub stats unavailable (${res.status})`);
  return (await res.json()) as GitHubData;
}

export function useGitHubStats() {
  return useQuery({
    queryKey: ["github-stats"],
    queryFn: ({ signal }) => fetchGitHubStats(signal),
    staleTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

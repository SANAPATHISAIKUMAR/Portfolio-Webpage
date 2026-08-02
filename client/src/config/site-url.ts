/**
 * Resolves the site's public origin.
 *
 * Canonical tags, the sitemap, robots.txt and OG image URLs all have to agree
 * on one absolute origin, and hardcoding a domain means every one of them is
 * silently wrong until that domain exists. Resolution order:
 *
 *   1. NEXT_PUBLIC_SITE_URL — set this once you have a custom domain.
 *   2. Vercel's production URL — correct automatically on a Vercel deploy.
 *   3. localhost — local development.
 *
 * Server-side only in practice: `VERCEL_PROJECT_PRODUCTION_URL` is not exposed
 * to the browser bundle, and every consumer (metadata, sitemap, robots, JSON-LD)
 * runs on the server.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(withProtocol(explicit));

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${stripTrailingSlash(vercel)}`;

  const port = process.env.PORT ?? "3000";
  return `http://localhost:${port}`;
}

function withProtocol(url: string): string {
  return /^https?:\/\//.test(url) ? url : `https://${url}`;
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

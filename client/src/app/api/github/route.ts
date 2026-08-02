import { NextResponse } from "next/server";
import { getGitHubData } from "../../../lib/github";

/**
 * GET /api/github — live GitHub profile snapshot for the client.
 *
 * The browser talks to this instead of api.github.com so that the whole site
 * shares one hourly upstream request (and an optional GITHUB_TOKEN stays on
 * the server). Responses are cached at the edge for the same hour.
 */
// Must be a literal — Next statically analyses route segment config, so it
// cannot be imported from lib/github.ts. Keep in sync with
// GITHUB_REVALIDATE_SECONDS there (1 hour).
export const revalidate = 3600;

export async function GET() {
  const data = await getGitHubData();

  if (!data) {
    return NextResponse.json(
      { error: "GitHub data is temporarily unavailable." },
      {
        status: 503,
        // Brief cache so a GitHub outage can't turn into a request storm,
        // but recovery is still quick once GitHub is back.
        headers: { "Cache-Control": "public, max-age=0, s-maxage=60" },
      }
    );
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": `public, s-maxage=${revalidate}, stale-while-revalidate=86400`,
    },
  });
}

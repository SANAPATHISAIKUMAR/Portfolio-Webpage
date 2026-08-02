import type { MetadataRoute } from "next";
import { getSiteUrl } from "../config/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing useful for a crawler, and the contact endpoint should not be
      // discoverable as a page.
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

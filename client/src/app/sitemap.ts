import type { MetadataRoute } from "next";
import { projects } from "../data/projects";
import { getSiteUrl } from "../config/site-url";

/**
 * Replaces the old hand-written public/sitemap.xml, which listed only the home
 * page, carried a 2024 lastmod, and pointed at a domain that isn't in use — so
 * none of the case-study pages were discoverable.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.9 : 0.7,
    })),
  ];
}

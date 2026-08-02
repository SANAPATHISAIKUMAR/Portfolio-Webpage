import { ImageResponse } from "next/og";
import { projects } from "../../../data/projects";
import { getProjectBySlug, categoryLabels } from "../../../lib/projects";
import { siteConfig } from "../../../config/site";

/** Per-case-study social card, tinted with that project's accent colour. */
export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title ?? siteConfig.name;
  const tagline = project?.tagline ?? siteConfig.role ?? "";
  const accent = project?.color ?? "#3B82F6";
  const category = project ? categoryLabels[project.category] : "Case Study";
  const stack = project?.techStack.slice(0, 5) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050816",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: `linear-gradient(90deg, ${accent}, transparent)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}55 0%, ${accent}00 70%)`,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: 999,
              border: `1px solid ${accent}66`,
              background: `${accent}22`,
              color: accent,
              fontSize: 20,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {category}
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#94A3B8", letterSpacing: 2 }}>
            CASE STUDY
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              color: "#F8FAFC",
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#94A3B8", lineHeight: 1.3 }}>
            {tagline}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {stack.map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  padding: "6px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(148,163,184,0.25)",
                  color: "#CBD5E1",
                  fontSize: 20,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(148,163,184,0.2)",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 26, color: "#E2E8F0", fontWeight: 600 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#94A3B8" }}>
            {siteConfig.role}
          </div>
        </div>
      </div>
    ),
    size
  );
}

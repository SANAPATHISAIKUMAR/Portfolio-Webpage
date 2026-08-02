import { ImageResponse } from "next/og";
import { siteConfig } from "../config/site";

/**
 * Generated social preview card.
 *
 * The site previously pointed at a static `/images/og-image.png` that was never
 * added, so every shared link rendered a blank card. Generating it here means
 * there is no binary asset to forget — and it always matches the live copy.
 */
export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        {/* Ambient glows, mirroring the hero */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -120,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            right: -140,
            width: 680,
            height: 680,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.32) 0%, rgba(124,58,237,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #3B82F6, #7C3AED)",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            SK
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#94A3B8",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {siteConfig.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: "#F8FAFC",
              lineHeight: 1.1,
            }}
          >
            Building scalable,
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              background: "linear-gradient(90deg, #3B82F6, #7C3AED, #06B6D4)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            full-stack products
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(148,163,184,0.2)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#E2E8F0", fontWeight: 600 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#94A3B8" }}>
            {siteConfig.company}
          </div>
        </div>
      </div>
    ),
    size
  );
}

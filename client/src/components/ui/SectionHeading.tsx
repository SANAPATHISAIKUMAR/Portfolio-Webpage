import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  /** Small uppercase kicker above the title, e.g. "Featured Work". */
  eyebrow?: string;
  /** Section title. Accepts nodes so callers can highlight part with <span className="gradient-text">. */
  title: ReactNode;
  /** Supporting line under the title. */
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
  /** id applied to the <h2>, so a parent <section aria-labelledby> can name the landmark. */
  headingId?: string;
}

/**
 * Canonical section header used across every section, so the type scale,
 * spacing, and eyebrow styling stay identical everywhere. Presentational and
 * server-safe — wrap in <RevealOnScroll> at the call site if you want it to
 * animate in.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  headingId,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("mb-12", centered ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <span className="mb-3 block text-caption font-medium uppercase tracking-[0.2em] text-accent-blue">
          {eyebrow}
        </span>
      )}
      <h2
        id={headingId}
        className="mb-4 font-display text-section-title font-bold text-text-primary"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-section-subtitle text-text-secondary",
            centered && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { cn } from "../../lib/utils";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { skillGroups } from "../../data/skills";

export function Skills() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  // Filter skills within each group by the search query, dropping groups that
  // have no matching skills. An empty query shows everything.
  const visibleGroups = useMemo(() => {
    if (!normalizedQuery) return skillGroups;
    return skillGroups
      .map((group) => {
        const labelMatches = group.label.toLowerCase().includes(normalizedQuery);
        const skills = labelMatches
          ? group.skills
          : group.skills.filter((s) => s.toLowerCase().includes(normalizedQuery));
        return { ...group, skills };
      })
      .filter((group) => group.skills.length > 0);
  }, [normalizedQuery]);

  const totalMatches = visibleGroups.reduce((sum, g) => sum + g.skills.length, 0);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container relative">
        {/* Section Header */}
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Skills & Technologies"
            title={
              <>
                Tech <span className="gradient-text">Arsenal</span>
              </>
            }
            subtitle="The tools and technologies I use to bring ideas to life."
            headingId="skills-heading"
          />
        </RevealOnScroll>

        {/* Search */}
        <RevealOnScroll>
          <div className="mx-auto mb-10 max-w-md">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                aria-hidden
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills — React, AWS, Docker…"
                aria-label="Search skills"
                className={cn(
                  "w-full rounded-xl border border-hairline bg-surface-1 py-3 pl-11 pr-10",
                  "text-sm text-text-primary placeholder:text-text-muted backdrop-blur-sm",
                  "focus:border-accent-blue/40 focus:outline-none focus:ring-1 focus:ring-accent-blue/20",
                  "transition-colors duration-300"
                )}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-muted hover:text-text-primary transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>
            <p className="mt-2 text-center text-caption text-text-muted" aria-live="polite">
              {normalizedQuery
                ? `${totalMatches} skill${totalMatches === 1 ? "" : "s"} across ${visibleGroups.length} categor${visibleGroups.length === 1 ? "y" : "ies"}`
                : " "}
            </p>
          </div>
        </RevealOnScroll>

        {/* Category Cards */}
        {visibleGroups.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.06, 0.3),
                    ease: EASE_OUT_EXPO,
                  }}
                  className={cn(
                    "group flex h-full flex-col rounded-2xl p-6",
                    "border border-hairline bg-surface-1 backdrop-blur-sm",
                    "transition-colors duration-500 hover:border-hairline-strong"
                  )}
                >
                  {/* Header */}
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        "bg-accent-blue/10 text-accent-blue",
                        "transition-transform duration-500 group-hover:scale-105"
                      )}
                      aria-hidden
                    >
                      <Icon size={18} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-text-primary">
                        {group.label}
                      </h3>
                      <p className="text-caption text-text-muted">
                        {group.skills.length} skills
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                    {group.description}
                  </p>

                  {/* Skill chips */}
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <Badge key={skill} size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-hairline bg-surface-1 p-10 text-center">
            <p className="text-sm text-text-secondary">
              No skills match{" "}
              <span className="font-medium text-text-primary">
                &ldquo;{query.trim()}&rdquo;
              </span>
              .
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-4 text-sm font-medium text-accent-blue hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ExternalLink, ArrowRight, TrendingUp, Bot, Rocket, Code2, Sparkles, Star, GitFork, History } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GithubIcon } from "../ui/SocialIcons";
import { cn } from "../../lib/utils";
import { languageColor, repoUrl } from "../../config/github";
import type { Project, RepoStats } from "../../types";

const categoryIcon: Record<Project["category"], LucideIcon> = {
  ai: Bot,
  fullstack: Rocket,
  frontend: Code2,
  backend: Code2,
  mobile: Code2,
};

const categoryLabel: Record<Project["category"], string> = {
  ai: "AI",
  fullstack: "Full Stack",
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
};

interface ProjectCardProps {
  project: Project;
  /** Flagship layout — media beside content on desktop, more tech chips shown. */
  wide?: boolean;
  /**
   * Live GitHub numbers for `project.repo`, fetched server-side. Absent when
   * the project has no public repo or GitHub was unreachable — the card just
   * renders without the stats strip rather than showing zeroes.
   */
  stats?: RepoStats;
}

export function ProjectCard({ project, wide = false, stats }: ProjectCardProps) {
  const Icon = categoryIcon[project.category] ?? Code2;
  const chipCount = wide ? 7 : 5;
  const overflow = project.techStack.length - chipCount;
  const codeUrl = project.repo ? repoUrl(project.repo) : undefined;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl",
        "border border-hairline bg-surface-1 backdrop-blur-sm",
        "transition-[transform,border-color] duration-500 ease-out-expo",
        "hover:-translate-y-1 hover:border-hairline-strong",
        wide && "md:flex-row"
      )}
    >
      {/* Accent glow on hover — theme-agnostic (uses the project's own color) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 26px 70px -28px ${project.color}66` }}
      />

      {/* Visual / cover */}
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden",
          wide
            ? "aspect-video border-b border-hairline md:aspect-auto md:w-2/5 md:border-b-0 md:border-r"
            : "aspect-video border-b border-hairline"
        )}
        style={{ background: `linear-gradient(135deg, ${project.color}14 0%, transparent 62%)` }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
        />
        <div className="p-6 text-center">
          <div
            className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${project.color}2b, ${project.color}12)`,
              border: `1px solid ${project.color}33`,
            }}
          >
            <Icon size={26} style={{ color: project.color }} aria-hidden />
          </div>
          <p className="mx-auto max-w-[200px] text-caption leading-relaxed text-text-muted">
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
            style={{
              background: `${project.color}1a`,
              color: project.color,
              border: `1px solid ${project.color}2e`,
            }}
          >
            {categoryLabel[project.category] ?? project.category}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
              <Sparkles size={10} aria-hidden />
              Featured
            </span>
          )}
        </div>

        <h3 className="mb-2 font-display text-xl font-bold text-text-primary md:text-2xl">
          {project.title}
        </h3>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        {/* Impact — the case-study substance, scannable in one line */}
        {project.impact && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-hairline bg-surface-2 px-3 py-2">
            <TrendingUp size={14} className="mt-0.5 shrink-0" style={{ color: project.color }} aria-hidden />
            <p className="text-caption leading-snug text-text-secondary">{project.impact}</p>
          </div>
        )}

        {/* Live GitHub numbers — server-fetched, refreshed hourly */}
        {stats && (
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-text-muted">
            {stats.language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: languageColor(stats.language) }}
                  aria-hidden
                />
                {stats.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star size={11} aria-hidden />
              {stats.stars}
              <span className="sr-only"> stars</span>
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={11} aria-hidden />
              {stats.forks}
              <span className="sr-only"> forks</span>
            </span>
            <span className="flex items-center gap-1">
              <History size={11} aria-hidden />
              Updated {stats.updatedLabel}
            </span>
          </div>
        )}

        {/* Tech stack */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, chipCount).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-hairline bg-surface-2 px-2 py-0.5 text-[10px] text-text-secondary"
            >
              {tech}
            </span>
          ))}
          {overflow > 0 && (
            <span className="rounded-md px-2 py-0.5 text-[10px] text-text-muted">+{overflow} more</span>
          )}
        </div>

        {/* Footer — Case Study is always available; external links when present */}
        <div className="mt-auto flex items-center gap-4 border-t border-hairline pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ color: project.color }}
          >
            Case Study
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>

          {(codeUrl || project.liveUrl) && (
            <div className="ml-auto flex items-center gap-3">
              {codeUrl && (
                <a
                  href={codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code`}
                  className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  <GithubIcon size={15} />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  <ExternalLink size={15} />
                  Live
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

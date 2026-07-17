import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Sparkles, Target, Lightbulb, Wrench, TrendingUp } from "lucide-react";
import { GithubIcon } from "../../../components/ui/SocialIcons";
import { projects } from "../../../data/projects";
import { getProjectBySlug, categoryLabels } from "../../../lib/projects";
import { siteConfig } from "../../../config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every project page at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  const url = `${siteConfig.url}/projects/${project.slug}`;
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${project.title} — ${siteConfig.name}`,
      description: project.description,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study`,
      description: project.description,
    },
  };
}

/** One case-study prose block with an icon + heading. */
function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-text-primary">
        <Icon size={18} className="text-accent-blue" />
        {title}
      </h2>
      <p className="text-body-lg leading-relaxed text-text-secondary">{children}</p>
    </section>
  );
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/projects/${project.slug}`,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    keywords: project.techStack.join(", "),
  };

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="section-container max-w-5xl pt-28 pb-24 md:pt-32">
        {/* Back link */}
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={{
                background: `${project.color}1a`,
                color: project.color,
                border: `1px solid ${project.color}2e`,
              }}
            >
              {categoryLabels[project.category] ?? project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
                <Sparkles size={10} aria-hidden />
                Featured
              </span>
            )}
          </div>
          <h1 className="font-display text-hero-md font-bold tracking-tight text-text-primary">
            {project.title}
          </h1>
          <p className="mt-3 text-section-subtitle text-text-secondary">{project.tagline}</p>

          {/* Actions */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-5 text-sm font-medium text-[var(--btn-primary-fg)] transition-colors hover:bg-[var(--btn-primary-bg-hover)]"
                >
                  Live Demo
                  <ArrowUpRight size={15} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-hairline-strong bg-surface-1 px-5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-2"
                >
                  <GithubIcon size={15} />
                  View Code
                </a>
              )}
            </div>
          )}
        </header>

        {/* Hero visual */}
        <div
          className="relative mb-12 flex aspect-[2/1] w-full items-center justify-center overflow-hidden rounded-3xl border border-hairline"
          style={{ background: `linear-gradient(135deg, ${project.color}22 0%, transparent 65%)` }}
        >
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
          />
          <p className="max-w-sm px-6 text-center text-section-subtitle text-text-muted">
            {project.tagline}
          </p>
        </div>

        {/* Body */}
        <div className="grid gap-10 lg:grid-cols-3">
          <article className="space-y-10 lg:col-span-2">
            <Block icon={Lightbulb} title="Overview">
              {project.description}
            </Block>
            {project.problem && (
              <Block icon={Target} title="The Problem">
                {project.problem}
              </Block>
            )}
            {project.solution && (
              <Block icon={Lightbulb} title="The Solution">
                {project.solution}
              </Block>
            )}
            {project.contribution && (
              <Block icon={Wrench} title="My Contribution">
                {project.contribution}
              </Block>
            )}
            {project.challenges && (
              <Block icon={Wrench} title="Challenges">
                {project.challenges}
              </Block>
            )}

            {/* Key features */}
            {project.features.length > 0 && (
              <section>
                <h2 className="mb-4 font-display text-lg font-semibold text-text-primary">
                  Key Features
                </h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                        style={{ background: `${project.color}1a`, color: project.color }}
                        aria-hidden
                      >
                        <Check size={12} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {project.impact && (
              <div className="rounded-2xl border border-hairline bg-surface-1 p-5">
                <h3 className="mb-2 flex items-center gap-2 text-caption font-medium uppercase tracking-wider text-text-muted">
                  <TrendingUp size={14} style={{ color: project.color }} />
                  Impact
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">{project.impact}</p>
              </div>
            )}

            <div className="rounded-2xl border border-hairline bg-surface-1 p-5">
              <h3 className="mb-3 text-caption font-medium uppercase tracking-wider text-text-muted">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-hairline bg-surface-2 px-2 py-0.5 text-[11px] text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-hairline pt-10 text-center">
          <p className="text-sm text-text-secondary">Want to see more or work together?</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#projects"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-hairline-strong bg-surface-1 px-5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-2"
            >
              <ArrowLeft size={15} />
              All projects
            </Link>
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-5 text-sm font-medium text-[var(--btn-primary-fg)] transition-colors hover:bg-[var(--btn-primary-bg-hover)]"
            >
              Get in touch
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

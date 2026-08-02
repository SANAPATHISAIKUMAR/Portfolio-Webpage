import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../../components/ui/SocialIcons";
import { PrintButton } from "../../components/ui/PrintButton";
import { siteConfig } from "../../config/site";
import { getSiteUrl } from "../../config/site-url";
import { GITHUB_PROFILE_URL, repoUrl } from "../../config/github";
import { experiences } from "../../data/experience";
import { skillGroups } from "../../data/skills";
import { projects } from "../../data/projects";
import { hackathons } from "../../data/hackathons";
import { certifications } from "../../data/certifications";
import { formatDateRange } from "../../lib/utils";

/**
 * A real résumé page, not a link to a PDF that was never committed.
 *
 * The hero/nav/footer "Resume" buttons used to point at
 * /resume/SaiKumar_Resume.pdf, which 404s — the single worst broken link on a
 * job-seeking portfolio. This renders the same content as selectable, semantic,
 * ATS-parseable HTML, and the print stylesheet turns Ctrl/Cmd+P into a clean
 * A4 PDF.
 */

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${siteConfig.name} — ${siteConfig.role} at ${siteConfig.company}. Experience, skills, projects and achievements.`,
  alternates: { canonical: "/resume" },
};

const EDUCATION = {
  degree: "B.Tech, Computer Science (AI & Machine Learning)",
  institution: "Dhanalakshmi Srinivasan University",
  period: "2023 — Present",
};

/** Projects worth a résumé line, strongest first. */
const RESUME_PROJECTS = projects.slice(0, 4);

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="print-section mb-8">
      <h2 className="print-rule mb-4 border-b border-hairline pb-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-text-primary">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ResumePage() {
  const siteUrl = getSiteUrl();
  const linkedIn = siteConfig.links.find((l) => l.platform === "LinkedIn")?.url;

  return (
    <main className="relative">
      <div className="section-container max-w-4xl pt-28 pb-24 md:pt-32">
        {/* Screen-only controls */}
        <div
          data-print-hide
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>
          <PrintButton />
        </div>

        <article className="print-document rounded-3xl border border-hairline bg-surface-1 p-8 md:p-12">
          {/* Header */}
          <header className="print-section print-rule mb-8 border-b border-hairline pb-6">
            <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              {siteConfig.name}
            </h1>
            <p className="mt-1 text-lg text-text-secondary">
              {siteConfig.role} · {siteConfig.company}
            </p>

            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-1.5">
                <Mail size={14} aria-hidden />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-text-primary">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin size={14} aria-hidden />
                {siteConfig.location}
              </li>
              <li className="flex items-center gap-1.5">
                <Globe size={14} aria-hidden />
                <a href={siteUrl} className="hover:text-text-primary">
                  {siteUrl.replace(/^https?:\/\//, "")}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <GithubIcon size={14} />
                <a href={GITHUB_PROFILE_URL} className="hover:text-text-primary">
                  {GITHUB_PROFILE_URL.replace(/^https?:\/\//, "")}
                </a>
              </li>
              {linkedIn && (
                <li className="flex items-center gap-1.5">
                  <LinkedinIcon size={14} />
                  <a href={linkedIn} className="hover:text-text-primary">
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </header>

          {/* Summary */}
          <Section title="Summary">
            <p className="text-sm leading-relaxed text-text-secondary">
              {siteConfig.summary}
            </p>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="print-section">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-base font-semibold text-text-primary">
                      {exp.role}
                      <span className="font-normal text-text-secondary"> · {exp.company}</span>
                    </h3>
                    <span className="text-xs text-text-muted">
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-text-muted">{exp.location}</p>
                  <ul className="mt-2 space-y-1.5">
                    {exp.achievements.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-relaxed text-text-secondary"
                      >
                        <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-text-muted" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-text-muted">
                    <span className="font-medium text-text-secondary">Tech:</span>{" "}
                    {exp.technologies.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Projects */}
          <Section title="Selected Projects">
            <div className="space-y-5">
              {RESUME_PROJECTS.map((project) => (
                <div key={project.id} className="print-section">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-base font-semibold text-text-primary">
                      {project.title}
                      <span className="font-normal text-text-secondary"> · {project.tagline}</span>
                    </h3>
                    {project.repo && (
                      <a
                        href={repoUrl(project.repo)}
                        className="text-xs text-text-muted hover:text-text-primary"
                      >
                        github.com/…/{project.repo}
                      </a>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                    {project.contribution ?? project.description}
                  </p>
                  {project.impact && (
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      <span className="font-medium">Impact:</span> {project.impact}
                    </p>
                  )}
                  <p className="mt-1.5 text-xs text-text-muted">
                    <span className="font-medium text-text-secondary">Tech:</span>{" "}
                    {project.techStack.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section title="Technical Skills">
            <dl className="space-y-2">
              {skillGroups.map((group) => (
                <div key={group.id} className="flex flex-wrap gap-x-2 text-sm">
                  <dt className="font-medium text-text-primary">{group.label}:</dt>
                  <dd className="flex-1 text-text-secondary">{group.skills.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* Education */}
          <Section title="Education">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-display text-base font-semibold text-text-primary">
                {EDUCATION.degree}
              </h3>
              <span className="text-xs text-text-muted">{EDUCATION.period}</span>
            </div>
            <p className="mt-0.5 text-sm text-text-secondary">{EDUCATION.institution}</p>
          </Section>

          {/* Hackathons & recognition */}
          {hackathons.length > 0 && (
            <Section title="Hackathons & Recognition">
              <ul className="space-y-2">
                {hackathons.map((h) => (
                  <li key={h.id} className="text-sm leading-relaxed text-text-secondary">
                    <span className="font-medium text-text-primary">{h.name}</span>
                    {h.organizer && <span className="text-text-muted"> · {h.organizer}</span>}
                    <span className="text-text-muted"> · {h.date}</span>
                    <br />
                    {h.achievement}
                    {h.position ? ` — ${h.position}` : ""}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Certifications — renders only once real entries exist */}
          {certifications.length > 0 && (
            <Section title="Certifications">
              <ul className="space-y-1.5">
                {certifications.map((cert) => (
                  <li key={cert.id} className="text-sm text-text-secondary">
                    <span className="font-medium text-text-primary">{cert.title}</span> ·{" "}
                    {cert.issuer} · {cert.date}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </article>
      </div>
    </main>
  );
}

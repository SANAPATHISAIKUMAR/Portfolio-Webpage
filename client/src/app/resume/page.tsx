import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { PrintButton } from "../../components/ui/PrintButton";
import { siteConfig } from "../../config/site";
import { getSiteUrl } from "../../config/site-url";
import { GITHUB_PROFILE_URL, repoUrl } from "../../config/github";
import { experiences } from "../../data/experience";
import { skillGroups } from "../../data/skills";
import { projects } from "../../data/projects";
import { hackathons } from "../../data/hackathons";
import { certifications } from "../../data/certifications";
import { education } from "../../data/education";
import { formatDateRange } from "../../lib/utils";

/**
 * The one-page placements résumé.
 *
 * Structure and density follow Sai_Kumar_Resume_Placements_Optimized.pdf:
 * Summary, Education, Technical Skills, Experience, Projects, Hackathons &
 * Achievements, Certifications. Deliberately leaner than the site — three
 * projects rather than seven, and résumé-specific bullets and stack lines rather
 * than the site's fuller feature lists — because a one-page résumé that lists
 * everything ranks nothing.
 *
 * Content is read from the same data files as the rest of the site, so the page
 * cannot drift from the portfolio. `npm run resume:pdf` snapshots it to
 * public/resume/ as the downloadable PDF.
 */

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${siteConfig.name} — ${siteConfig.role} at ${siteConfig.company}. Experience, skills, projects and achievements.`,
  alternates: { canonical: "/resume" },
};

/** The three the placements résumé leads with, in data order. */
const RESUME_PROJECTS = projects.filter((p) => p.onResume);

/** Four achievements, as on the placements résumé — VIBEATHON is site-only. */
const RESUME_HACKATHONS = hackathons.filter((h) => h.onResume);

/** Section heading with a rule above and below, as in the source résumé. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="print-block mb-5">
      <h2 className="resume-heading mb-2 border-y border-hairline py-1 font-display text-[length:var(--r-small)] font-bold uppercase tracking-[0.14em] text-text-primary">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Title left, italic meta right — the résumé's entry header pattern. */
function EntryHead({ left, right }: { left: React.ReactNode; right?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
      <h3 className="font-display text-[length:var(--r-h3)] font-bold text-text-primary">{left}</h3>
      {right && <span className="text-[length:var(--r-small)] italic text-text-muted">{right}</span>}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-1 space-y-0.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-[length:var(--r-body)] leading-snug text-text-secondary">
          {/* print-bullet re-inks the dot for print — the blanket
              `background: transparent` print rule would otherwise erase it. */}
          <span
            aria-hidden
            className="print-bullet mt-[5px] h-[3px] w-[3px] shrink-0 rounded-full bg-text-muted"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  const siteUrl = getSiteUrl();
  const linkedIn = siteConfig.links.find((l) => l.platform === "LinkedIn")?.url;

  // Only advertise the portfolio URL once it is a real origin — otherwise the
  // résumé, and any PDF generated from it locally, lists "localhost:3000".
  const isPublicSite = !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(siteUrl);
  const strip = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <main className="relative">
      <div className="print-page section-container max-w-4xl pt-28 pb-24 md:pt-32">
        {/* Screen-only controls */}
        <div data-print-hide className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>

          <div className="flex items-center gap-2">
            <PrintButton />
            <a
              href={siteConfig.resumePdf}
              download
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--btn-primary-bg)] px-4 text-sm font-medium text-[var(--btn-primary-fg)] transition-colors hover:bg-[var(--btn-primary-bg-hover)]"
            >
              <Download size={15} aria-hidden />
              Download PDF
            </a>
          </div>
        </div>

        <article className="print-document rounded-3xl border border-hairline bg-surface-1 p-8 md:p-12">
          {/* Header */}
          <header className="print-section mb-4">
            <h1 className="font-display text-[length:var(--r-name)] font-bold tracking-tight text-text-primary md:text-3xl">
              {siteConfig.name}
            </h1>
            {siteConfig.headline && (
              <p className="mt-0.5 text-[length:var(--r-headline)] text-text-secondary">{siteConfig.headline}</p>
            )}

            <p className="mt-1.5 text-[length:var(--r-body)] leading-relaxed text-text-secondary">
              {siteConfig.phone && (
                <>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
                  {"  |  "}
                </>
              )}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              {"  |  "}
              {siteConfig.location}
            </p>
            <p className="text-[length:var(--r-body)] leading-relaxed text-text-secondary">
              {linkedIn && (
                <>
                  <span className="font-medium text-text-primary">LinkedIn:</span>{" "}
                  <a href={linkedIn} className="text-accent-blue">
                    {strip(linkedIn)}
                  </a>
                  {"  |  "}
                </>
              )}
              <span className="font-medium text-text-primary">GitHub:</span>{" "}
              <a href={GITHUB_PROFILE_URL} className="text-accent-blue">
                {strip(GITHUB_PROFILE_URL)}
              </a>
              {isPublicSite && (
                <>
                  {"  |  "}
                  <span className="font-medium text-text-primary">Portfolio:</span>{" "}
                  <a href={siteUrl} className="text-accent-blue">
                    {strip(siteUrl)}
                  </a>
                </>
              )}
            </p>
          </header>

          {/* Summary */}
          <Section title="Summary">
            <p className="text-[length:var(--r-body)] leading-relaxed text-text-secondary">
              {siteConfig.summary}
            </p>
          </Section>

          {/* Education */}
          <Section title="Education">
            <EntryHead left={education.degree} right={education.period} />
            <p className="text-[length:var(--r-body)] italic text-text-secondary">{education.institution}</p>
            <p className="mt-0.5 text-[length:var(--r-body)] text-text-secondary">
              {education.metrics.join("  |  ")}
            </p>
          </Section>

          {/* Technical skills */}
          <Section title="Technical Skills">
            <div className="space-y-0.5">
              {skillGroups.map((group) => (
                <p key={group.id} className="text-[length:var(--r-body)] leading-snug text-text-secondary">
                  <span className="font-semibold text-text-primary">{group.label}:</span>{" "}
                  {group.skills.join(", ")}
                </p>
              ))}
            </div>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="print-section">
                  <EntryHead
                    left={`${exp.role}, ${exp.company} | ${exp.location}`}
                    right={formatDateRange(exp.startDate, exp.endDate)}
                  />
                  {exp.resumeContext && (
                    <p className="text-[length:var(--r-meta)] italic text-text-muted">
                      {exp.resumeContext}
                    </p>
                  )}
                  <Bullets items={exp.achievements} />
                </div>
              ))}
            </div>
          </Section>

          {/* Projects */}
          <Section title="Projects">
            <div className="space-y-3">
              {RESUME_PROJECTS.map((project) => (
                <div key={project.id} className="print-section">
                  <EntryHead
                    left={
                      <>
                        {project.title}, {project.tagline}
                        {project.context ? (
                          <span className="font-normal text-text-muted"> | {project.context}</span>
                        ) : null}
                        {project.repo && (
                          <>
                            {" | "}
                            <a href={repoUrl(project.repo)} className="text-accent-blue">
                              GitHub
                            </a>
                          </>
                        )}
                      </>
                    }
                    right={(project.resumeStack ?? project.techStack.slice(0, 5)).join(", ")}
                  />
                  <Bullets items={project.resumeBullets ?? []} />
                </div>
              ))}
            </div>
          </Section>

          {/* Achievements */}
          <Section title="Hackathons & Achievements">
            <ul className="space-y-0.5">
              {RESUME_HACKATHONS.map((h) => (
                <li
                  key={h.id}
                  className="flex gap-2 text-[length:var(--r-body)] leading-snug text-text-secondary"
                >
                  <span
                    aria-hidden
                    className="print-bullet mt-[5px] h-[3px] w-[3px] shrink-0 rounded-full bg-text-muted"
                  />
                  <span>
                    <span className="font-semibold text-text-primary">{h.name}:</span>{" "}
                    {h.achievement}
                    {h.position ? `, ${h.position.toLowerCase()}` : ""}
                    {h.projectName ? `. Built ${h.projectName}` : ""}.
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Certifications */}
          {certifications.length > 0 && (
            <Section title="Certifications">
              <p className="text-[length:var(--r-body)] leading-snug text-text-secondary">
                {certifications.map((c, i) => (
                  <span key={c.id}>
                    {i > 0 && "  |  "}
                    <span className="font-medium text-text-primary">{c.title}</span>
                    {" — "}
                    {c.issuer}
                    {c.detail ? ` (${c.detail})` : ""}
                  </span>
                ))}
              </p>
            </Section>
          )}

        </article>
      </div>
    </main>
  );
}

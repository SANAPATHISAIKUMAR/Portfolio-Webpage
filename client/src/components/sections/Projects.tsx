import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { MagneticButton } from "../effects/MagneticButton";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { cn } from "../../lib/utils";
import { projects } from "../../data/projects";
import { getRepoStats } from "../../lib/github";
import { GITHUB_PROFILE_URL } from "../../config/github";

/**
 * Server component: pulls the live GitHub snapshot once (cached and revalidated
 * hourly) and hands each card its own repo's numbers. Fetching here rather than
 * in the browser keeps the stats in the server-rendered HTML — crawlable, and
 * costing one upstream request an hour instead of two per visitor.
 */
export async function Projects() {
  const repoStats = await getRepoStats();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative section-padding overflow-hidden"
    >
      {/* Ambient background wash */}
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-150 w-150 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Featured Work"
            title={<>Projects That <span className="gradient-text">Matter</span></>}
            subtitle="Production systems and deep-tech builds — with live repository stats pulled straight from GitHub."
            headingId="projects-heading"
          />
        </RevealOnScroll>

        {/* Grid — the flagship project spans full width */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <RevealOnScroll
              key={project.id}
              delay={index * 0.08}
              className={cn("h-full", index === 0 && "md:col-span-2")}
            >
              <ProjectCard
                project={project}
                wide={index === 0}
                stats={project.repo ? repoStats[project.repo.toLowerCase()] : undefined}
              />
            </RevealOnScroll>
          ))}
        </div>

        {/* View All CTA */}
        <RevealOnScroll>
          <div className="mt-12 flex justify-center">
            <MagneticButton
              variant="outline"
              size="lg"
              href={GITHUB_PROFILE_URL}
              target="_blank"
            >
              View All Projects on GitHub
              <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

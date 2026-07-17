"use client";

import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { MagneticButton } from "../effects/MagneticButton";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { cn } from "../../lib/utils";
import { projects } from "../../data/projects";

export function Projects() {
  return (
    <section id="projects" className="relative section-padding overflow-hidden">
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
            subtitle="Real-world applications built with modern tech stacks and designed for impact."
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
              <ProjectCard project={project} wide={index === 0} />
            </RevealOnScroll>
          ))}
        </div>

        {/* View All CTA */}
        <RevealOnScroll>
          <div className="mt-12 flex justify-center">
            <MagneticButton
              variant="outline"
              size="lg"
              href="https://github.com/SANAPATHISAIKUMAR"
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

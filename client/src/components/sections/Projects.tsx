import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Bot, Rocket, Code2, Sparkles } from "lucide-react";
import { GithubIcon } from "../ui/SocialIcons";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { MagneticButton } from "../effects/MagneticButton";
import { cn } from "../../lib/utils";
import { projects } from "../../data/projects";

const categoryIcon: Record<string, typeof Bot> = {
  ai: Bot,
  fullstack: Rocket,
};

const categoryLabel: Record<string, string> = {
  ai: "AI",
  fullstack: "Full Stack",
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
};

export function Projects() {
  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container">
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent-blue mb-3 block">
              Featured Work
            </span>
            <h2 className="font-display text-section-title font-bold text-text-primary mb-4">
              Projects That{" "}
              <span className="gradient-text">Matter</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-section-subtitle">
              Real-world applications built with modern tech stacks and designed for impact.
            </p>
          </div>
        </RevealOnScroll>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <RevealOnScroll key={project.id} delay={index * 0.1}>
              <motion.article
                className={cn(
                  "group relative rounded-3xl overflow-hidden",
                  "bg-background-secondary/40 backdrop-blur-sm",
                  "border border-white/[0.06]",
                  "transition-all duration-700",
                  "hover:border-white/[0.12]",
                  "flex flex-col",
                  // Make first item span full width
                  index === 0 && "md:col-span-2",
                )}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 60px ${project.color}10, 0 8px 32px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Gradient top bar */}
                <div
                  className="h-[3px] w-full flex-shrink-0"
                  style={{
                    background: `linear-gradient(90deg, ${project.color}, ${project.color}80, transparent)`,
                  }}
                />

                <div className={cn(
                  "p-6 md:p-8 flex flex-col flex-1",
                  index === 0 ? "md:flex-row md:gap-8 md:items-start" : ""
                )}>
                  {/* Project Visual */}
                  <div
                    className={cn(
                      "rounded-2xl overflow-hidden flex-shrink-0",
                      "border border-white/[0.04]",
                      "flex items-center justify-center",
                      index === 0
                        ? "md:w-2/5 mb-6 md:mb-0 aspect-video"
                        : "w-full mb-5 aspect-video"
                    )}
                    style={{
                      background: `linear-gradient(135deg, ${project.color}08 0%, rgba(11,17,32,0.8) 100%)`,
                    }}
                  >
                    <div className="text-center p-6">
                      <div
                        className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}25, ${project.color}10)`,
                          border: `1px solid ${project.color}30`,
                          boxShadow: `0 0 30px ${project.color}15`,
                        }}
                      >
                        {(() => {
                          const Icon = categoryIcon[project.category] ?? Code2;
                          return <Icon size={28} style={{ color: project.color }} aria-hidden />;
                        })()}
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed max-w-[180px] mx-auto">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={cn("flex flex-col flex-1", index === 0 ? "md:w-3/5" : "")}>
                    {/* Category badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide"
                        style={{
                          background: `${project.color}15`,
                          color: project.color,
                          border: `1px solid ${project.color}25`,
                        }}
                      >
                        {categoryLabel[project.category] ?? project.category}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                          <Sparkles size={10} aria-hidden />
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-xl md:text-2xl text-text-primary mb-2 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] rounded-md bg-white/[0.04] text-text-muted border border-white/[0.04]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 5 && (
                        <span className="px-2 py-0.5 text-[10px] rounded-md bg-white/[0.04] text-text-muted">
                          +{project.techStack.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 mt-auto">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex items-center gap-1.5 text-sm text-text-muted",
                            "hover:text-text-primary transition-colors"
                          )}
                        >
                          <GithubIcon size={14} />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex items-center gap-1.5 text-sm",
                            "transition-colors"
                          )}
                          style={{ color: project.color }}
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                      <span className="flex-1" />
                      <motion.span
                        className="text-text-muted group-hover:text-text-primary transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <ArrowRight size={16} />
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </RevealOnScroll>
          ))}
        </div>

        {/* View All CTA */}
        <RevealOnScroll>
          <div className="flex justify-center mt-12">
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


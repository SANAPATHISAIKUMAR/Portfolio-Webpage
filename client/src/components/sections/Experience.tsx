import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronDown, ExternalLink } from "lucide-react";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { formatDateRange } from "../../lib/utils";
import { cn } from "../../lib/utils";
import { experiences } from "../../data/experience";

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(
    experiences[0]?.id ?? null
  );

  return (
    <section id="experience" className="relative section-padding overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container">
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent-cyan mb-3 block">
              Experience
            </span>
            <h2 className="font-display text-section-title font-bold text-text-primary mb-4">
              Where I've{" "}
              <span className="gradient-text">Worked</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-section-subtitle">
              Building impactful products at innovative companies.
            </p>
          </div>
        </RevealOnScroll>

        {/* Timeline — single column, centered */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 via-accent-purple/30 to-transparent" />

          <div className="space-y-6">
            {experiences.map((exp, index) => {
              const isExpanded = expandedId === (exp.id || String(index));

              return (
                <RevealOnScroll key={exp.id || index} direction="up" delay={index * 0.1}>
                  <div className="relative pl-12 md:pl-16">
                    {/* Timeline dot */}
                    <div
                      className={cn(
                        "absolute left-6 md:left-8 -translate-x-1/2 top-7 w-5 h-5 rounded-full",
                        "bg-background border-2 border-accent-blue/60",
                        "shadow-[0_0_12px_rgba(59,130,246,0.4)]",
                        "flex items-center justify-center",
                        "transition-all duration-300",
                        isExpanded && "border-accent-blue scale-110"
                      )}
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-blue" />
                    </div>

                    {/* Card */}
                    <motion.div
                      className={cn(
                        "rounded-2xl cursor-pointer overflow-hidden",
                        "bg-background-secondary/40 backdrop-blur-sm",
                        "border border-white/[0.06]",
                        "hover:border-accent-blue/20",
                        "transition-all duration-500"
                      )}
                      onClick={() => setExpandedId(isExpanded ? null : (exp.id || String(index)))}
                      whileHover={{
                        boxShadow: "0 0 30px rgba(59, 130, 246, 0.08)",
                      }}
                      layout
                    >
                      <div className="p-6">
                        {/* Type Badge + Toggle */}
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={cn(
                              "px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide",
                              exp.type === "fulltime"
                                ? "bg-accent-blue/15 text-accent-blue border border-accent-blue/20"
                                : "bg-accent-purple/15 text-accent-purple border border-accent-purple/20"
                            )}
                          >
                            {exp.type === "fulltime" ? "Full Time" : "Internship"}
                          </span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={16} className="text-text-muted" />
                          </motion.div>
                        </div>

                        {/* Role & Company */}
                        <h3 className="font-display font-bold text-lg text-text-primary mb-1">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-3">
                          <span className="flex items-center gap-1.5">
                            <Briefcase size={13} className="text-accent-blue" />
                            {exp.companyUrl ? (
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-accent-blue transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {exp.company}
                                <ExternalLink size={10} className="inline ml-1" />
                              </a>
                            ) : (
                              exp.company
                            )}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-text-muted" />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-text-muted" />
                            {formatDateRange(exp.startDate, exp.endDate)}
                          </span>
                        </div>

                        <p className="text-sm text-text-muted leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                              {/* Achievements */}
                              <div className="mt-4 pt-4 border-t border-white/[0.04]">
                                <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
                                  Key Achievements
                                </h4>
                                <ul className="space-y-2">
                                  {exp.achievements.map((achievement, i) => (
                                    <li
                                      key={i}
                                      className="text-sm text-text-muted flex items-start gap-2"
                                    >
                                      <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-blue flex-shrink-0" aria-hidden />
                                      {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Technologies */}
                              <div className="mt-4">
                                <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
                                  Technologies
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {exp.technologies.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2.5 py-1 text-[11px] rounded-md bg-white/[0.04] text-text-muted border border-white/[0.04]"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


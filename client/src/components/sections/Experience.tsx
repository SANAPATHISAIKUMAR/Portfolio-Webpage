"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronDown, ExternalLink } from "lucide-react";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { formatDateRange } from "../../lib/utils";
import { cn } from "../../lib/utils";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { experiences } from "../../data/experience";

/** Human labels for every employment type — avoids mislabeling freelance/contract as "Internship". */
const TYPE_LABELS: Record<string, string> = {
  fulltime: "Full Time",
  internship: "Internship",
  freelance: "Freelance",
  contract: "Contract",
};

export function Experience() {
  const prefersReducedMotion = useReducedMotion();
  const [expandedId, setExpandedId] = useState<string | null>(
    experiences[0]?.id ?? null
  );

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative section-padding overflow-hidden"
    >
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
          <SectionHeading
            eyebrow="Experience"
            title={
              <>
                Where I&apos;ve <span className="gradient-text">Worked</span>
              </>
            }
            subtitle="Building impactful products at innovative companies."
            headingId="experience-heading"
          />
        </RevealOnScroll>

        {/* Timeline — single column, centered */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 via-accent-purple/30 to-transparent" />

          <div className="space-y-6">
            {experiences.map((exp, index) => {
              const cardId = exp.id || String(index);
              const isExpanded = expandedId === cardId;
              const triggerId = `exp-trigger-${cardId}`;
              const panelId = `exp-panel-${cardId}`;
              const typeLabel = TYPE_LABELS[exp.type] ?? exp.type;

              return (
                <RevealOnScroll key={cardId} direction="up" delay={index * 0.1}>
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
                        "rounded-2xl overflow-hidden",
                        "bg-surface-1 backdrop-blur-sm",
                        "border transition-colors duration-500",
                        isExpanded ? "border-hairline-strong" : "border-hairline hover:border-hairline-strong"
                      )}
                      whileHover={{ boxShadow: "0 0 30px rgba(59, 130, 246, 0.08)" }}
                      layout
                    >
                      {/* Accessible disclosure trigger — the whole summary is a
                          real <button>, so it's keyboard-operable (Enter/Space)
                          and exposes aria-expanded/aria-controls. */}
                      <button
                        type="button"
                        id={triggerId}
                        aria-expanded={isExpanded ? "true" : "false"}
                        aria-controls={panelId}
                        aria-label={`${exp.role} at ${exp.company}, ${typeLabel}. ${isExpanded ? "Collapse" : "Expand"} details`}
                        onClick={() => setExpandedId(isExpanded ? null : cardId)}
                        className="w-full text-left p-6 cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-blue/50"
                      >
                        {/* Type Badge + Toggle */}
                        <span className="mb-3 flex items-center justify-between">
                          <span
                            className={cn(
                              "px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide",
                              exp.type === "fulltime"
                                ? "bg-accent-blue/15 text-accent-blue border border-accent-blue/20"
                                : "bg-accent-purple/15 text-accent-purple border border-accent-purple/20"
                            )}
                          >
                            {typeLabel}
                          </span>
                          <motion.span
                            className="text-text-muted"
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                            aria-hidden
                          >
                            <ChevronDown size={16} />
                          </motion.span>
                        </span>

                        {/* Role & Company */}
                        <span className="mb-1 block font-display text-lg font-bold text-text-primary">
                          {exp.role}
                        </span>
                        <span className="mb-3 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                          <span className="flex items-center gap-1.5">
                            <Briefcase size={13} className="text-accent-blue" />
                            {exp.company}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-text-muted" />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-text-muted" />
                            {formatDateRange(exp.startDate, exp.endDate)}
                          </span>
                        </span>

                        <span className="block text-sm leading-relaxed text-text-muted">
                          {exp.description}
                        </span>
                      </button>

                      {/* Expanded panel */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={triggerId}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: EASE_OUT_EXPO }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              {/* Achievements */}
                              <div className="border-t border-hairline pt-4">
                                <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
                                  Key Achievements
                                </h4>
                                <ul className="space-y-2">
                                  {exp.achievements.map((achievement, i) => (
                                    <li
                                      key={i}
                                      className="text-sm text-text-muted flex items-start gap-2"
                                    >
                                      <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-blue shrink-0" aria-hidden />
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
                                    <Badge key={tech} size="sm">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Company link — moved out of the trigger button
                                  so we never nest an <a> inside a <button>. */}
                              {exp.companyUrl && (
                                <a
                                  href={exp.companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent-blue hover:underline"
                                >
                                  Visit website
                                  <ExternalLink size={13} />
                                </a>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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


"use client";

import { Award, Calendar, Users, Code2 } from "lucide-react";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { GlowCard } from "../effects/GlowCard";
import { hackathons } from "../../data/hackathons";

const achievementColors: Record<string, string> = {
  Finalist: "#F59E0B",
  "Team Lead": "#A855F7",
  "Solo Builder": "#10B981",
  Participant: "#3B82F6",
  Winner: "#10B981",
};

export function Hackathons() {
  return (
    <section id="hackathons" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container">
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-yellow-400 mb-3 block">
              Hackathons
            </span>
            <h2 className="font-display text-section-title font-bold text-text-primary mb-4">
              Building Under{" "}
              <span className="gradient-text">Pressure</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-section-subtitle">
              Competing, collaborating, and creating — one hackathon at a time.
            </p>
          </div>
        </RevealOnScroll>

        {/* Stats Row */}
        <RevealOnScroll>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
            {[
              { label: "Hackathons", value: "5", icon: Award },
              { label: "Best Rank", value: "Top 800", icon: Code2 },
              { label: "Teams Led", value: "3x", icon: Users },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-2xl bg-background-secondary/30 border border-white/[0.04] hover:border-yellow-400/20 transition-all duration-300"
              >
                <stat.icon size={18} className="mx-auto mb-2 text-yellow-400" />
                <div className="text-xl font-display font-bold text-text-primary">
                  {stat.value}
                </div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Hackathon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hackathons.map((hackathon, index) => {
            const achievementColor =
              achievementColors[hackathon.achievement] || "#3B82F6";

            return (
              <RevealOnScroll key={hackathon.id} delay={index * 0.1}>
                <GlowCard
                  className="h-full"
                  glowColor={`${achievementColor}20`}
                  borderColor={`${achievementColor}40`}
                >
                  <div className="p-6">
                    {/* Achievement Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
                        style={{
                          background: `${achievementColor}15`,
                          color: achievementColor,
                          border: `1px solid ${achievementColor}30`,
                        }}
                      >
                        <Award size={11} aria-hidden /> {hackathon.achievement}
                      </span>
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <Calendar size={11} />
                        {hackathon.date}
                      </span>
                    </div>

                    {/* Name & Organizer */}
                    <h3 className="font-display font-bold text-lg text-text-primary mb-1">
                      {hackathon.name}
                    </h3>
                    <p className="text-xs text-text-muted mb-3">
                      by {hackathon.organizer}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-text-muted leading-relaxed mb-4">
                      {hackathon.description}
                    </p>

                    {/* Position highlight */}
                    {hackathon.position && (
                      <div
                        className="p-3 rounded-xl mb-4 text-center"
                        style={{
                          background: `${achievementColor}08`,
                          border: `1px solid ${achievementColor}15`,
                        }}
                      >
                        <span className="text-sm font-semibold" style={{ color: achievementColor }}>
                          {hackathon.position}
                        </span>
                      </div>
                    )}

                    {/* Team & Tech */}
                    <div className="space-y-3">
                      {hackathon.teamSize && (
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <Users size={12} />
                          Team of {hackathon.teamSize}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {hackathon.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] rounded-md bg-white/[0.04] text-text-muted border border-white/[0.04]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}


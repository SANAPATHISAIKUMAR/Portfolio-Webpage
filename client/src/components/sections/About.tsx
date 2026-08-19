"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { CounterAnimation } from "../effects/CounterAnimation";
import { GlowCard } from "../effects/GlowCard";
import { SectionHeading } from "../ui/SectionHeading";
import { StatCard } from "../ui/StatCard";
import { aboutTimeline, aboutDescription } from "../../data/about";
import { heroStats, siteConfig } from "../../config/site";
import { professionalDevelopment } from "../../data/education";
import { cn } from "../../lib/utils";
import { EASE_OUT_EXPO } from "../../lib/motion";

export function About() {
  // The summit entry doubles as the caption's link target, so the URL lives in
  // the data file rather than being hardcoded in two places.
  const summit = professionalDevelopment.find((p) =>
    p.name.includes("AI Impact Summit")
  );
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative section-padding overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container">
        {/* Section Header */}
        <RevealOnScroll>
          <SectionHeading
            eyebrow="About Me"
            title={
              <>
                My Journey in <span className="gradient-text">Tech</span>
              </>
            }
            subtitle="From a curious student to building production-grade software — here's my story."
            headingId="about-heading"
          />
        </RevealOnScroll>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Left — Story */}
          <RevealOnScroll direction="left">
            <div className="space-y-6">
              {/*
                Photo from the AI Impact Summit India 2026 — the event's real
                name; an earlier version of this file called it the "India AI
                Summit" after misreading the partly-obscured banner. Kept as the
                full frame rather than a crop: the flags and the banner are what
                make it worth showing, and a headshot would throw that away.
              */}
              <figure className="overflow-hidden rounded-2xl border border-hairline bg-surface-1">
                <div className="relative aspect-4/3">
                  <Image
                    src="/images/sai-kumar-ai-impact-summit-2026.jpg"
                    alt={`${siteConfig.name} at the AI Impact Summit India 2026`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-[center_38%]"
                  />
                </div>
                <figcaption className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-hairline px-4 py-2.5 text-caption text-text-muted">
                  <span>At the AI Impact Summit India 2026</span>
                  {summit?.url && (
                    <a
                      href={summit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-text-secondary transition-colors hover:text-text-primary"
                    >
                      Read the write-up
                      <ArrowUpRight size={12} aria-hidden />
                    </a>
                  )}
                </figcaption>
              </figure>

              {aboutDescription.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-text-secondary leading-relaxed text-body-lg"
                >
                  {paragraph}
                </p>
              ))}

              {/* Counter Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {heroStats.map((stat) => (
                  <StatCard
                    key={stat.label}
                    label={stat.label}
                    valueClassName="gradient-text text-3xl"
                    value={
                      stat.value.includes("+") ? (
                        <>
                          <CounterAnimation end={parseInt(stat.value)} duration={2000} />+
                        </>
                      ) : (
                        stat.value
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Right — Timeline */}
          <RevealOnScroll direction="right">
            <div className="relative">
              {/* Timeline line — positioned at left-6 (24px) */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 via-accent-purple/30 to-transparent" />

              <div className="space-y-8">
                {aboutTimeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className="relative pl-16"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.6,
                      ease: EASE_OUT_EXPO,
                    }}
                  >
                    {/* Timeline dot — centered on left-6 line */}
                    <div
                      className={cn(
                        "absolute left-6 -translate-x-1/2 top-2 w-5 h-5 rounded-full",
                        "flex items-center justify-center",
                        "bg-background border-2 border-accent-blue/50",
                        "shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                      )}
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-blue" />
                    </div>

                    {/* Year badge */}
                    <span className="text-xs font-medium text-accent-blue tracking-wide mb-1 block">
                      {item.year}
                    </span>

                    {/* Content */}
                    <GlowCard className="p-4" hoverScale={1.01}>
                      <div className="flex items-start gap-3">
                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                        <div>
                          <h3 className="font-display font-semibold text-text-primary text-sm mb-1">
                            {item.title}
                          </h3>
                          <p className="text-text-muted text-xs leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

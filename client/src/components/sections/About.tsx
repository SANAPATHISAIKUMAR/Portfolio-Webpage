"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { CounterAnimation } from "../effects/CounterAnimation";
import { GlowCard } from "../effects/GlowCard";
import { SectionHeading } from "../ui/SectionHeading";
import { StatCard } from "../ui/StatCard";
import { aboutTimeline, aboutDescription } from "../../data/about";
import { heroStats } from "../../config/site";
import { cn } from "../../lib/utils";
import { EASE_OUT_EXPO } from "../../lib/motion";

export function About() {
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

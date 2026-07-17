"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { cn } from "../../lib/utils";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { services } from "../../data/services";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative section-padding overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container relative">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                What I Can <span className="gradient-text">Build For You</span>
              </>
            }
            subtitle="From a single interface to a full production system — here's how I can help."
            headingId="services-heading"
          />
        </RevealOnScroll>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index * 0.06, 0.3),
                  ease: EASE_OUT_EXPO,
                }}
                className={cn(
                  "group flex h-full flex-col rounded-2xl p-6",
                  "border border-hairline bg-surface-1 backdrop-blur-sm",
                  "transition-colors duration-500 hover:border-hairline-strong"
                )}
              >
                <span
                  className={cn(
                    "mb-4 flex h-11 w-11 items-center justify-center rounded-xl",
                    "bg-accent-blue/10 text-accent-blue",
                    "transition-transform duration-500 group-hover:scale-105"
                  )}
                  aria-hidden
                >
                  <Icon size={20} />
                </span>

                <h3 className="mb-2 font-display text-lg font-semibold text-text-primary">
                  {service.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                  {service.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {service.features.map((feature) => (
                    <Badge key={feature} size="sm">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

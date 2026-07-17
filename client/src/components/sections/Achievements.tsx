"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { CounterAnimation } from "../effects/CounterAnimation";
import { SectionHeading } from "../ui/SectionHeading";
import { cn } from "../../lib/utils";
import { achievements } from "../../data/achievements";

const categoryGradients: Record<string, string> = {
  competitive: "from-yellow-500/20 to-orange-500/10",
  opensource: "from-green-500/20 to-emerald-500/10",
  leadership: "from-blue-500/20 to-indigo-500/10",
  freelance: "from-purple-500/20 to-pink-500/10",
  academic: "from-cyan-500/20 to-blue-500/10",
};

const categoryBorder: Record<string, string> = {
  competitive: "hover:border-yellow-500/30",
  opensource: "hover:border-green-500/30",
  leadership: "hover:border-blue-500/30",
  freelance: "hover:border-purple-500/30",
  academic: "hover:border-cyan-500/30",
};

function parseValue(val: string) {
  const numMatch = val.match(/\d[\d,.]*/);
  if (!numMatch) return { prefix: "", number: 0, suffix: val };

  const numStr = numMatch[0];
  const number = parseInt(numStr.replace(/,/g, ""));

  const index = val.indexOf(numStr);
  const prefix = val.substring(0, index);
  const suffix = val.substring(index + numStr.length);

  return { prefix, number, suffix };
}

export function Achievements() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="relative section-padding overflow-hidden"
    >
      {/* Background blob */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container">
        {/* Header */}
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Achievements"
            title={
              <>
                Numbers That <span className="gradient-text">Speak</span>
              </>
            }
            subtitle="Milestones and accomplishments along the journey."
            headingId="achievements-heading"
          />
        </RevealOnScroll>

        {/* Achievement Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <RevealOnScroll key={achievement.id} delay={index * 0.08}>
              <motion.div
                className={cn(
                  "relative p-6 rounded-2xl text-center",
                  "bg-gradient-to-br",
                  categoryGradients[achievement.category] || "from-blue-500/10 to-purple-500/10",
                  "border border-hairline",
                  categoryBorder[achievement.category] || "hover:border-hairline-strong",
                  "transition-all duration-500",
                  "group"
                )}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Icon */}
                <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </span>

                {/* Value */}
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                  {(() => {
                    const { prefix, number, suffix } = parseValue(achievement.value);
                    if (number > 0) {
                      return (
                        <CounterAnimation
                          end={number}
                          prefix={prefix}
                          suffix={suffix}
                          duration={2000}
                        />
                      );
                    }
                    return achievement.value;
                  })()}
                </div>

                {/* Title */}
                <h3 className="font-medium text-sm text-text-primary mb-1">
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-text-muted leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}


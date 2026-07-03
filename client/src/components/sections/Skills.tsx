import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { cn } from "../../lib/utils";
import type { SkillCategory } from "../../types";
import { skills, skillCategories } from "../../data/skills";

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("frontend");

  const filteredSkills = skills.filter((s) => s.category === activeCategory);
  const activeConfig = skillCategories.find((c) => c.id === activeCategory);

  const polygonPoints = skillCategories
    .map((cat, index) => {
      const angle = (index * 360) / skillCategories.length - 90;
      const radian = (angle * Math.PI) / 180;
      const catSkills = skills.filter((s) => s.category === cat.id);
      const avgProficiency =
        catSkills.length > 0
          ? catSkills.reduce((sum, s) => sum + s.proficiency, 0) / catSkills.length
          : 0;
      const r = (avgProficiency / 100) * 36;
      const x = 50 + r * Math.cos(radian);
      const y = 50 + r * Math.sin(radian);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent-purple mb-3 block">
              Skills & Technologies
            </span>
            <h2 className="font-display text-section-title font-bold text-text-primary mb-4">
              Tech{" "}
              <span className="gradient-text">Arsenal</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-section-subtitle">
              The tools and technologies I use to bring ideas to life.
            </p>
          </div>
        </RevealOnScroll>

        {/* Category Tabs */}
        <RevealOnScroll>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 px-2">
            {skillCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as SkillCategory)}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-sm font-medium",
                    "transition-all duration-300 whitespace-nowrap",
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `${(cat as { color: string }).color}15`,
                        border: `1px solid ${(cat as { color: string }).color}30`,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{cat.icon}</span>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className={cn(
                  "group relative p-5 rounded-2xl",
                  "bg-background-secondary/40 backdrop-blur-sm",
                  "border border-white/[0.04]",
                  "hover:border-white/[0.12]",
                  "transition-all duration-500"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3 },
                }}
                style={{ boxShadow: "none" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 30px ${(activeConfig as { color: string } | undefined)?.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Skill Icon */}
                <div className="text-2xl mb-3">{skill.icon}</div>

                {/* Skill Name */}
                <h3 className="font-medium text-sm text-text-primary mb-3">
                  {skill.name}
                </h3>

                {/* Progress Bar */}
                <div className="relative h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${(activeConfig as { color: string } | undefined)?.color ?? "#3B82F6"}, ${(activeConfig as { color: string } | undefined)?.color ?? "#3B82F6"}80)`,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: index * 0.05 + 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>

                {/* Proficiency Label */}
                <span className="text-[10px] text-text-muted mt-2 block">
                  {skill.proficiency}%
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Radar Chart Visual */}
        <RevealOnScroll>
          <div className="mt-12 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-square mx-auto">
              {/* Radar background circles */}
              {[100, 80, 60, 40, 20].map((size) => (
                <div
                  key={size}
                  className="absolute rounded-full border border-white/[0.05]"
                  style={{
                    width: `${size}%`,
                    height: `${size}%`,
                    top: `${(100 - size) / 2}%`,
                    left: `${(100 - size) / 2}%`,
                  }}
                />
              ))}

              {/* Dynamic SVG Radar Chart */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                <defs>
                  <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={(activeConfig as { color: string } | undefined)?.color ?? "#3B82F6"} stopOpacity="0.05" />
                    <stop offset="100%" stopColor={(activeConfig as { color: string } | undefined)?.color ?? "#7C3AED"} stopOpacity="0.35" />
                  </radialGradient>
                </defs>
                {/* Radial grid lines */}
                {skillCategories.map((_, index) => {
                  const angle = (index * 360) / skillCategories.length - 90;
                  const radian = (angle * Math.PI) / 180;
                  const px = 50 + 40 * Math.cos(radian);
                  const py = 50 + 40 * Math.sin(radian);
                  return (
                    <line
                      key={index}
                      x1="50"
                      y1="50"
                      x2={px}
                      y2={py}
                      className="stroke-white/[0.05] stroke-[0.25]"
                    />
                  );
                })}
                {/* Filled Radar area */}
                <motion.polygon
                  points={polygonPoints}
                  fill="url(#radarGradient)"
                  className="stroke-[0.5] transition-all duration-700"
                  style={{ stroke: (activeConfig as { color: string } | undefined)?.color ?? "#3B82F6" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>

              {/* Category labels around the radar */}
              {skillCategories.map((cat, index) => {
                const angle = (index * 360) / skillCategories.length - 90;
                const radian = (angle * Math.PI) / 180;
                // Use 40% radius clamped to keep labels inside
                const x = 50 + 40 * Math.cos(radian);
                const y = 50 + 40 * Math.sin(radian);

                const catSkills = skills.filter((s) => s.category === cat.id);
                const avgProficiency =
                  catSkills.length > 0
                    ? catSkills.reduce((sum, s) => sum + s.proficiency, 0) / catSkills.length
                    : 0;

                return (
                  <motion.div
                    key={cat.id}
                    className="absolute flex flex-col items-center gap-0.5"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <button
                      onClick={() => setActiveCategory(cat.id as SkillCategory)}
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center text-sm",
                        "transition-all duration-300 cursor-pointer",
                        activeCategory === cat.id
                          ? "scale-110"
                          : "hover:scale-105"
                      )}
                      style={{
                        background: `${(cat as { color: string }).color}20`,
                        border: `1px solid ${(cat as { color: string }).color}40`,
                        boxShadow:
                          activeCategory === cat.id
                            ? `0 0 16px ${(cat as { color: string }).color}30`
                            : "none",
                      }}
                      title={`${cat.label}: ${Math.round(avgProficiency)}%`}
                    >
                      {cat.icon}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}


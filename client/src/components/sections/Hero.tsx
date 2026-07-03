"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Sparkles,
  Award,
  Users,
  Briefcase,
  Cpu,
} from "lucide-react";

const trustBadges = [
  { icon: Award, label: "Meta PyTorch Finalist" },
  { icon: Users, label: "SIH 2025 Team Lead" },
  { icon: Briefcase, label: "Associate SWE @ Lystra" },
  { icon: Cpu, label: "AI & ML Engineer" },
];
import { TypingAnimation } from "../effects/TextReveal";
import { MagneticButton } from "../effects/MagneticButton";
import { ParticleField } from "../effects/ParticleField";
import { heroRoles, siteConfig } from "../../config/site";
import { cn } from "../../lib/utils";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)",
            top: "-15%",
            left: "-10%",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)",
            top: "10%",
            right: "-15%",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
            bottom: "10%",
            left: "35%",
            filter: "blur(80px)",
          }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      {/* Particles */}
      <ParticleField />

      {/* Content */}
      <motion.div
        className="relative z-10 section-container w-full"
        style={{ paddingTop: "clamp(80px, 11vh, 112px)", paddingBottom: "clamp(36px, 5vh, 64px)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span
              className={cn(
                "inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full",
                "text-xs font-semibold tracking-widest uppercase",
                "bg-white/[0.04] text-text-secondary border border-white/[0.1]",
                "backdrop-blur-md"
              )}
            >
              <Sparkles size={13} className="text-accent-blue" />
              Available for opportunities
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue" />
              </span>
            </span>
          </motion.div>

          {/* Main heading — plain text, no animation wrapper that breaks spacing */}
          <motion.div variants={itemVariants} className="mb-5">
            <h1
              className="font-display font-bold tracking-tight text-text-primary leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Building{" "}
              <span className="text-text-primary">Intelligent</span>
              <br />
              <span className="gradient-text-tri">Digital Products</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-4">
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Hi, I'm{" "}
              <span className="text-text-primary font-semibold">{siteConfig.name}</span>
              {" "}—{" "}
              <span className="text-accent-blue font-medium">
                <TypingAnimation texts={heroRoles} typingSpeed={60} />
              </span>
            </p>
          </motion.div>

          {/* Short bio */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-text-muted max-w-xl mx-auto leading-relaxed"
            style={{ marginBottom: "clamp(1.25rem, 3vw, 1.75rem)" }}
          >
            I build AI-integrated web applications end to end — from wireframes to
            deployed prototypes — with the MERN stack, Next.js, TypeScript, and
            Firebase.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2"
            style={{ marginBottom: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] text-xs font-medium text-text-secondary backdrop-blur-sm"
              >
                <Icon size={13} className="text-accent-blue" aria-hidden />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
            style={{ marginBottom: "clamp(1.25rem, 2.5vw, 2rem)" }}
          >
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Hire Me
              <ArrowRight size={17} />
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="lg"
              href={siteConfig.resume}
              download
            >
              <Download size={17} />
              Download Resume
            </MagneticButton>

            <MagneticButton
              variant="ghost"
              size="lg"
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Projects
              <ArrowRight size={15} />
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 [@media(max-height:760px)]:hidden"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-2 text-text-muted hover:text-text-secondary transition-colors group"
        >
          <span className="text-[9px] uppercase tracking-[0.25em]">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5 group-hover:border-white/40 transition-colors">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-text-muted group-hover:bg-text-secondary transition-colors"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}

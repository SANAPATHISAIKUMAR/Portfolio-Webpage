"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Sparkles, Award, Users, Stethoscope, GraduationCap } from "lucide-react";
import { TypingAnimation } from "../effects/TextReveal";
import { MagneticButton } from "../effects/MagneticButton";
import { ParticleField } from "../effects/ParticleField";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { heroRoles, siteConfig } from "../../config/site";
import { cn } from "../../lib/utils";

const trustBadges = [
  { icon: Award, label: "Meta PyTorch Finalist" },
  { icon: Users, label: "SIH 2025 Team Lead" },
  { icon: Stethoscope, label: "MERN + Healthcare" },
  { icon: GraduationCap, label: "B.Tech AI & ML" },
];

const socials = [
  { href: siteConfig.links[0]?.url, icon: <GithubIcon size={18} />, label: "GitHub", external: true },
  { href: siteConfig.links[1]?.url, icon: <LinkedinIcon size={18} />, label: "LinkedIn", external: true },
  { href: `mailto:${siteConfig.email}`, icon: <Mail size={18} />, label: "Email", external: false },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Ambient mesh background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute h-[800px] w-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)",
            top: "-15%",
            left: "-10%",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute h-[700px] w-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)",
            top: "10%",
            right: "-15%",
            filter: "blur(70px)",
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-[0.15]" />
      </div>

      <ParticleField />

      <motion.div
        className="section-container relative z-10 w-full"
        style={{ paddingTop: "clamp(90px, 12vh, 130px)", paddingBottom: "clamp(40px, 6vh, 72px)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-4xl text-center">
          {/* Profile avatar — swap the initials block for a <next/image> when the
              real photo is added to /public. */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <div className="relative">
              <div className="rounded-full bg-gradient-to-br from-accent-blue via-accent-purple to-accent-cyan p-[2px]">
                <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-background">
                  <span className="font-display text-2xl font-bold gradient-text-tri">SK</span>
                </div>
              </div>
              {/* Availability dot */}
              <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-400" />
              </span>
            </div>
          </motion.div>

          {/* Availability badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span
              className={cn(
                "inline-flex items-center gap-2.5 rounded-full px-5 py-2.5",
                "text-xs font-semibold uppercase tracking-widest",
                "border border-hairline bg-surface-1 text-text-secondary backdrop-blur-md"
              )}
            >
              <Sparkles size={13} className="text-accent-blue" />
              {siteConfig.availability ?? "Available for opportunities"}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-5 font-display font-bold tracking-tight text-text-primary"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05 }}
          >
            Building scalable,{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text-tri">full-stack products</span>
          </motion.h1>

          {/* Name + rotating role */}
          <motion.div variants={itemVariants} className="mb-4">
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
              Hi, I'm{" "}
              <span className="font-semibold text-text-primary">{siteConfig.name}</span>{" "}
              —{" "}
              <span className="font-medium text-accent-blue">
                <TypingAnimation texts={heroRoles} typingSpeed={60} />
              </span>
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-sm leading-relaxed text-text-muted md:text-base"
            style={{ marginBottom: "clamp(1.25rem, 3vw, 1.75rem)" }}
          >
            Associate Software Engineer at Lystra Pharma, building full-stack healthcare
            applications on the MERN stack — clean REST APIs, backend services, and
            responsive React interfaces — with a growing focus on AWS and system design.
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
                className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-1 px-3 py-1.5 text-xs font-medium text-text-secondary backdrop-blur-sm"
              >
                <Icon size={13} className="text-accent-blue" aria-hidden />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
            style={{ marginBottom: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
              <ArrowRight size={17} />
            </MagneticButton>

            <MagneticButton variant="secondary" size="lg" href={siteConfig.resume} download>
              <Download size={17} />
              Download Resume
            </MagneticButton>

            <MagneticButton
              variant="ghost"
              size="lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Me
            </MagneticButton>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
            {socials.map(({ href, icon, label, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-surface-1 text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-hairline-strong hover:bg-surface-2 hover:text-text-primary"
              >
                {icon}
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 [@media(max-height:760px)]:hidden"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group flex flex-col items-center gap-2 text-text-muted transition-colors hover:text-text-secondary"
          aria-label="Scroll to About"
        >
          <span className="text-[9px] uppercase tracking-[0.25em]">Scroll</span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-hairline-strong pt-1.5 transition-colors group-hover:border-text-muted">
            <motion.div
              className="h-1.5 w-1 rounded-full bg-text-muted"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}

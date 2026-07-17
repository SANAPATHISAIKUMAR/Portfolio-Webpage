"use client";

import { Mail, ArrowUp, MapPin, Download, ExternalLink, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { motion } from "framer-motion";
import { siteConfig, navigationItems } from "../../config/site";

// Manual release markers — bump on meaningful updates.
const VERSION = "v2.0";
const LAST_UPDATED = "July 2026";

const techStack = [
  "Next.js 15",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "MongoDB",
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-[var(--color-bg-secondary)]">
      {/* Gradient top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #3B82F6 25%, #7C3AED 50%, #06B6D4 75%, transparent 100%)",
        }}
      />

      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 h-64 w-64 rounded-full blur-[100px]"
        style={{ background: "rgba(59,130,246,0.05)" }}
      />
      <div
        className="pointer-events-none absolute -top-24 right-1/4 h-48 w-48 rounded-full blur-[80px]"
        style={{ background: "rgba(124,58,237,0.06)" }}
      />

      {/* ── Main grid ──────────────────────────────────────────── */}
      <div className="section-container pt-16 pb-10">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">

          {/* ── Brand column ─────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[11px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED]" />
                <div className="absolute inset-0 rounded-[11px] ring-1 ring-inset ring-white/20" />
                <span className="relative z-10 font-display text-[13px] font-bold tracking-wide text-white">
                  SK
                </span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-[16px] font-semibold text-text-primary">
                  {siteConfig.name}
                </span>
                <span className="text-[12px] text-text-muted">{siteConfig.role}</span>
              </div>
            </div>

            {/* Bio */}
            <p className="max-w-[280px] text-[14px] leading-relaxed text-text-muted">
              Building scalable full-stack and AI-powered products. Open to Software
              Engineer roles and meaningful collaborations.
            </p>

            {/* Availability badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[12px] font-medium text-emerald-400">
                {siteConfig.availability}
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {[
                {
                  href: siteConfig.links[0]?.url,
                  icon: <GithubIcon size={16} />,
                  label: "GitHub",
                },
                {
                  href: siteConfig.links[1]?.url,
                  icon: <LinkedinIcon size={16} />,
                  label: "LinkedIn",
                },
                {
                  href: `mailto:${siteConfig.email}`,
                  icon: <Mail size={16} />,
                  label: "Email",
                },
              ].map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface-1 text-text-muted transition-all duration-200 hover:border-hairline-strong hover:bg-surface-2 hover:text-text-primary"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.18 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ──────────────────────────────────── */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3.5">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={`/${item.href}`}
                    className="group inline-flex items-center gap-1.5 text-[14px] text-text-secondary transition-all duration-200 hover:text-text-primary hover:translate-x-0.5"
                    style={{ display: "inline-flex" }}
                  >
                    <span className="h-px w-3 rounded-full bg-hairline-strong transition-all duration-200 group-hover:w-4 group-hover:bg-accent-blue" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Contact ──────────────────────────────────────── */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group inline-flex items-start gap-2.5 text-[13.5px] text-text-secondary transition-colors duration-200 hover:text-text-primary"
                >
                  <Mail size={14} className="mt-0.5 shrink-0 text-accent-blue" />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-[13.5px] text-text-secondary">
                <MapPin size={14} className="shrink-0 text-accent-purple" />
                <span>{siteConfig.location}</span>
              </li>
              <li>
                <a
                  href={siteConfig.resume}
                  download
                  className="mt-1 inline-flex items-center gap-2 rounded-xl border border-hairline-strong bg-surface-1 px-4 py-2.5 text-[13px] font-medium text-text-primary transition-all duration-200 hover:bg-surface-2 hover:border-text-muted hover:shadow-[0_0_12px_rgba(59,130,246,0.1)]"
                >
                  <Download size={13} strokeWidth={2.2} />
                  Download Résumé
                </a>
              </li>
            </ul>
          </div>

          {/* ── Tech Stack ───────────────────────────────────── */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Built With
            </h3>
            <ul className="flex flex-col gap-3">
              {techStack.map((tech) => (
                <li
                  key={tech}
                  className="flex items-center gap-2.5 text-[13.5px] text-text-secondary"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #3B82F6, #7C3AED)",
                    }}
                  />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────── */}
        <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 text-[12.5px] text-text-muted">
            <span>© {new Date().getFullYear()}</span>
            <span aria-hidden>·</span>
            <span
              className="font-medium"
              style={{
                background:
                  "linear-gradient(90deg, #60A5FA, #A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {siteConfig.name}
            </span>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart size={11} className="text-red-400 fill-red-400" /> & precision
            </span>
          </div>

          <div className="flex items-center gap-4 text-[12px] text-text-muted">
            <span className="rounded-full border border-hairline px-2.5 py-0.5 font-mono">
              {VERSION}
            </span>
            <span>Updated {LAST_UPDATED}</span>
            <motion.button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface-1 px-3 py-1.5 text-text-secondary transition-all duration-200 hover:border-hairline-strong hover:bg-surface-2 hover:text-text-primary"
              whileHover={{ y: -2 }}
              aria-label="Back to top"
            >
              <ArrowUp size={12} strokeWidth={2.2} />
              Top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

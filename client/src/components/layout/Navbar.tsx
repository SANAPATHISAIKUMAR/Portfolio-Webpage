"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { siteConfig, navigationItems } from "../../config/site";
import { cn } from "../../lib/utils";
import { MagneticButton } from "../effects/MagneticButton";

export function Navbar() {
  const { progress, direction, isScrolled } = useScrollProgress(80);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Track active section for nav highlighting.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    navigationItems.forEach(({ href }) => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close the mobile menu if the viewport grows to desktop.
  useEffect(() => {
    if (isDesktop) setIsMobileMenuOpen(false);
  }, [isDesktop]);

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const isVisible = !isScrolled || direction === "up" || isMobileMenuOpen;

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[1001] h-[2px] origin-left pointer-events-none"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, #3B82F6, #7C3AED, #06B6D4)",
        }}
      />

      {/* Navbar */}
      <motion.header
        className="fixed inset-x-0 top-0 z-[1000]"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            "w-full backdrop-blur-xl transition-colors duration-500",
            isScrolled
              ? "border-b border-hairline shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
              : "border-b border-transparent"
          )}
          style={{ background: isScrolled ? "var(--nav-bg)" : "transparent" }}
        >
          <nav className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-x-6 px-5 py-3.5 sm:px-8 lg:px-12">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#home");
              }}
              className="group flex shrink-0 items-center gap-2.5 justify-self-start"
              aria-label="Go to top"
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED]" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 font-display text-xs font-bold text-white">SK</span>
              </div>
              <span className="hidden font-display text-base font-semibold tracking-tight text-text-primary sm:block">
                Sai Kumar
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden items-center justify-center gap-1 lg:flex">
              {navigationItems.map(({ href, label }) => {
                const active = activeSection === href.replace("#", "");
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(href);
                    }}
                    className={cn(
                      "relative whitespace-nowrap rounded-lg px-4 py-2.5 text-[15px] font-medium transition-colors duration-200",
                      active ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-surface-2"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex shrink-0 items-center gap-2 justify-self-end">
              <ThemeToggle />

              {/* Desktop-only buttons */}
              <div className="hidden items-center gap-2 lg:flex">
                <MagneticButton href={siteConfig.resume} variant="ghost" size="sm" download>
                  <Download size={13} />
                  Resume
                </MagneticButton>
                <MagneticButton variant="primary" size="sm" onClick={() => scrollTo("#contact")}>
                  Hire Me
                  <ArrowUpRight size={14} />
                </MagneticButton>
              </div>

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface-1 text-text-secondary transition-all duration-200 hover:border-hairline-strong hover:bg-surface-2 hover:text-text-primary lg:hidden"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex flex-col lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div
              className="absolute inset-0 backdrop-blur-2xl"
              style={{ background: "color-mix(in srgb, var(--color-bg) 94%, transparent)" }}
            />

            <nav className="relative flex flex-1 flex-col items-center justify-center gap-1 px-8">
              {navigationItems.map(({ href, label }, i) => {
                const active = activeSection === href.replace("#", "");
                return (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(href);
                    }}
                    className={cn(
                      "w-full max-w-xs rounded-xl px-6 py-3 text-center font-display text-xl font-semibold transition-all duration-200",
                      active
                        ? "bg-accent-blue/10 text-accent-blue"
                        : "text-text-primary hover:bg-surface-1 hover:text-accent-blue"
                    )}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {label}
                  </motion.a>
                );
              })}

              <motion.div
                className="my-5 h-px w-12 bg-hairline-strong"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: navigationItems.length * 0.055 + 0.05 }}
              />

              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigationItems.length * 0.055 + 0.12 }}
              >
                <MagneticButton href={siteConfig.resume} variant="ghost" size="sm" download>
                  <Download size={13} />
                  Resume
                </MagneticButton>
                <MagneticButton variant="primary" size="sm" onClick={() => scrollTo("#contact")}>
                  Hire Me
                  <ArrowUpRight size={13} />
                </MagneticButton>
              </motion.div>

              <motion.div
                className="mt-5 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navigationItems.length * 0.055 + 0.2 }}
              >
                {[
                  { href: siteConfig.links[0]?.url, icon: <GithubIcon size={17} />, label: "GitHub" },
                  { href: siteConfig.links[1]?.url, icon: <LinkedinIcon size={17} />, label: "LinkedIn" },
                  { href: siteConfig.links[2]?.url, icon: <Mail size={17} />, label: "Email" },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel={label !== "Email" ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface-1 text-text-secondary transition-all duration-200 hover:border-hairline-strong hover:bg-surface-2 hover:text-text-primary"
                  >
                    {icon}
                  </a>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

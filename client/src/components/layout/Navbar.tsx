"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

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

  // Mobile menu: trap focus, close on Escape, and restore focus to the trigger
  // on close. Registers only while open, so it never steals focus on load.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;

    const getFocusable = () =>
      Array.from(
        menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      );

    getFocusable()[0]?.focus();

    const currentTrigger = menuTriggerRef.current;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      currentTrigger?.focus();
    };
  }, [isMobileMenuOpen]);

  // On the home page, intercept anchor clicks for smooth in-page scrolling. On
  // any other route (e.g. /projects/[slug]) let the browser navigate to the
  // "/#section" href so the link still works cross-page.
  const handleAnchorClick = (e: React.MouseEvent, hash: string) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById(hash.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const goToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
            "w-full transition-all duration-500",
            isScrolled
              ? "backdrop-blur-2xl border-b shadow-[0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.24)]"
              : "border-b border-transparent"
          )}
          style={{
            background: isScrolled ? "var(--nav-bg)" : "transparent",
            borderColor: isScrolled ? "var(--hairline)" : "transparent",
          }}
        >
          {/*
            3-column grid: logo | nav-links | actions
            Each outer column is `1fr` so the logo aligns with the page's left
            edge and actions with its right edge — the center column is `auto`
            so the nav links naturally center in the remaining space.
          */}
          <nav
            className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-x-8 py-6 px-[clamp(1.5rem,5vw,4rem)]"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* ── Logo ─────────────────────────────────────────── */}
            <Link
              href="/"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                setIsMobileMenuOpen(false);
              }}
              className="group flex shrink-0 items-center gap-2.5 justify-self-start"
              aria-label="Go to top"
            >
              {/* Gradient logo mark */}
              <div className="relative flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-[12px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED]" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-[12px] ring-1 ring-inset ring-white/20" />
                <span className="relative z-10 font-display text-[13px] font-bold tracking-wide text-white">
                  SK
                </span>
              </div>

              {/* Name — visible from sm breakpoint */}
              <div className="hidden sm:flex sm:flex-col sm:leading-none">
                <span className="font-display text-[17px] font-semibold tracking-tight text-text-primary">
                  Sai Kumar
                </span>
                <span className="text-[11.5px] font-medium text-text-muted tracking-wide">
                  Full-Stack Engineer
                </span>
              </div>
            </Link>

            {/* ── Desktop nav links ─────────────────────────────── */}
            <div
              className="hidden items-center justify-center lg:flex"
              role="list"
            >
              {/* Free-standing links — no container box, maximum breathing room */}
              <div className="flex items-center gap-3">
                {navigationItems.map(({ href, label }) => {
                  const active = activeSection === href.replace("#", "");
                  return (
                    <a
                      key={href}
                      href={`/${href}`}
                      onClick={(e) => handleAnchorClick(e, href)}
                      role="listitem"
                      aria-current={active ? "page" : undefined}
                      className="group relative flex flex-col items-center gap-0 whitespace-nowrap px-6 py-3 transition-colors duration-200"
                    >
                      {/* Subtle hover background */}
                      <motion.span
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse at 50% 60%, rgba(59,130,246,0.08) 0%, transparent 75%)",
                        }}
                      />

                      {/* Label — gradient when active, muted otherwise */}
                      {active ? (
                        <span
                          className="relative z-10 text-[15.5px] font-semibold tracking-[-0.015em]"
                          style={{
                            background:
                              "linear-gradient(135deg, #93C5FD 0%, #C4B5FD 50%, #67E8F9 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {label}
                        </span>
                      ) : (
                        <span className="relative z-10 text-[15.5px] font-medium tracking-[-0.015em] text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                          {label}
                        </span>
                      )}

                      {/* Underline track */}
                      <span className="relative mt-[3px] block h-[2px] w-full overflow-hidden rounded-full">
                        {/* Active: gradient underline that animates between sections */}
                        {active && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-0 rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, #3B82F6 0%, #7C3AED 50%, #06B6D4 100%)",
                            }}
                            transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          />
                        )}
                        {/* Hover: hairline underline, grows from left */}
                        {!active && (
                          <span className="absolute inset-0 rounded-full bg-hairline-strong scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                        )}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* ── Right actions ─────────────────────────────────── */}
            <div className="flex shrink-0 items-center gap-3 justify-self-end">
              <ThemeToggle />

              {/* Desktop-only CTA buttons */}
              <div className="hidden items-center gap-2 lg:flex">
                {/* Thin vertical separator */}
                <div className="h-5 w-px bg-hairline-strong" aria-hidden="true" />

                <MagneticButton
                  href={siteConfig.resume}
                  variant="secondary"
                  size="md"
                  download
                >
                  <Download size={13} strokeWidth={2.2} />
                  Resume
                </MagneticButton>

                <MagneticButton
                  variant="primary"
                  size="md"
                  href={isHome ? undefined : "/#contact"}
                  onClick={isHome ? goToContact : undefined}
                >
                  Hire Me
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </MagneticButton>
              </div>

              {/* Mobile hamburger */}
              <button
                ref={menuTriggerRef}
                type="button"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen ? "true" : "false"}
                aria-controls="mobile-menu"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface-1 text-text-secondary transition-all duration-200 hover:border-hairline-strong hover:bg-surface-2 hover:text-text-primary lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMobileMenuOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ─────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[999] flex flex-col lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* Frosted glass backdrop */}
            <div
              className="absolute inset-0 backdrop-blur-2xl"
              style={{ background: "color-mix(in srgb, var(--color-bg) 92%, transparent)" }}
            />

            <nav className="relative flex flex-1 flex-col items-center justify-center gap-2 px-8">
              {navigationItems.map(({ href, label }, i) => {
                const active = activeSection === href.replace("#", "");
                return (
                  <motion.a
                    key={href}
                    href={`/${href}`}
                    onClick={(e) => handleAnchorClick(e, href)}
                    className={cn(
                      "relative w-full max-w-[280px] overflow-hidden rounded-2xl px-6 py-3.5 text-center font-display text-[18px] font-semibold transition-all duration-200",
                      active
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-1"
                    )}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {active && (
                      <motion.span
                        layoutId="mobile-nav-pill"
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(124,58,237,0.1) 100%)",
                          border: "1px solid rgba(59,130,246,0.2)",
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                      )}
                      {label}
                    </span>
                  </motion.a>
                );
              })}

              {/* Divider */}
              <motion.div
                className="my-4 h-px w-16 rounded-full bg-gradient-to-r from-transparent via-hairline-strong to-transparent"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: navigationItems.length * 0.05 + 0.04 }}
              />

              {/* CTA buttons */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigationItems.length * 0.05 + 0.1 }}
              >
                <MagneticButton
                  href={siteConfig.resume}
                  variant="ghost"
                  size="sm"
                  download
                >
                  <Download size={13} strokeWidth={2.2} />
                  Resume
                </MagneticButton>
                <MagneticButton
                  variant="primary"
                  size="sm"
                  href={isHome ? undefined : "/#contact"}
                  onClick={isHome ? goToContact : undefined}
                >
                  Hire Me
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </MagneticButton>
              </motion.div>

              {/* Social links */}
              <motion.div
                className="mt-5 flex items-center gap-2.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navigationItems.length * 0.05 + 0.18 }}
              >
                {[
                  {
                    href: siteConfig.links[0]?.url,
                    icon: <GithubIcon size={17} />,
                    label: "GitHub",
                  },
                  {
                    href: siteConfig.links[1]?.url,
                    icon: <LinkedinIcon size={17} />,
                    label: "LinkedIn",
                  },
                  {
                    href: siteConfig.links[2]?.url,
                    icon: <Mail size={17} />,
                    label: "Email",
                  },
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

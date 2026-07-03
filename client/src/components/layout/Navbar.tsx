import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { siteConfig, navigationItems } from "../../config/site";
import { cn } from "../../lib/utils";
import { MagneticButton } from "../effects/MagneticButton";

export function Navbar() {
  const { progress, direction, isScrolled } = useScrollProgress(80);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1100;

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Track active section
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

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const isVisible = !isScrolled || direction === "up" || isMobileMenuOpen;

  // Items shown in desktop nav
  const desktopItems = isTablet
    ? navigationItems.filter((n) =>
        ["#about", "#projects", "#skills", "#contact"].includes(n.href)
      )
    : navigationItems;

  return (
    <>
      {/* ── Progress bar ─────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[1001] origin-left pointer-events-none"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, #3B82F6, #7C3AED, #06B6D4)",
        }}
      />

      {/* ── Navbar container ─────────────────────────────────────── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[1000]"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            "w-full backdrop-blur-xl transition-all duration-500",
            // Full-width flush bar: transparent at top, glass + bottom border on scroll.
            isScrolled
              ? "bg-[#050816]/80 border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
              : "bg-transparent border-b border-transparent"
          )}
        >
          <nav className="grid items-center grid-cols-[auto_1fr_auto] gap-x-6 px-5 sm:px-8 lg:px-12 py-3.5 max-w-[1600px] mx-auto">
            {/* ── Col 1: Logo ─────────────────────────────────────── */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
              className="flex items-center gap-2.5 shrink-0 group"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6] to-[#7C3AED]" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 text-white font-bold text-xs font-display">SK</span>
              </div>
              {!isMobile && !isTablet && (
                <span className="text-[#F8FAFC] text-base font-semibold font-display tracking-tight">
                  Sai Kumar
                </span>
              )}
            </a>

            {/* ── Col 2: Nav links (centered) ──────────────────────── */}
            {!isMobile ? (
              <div className="flex items-center justify-center gap-2">
                {desktopItems.map(({ href, label }) => {
                  const active = activeSection === href.replace("#", "");
                  return (
                    <a
                      key={href}
                      href={href}
                      onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                      className={cn(
                        "relative px-4 py-2.5 rounded-lg text-[15px] font-medium",
                        "transition-colors duration-200 whitespace-nowrap",
                        active ? "text-[#F8FAFC]" : "text-[#94A3B8] hover:text-[#F8FAFC]"
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg bg-white/[0.08]"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                    </a>
                  );
                })}
              </div>
            ) : (
              /* Tablet/mobile: empty center */
              <div />
            )}

            {/* ── Col 3: Action buttons ────────────────────────────── */}
            <div className="flex items-center gap-2 shrink-0">
              {!isMobile && (
                <>
                  {/* Resume — ghost, only on wide */}
                  {!isTablet && (
                    <MagneticButton
                      href={siteConfig.resume}
                      variant="ghost"
                      size="sm"
                      download
                    >
                      <Download size={13} />
                      Resume
                    </MagneticButton>
                  )}

                  {/* Hire Me — primary */}
                  <MagneticButton
                    variant="primary"
                    size="sm"
                    onClick={() => scrollTo("#contact")}
                  >
                    Hire Me
                    <ArrowUpRight size={14} />
                  </MagneticButton>
                </>
              )}

              {/* Mobile hamburger */}
              {isMobile && (
                <button
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  onClick={() => setIsMobileMenuOpen((v) => !v)}
                  className={cn(
                    "w-9 h-9 flex items-center justify-center rounded-xl",
                    "border border-white/[0.09] bg-white/[0.04]",
                    "text-[#94A3B8] hover:text-[#F8FAFC]",
                    "hover:bg-white/[0.08] hover:border-white/[0.14]",
                    "transition-all duration-200"
                  )}
                >
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              )}
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ───────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <motion.div
            className="fixed inset-0 z-[999] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#050816]/95 backdrop-blur-2xl" />

            {/* Content */}
            <nav className="relative flex flex-col items-center justify-center flex-1 gap-1 px-8">
              {navigationItems.map(({ href, label }, i) => {
                const active = activeSection === href.replace("#", "");
                return (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    className={cn(
                      "w-full max-w-xs text-center py-3 px-6 rounded-xl",
                      "text-xl font-display font-semibold transition-all duration-200",
                      active
                        ? "text-[#3B82F6] bg-[#3B82F6]/10"
                        : "text-[#F8FAFC] hover:text-[#3B82F6] hover:bg-white/[0.04]"
                    )}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {label}
                  </motion.a>
                );
              })}

              {/* Divider */}
              <motion.div
                className="w-12 h-px bg-white/10 my-5"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: navigationItems.length * 0.055 + 0.05 }}
              />

              {/* Buttons */}
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

              {/* Social */}
              <motion.div
                className="flex items-center gap-2 mt-5"
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
                    className={cn(
                      "w-9 h-9 flex items-center justify-center rounded-xl",
                      "text-[#64748B] hover:text-[#F8FAFC]",
                      "border border-white/[0.07] bg-white/[0.03]",
                      "hover:border-white/[0.14] hover:bg-white/[0.07]",
                      "transition-all duration-200"
                    )}
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

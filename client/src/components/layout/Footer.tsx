import { Mail, ArrowUp, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { motion } from "framer-motion";
import { siteConfig } from "../../config/site";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.04]">
      {/* Gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #3B82F6, #7C3AED, #06B6D4, transparent)",
        }}
      />

      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left — Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-display font-bold text-xs">
              SK
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {siteConfig.name}
              </p>
              <p className="text-xs text-text-muted">
                © {new Date().getFullYear()} All rights reserved
              </p>
            </div>
          </div>

          {/* Center — Made with */}
          <p className="text-xs text-text-muted flex items-center gap-1">
            Crafted with <Heart size={12} className="text-red-400" /> and a lot
            of ☕
          </p>

          {/* Right — Socials & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.links[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-white/[0.04]"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={siteConfig.links[1]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-white/[0.04]"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={siteConfig.links[2]?.url}
              className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-white/[0.04]"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>

            <div className="w-px h-4 bg-white/10" />

            <motion.button
              onClick={scrollToTop}
              className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-white/[0.04]"
              whileHover={{ y: -2 }}
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

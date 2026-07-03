"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import { cn } from "../../lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: the resolved theme is only known on the client.
  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : undefined}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full",
        "border border-hairline bg-surface-1 text-text-secondary",
        "transition-colors duration-200 hover:text-text-primary hover:border-hairline-strong hover:bg-surface-2",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {/* Render nothing theme-specific until mounted to keep SSR/CSR identical. */}
      <span className="relative h-[18px] w-[18px]">
        <AnimatePresence initial={false} mode="wait">
          {mounted && (
            <motion.span
              key={isDark ? "moon" : "sun"}
              initial={{ y: 8, opacity: 0, rotate: -30 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -8, opacity: 0, rotate: 30 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {isDark ? <Moon size={17} /> : <Sun size={18} />}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

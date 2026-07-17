"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { EASE_OUT_EXPO } from "../../lib/motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  /** Colored ambient glow shown on hover. */
  glowColor?: string;
  /** Border color animated to on hover. Defaults to a brand-blue hairline. */
  borderColor?: string;
  hoverScale?: number;
}

/**
 * Theme-aware glass card with a declarative colored-glow hover. The base
 * surface/border come from tokens so it renders correctly in both light and
 * dark themes; the hover state is driven entirely by Framer variants (no
 * imperative el.style mutation), so it also respects prefers-reduced-motion.
 */
export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(59, 130, 246, 0.15)",
  borderColor = "rgba(59, 130, 246, 0.35)",
  hoverScale = 1.02,
}: GlowCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "border border-hairline bg-surface-1 backdrop-blur-xl",
        className
      )}
      whileHover={{
        scale: hoverScale,
        borderColor,
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.18), 0 0 40px ${glowColor}`,
        transition: { duration: 0.4, ease: EASE_OUT_EXPO },
      }}
    >
      {children}
    </motion.div>
  );
}

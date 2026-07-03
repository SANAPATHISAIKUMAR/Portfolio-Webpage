"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hoverScale?: number;
  borderColor?: string;
}

export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(59, 130, 246, 0.15)",
  hoverScale = 1.02,
  borderColor = "rgba(59, 130, 246, 0.25)",
}: GlowCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-background-secondary/60 backdrop-blur-xl",
        "border border-white/[0.06]",
        "transition-all duration-500",
        className
      )}
      whileHover={{
        scale: hoverScale,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{
        boxShadow: `0 0 0 rgba(0,0,0,0), inset 0 1px 0 rgba(255,255,255,0.03)`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = `0 0 40px ${glowColor}, 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`;
        el.style.borderColor = borderColor;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = `0 0 0 rgba(0,0,0,0), inset 0 1px 0 rgba(255,255,255,0.03)`;
        el.style.borderColor = `rgba(255, 255, 255, 0.06)`;
      }}
    >
      {children}
    </motion.div>
  );
}

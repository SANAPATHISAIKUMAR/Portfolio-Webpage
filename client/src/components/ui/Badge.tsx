import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
}

/**
 * Neutral, theme-aware chip for tech tags and metadata. Server-safe (no hooks).
 * Uses surface/hairline tokens so it renders correctly in both themes — replaces
 * the copy-pasted `bg-white/[0.04] border-white/[0.04]` chips scattered across
 * sections.
 */
export function Badge({ children, className, size = "md" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-hairline bg-surface-1 font-medium text-text-muted",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-caption",
        className
      )}
    >
      {children}
    </span>
  );
}

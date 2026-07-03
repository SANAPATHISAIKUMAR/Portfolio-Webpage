"use client";

import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Deprecated no-op — buttons are static now. Kept for call-site compatibility. */
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  download?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
}

/**
 * Flat, professional variants with a clean three-tier hierarchy:
 * primary (solid) → secondary (bordered) → ghost (text). font-medium weight
 * and ~8px radius, matching Vercel/Linear. No pills, no bevels, no motion.
 */
const variantStyles: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  primary: cn(
    "font-medium",
    "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]",
    "border border-transparent",
    "hover:bg-[var(--btn-primary-bg-hover)]",
  ),
  secondary: cn(
    "font-medium text-text-primary",
    "bg-transparent",
    "border border-hairline-strong",
    "hover:bg-surface-1 hover:border-text-muted",
  ),
  ghost: cn(
    "font-medium text-text-secondary",
    "bg-transparent border border-transparent",
    "hover:bg-surface-1 hover:text-text-primary",
  ),
  outline: cn(
    "font-medium text-text-primary",
    "bg-transparent",
    "border border-hairline-strong",
    "hover:bg-surface-1 hover:border-text-muted",
  ),
};

const sizeStyles = {
  sm: "px-3 h-8 text-[13px] rounded-lg gap-1.5",
  md: "px-4 h-9 text-sm rounded-lg gap-1.5",
  lg: "px-5 h-11 text-sm rounded-lg gap-2",
};

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  variant = "primary",
  size = "md",
  download,
  disabled,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-medium tracking-[-0.01em]",
    "transition-[background-color,border-color,filter,color] duration-200 ease-out",
    "cursor-pointer select-none",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-55 pointer-events-none",
    className
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        download={download}
        className={baseStyles}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

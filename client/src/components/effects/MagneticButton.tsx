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
 * Flat, professional variants — clean fills, hairline borders, calm hover
 * states. No 3D bevels, no motion.
 */
const variantStyles: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  primary: cn(
    "font-semibold",
    "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]",
    "border border-transparent",
    "hover:bg-[var(--btn-primary-bg-hover)]",
  ),
  secondary: cn(
    "text-text-primary font-semibold",
    "bg-surface-2 backdrop-blur-md",
    "border border-hairline",
    "hover:border-hairline-strong",
  ),
  ghost: cn(
    "text-text-secondary font-medium",
    "bg-surface-1",
    "border border-hairline",
    "hover:bg-surface-2 hover:border-hairline-strong hover:text-text-primary",
  ),
  outline: cn(
    "text-text-primary font-medium",
    "bg-transparent",
    "border border-hairline-strong",
    "hover:bg-surface-1",
  ),
};

const sizeStyles = {
  sm: "px-4 h-9 text-[13px] rounded-full gap-1.5",
  md: "px-5 h-11 text-sm rounded-full gap-2",
  lg: "px-7 h-[52px] text-[15px] rounded-full gap-2",
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

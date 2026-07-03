"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";
import { cn } from "../../lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  download?: boolean;
  disabled?: boolean;
}

const variantStyles = {
  primary: [
    "bg-gradient-to-r from-[#3B82F6] to-[#7C3AED]",
    "text-white font-semibold",
    "shadow-[0_0_24px_rgba(59,130,246,0.4),0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]",
    "hover:shadow-[0_0_36px_rgba(59,130,246,0.55),0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
    "hover:brightness-[1.08] active:brightness-95",
    "border border-white/10",
  ].join(" "),

  outline: [
    "bg-transparent",
    "text-[#3B82F6] font-semibold",
    "border-2 border-[#3B82F6]/50",
    "hover:border-[#3B82F6]/80 hover:bg-[#3B82F6]/10",
    "hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
    "active:scale-[0.98]",
  ].join(" "),

  ghost: [
    "bg-white/[0.05]",
    "text-[#94A3B8] font-medium",
    "border border-white/[0.09]",
    "hover:bg-white/[0.09] hover:border-white/[0.16] hover:text-[#F8FAFC]",
    "active:scale-[0.98]",
  ].join(" "),

  secondary: [
    "bg-white/[0.06] backdrop-blur-md",
    "text-[#F8FAFC] font-semibold",
    "border border-white/[0.14]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
    "hover:bg-white/[0.1] hover:border-white/[0.22]",
    "active:scale-[0.98]",
  ].join(" "),
};

const sizeStyles = {
  sm: "px-4 py-2 text-[13px] h-9 rounded-full gap-1.5",
  md: "px-6 py-2.5 text-sm h-11 rounded-full gap-2",
  lg: "px-8 py-3.5 text-base h-12 rounded-full gap-2",
};

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  onClick,
  href,
  target,
  variant = "primary",
  size = "md",
  download,
  disabled,
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } =
    useMagneticEffect<HTMLElement>({ strength });

  const baseStyles = cn(
    "relative inline-flex items-center justify-center whitespace-nowrap",
    "font-medium tracking-tight",
    "transition-all duration-300 ease-out",
    "cursor-pointer select-none",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-60 pointer-events-none",
    className
  );

  const inner = (
    <motion.span
      className="relative z-10 flex items-center gap-[inherit]"
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={baseStyles}
        onMouseMove={onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={onMouseLeave}
        download={download}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      className={baseStyles}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={onMouseMove as unknown as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={onMouseLeave}
    >
      {inner}
    </button>
  );
}

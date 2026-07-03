"use client";

import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, type MotionStyle } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Magnetic pull factor (0 = none). Kept subtle by default. */
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
 * Restrained, "product-company" variants: tight layered shadows instead of
 * neon halos, a hairline top highlight for depth, and calm hover states.
 */
const variantStyles: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  primary: cn(
    "text-white font-semibold",
    "bg-[linear-gradient(180deg,#4b8bf7_0%,#3B82F6_45%,#6d43e0_100%)]",
    "border border-white/15",
    // Hairline top-inset highlight + soft, tight ambient shadow (no neon).
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(9,12,26,0.4),0_6px_16px_-6px_rgba(59,130,246,0.5)]",
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_4px_rgba(9,12,26,0.45),0_10px_28px_-8px_rgba(99,102,241,0.6)]",
  ),
  secondary: cn(
    "text-text-primary font-semibold",
    "bg-white/[0.06] backdrop-blur-md",
    "border border-white/[0.14]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.25)]",
    "hover:bg-white/[0.1] hover:border-white/[0.22]",
  ),
  ghost: cn(
    "text-text-secondary font-medium",
    "bg-white/[0.04]",
    "border border-white/[0.08]",
    "hover:bg-white/[0.08] hover:border-white/[0.16] hover:text-text-primary",
  ),
  outline: cn(
    "text-text-primary font-medium",
    "bg-transparent",
    "border border-white/[0.16]",
    "hover:border-white/[0.32] hover:bg-white/[0.04]",
  ),
};

const sizeStyles = {
  sm: "px-4 h-9 text-[13px] rounded-full gap-1.5",
  md: "px-5 h-11 text-sm rounded-full gap-2",
  lg: "px-7 h-[52px] text-[15px] rounded-full gap-2",
};

const SPRING = { stiffness: 260, damping: 18, mass: 0.6 };

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
  href,
  target,
  variant = "primary",
  size = "md",
  download,
  disabled,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Button body follows the cursor; the label follows a touch further for depth.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  // Label drifts a touch further than the body → subtle parallax depth.
  const labelX = useSpring(springX, { stiffness: 200, damping: 16, mass: 0.7 });
  const labelY = useSpring(springY, { stiffness: 200, damping: 16, mass: 0.7 });

  const magneticActive = !prefersReducedMotion && strength > 0 && !disabled;

  const handleMove = (e: React.MouseEvent) => {
    if (!magneticActive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const showSheen = variant === "primary" || variant === "secondary";

  const baseStyles = cn(
    "group relative inline-flex items-center justify-center whitespace-nowrap overflow-hidden",
    "font-medium tracking-[-0.01em] isolate",
    "transition-[background-color,border-color,box-shadow,color] duration-200 ease-out",
    "cursor-pointer select-none",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-55 pointer-events-none",
    className
  );

  const motionStyle: MotionStyle = magneticActive ? { x: springX, y: springY } : {};

  const content = (
    <>
      {/* Shine sweep — a single calm diagonal pass on hover */}
      {showSheen && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        >
          <span className="absolute inset-y-0 left-[-60%] w-1/2 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-[750ms] ease-out group-hover:left-[130%] group-hover:opacity-100" />
        </span>
      )}
      <motion.span
        className="relative z-10 flex items-center gap-[inherit]"
        style={magneticActive ? { x: labelX, y: labelY } : undefined}
      >
        {children}
      </motion.span>
    </>
  );

  const shared = {
    ref: ref as never,
    className: baseStyles,
    style: motionStyle,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileTap: disabled ? undefined : { scale: 0.97 },
    transition: { scale: { duration: 0.12, ease: "easeOut" } },
    "aria-label": ariaLabel,
  } as const;

  if (href) {
    return (
      <motion.a
        {...shared}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        download={download}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button {...shared} type="button" onClick={onClick} disabled={disabled}>
      {content}
    </motion.button>
  );
}

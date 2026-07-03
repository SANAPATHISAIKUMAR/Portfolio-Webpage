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
 * Flat, "normal" variants — no beveled inset highlights or layered drop
 * shadows. Clean fills, hairline borders, calm hover states.
 */
const variantStyles: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  primary: cn(
    "text-white font-semibold",
    "bg-gradient-to-r from-accent-blue to-accent-purple",
    "border border-transparent",
    "hover:brightness-110",
  ),
  secondary: cn(
    "text-text-primary font-semibold",
    "bg-surface-2 backdrop-blur-md",
    "border border-hairline",
    "hover:bg-surface-2 hover:border-hairline-strong",
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

  const baseStyles = cn(
    "relative inline-flex items-center justify-center whitespace-nowrap",
    "font-medium tracking-[-0.01em]",
    "transition-[background-color,border-color,filter,color] duration-200 ease-out",
    "cursor-pointer select-none",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-55 pointer-events-none",
    className
  );

  const motionStyle: MotionStyle = magneticActive ? { x: springX, y: springY } : {};

  const content = (
    <motion.span
      className="relative z-10 flex items-center gap-[inherit]"
      style={magneticActive ? { x: labelX, y: labelY } : undefined}
    >
      {children}
    </motion.span>
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

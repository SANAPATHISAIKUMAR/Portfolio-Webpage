import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile, usePrefersReducedMotion } from "../../hooks/useMediaQuery";

export function MouseFollower() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const disabled = isMobile || prefersReducedMotion;
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const isHovering = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (disabled) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = () => {
      isHovering.current = true;
      if (dotRef.current) {
        dotRef.current.style.transform = "translate(-50%, -50%) scale(2.5)";
        dotRef.current.style.background = "rgba(59, 130, 246, 0.15)";
        dotRef.current.style.border = "1px solid rgba(59, 130, 246, 0.4)";
      }
    };

    const handleHoverEnd = () => {
      isHovering.current = false;
      if (dotRef.current) {
        dotRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        dotRef.current.style.background = "transparent";
        dotRef.current.style.border = "1.5px solid rgba(248, 250, 252, 0.5)";
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [disabled, cursorX, cursorY]);

  if (disabled) return null;

  return (
    <motion.div
      ref={dotRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        border: "1.5px solid rgba(248, 250, 252, 0.5)",
        transition: "transform 0.2s ease, background 0.2s ease, border 0.2s ease",
      }}
    />
  );
}

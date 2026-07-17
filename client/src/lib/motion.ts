import type { Variants } from "framer-motion";

/**
 * Signature ambient easing curve used across the site — a slow, "expensive"
 * deceleration (Apple/Linear feel). Single source of truth so the magic tuple
 * isn't hand-copied into a dozen components.
 */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Softer quart curve for smaller UI transitions. */
export const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

/**
 * Standard staggered container — pair with {@link fadeUpItem} on children to
 * reveal a group with a consistent cadence.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/** Standard fade-up item to pair with {@link staggerContainer}. */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

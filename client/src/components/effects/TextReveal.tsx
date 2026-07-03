"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  once = true,
  as: Component = "span",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const words = text.split(" ");

  return (
    <Component ref={ref} className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={
              isInView
                ? {
                    y: "0%",
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      delay: delay + wordIndex * staggerDelay,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }
                : {}
            }
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

interface TypingAnimationProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypingAnimation({
  texts,
  className = "",
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const currentFullText = texts[currentTextIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentFullText.length) {
            setDisplayText(currentFullText.substring(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.substring(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseDuration, prefersReducedMotion]);

  // Reduced-motion: show the first role statically, no typing/blinking.
  if (prefersReducedMotion) {
    return (
      <span className={className}>{texts[0]}</span>
    );
  }

  return (
    <span className={className} aria-label={texts[currentTextIndex]}>
      {displayText}
      <span className="cursor-blink text-accent-blue" aria-hidden="true">|</span>
    </span>
  );
}

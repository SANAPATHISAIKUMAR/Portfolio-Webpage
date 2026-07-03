import { useState, useEffect, useRef, useCallback } from "react";

interface ScrollProgress {
  progress: number;
  direction: "up" | "down";
  isScrolled: boolean;
}

export function useScrollProgress(threshold = 50): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    progress: 0,
    direction: "down",
    isScrolled: false,
  });
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
    const direction = scrollY > lastScrollY.current ? "down" : "up";
    const isScrolled = scrollY > threshold;

    lastScrollY.current = scrollY;

    setState({ progress, direction, isScrolled });
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return state;
}

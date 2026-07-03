import { useRef, useCallback, type RefObject } from "react";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

interface MagneticReturn<T extends HTMLElement> {
  ref: RefObject<T | null>;
  onMouseMove: (e: React.MouseEvent<T>) => void;
  onMouseLeave: () => void;
}

export function useMagneticEffect<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {}
): MagneticReturn<T> {
  const { strength = 0.3, radius = 200 } = options;
  const ref = useRef<T | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        const factor = 1 - distance / radius;
        const moveX = distX * strength * factor;
        const moveY = distY * strength * factor;

        ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
        ref.current.style.transition = "transform 0.2s ease-out";
      }
    },
    [strength, radius]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
    ref.current.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

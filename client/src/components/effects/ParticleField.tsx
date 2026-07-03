"use client";

import { useEffect, useRef } from "react";
import { useIsMobile, usePrefersReducedMotion } from "../../hooks/useMediaQuery";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  c: string;
}

// Brand palette, weighted toward blue so the field reads calm, not rainbow.
const PARTICLE_COLORS = [
  "59, 130, 246",
  "59, 130, 246",
  "124, 58, 237",
  "6, 182, 212",
];

/**
 * Lightweight Canvas 2D particle field used as a decorative Hero background.
 * Replaces a Three.js/@react-three-fiber implementation that added ~880 KB to
 * the bundle for what is purely ambient decoration.
 *
 * - Respects prefers-reduced-motion (renders nothing).
 * - Scales particle count down on mobile.
 * - Pauses when the tab is hidden and cleans up its rAF loop on unmount.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = isMobile ? 24 : 46;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let rafId = 0;
    let running = true;

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        // Slower drift → ambient, not busy.
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.3 + 0.12,
        c: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      }));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      // Ease the parallax offset toward the pointer.
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      for (const p of particles) {
        p.x += p.vx + mouse.x * 0.006;
        p.y += p.vy + mouse.y * 0.006;

        // Wrap around the edges for a seamless field.
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c}, ${p.a})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.tx = e.clientX - width / 2;
      mouse.ty = e.clientY - height / 2;
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(draw);
      }
    };

    resize();
    seed();
    rafId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isMobile, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

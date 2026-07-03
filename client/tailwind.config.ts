import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050816",
        "background-secondary": "#0B1120",
        "accent-blue": "#3B82F6",
        "accent-purple": "#7C3AED",
        "accent-cyan": "#06B6D4",
        "text-primary": "#F8FAFC",
        "text-secondary": "#94A3B8",
        "text-muted": "#7C8AA0",
        glass: {
          DEFAULT: "rgba(11, 17, 32, 0.6)",
          light: "rgba(11, 17, 32, 0.4)",
          dark: "rgba(5, 8, 22, 0.8)",
        },
        border: {
          DEFAULT: "rgba(59, 130, 246, 0.15)",
          hover: "rgba(59, 130, 246, 0.3)",
          active: "rgba(59, 130, 246, 0.5)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "hero-xl": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "hero-lg": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "hero-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "section-title": ["clamp(1.75rem, 3.5vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "section-subtitle": ["clamp(1rem, 2vw, 1.25rem)", { lineHeight: "1.6" }],
      },
      spacing: {
        "section": "clamp(80px, 12vw, 160px)",
        "section-sm": "clamp(48px, 8vw, 96px)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
        "3xl": "64px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.2), 0 0 80px rgba(124, 58, 237, 0.1)",
        "glow-purple": "0 0 20px rgba(124, 58, 237, 0.3)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.3)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 8px 40px rgba(59, 130, 246, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.4s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        "marquee": "marquee 30s linear infinite",
        "blob": "blob 7s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

import type { TimelineItem } from "../types";

// Reverse-chronological (current first) to match the Experience section and
// standard résumé convention. Source of truth: ATS résumé + confirmed sequence.
export const aboutTimeline: TimelineItem[] = [
  {
    year: "2026 · Apr–Present",
    title: "Associate Software Engineer — Lystra Pharma",
    description:
      "Building MERN-stack REST APIs, backend services, and responsive React interfaces for a healthcare technology platform.",
    icon: "💻",
  },
  {
    year: "2025 · Jul–Oct",
    title: "UX and UI Designer Intern — Zidio Development",
    description:
      "Designed wireframes, user flows and high-fidelity interfaces in Figma and Adobe XD, and ran usability testing.",
    icon: "🎨",
  },
  {
    year: "2025 · Mar–Apr",
    title: "Frontend Developer Intern — Cognifyz",
    description:
      "Built responsive React interfaces, integrated REST APIs, and optimised asset loading and rendering to improve page-load performance.",
    icon: "⚛️",
  },
  {
    year: "2025 — 2026",
    title: "Hackathon Finalist & Team Lead",
    description:
      "Led Team INVOTEX at Smart India Hackathon 2025 (Smart Mentor), solo-built ContentOps AI at Bengaluru AI Hack Day, led the team to the finals at Cardano Asia IBW 2025, and reached the Grand Finale of the Meta × PyTorch OpenEnv Hackathon in 2026 — top 3% of 31,000+ teams.",
    icon: "🏆",
  },
  {
    year: "2023",
    title: "Started B.Tech in AI & ML",
    description:
      "Began my B.Tech in Computer Science (AI & ML) at Dhanalakshmi Srinivasan University and started building real projects with web technologies.",
    icon: "🎓",
  },
];

export const aboutDescription = `I'm an Associate Software Engineer at Lystra Pharma, where I build scalable full-stack healthcare applications on the MERN stack — REST APIs, backend services, and responsive React interfaces. Alongside this, I'm completing my B.Tech in Computer Science (AI & ML) at Dhanalakshmi Srinivasan University.

Before Lystra, I interned as a Frontend Developer at Cognifyz Technologies and a UX and UI Designer at Zidio Development — so I care about the product and the experience as much as the code: understand the user's problem first, then ship something that actually works.

Most of my best work happens under real constraints. I led Team INVOTEX at Smart India Hackathon 2025 to build Smart Mentor, an AI learning platform for students in Tier 2/3 cities, and I was a Finalist and Team Lead at the Meta PyTorch OpenEnv Hackathon — top 3% of 31,000+ teams worldwide. Outside of that, I'm usually exploring LLM agents, reinforcement learning, and agentic AI.`;

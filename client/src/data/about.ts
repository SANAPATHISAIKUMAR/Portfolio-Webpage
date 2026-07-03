import type { TimelineItem } from "../types";

// Reverse-chronological (current first) to match the Experience section and
// standard résumé convention. Source of truth: ATS résumé + confirmed sequence.
export const aboutTimeline: TimelineItem[] = [
  {
    year: "2025 — Present",
    title: "Associate Software Engineer — Lystra Pharma",
    description:
      "Building MERN-stack REST APIs, backend services, and responsive React interfaces for a healthcare technology platform.",
    icon: "💻",
  },
  {
    year: "2025 · Jul–Oct",
    title: "UX/UI Designer — Zidio Development",
    description:
      "Designed user-centered interfaces and ran user research and usability testing in Figma and Adobe XD, working closely with product and engineering.",
    icon: "🎨",
  },
  {
    year: "2025 · Mar–Apr",
    title: "Frontend Engineer — Cognifyz",
    description:
      "Shipped responsive, interactive React interfaces and integrated REST APIs as a remote Frontend Engineer, improving page load times along the way.",
    icon: "⚛️",
  },
  {
    year: "2025",
    title: "Hackathon Finalist & Team Lead",
    description:
      "Led Team INVOTEX at Smart India Hackathon 2025 (Smart Mentor), reached the finals at Meta PyTorch OpenEnv (Top 800 of 31,000+ teams) and Cardano Asia IBW 2025, and solo-built ContentOps AI at Bengaluru AI Hack Day.",
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

Before Lystra, I interned as a Frontend Engineer at Cognifyz Technologies and a UX/UI Designer at Zidio Development — so I care about the product and the experience as much as the code: understand the user's problem first, then ship something that actually works.

Most of my best work happens under real constraints. I led Team INVOTEX at Smart India Hackathon 2025 to build Smart Mentor, an AI learning platform for students in Tier 2/3 cities, and I was a Finalist and Team Lead at the Meta PyTorch OpenEnv Hackathon — top 800 of 31,000+ teams worldwide. Outside of that, I'm usually exploring LLM agents, reinforcement learning, and agentic AI.`;

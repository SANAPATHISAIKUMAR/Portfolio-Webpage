import type { Hackathon } from "../types";

export const hackathons: Hackathon[] = [
  {
    id: "sih-2025",
    onResume: true,
    name: "Smart India Hackathon 2025",
    organizer: "Government of India",
    date: "2025",
    achievement: "Team Lead",
    description:
      "Led Team INVOTEX to build Smart Mentor, an AI-powered personalized learning platform addressing the education-to-employability gap for students in Tier 2/3 cities (Problem ID SIH25199, Smart Education theme).",
    technologies: ["React", "Python", "Adaptive ML", "NLP", "AI"],
    teamSize: 6,
    projectName: "Smart Mentor",
  },
  {
    id: "meta-pytorch-openenv",
    onResume: true,
    name: "Meta PyTorch OpenEnv Hackathon",
    // Hosted by Scaler School of Technology; Meta × PyTorch × OpenEnv is the
    // event itself. Source: the announcement post.
    organizer: "Meta × PyTorch, hosted by Scaler School of Technology",
    // 2026, not 2025 as this file previously said. Two independent sources
    // agree: the announcement post is ~3 months old, and the project repo
    // (Meta-open_env_project) was created 2026-04-25.
    date: "2026",
    achievement: "Grand Finalist",
    description:
      "Grand Finalist and Team Lead. Built OpenEnv Invotex — a multi-domain reinforcement-learning environment that trains LLM agents against failure rather than ideal conditions, injecting live schema drift, 403s and permission errors across Email Triage, Customer Support and Traffic Control. Training loss fell 3.8 → 0.14 in 60 steps, and LLaMA-3 8B scored 0.65+ where Qwen-72B scored 0.00 — robustness beat model size.",
    technologies: ["Python", "PyTorch", "Reinforcement Learning", "Docker", "LLaMA-3"],
    position: "Top 3% of 31,000+ teams globally",
    teamSize: 3,
    projectName: "OpenEnv Invotex",
  },
  {
    id: "cardano-asia-ibw",
    onResume: true,
    name: "Cardano Asia Hackathon — IBW 2025",
    organizer: "Cardano Foundation",
    date: "2025",
    achievement: "Finalist",
    description:
      "Finalist and Team Lead. Led a team of three through an intense blockchain build sprint, delivering a working prototype across blockchain architecture and decentralized systems.",
    technologies: ["Blockchain", "Web3", "Decentralized Systems"],
    teamSize: 3,
  },
  {
    id: "bengaluru-ai-hack-day",
    onResume: true,
    name: "Bengaluru AI Hack Day",
    organizer: "Polaris School of Technology",
    date: "2025",
    achievement: "Solo Builder",
    description:
      "Selected from thousands of applicants. Built ContentOps AI end-to-end as a solo developer — an agentic platform that owns content operations: set a goal once and it plans, decides, executes and reports autonomously across ideation, research, structuring, execution and reporting.",
    technologies: ["Agentic AI", "Lovable", "Make", "Gamma"],
    teamSize: 1,
    projectName: "ContentOps AI",
  },
  {
    id: "vibeathon",
    name: "VIBEATHON",
    organizer: "Replit × Polaris School of Technology",
    date: "2025",
    achievement: "Participant",
    description:
      "36-hour hackathon billed as India's biggest vibe-coding celebration. Built a creative tech project from scratch with a teammate, working through ideation and rapid prototyping under a hard deadline.",
    technologies: ["React", "AI Tools", "Rapid Prototyping"],
    teamSize: 2,
  },
];

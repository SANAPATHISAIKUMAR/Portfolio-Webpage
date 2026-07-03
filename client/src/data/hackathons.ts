import type { Hackathon } from "../types";

export const hackathons: Hackathon[] = [
  {
    id: "sih-2025",
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
    name: "Meta PyTorch OpenEnv Hackathon",
    organizer: "Meta",
    date: "2025",
    achievement: "Finalist",
    description:
      "Finalist and Team Lead. Built OpenEnv Invotex — a containerized, multi-domain reinforcement-learning environment for benchmarking LLM agents on real-world workflows. Selected to present at the finals in Bangalore.",
    technologies: ["Python", "PyTorch", "Reinforcement Learning", "Containerization"],
    position: "Top 800 of 31,000+ teams globally",
    projectName: "OpenEnv Invotex",
  },
  {
    id: "cardano-asia-ibw",
    name: "Cardano Asia Hackathon — IBW 2025",
    organizer: "Cardano Foundation",
    date: "2025",
    achievement: "Finalist",
    description:
      "Finalist and Team Lead. Led the team through an intense blockchain build sprint and reached the finals, delivering a working prototype across blockchain architecture and decentralized systems.",
    technologies: ["Blockchain", "Web3", "Decentralized Systems"],
  },
  {
    id: "bengaluru-ai-hack-day",
    name: "Bengaluru AI Hack Day",
    organizer: "Polaris School of Technology",
    date: "2025",
    achievement: "Solo Builder",
    description:
      "Built ContentOps AI end-to-end as a solo developer — a fully agentic content-operations platform recognized by judges for its strong agentic architecture.",
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
      "Team participant at India's biggest vibe-coding hackathon — built a creative tech project from scratch while exploring cutting-edge tools and frameworks.",
    technologies: ["React", "AI Tools", "Rapid Prototyping"],
  },
];

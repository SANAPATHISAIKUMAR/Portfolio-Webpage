import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "smart-mentor",
    title: "Smart Mentor",
    slug: "smart-mentor",
    tagline: "AI-Powered Personalized Learning Platform",
    description:
      "An AI learning platform that adapts to each student's goals and learning style instead of a one-size-fits-all curriculum — built for students in Tier 2/3 Indian cities. Created as Team Lead of INVOTEX at Smart India Hackathon 2025 (SIH25199).",
    problem:
      "Students in Tier 2/3 cities face a widening education-to-employability gap, with generic curricula that don't adapt to individual skill levels or goals.",
    solution:
      "A personalized learning platform combining an AI assessment engine, an adaptive ML learning path, an NLP doubt-solver, AI code review, and live mentoring — with gamification and predictive analytics to keep students on track.",
    techStack: ["React", "Reactstrap", "JavaScript", "Python", "Adaptive ML", "NLP"],
    features: [
      "AI assessment engine for diagnostic skill testing",
      "Adaptive ML learning paths that adjust difficulty and pacing",
      "NLP-powered doubt-solver chatbot",
      "Real-time AI code review and feedback",
      "Live mentoring with human escalation",
      "Gamification and predictive performance analytics",
    ],
    image: "",
    featured: true,
    category: "ai",
    color: "#3B82F6",
  },
  {
    id: "openenv-invotex",
    title: "OpenEnv Invotex",
    slug: "openenv-invotex",
    tagline: "RL Environment for LLM-Agent Benchmarking",
    description:
      "A containerized, multi-domain reinforcement-learning environment for benchmarking LLM agents on real-world workflows — Email, Traffic, and Customer Support. Finalist and Team Lead at the Meta PyTorch OpenEnv Hackathon (Top 800 of 31,000+ teams).",
    problem:
      "Evaluating LLM agents on realistic, repeatable tasks is hard — most benchmarks aren't deterministic or representative of real-world workflows.",
    solution:
      "An OpenEnv-compliant environment with deterministic evaluation and a scalable containerized architecture, spanning multiple real-world task domains.",
    techStack: ["Python", "PyTorch", "Reinforcement Learning", "Containerization"],
    features: [
      "Multi-domain RL environments (Email, Traffic, Support)",
      "OpenEnv-compliant APIs",
      "Deterministic, repeatable evaluation",
      "Scalable containerized architecture",
      "Selected to present at the finals in Bangalore",
    ],
    image: "",
    githubUrl: "https://github.com/SANAPATHISAIKUMAR/Meta-open_env_project",
    featured: true,
    category: "ai",
    color: "#7C3AED",
  },
  {
    id: "contentops-ai",
    title: "ContentOps AI",
    slug: "contentops-ai",
    tagline: "Agentic Content Operations Platform",
    description:
      "A fully agentic content-operations platform built solo at Bengaluru AI Hack Day. Set a goal once and the system handles ideation, research, structuring, execution, and reporting on its own — recognized by judges for its agentic architecture.",
    problem:
      "Content workflows are fragmented across many manual steps — ideation, research, structuring, execution, and reporting.",
    solution:
      "An end-to-end agentic system where the user sets a single goal and autonomous agents carry the workflow through to a finished, self-reported output.",
    techStack: ["Agentic AI", "Lovable", "Make", "Gamma"],
    features: [
      "Goal-driven autonomous workflow",
      "Automated ideation and research",
      "Content structuring and execution",
      "Self-reporting on outcomes",
      "Built end-to-end as a solo developer",
    ],
    image: "",
    featured: true,
    category: "ai",
    color: "#F59E0B",
  },
  {
    id: "ai-workflow-project",
    title: "AI-Workflow-Project",
    slug: "ai-workflow-project",
    tagline: "Production AI Workflow App",
    description:
      "A production-grade AI-powered workflow application with real-time Firestore data, Firebase App Hosting, and a Cloud Functions backend, with a fully typed TypeScript + Tailwind frontend.",
    problem:
      "Teams need an AI workflow tool that's reliable, real-time, and production-ready rather than a throwaway prototype.",
    solution:
      "A typed, real-time workflow app on Firebase — Firestore for live data, Cloud Functions for backend logic, and Firebase App Hosting for deployment.",
    techStack: ["TypeScript", "Next.js", "Firebase", "TailwindCSS"],
    features: [
      "Real-time data with Firestore",
      "Cloud Functions backend",
      "Firebase App Hosting deployment",
      "Fully typed TypeScript frontend",
      "Responsive Tailwind UI",
    ],
    image: "",
    githubUrl: "https://github.com/SANAPATHISAIKUMAR/AI-workflow-project",
    featured: true,
    category: "fullstack",
    color: "#06B6D4",
  },
  {
    id: "ai-content-app",
    title: "AI-Content-App",
    slug: "ai-content-app",
    tagline: "AI Content Generation App (In Progress)",
    description:
      "An AI content-generation application currently in early development — exploring practical generative-AI content workflows.",
    techStack: ["TypeScript", "Next.js", "Generative AI"],
    features: [
      "AI-assisted content generation",
      "Early-stage, actively in development",
    ],
    image: "",
    githubUrl: "https://github.com/SANAPATHISAIKUMAR/AI-Content-app",
    featured: false,
    category: "ai",
    color: "#10B981",
  },
];

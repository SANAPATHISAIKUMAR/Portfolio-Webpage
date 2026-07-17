import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "homedi",
    title: "HoMedi Healthcare Platform",
    slug: "homedi-healthcare-platform",
    tagline: "Full-Stack Healthcare & Home-Care Platform",
    description:
      "A production MERN-stack healthcare platform connecting patients with home-care and medical services — appointment booking, service management, and a role-based dashboard for patients, providers, and admins. Built at Lystra Pharma.",
    problem:
      "Booking reliable at-home medical care is fragmented and offline — patients call around, providers juggle schedules manually, and admins have no single view of operations.",
    solution:
      "A single platform with online booking, provider/service catalogs, and role-based dashboards, backed by secure REST APIs and JWT auth so patients, providers, and admins each get a tailored, real-time view.",
    contribution:
      "Built responsive React interfaces, designed and implemented REST APIs and backend services on Node/Express + MongoDB, and wired up authentication, authorization, and the booking workflow end to end.",
    impact:
      "Digitized the end-to-end booking and service-management flow into one production application.",
    challenges:
      "Modeling role-based access (patient/provider/admin) cleanly while keeping the booking data consistent across all three views.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "JWT", "Tailwind CSS"],
    features: [
      "Online appointment & home-care booking",
      "Role-based dashboards (patient / provider / admin)",
      "Secure JWT authentication & authorization",
      "Provider and service catalog management",
      "Responsive, mobile-first React UI",
    ],
    image: "",
    featured: true,
    category: "fullstack",
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
    contribution:
      "Led the team and built the OpenEnv-compliant environment APIs and the deterministic evaluation harness across the three task domains.",
    impact:
      "Finalist — Top 800 of 31,000+ teams; selected to present at the Meta PyTorch finals in Bangalore.",
    challenges:
      "Guaranteeing deterministic, repeatable agent evaluation inside containerized environments spanning very different task domains.",
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
    contribution:
      "Led the INVOTEX team and built the React front end plus the assessment and adaptive-learning-path flows.",
    impact:
      "Selected project for Smart India Hackathon 2025 (SIH25199) as Team Lead.",
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
    featured: false,
    category: "ai",
    color: "#06B6D4",
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
    contribution:
      "Designed and built the entire agentic workflow end to end as a solo developer.",
    impact:
      "Recognized by judges at Bengaluru AI Hack Day for its agentic architecture.",
    techStack: ["Agentic AI", "Lovable", "Make", "Gamma"],
    features: [
      "Goal-driven autonomous workflow",
      "Automated ideation and research",
      "Content structuring and execution",
      "Self-reporting on outcomes",
      "Built end-to-end as a solo developer",
    ],
    image: "",
    featured: false,
    category: "ai",
    color: "#F59E0B",
  },
  {
    id: "ai-workflow-project",
    title: "AI Workflow",
    slug: "ai-workflow-project",
    tagline: "Production AI Workflow App",
    description:
      "A production-grade AI-powered workflow application with real-time Firestore data, Firebase App Hosting, and a Cloud Functions backend, with a fully typed TypeScript + Tailwind frontend.",
    problem:
      "Teams need an AI workflow tool that's reliable, real-time, and production-ready rather than a throwaway prototype.",
    solution:
      "A typed, real-time workflow app on Firebase — Firestore for live data, Cloud Functions for backend logic, and Firebase App Hosting for deployment.",
    contribution:
      "Built the typed TypeScript + Tailwind front end and integrated Firestore, Cloud Functions, and Firebase App Hosting.",
    impact:
      "Shipped a real-time, fully typed workflow app deployed on Firebase App Hosting.",
    techStack: ["TypeScript", "Next.js", "Firebase", "Tailwind CSS"],
    features: [
      "Real-time data with Firestore",
      "Cloud Functions backend",
      "Firebase App Hosting deployment",
      "Fully typed TypeScript frontend",
      "Responsive Tailwind UI",
    ],
    image: "",
    githubUrl: "https://github.com/SANAPATHISAIKUMAR/AI-workflow-project",
    featured: false,
    category: "fullstack",
    color: "#10B981",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    slug: "portfolio-website",
    tagline: "This Site — Next.js 15 + Framer Motion",
    description:
      "The site you're on. A performance-focused personal portfolio built on the Next.js App Router with a bespoke design system — semantic theme tokens, dark/light mode, reduced-motion support, and buttery Framer Motion animations.",
    problem:
      "A developer portfolio needs to load instantly, feel premium, and stay fully accessible — while remaining easy to extend.",
    solution:
      "A componentized Next.js 15 app with a token-driven Tailwind design system, server components for the page shell, and client components only where interactivity is needed.",
    contribution:
      "Designed and built the entire site — design system, components, animations, SEO, and accessibility — solo.",
    impact:
      "Accessible, theme-aware, and fast — built for a 95+ Lighthouse target.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      "Next.js 15 App Router with server components",
      "Token-driven design system (dark & light)",
      "Framer Motion micro-interactions",
      "Reduced-motion & keyboard accessibility",
      "SEO: metadata, JSON-LD, sitemap",
    ],
    image: "",
    githubUrl: "https://github.com/SANAPATHISAIKUMAR",
    featured: false,
    category: "frontend",
    color: "#EC4899",
  },
];

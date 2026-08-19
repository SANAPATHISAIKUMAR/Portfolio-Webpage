import type { Project } from "../types";

/**
 * Ordered strongest-first — the first entry gets the wide flagship card.
 *
 * `repo` holds the bare GitHub repository name, never a full URL. The "Code"
 * link and the live stars/forks/last-push badges are both derived from it, so
 * they can't drift apart. Projects with no public repo (client work, no-code
 * builds) simply omit it and render without a code link.
 */
export const projects: Project[] = [
  {
    id: "homedi",
    context: "Lystra Pharma | Professional Work",
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
    // Private — company codebase, so no public repo link.
    featured: true,
    category: "fullstack",
    color: "#3B82F6",
  },
  {
    id: "vayu-drishti",
    resumeStack: ["Next.js", "Express.js", "MongoDB", "FastAPI", "PyTorch"],
    onResume: true,
    resumeBullets: [
      "Architected a three-tier system — Next.js dashboard, Express.js/MongoDB API gateway and FastAPI ML service — with all model requests proxied through the gateway and every scenario persisted, keeping the ML service isolated from clients",
      "Served ConvLSTM deep-learning forecasts (1-, 7- and 30-day horizons over a 31x31 grid) on an interactive MapLibre GL map with temporal scrubbing, live telemetry over Socket.IO with REST polling fallback, and a drought/flood what-if simulator",
    ],
    context: "Personal Project",
    title: "VAYU-DRISHTI",
    slug: "vayu-drishti-climate-digital-twin",
    tagline: "Climate Digital Twin OS for India",
    description:
      "A deep-tech digital twin of India's climate system. A 31×31 grid spanning the country streams live weather over WebSockets, a ConvLSTM model forecasts temperature and rainfall out to T+30, and a what-if simulator lets policy coordinators model drought and flood scenarios — then export a government-style PDF advisory.",
    problem:
      "Climate risk data for India is scattered across IMD ground records, INSAT satellite feeds, and forecast models, with no single interface where a planner can see current conditions, project them forward, and act on them.",
    solution:
      "A three-tier system: a Next.js geospatial dashboard, an Express/MongoDB gateway that streams live Open-Meteo telemetry over Socket.IO, and a Python FastAPI microservice running the ConvLSTM forecaster, scenario simulator, and AI advisory chain.",
    contribution:
      "Designed and built all three tiers — the MapLibre GL dashboard with temporal scrubbing and comparison charts, the Express gateway with the live telemetry pipeline and scenario persistence, and the FastAPI ML service wrapping the ConvLSTM predictor and advisory engine.",
    impact:
      "Turns raw IMD and satellite data into a single operational picture — live grid, T+1 to T+30 forecasts, what-if scenarios, and exportable advisories.",
    challenges:
      "Keeping the dashboard usable when any tier can fail. The gateway degrades gracefully — persistence endpoints return 503 without MongoDB, ML routes return 502 without the Python service, and the client falls back to a local mock engine — so a partial outage never blanks the map.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "ConvLSTM",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "MapLibre GL",
      "Recharts",
    ],
    features: [
      "Live telemetry streamed over Socket.IO with a polling fallback",
      "31×31 interactive grid across India on MapLibre GL",
      "ConvLSTM forecasts at T+1, T+7 and T+30",
      "INSAT satellite layers (LST, SST, microwave rain composite)",
      "What-if drought/flood simulator with comparison charts",
      "Government-style PDF advisory export",
      "Graceful degradation when MongoDB or the ML service is down",
    ],
    repo: "VAYU-DRISHTI",
    featured: true,
    category: "ai",
    color: "#06B6D4",
  },
  {
    id: "smart-mentor",
    onResume: true,
    resumeBullets: [
      "Led Team INVOTEX and built the real-time layer end-to-end: FastAPI WebSocket services streaming live learning signals to Next.js clients on each channel",
      "Implemented Bayesian Knowledge Tracing — a probabilistic model that estimates in real time which concepts a student has mastered — and semantic doubt retrieval over a FAISS vector index using sentence-transformers embeddings",
    ],
    context: "SIH 2025, Team Lead",
    resumeStack: ["Next.js", "FastAPI", "WebSockets", "FAISS"],
    title: "Smart Mentor",
    slug: "smart-mentor",
    tagline: "Real-Time Adaptive Learning Platform",
    description:
      "An AI learning platform that adapts to each student instead of serving one fixed curriculum — built for students in Tier 2/3 Indian cities. A Socratic tutor streams responses live, Bayesian Knowledge Tracing updates concept mastery on every attempt, and a mock-interview engine scores submissions in real time. Led as Team Lead of INVOTEX at Smart India Hackathon 2025 (SIH25199).",
    problem:
      "Students in Tier 2/3 cities face a widening education-to-employability gap. Generic curricula don't adapt to individual skill levels, and feedback arrives too late to change how someone studies.",
    solution:
      "A FastAPI backend exposing WebSocket channels for tutoring, learning progress, interviews, analytics, and notifications — so mastery estimates, code review, and interview scores update live rather than on page refresh. Semantic retrieval over a FAISS vector index grounds the tutor's answers.",
    contribution:
      "Led the INVOTEX team and built the real-time architecture end to end — the FastAPI WebSocket services, the Bayesian Knowledge Tracing mastery model, the FAISS + sentence-transformers retrieval layer, and the Next.js client components that consume each live channel.",
    impact:
      "Selected project for Smart India Hackathon 2025 (SIH25199), built and led as Team Lead of INVOTEX.",
    challenges:
      "Keeping five independent WebSocket channels responsive per user while streaming LLM output chunk-by-chunk and recomputing Bayesian mastery estimates on every problem attempt.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "WebSockets",
      "MongoDB",
      "Redis",
      "PostgreSQL",
      "FAISS",
      "scikit-learn",
      "Docker",
    ],
    features: [
      "Socratic AI tutor with chunk-by-chunk streaming responses",
      "Bayesian Knowledge Tracing for live concept mastery",
      "Real-time mock interviews scored on four criteria",
      "Semantic retrieval over a FAISS vector index",
      "Live analytics with dropout-risk prediction",
      "JWT auth, Redis caching, containerized with Docker",
    ],
    repo: "SMART-MENTOR",
    featured: true,
    category: "ai",
    color: "#7C3AED",
  },
  {
    id: "openenv-invotex",
    onResume: true,
    resumeBullets: [
      "Built OpenEnv-compliant reinforcement-learning environment APIs across three enterprise domains (Email Triage, Customer Support, Traffic Control) with a deterministic, Docker-containerized evaluation harness so agent runs stay repeatable and comparable",
      "Trained agents against injected failure — live schema drift, 403s and permission errors — cutting training loss 3.8 to 0.14 in 60 steps, with LLaMA-3 8B scoring 0.65+ where Qwen-72B scored 0.00",
    ],
    context: "Meta PyTorch Hackathon",
    resumeStack: ["Python", "Docker"],
    title: "OpenEnv Invotex",
    slug: "openenv-invotex",
    tagline: "RL Environment for LLM-Agent Benchmarking",
    description:
      "A multi-domain reinforcement-learning environment that trains LLM agents against failure instead of ideal conditions — injecting live schema drift, 403s and permission errors across Email Triage, Customer Support and Traffic Control. Grand Finalist and Team Lead at the Meta × PyTorch OpenEnv Hackathon (top 3% of 31,000+ teams).",
    problem:
      "Most AI agents fail in production for reasons a benchmark never shows them: an API changes shape mid-execution, a permission breaks, a call returns 403. Agents trained only on ideal conditions have never met any of it.",
    solution:
      "Instead of avoiding failure, simulate it during training. An OpenEnv-compliant environment injects live schema drift and error conditions across three enterprise domains, with nine tasks over three difficulty levels and a deterministic, containerized harness so runs stay comparable.",
    contribution:
      "Led a team of three and built the OpenEnv-compliant environment APIs and the deterministic evaluation harness across the three task domains.",
    impact:
      "Grand Finalist — top 3% of 31,000+ teams. Training loss fell 3.8 → 0.14 in 60 steps, and LLaMA-3 8B scored 0.65+ where Qwen-72B scored 0.00: robust training beat model size.",
    challenges:
      "Guaranteeing deterministic, repeatable evaluation while deliberately injecting non-deterministic failure — the drift and error conditions had to be reproducible per seed, or no two agent runs would be comparable.",
    techStack: ["Python", "PyTorch", "Reinforcement Learning", "Docker", "LLaMA-3", "Jupyter"],
    features: [
      "Three enterprise domains: Email Triage, Customer Support, Traffic Control",
      "Real-time schema-drift injection — APIs change shape mid-execution",
      "Failure simulation: 403s, permission breaks, unexpected responses",
      "9 tasks across 3 difficulty levels",
      "OpenEnv-compliant APIs with deterministic, repeatable evaluation",
      "Benchmarked LLaMA-3 8B against Qwen-72B",
    ],
    repo: "Meta-open_env_project",
    featured: true,
    category: "ai",
    color: "#F59E0B",
  },
  {
    id: "ai-workflow-project",
    context: "Personal Project",
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
    techStack: ["TypeScript", "Next.js", "Firebase", "Cloud Functions", "Tailwind CSS"],
    features: [
      "Real-time data with Firestore",
      "Cloud Functions backend",
      "Firebase App Hosting deployment",
      "Fully typed TypeScript frontend",
      "Responsive Tailwind UI",
    ],
    repo: "AI-workflow-project",
    featured: false,
    category: "fullstack",
    color: "#10B981",
  },
  {
    id: "portfolio-website",
    context: "Personal Project",
    title: "Portfolio Website",
    slug: "portfolio-website",
    tagline: "This Site — Next.js 15 + Live GitHub Data",
    description:
      "The site you're on. A performance-focused personal portfolio on the Next.js App Router with a bespoke design system — semantic theme tokens, dark/light mode, reduced-motion support, and live GitHub repository data fetched server-side and revalidated hourly.",
    problem:
      "A developer portfolio needs to load instantly, feel premium, and stay accessible — while showing project data that stays current without manual edits.",
    solution:
      "A componentized Next.js 15 app with a token-driven Tailwind design system, server components for the page shell, client components only where interactivity is needed, and a cached server-side GitHub layer that keeps repo stats live without burning the API rate limit.",
    contribution:
      "Designed and built the entire site solo — design system, components, animations, the live GitHub integration, SEO, and accessibility.",
    impact:
      "Accessible, theme-aware, and fast — server-rendered, with live repository stats on every project card.",
    challenges:
      "Keeping live GitHub data on the page without hitting the unauthenticated 60-requests-per-hour limit — solved by fetching server-side once an hour and sharing that snapshot with every visitor.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Query"],
    features: [
      "Next.js 15 App Router with server components",
      "Live GitHub stats, cached server-side and revalidated hourly",
      "Token-driven design system (dark & light)",
      "Framer Motion micro-interactions",
      "Reduced-motion support & keyboard accessibility",
      "SEO: dynamic metadata, JSON-LD, generated OG images, sitemap",
    ],
    repo: "Portfolio-Webpage",
    featured: false,
    category: "frontend",
    color: "#EC4899",
  },
  {
    id: "contentops-ai",
    context: "Bengaluru AI Hack Day | Solo Builder",
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
    challenges:
      "Chaining autonomous agents so each stage's output was structured enough for the next stage to act on without human correction.",
    techStack: ["Agentic AI", "Lovable", "Make", "Gamma"],
    features: [
      "Goal-driven autonomous workflow",
      "Automated ideation and research",
      "Content structuring and execution",
      "Self-reporting on outcomes",
      "Built end-to-end as a solo developer",
    ],
    // Built on no-code agent tooling — no source repository.
    featured: false,
    category: "ai",
    color: "#EF4444",
  },
];

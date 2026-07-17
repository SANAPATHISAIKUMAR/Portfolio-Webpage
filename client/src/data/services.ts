import type { LucideIcon } from "lucide-react";
import {
  Layers,
  MonitorSmartphone,
  Server,
  Network,
  Cloud,
  Sparkles,
  HeartPulse,
} from "lucide-react";
import type { Service } from "../types";

export interface ServiceWithIcon extends Service {
  icon: LucideIcon;
}

/** What I can build for teams and clients — framed around real, shippable work. */
export const services: ServiceWithIcon[] = [
  {
    id: "full-stack",
    title: "Full-Stack Development",
    icon: Layers,
    description:
      "End-to-end MERN applications — from data model and API to a polished, responsive UI.",
    features: ["MERN stack", "Auth & RBAC", "CI-ready delivery"],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: MonitorSmartphone,
    description:
      "Fast, accessible React/Next.js interfaces with clean design systems and smooth interactions.",
    features: ["React / Next.js", "TypeScript", "Responsive + a11y"],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: Server,
    description:
      "Reliable Node.js/Express services with secure auth, validation, and sensible data models.",
    features: ["Node / Express", "MongoDB", "JWT auth"],
  },
  {
    id: "rest-api",
    title: "REST API Development",
    icon: Network,
    description:
      "Well-structured, documented REST APIs that are easy to consume, test, and extend.",
    features: ["RESTful design", "Swagger docs", "Versioning"],
  },
  {
    id: "cloud",
    title: "Cloud Deployment",
    icon: Cloud,
    description:
      "Deploying and running applications on AWS with sane configuration and monitoring.",
    features: ["AWS EC2 / S3", "Docker", "Env config"],
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    icon: Sparkles,
    description:
      "Adding LLM-powered and agentic features — chat, generation, and workflow automation.",
    features: ["OpenAI API", "Prompt engineering", "Agentic flows"],
  },
  {
    id: "healthcare",
    title: "Healthcare Solutions",
    icon: HeartPulse,
    description:
      "Domain-aware healthcare web apps built with care for data handling and usability.",
    features: ["Domain workflows", "Secure data", "Compliance-minded"],
  },
];

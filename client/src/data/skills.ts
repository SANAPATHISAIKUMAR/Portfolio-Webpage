import type { LucideIcon } from "lucide-react";
import { Binary, Server, Code2, Database, Wrench, BrainCircuit } from "lucide-react";
import type { SkillGroup } from "../types";

/** SkillGroup plus its lucide icon component (kept out of the shared type so
 *  types/index.ts stays framework-agnostic). */
export interface SkillGroupWithIcon extends SkillGroup {
  icon: LucideIcon;
}

/**
 * Grouped and ordered exactly as the optimized placements résumé groups them —
 * Backend before Frontend, because that résumé positions the candidate as
 * backend-leaning and the reading order should say so.
 *
 * The list is deliberately short. Earlier versions padded it out (Reactstrap,
 * SCSS, Passport, Swagger, AWS VPC/RDS), which reads as inventory rather than
 * skill. No proficiency bars by design: recruiters scan for breadth and
 * relevance, not self-scored percentages.
 */
export const skillGroups: SkillGroupWithIcon[] = [
  {
    id: "languages",
    label: "Languages",
    icon: Binary,
    description: "Core languages for problem-solving and systems.",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    description: "Secure REST APIs, authentication and access control.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Role-Based Access Control",
      "FastAPI",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    description: "Fast, accessible, responsive interfaces.",
    skills: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    id: "databases",
    label: "Databases & Real-time",
    icon: Database,
    description: "Persistence and live, bidirectional data.",
    skills: ["MongoDB", "Firebase", "Socket.IO", "WebSockets"],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    description: "Shipping, containerising and collaborating.",
    skills: ["Git", "GitHub", "Docker", "Postman", "Figma"],
  },
  {
    id: "ai",
    label: "AI/ML (project-based)",
    icon: BrainCircuit,
    description: "Model-backed features built in real projects.",
    skills: ["PyTorch", "FAISS", "sentence-transformers", "NLP"],
  },
];

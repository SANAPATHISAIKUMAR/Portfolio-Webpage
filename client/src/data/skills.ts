import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Wrench,
  Binary,
  BrainCircuit,
  Palette,
} from "lucide-react";
import type { SkillGroup } from "../types";

/** SkillGroup plus its lucide icon component (kept out of the shared type so
 *  types/index.ts stays framework-agnostic). */
export interface SkillGroupWithIcon extends SkillGroup {
  icon: LucideIcon;
}

/**
 * Skills grouped by discipline — no proficiency bars by design. The lists
 * reflect real, hands-on tooling; recruiters scan for breadth + relevance, not
 * self-scored percentages.
 */
export const skillGroups: SkillGroupWithIcon[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    description: "Crafting fast, accessible, pixel-perfect interfaces.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "SCSS",
      "Bootstrap",
      "Redux Toolkit",
      "React Router",
      "React Query",
      "Axios",
      "Shadcn UI",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    description: "Designing secure, scalable REST APIs and services.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "MVC",
      "Authentication",
      "Authorization",
      "Passport",
      "Socket.io",
      "Swagger",
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    description: "Modeling and querying data across SQL and NoSQL.",
    skills: ["MongoDB", "SQL", "Firebase", "Firestore"],
  },
  {
    id: "cloud",
    label: "Cloud",
    icon: Cloud,
    description: "Deploying and running workloads on AWS.",
    skills: ["AWS EC2", "AWS IAM", "AWS S3", "AWS VPC", "AWS RDS"],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: Wrench,
    description: "Shipping with containers, CI/CD, and automation.",
    skills: ["Docker", "Git", "GitHub", "Linux", "GitHub Actions", "Postman"],
  },
  {
    id: "languages",
    label: "Programming Languages",
    icon: Binary,
    description: "Core languages for problem-solving and systems.",
    skills: ["Python", "Java", "C", "C++"],
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    icon: BrainCircuit,
    description: "Building LLM-powered, agentic product features.",
    skills: [
      "Machine Learning",
      "Generative AI",
      "Prompt Engineering",
      "OpenAI API",
      "Llama",
      "Reinforcement Learning",
      "Agentic AI",
    ],
  },
  {
    id: "design",
    label: "UI/UX",
    icon: Palette,
    description: "Turning research and wireframes into usable design.",
    skills: ["Figma", "Wireframing", "Prototyping", "User Experience"],
  },
];

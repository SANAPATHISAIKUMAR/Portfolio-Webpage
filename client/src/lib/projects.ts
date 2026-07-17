import { projects } from "../data/projects";
import type { Project } from "../types";

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categoryLabels: Record<Project["category"], string> = {
  ai: "AI / ML",
  fullstack: "Full Stack",
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
};

import type { Achievement } from "../types";
import { projects } from "./projects";
import { hackathons } from "./hackathons";

export const achievements: Achievement[] = [
  {
    id: "best-rank",
    title: "Best Hackathon Rank",
    value: "Top 800",
    description: "Top 800 of 31,000+ teams at the Meta PyTorch OpenEnv Hackathon",
    category: "competitive",
    icon: "🏆",
  },
  {
    id: "teams-competed",
    title: "Teams Competed Against",
    value: "31,000+",
    description: "Competed against 31,000+ teams globally at Meta PyTorch OpenEnv",
    category: "competitive",
    icon: "🎯",
  },
  {
    id: "hackathons-count",
    title: "Hackathons",
    value: `${hackathons.length}`,
    description: `Competed in ${hackathons.length} national and global hackathons in 2025`,
    category: "competitive",
    icon: "⚡",
  },
  {
    id: "team-lead",
    title: "Team Lead",
    value: "3x",
    description: "Led teams at SIH 2025, Meta PyTorch, and Cardano Asia IBW",
    category: "leadership",
    icon: "👥",
  },
  {
    id: "projects-built",
    title: "Projects Shipped",
    value: `${projects.length}`,
    description: "Production platforms, deep-tech builds, and AI-integrated web applications",
    category: "academic",
    icon: "🚀",
  },
  {
    id: "internships",
    title: "Internships",
    value: "2",
    description: "Frontend Engineer at Cognifyz and UX/UI Designer at Zidio",
    category: "academic",
    icon: "🎓",
  },
  {
    id: "freelance",
    title: "Freelance Projects",
    value: "3",
    description: "Delivered 3 freelance projects, improving client satisfaction by ~20%",
    category: "freelance",
    icon: "💼",
  },
  {
    id: "certifications",
    title: "Certifications",
    value: "4",
    description: "Generative AI, JavaScript, and HTML/CSS — HCL GUVI & Microsoft",
    category: "academic",
    icon: "📜",
  },
  {
    id: "tech-breadth",
    title: "Technologies",
    value: `${new Set(projects.flatMap((p) => p.techStack)).size}+`,
    description: "Distinct technologies used across shipped projects",
    category: "academic",
    icon: "🛠️",
  },
];

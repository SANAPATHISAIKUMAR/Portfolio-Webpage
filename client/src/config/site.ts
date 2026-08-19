import type { SiteConfig, NavItem } from "../types";
import { projects } from "../data/projects";
import { hackathons } from "../data/hackathons";
import { experiences } from "../data/experience";

export const siteConfig: SiteConfig = {
  name: "Sanapathi Sai Kumar",
  title: "Sai Kumar — Full-Stack Developer | Associate Software Engineer",
  description:
    "Final-year B.Tech CSE (AI & ML) student and Associate Software Engineer — backend-leaning full-stack developer building production healthcare applications with Node.js, Express.js, MongoDB and React. Meta PyTorch OpenEnv Hackathon finalist, top 3% of 31,000+ teams.",
  role: "Associate Software Engineer",
  company: "Lystra Pharma Private Limited",
  availability: "Open to Software Engineer roles",
  // Verbatim from the optimized placements résumé.
  summary:
    "Final-year B.Tech CSE (AI & ML) student and Associate Software Engineer with production experience building healthcare applications. Backend-leaning full-stack developer experienced in REST APIs, JWT authentication, role-based access control and real-time systems using Node.js, Express.js, MongoDB and React. Meta PyTorch OpenEnv Hackathon finalist — top 3% of 31,000+ teams.",
  /** Sub-headline under the name on the résumé. */
  headline: "B.Tech CSE (AI & ML) | Full-Stack Developer | Software Engineering",
  links: [
    {
      platform: "GitHub",
      url: "https://github.com/SANAPATHISAIKUMAR",
      icon: "github",
      label: "GitHub Profile",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/sanapathi-sai-kumar-4a23a22a5",
      icon: "linkedin",
      label: "LinkedIn Profile",
    },
    {
      platform: "Email",
      url: "mailto:saikranthi1401@gmail.com",
      icon: "mail",
      label: "Send Email",
    },
  ],
  email: "saikranthi1401@gmail.com",
  location: "Visakhapatnam, India",
  phone: "+91 73860 27037",
  resume: "/resume",
  resumePdf: "/resume/Sanapathi_Sai_Kumar_Resume.pdf",
};

export const navigationItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Contact", href: "#contact" },
];

export const heroRoles = [
  "Associate Software Engineer",
  "Full-Stack Developer",
  "MERN Stack Developer",
  "React & Node.js Developer",
  "B.Tech CSE (AI & ML)",
];

/**
 * Derived from the data files rather than hand-typed — the old hardcoded
 * "5+ Projects" had already drifted behind the real list, and a portfolio
 * that miscounts its own work is the worst possible first impression.
 */
const distinctTechnologies = new Set(projects.flatMap((p) => p.techStack)).size;

export const heroStats = [
  { value: `${projects.length}`, label: "Projects" },
  { value: `${hackathons.length}`, label: "Hackathons" },
  {
    value: `${experiences.filter((e) => e.type === "internship").length}`,
    label: "Internships",
  },
  { value: `${Math.floor(distinctTechnologies / 5) * 5}+`, label: "Technologies" },
];

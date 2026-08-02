import type { SiteConfig, NavItem } from "../types";
import { projects } from "../data/projects";
import { hackathons } from "../data/hackathons";
import { experiences } from "../data/experience";

export const siteConfig: SiteConfig = {
  name: "Sanapathi Sai Kumar",
  title: "Sai Kumar — Associate Software Engineer | MERN & Full-Stack Developer",
  description:
    "Associate Software Engineer specializing in MERN-stack development — building scalable full-stack healthcare applications, responsive UIs, REST APIs, and AI-powered solutions, with growing expertise in AWS, cloud computing, and system design.",
  role: "Associate Software Engineer",
  company: "Lystra Pharma Private Limited",
  availability: "Open to Software Engineer roles",
  summary:
    "I'm an Associate Software Engineer specializing in MERN-stack development with experience building scalable full-stack healthcare applications. I develop responsive user interfaces, REST APIs, backend services, and AI-powered solutions while continuously expanding my expertise in AWS, Cloud Computing, Machine Learning, and System Design.",
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
  resume: "/resume",
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
  "MERN Stack Developer",
  "Full-Stack Developer",
  "React & Node.js Developer",
  "AI Integration Engineer",
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

import type { SiteConfig, NavItem } from "../types";

export const siteConfig: SiteConfig = {
  name: "Sanapathi Sai Kumar",
  title: "Sai Kumar — Full Stack Developer & UI/UX Designer",
  description:
    "Full Stack Developer and UI/UX Designer building AI-integrated web applications with the MERN stack, Next.js, TypeScript, and Firebase. B.Tech CSE (AI & ML) student, hackathon team lead, and Meta PyTorch OpenEnv finalist.",
  url: "https://saikumar.dev",
  ogImage: "/images/og-image.png",
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
  resume: "/resume/SaiKumar_Resume.pdf",
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
  "Full Stack Developer",
  "UI/UX Designer",
  "AI & ML Engineer",
  "MERN Stack Developer",
  "Hackathon Team Lead",
];

export const heroStats = [
  { value: "5+", label: "Projects" },
  { value: "5", label: "Hackathons" },
  { value: "2", label: "Internships" },
  { value: "20+", label: "Technologies" },
];

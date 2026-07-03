import type { SiteConfig, NavItem } from "../types";

export const siteConfig: SiteConfig = {
  name: "Sanapathi Sai Kumar",
  title: "Sai Kumar — Associate Software Engineer | MERN & Full-Stack Developer",
  description:
    "Associate Software Engineer specializing in MERN-stack development — building scalable full-stack healthcare applications, responsive UIs, REST APIs, and AI-powered solutions, with growing expertise in AWS, cloud computing, and system design.",
  url: "https://saikumar.dev",
  ogImage: "/images/og-image.png",
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
  "Associate Software Engineer",
  "MERN Stack Developer",
  "Full-Stack Developer",
  "React & Node.js Developer",
  "AI Integration Engineer",
];

export const heroStats = [
  { value: "5+", label: "Projects" },
  { value: "5", label: "Hackathons" },
  { value: "2", label: "Internships" },
  { value: "20+", label: "Technologies" },
];

// ===================================
// TYPE DEFINITIONS
// ===================================

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  problem?: string;
  solution?: string;
  techStack: string[];
  features: string[];
  image: string;
  screenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: "fullstack" | "ai" | "frontend" | "backend" | "mobile";
  color: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: "fulltime" | "internship" | "freelance" | "contract";
}

export interface Skill {
  name: string;
  icon: string;
  proficiency: number; // 0-100
  category: SkillCategory;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "cloud"
  | "ai"
  | "design";

export interface Hackathon {
  id: string;
  name: string;
  organizer: string;
  date: string;
  achievement: string;
  description: string;
  technologies: string[];
  position?: string;
  teamSize?: number;
  projectName?: string;
}

export interface Achievement {
  id: string;
  title: string;
  value: string;
  description: string;
  category: "competitive" | "opensource" | "leadership" | "freelance" | "academic";
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  category: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: SocialLink[];
  email: string;
  location: string;
  resume: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

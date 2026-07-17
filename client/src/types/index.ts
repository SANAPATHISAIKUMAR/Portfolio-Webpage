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
  /** What I specifically built/owned. */
  contribution?: string;
  /** Outcome / result in a short, scannable line. */
  impact?: string;
  /** Notable engineering challenge overcome. */
  challenges?: string;
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

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "cloud"
  | "devops"
  | "languages"
  | "ai"
  | "design";

/**
 * A category of skills rendered as a card. No self-assigned proficiency
 * numbers — senior engineers read "90% React" as junior signalling, so skills
 * are simply grouped and listed. The `icon` is a lucide component supplied at
 * the data layer.
 */
export interface SkillGroup {
  id: SkillCategory;
  label: string;
  description: string;
  skills: string[];
}

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

export interface Service {
  id: string;
  title: string;
  description: string;
  /** Concrete deliverables shown as bullet chips. */
  features: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  /** Human-readable issue date, e.g. "Mar 2025". */
  date: string;
  /** Public verification/credential URL. */
  credentialUrl?: string;
  /** Path under /public to the certificate image (png/jpg/webp). */
  image?: string;
  /** Skills the certificate attests to. */
  skills?: string[];
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
  /** Current job title, e.g. "Associate Software Engineer". */
  role?: string;
  /** Current employer. */
  company?: string;
  /** Short availability line for the hero badge. */
  availability?: string;
  /** One-line professional summary reused across sections. */
  summary?: string;
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

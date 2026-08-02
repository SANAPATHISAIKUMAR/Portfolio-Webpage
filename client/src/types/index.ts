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
  /** Cover screenshot under /public. Cards fall back to a generated gradient. */
  image?: string;
  screenshots?: string[];
  /**
   * Public GitHub repository name (not the full URL). Single source of truth for
   * both the "Code" link and the live stars/forks/last-push badges — deriving the
   * URL from this is what stops the two drifting apart. Omit for private or
   * no-code work.
   */
  repo?: string;
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
  links: SocialLink[];
  email: string;
  location: string;
  /** Where the "Resume" buttons point. */
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

/**
 * Shape we keep from the GitHub REST repo payload. Note the nullable fields —
 * the API genuinely returns `null` for description/language/homepage on repos
 * that haven't set them, so they must not be typed as plain `string`.
 */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  /** Repo size in KB — 0 means the repo is empty. */
  size: number;
  fork: boolean;
  archived: boolean;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

/** Live per-repository stats merged into a curated project card. */
export interface RepoStats {
  name: string;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  /** ISO timestamp of the last push. */
  pushedAt: string;
  /**
   * Pre-formatted "3 days ago" label. Computed on the server so the client
   * never re-derives it from the clock and desyncs the hydrated markup.
   */
  updatedLabel: string;
}

/** Aggregated payload returned by the server-side GitHub layer. */
export interface GitHubData {
  user: GitHubUser;
  repos: GitHubRepo[];
  totalStars: number;
  languages: { name: string; count: number }[];
  /** ISO timestamp of when this snapshot was fetched from GitHub. */
  fetchedAt: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

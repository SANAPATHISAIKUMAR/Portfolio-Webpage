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
  /**
   * Where the work happened and in what role — "Meta PyTorch Hackathon | Team
   * Lead", "Personal Project". Shown right-aligned beside the title on the
   * résumé, mirroring the ATS layout. Unused by the website itself.
   */
  context?: string;
  /**
   * Tight, technical bullets written for the one-page résumé. Deliberately
   * separate from `features`: the site sells the project's scope, the résumé
   * sells the engineering, and the two want different prose at different
   * lengths. Only projects with `onResume` need these.
   */
  resumeBullets?: string[];
  /**
   * Stack line for the résumé, when it differs from `techStack`. The site lists
   * everything a repo actually contains; the résumé lists the few technologies
   * worth a recruiter's attention. Falls back to `techStack` when unset.
   */
  resumeStack?: string[];
  /**
   * Include on the one-page résumé. The site shows every project; the résumé
   * shows the three the placements résumé leads with, because a page that
   * lists everything ranks nothing.
   */
  onResume?: boolean;
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
  /**
   * Extra context line on the résumé, e.g. the product worked on. Only set
   * where the placements résumé carries one — the internships list role,
   * company and location on a single line and go straight to the bullet.
   */
  resumeContext?: string;
  type: "fulltime" | "internship" | "freelance" | "contract";
}

export type SkillCategory =
  | "languages"
  | "backend"
  | "frontend"
  | "databases"
  | "tools"
  | "ai";

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
  /** Include in the one-page résumé's Achievements list. */
  onResume?: boolean;
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
  /**
   * Human-readable issue date, e.g. "Mar 2025". Optional: the résumé these were
   * taken from doesn't record dates, and an invented date on a credential is
   * worse than no date. Every consumer renders it conditionally.
   */
  date?: string;
  /** Public verification/credential URL. */
  credentialUrl?: string;
  /** Qualifier shown after the issuer, e.g. "3 courses". */
  detail?: string;
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
  /** Where the "Resume" buttons point — the on-site résumé page. */
  resume: string;
  /**
   * The downloadable PDF, generated from that page by `npm run resume:pdf`.
   * Kept separate so the nav can link to the readable page while the download
   * button serves a real file.
   */
  resumePdf: string;
  /** Current job title, e.g. "Associate Software Engineer". */
  role?: string;
  /** Current employer. */
  company?: string;
  /** Short availability line for the hero badge. */
  availability?: string;
  /** One-line professional summary reused across sections. */
  summary?: string;
  /** E.164-ish display number, e.g. "+91 73860 27037". Résumé header only. */
  phone?: string;
  /** Sub-headline under the name on the résumé, e.g. "B.Tech CSE (AI & ML) | …". */
  headline?: string;
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

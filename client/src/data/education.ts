/**
 * Education and professional development, from the placements résumé.
 *
 * These used to be hardcoded inside the résumé page, which is why the degree
 * period sat at "2023 — Present" long after the résumé started saying
 * "2023 - 2027 (Expected)". Data belongs in a data file.
 */

export interface Education {
  degree: string;
  institution: string;
  period: string;
  /** Academic metrics, rendered pipe-separated on one line. */
  metrics: string[];
}

export const education: Education = {
  degree: "B.Tech, Computer Science and Engineering (AI & ML)",
  institution: "Dhanalakshmi Srinivasan University",
  period: "2023 – 2027 (Expected)",
  // Order and grouping follow the optimized résumé: CGPA and "No Backlogs"
  // read as one fact about the degree, then the prior qualifications.
  metrics: ["CGPA: 7.0/10, No Backlogs", "Intermediate: 83%", "Class X: 91%"],
};

export interface ProfessionalDevelopmentItem {
  name: string;
  /** Capacity attended in, e.g. "Attendee". */
  role?: string;
  detail?: string;
  /** Public write-up, if there is one. */
  url?: string;
}

export const professionalDevelopment: ProfessionalDevelopmentItem[] = [
  {
    name: "AI Impact Summit India 2026",
    role: "Attendee",
    detail: "Explored emerging AI technologies and industry applications",
    url: "https://www.linkedin.com/posts/sanapathi-sai-kumar-4a23a22a5_ai-artificialintelligence-aiimpactsummit-activity-7431791792490172416-FhKh",
  },
];

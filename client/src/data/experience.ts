import type { Experience } from "../types";

// Reverse-chronological. Source of truth: the placements résumé
// (Sai_Kumar_Resume_Placements.pdf) — roles, dates, locations and bullets are
// taken from it verbatim in substance.
//
// Note Lystra began Apr 2026, not Jan 2026 as an earlier version of this file
// claimed, and it is a remote role. Both were wrong here and on the résumé.
export const experiences: Experience[] = [
  {
    id: "lystra-pharma",
    role: "Associate Software Engineer",
    company: "Lystra Pharma Private Limited",
    companyUrl: "https://lystrapharma.com",
    location: "Remote",
    startDate: "2026-04",
    description:
      "HoMedi, a home healthcare booking and service management platform — REST APIs, authentication and role-based React dashboards on a live production system.",
    resumeContext: "HoMedi — home healthcare booking and service management platform (live in production)",
    achievements: [
      "Develop and maintain REST APIs and backend services (Node.js, Express.js, MongoDB) for the booking flow, service catalog and provider-management modules of a live production healthcare platform",
      "Implement JWT authentication and role-based authorization separating patient, provider and administrator access across all protected routes",
      "Build responsive, mobile-first React dashboards for all three user roles, integrate them with backend APIs, and iterate on features with the product and design team",
    ],
    technologies: [
      "Node.js", "Express.js", "MongoDB", "React", "REST APIs", "JWT",
    ],
    type: "fulltime",
  },
  {
    id: "zidio-development",
    role: "UX and UI Designer Intern",
    company: "Zidio Development",
    companyUrl: "https://zidio.in",
    location: "Remote",
    startDate: "2025-07",
    endDate: "2025-10",
    description:
      "Wireframes, user flows and high-fidelity interfaces for web products, validated with usability testing.",
    achievements: [
      "Designed wireframes, user flows and high-fidelity interfaces in Figma and Adobe XD, and ran usability testing",
    ],
    technologies: [
      "Figma", "Adobe XD", "Wireframing", "User Flows", "Usability Testing",
    ],
    type: "internship",
  },
  {
    id: "cognifyz-technologies",
    role: "Frontend Developer Intern",
    company: "Cognifyz Technologies",
    companyUrl: "https://cognifyz.com",
    location: "Remote",
    startDate: "2025-03",
    endDate: "2025-04",
    description:
      "Responsive React interfaces and REST API integration, with a focus on frontend page-load performance.",
    achievements: [
      "Built responsive React.js interfaces, integrated REST APIs, and optimized asset loading and rendering to improve frontend page-load performance",
    ],
    technologies: ["React", "JavaScript", "HTML5", "CSS3", "REST APIs", "Git"],
    type: "internship",
  },
];

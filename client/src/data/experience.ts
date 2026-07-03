import type { Experience } from "../types";

// Reverse-chronological: current role first, then internships (Zidio Jul–Oct 2025,
// Cognifyz Mar–Apr 2025). Source of truth: ATS résumé + confirmed sequence
// (internships first, then Lystra).
//
// NOTE: Lystra is not on the résumé (it started Jan 2026, after the internships).
// The bullets below are intentionally modest and factual — replace with your real
// achievements/metrics when ready.
export const experiences: Experience[] = [
  {
    id: "lystra-pharma",
    role: "Associate Software Engineer",
    company: "Lystra Pharma",
    companyUrl: "https://lystrapharma.com",
    location: "Visakhapatnam, India",
    startDate: "2026-01",
    description:
      "MERN-stack development for a healthcare technology platform — building REST APIs, backend services, and responsive React interfaces used across the product.",
    achievements: [
      "Develop and maintain REST APIs and backend services on the MERN stack",
      "Build responsive React interfaces for a healthcare technology platform",
      "Collaborate with the team to ship and iterate on product features",
    ],
    technologies: [
      "React", "Node.js", "Express", "MongoDB", "TypeScript",
      "TailwindCSS", "REST APIs",
    ],
    type: "fulltime",
  },
  {
    id: "zidio-development",
    role: "UX/UI Designer",
    company: "Zidio Development",
    companyUrl: "https://zidio.in",
    location: "Remote",
    startDate: "2025-07",
    endDate: "2025-10",
    description:
      "Designed user-centered interfaces and ran usability research for web products, translating product concepts into clean, functional designs alongside engineering and product teams.",
    achievements: [
      "Created user-centered designs and wireframes using Figma and Adobe XD",
      "Collaborated with product managers and developers to turn concepts into functional interfaces",
      "Conducted user research and usability testing to inform design decisions",
    ],
    technologies: [
      "Figma", "Adobe XD", "Wireframing", "Prototyping",
      "User Research", "Responsive Design",
    ],
    type: "internship",
  },
  {
    id: "cognifyz-technologies",
    role: "Frontend Engineer",
    company: "Cognifyz Technologies",
    companyUrl: "https://cognifyz.com",
    location: "Remote",
    startDate: "2025-03",
    endDate: "2025-04",
    description:
      "Built responsive, interactive user interfaces and integrated REST APIs as a Frontend Engineer, focusing on cross-browser reliability and performance.",
    achievements: [
      "Built responsive, interactive UIs with HTML, CSS, JavaScript, and React.js",
      "Integrated RESTful APIs and debugged UI issues across browsers and devices",
      "Improved frontend performance, cutting page load time by ~45%",
      "Maintained version control with Git/GitHub in a collaborative remote team",
    ],
    technologies: [
      "React", "JavaScript", "HTML", "CSS", "REST APIs", "Git",
    ],
    type: "internship",
  },
];

import type { Experience } from "../types";

export const experiences: Experience[] = [
  {
    id: "lystra-pharma",
    role: "Associate Software Engineer",
    company: "Lystra Pharma",
    companyUrl: "https://lystrapharma.com",
    location: "India",
    startDate: "2024-01",
    description:
      "Leading MERN stack development for a healthcare technology platform. Building scalable backend APIs, implementing complex healthcare workflows, and creating intuitive user interfaces for medical professionals and patients.",
    achievements: [
      "Architected and developed RESTful APIs serving 10,000+ daily requests",
      "Built healthcare workflow automation reducing manual processes by 40%",
      "Implemented secure patient data management with HIPAA-compliant practices",
      "Developed responsive React dashboards for real-time analytics",
      "Collaborated with cross-functional teams to ship features bi-weekly",
      "Optimized database queries resulting in 60% faster page load times",
    ],
    technologies: [
      "React", "Node.js", "Express", "MongoDB", "TypeScript",
      "TailwindCSS", "REST APIs", "JWT", "Redis", "AWS",
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

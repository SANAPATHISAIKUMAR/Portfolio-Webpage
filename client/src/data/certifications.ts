import type { Certification } from "../types";

/**
 * SCAFFOLD — replace with your real certificates.
 *   1. Update title / issuer / date / skills for each.
 *   2. Drop the certificate image in `public/certificates/` and set `image`.
 *   3. Add the public verification link as `credentialUrl` (or remove it).
 * Delete any entries you don't have — the section hides itself when this array
 * is empty, so it never shows fake or half-finished cards.
 */
export const certifications: Certification[] = [
  {
    id: "cert-fullstack",
    title: "Full-Stack Web Development",
    issuer: "Add issuer (e.g. Coursera / Udemy / NPTEL)",
    date: "2025",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    // image: "/certificates/fullstack.png",
    // credentialUrl: "https://…",
  },
  {
    id: "cert-aws",
    title: "AWS Cloud Fundamentals",
    issuer: "Add issuer",
    date: "2025",
    skills: ["AWS", "EC2", "S3", "IAM"],
    // image: "/certificates/aws.png",
    // credentialUrl: "https://…",
  },
  {
    id: "cert-ml",
    title: "Machine Learning",
    issuer: "Add issuer",
    date: "2024",
    skills: ["Python", "ML", "Data"],
    // image: "/certificates/ml.png",
    // credentialUrl: "https://…",
  },
];

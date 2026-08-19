import type { Certification } from "../types";

/**
 * Certifications as listed on the optimized placements résumé.
 *
 * The MEAN Stack entry is fully verifiable: issue date, certificate ID and a
 * public verification URL, all read off the certificate itself. That is worth
 * far more to a recruiter than a longer list of unverifiable line items, which
 * is why the earlier scattergun list (HTML & CSS, standalone JavaScript) is
 * gone — the résumé no longer claims them either.
 */
export const certifications: Certification[] = [
  {
    id: "mean-stack-guvi",
    title: "MEAN Stack Development",
    issuer: "GUVI (HCL)",
    date: "Aug 2026",
    credentialUrl: "https://www.guvi.in/certificate?id=B866118H8F9u9p74Vb",
    image: "/certificates/mean-stack-guvi.jpg",
    skills: ["MongoDB", "Express.js", "Angular", "Node.js"],
  },
  {
    id: "aws-ml-ai-fundamentals",
    title: "Fundamentals of Machine Learning and Artificial Intelligence",
    issuer: "AWS Training & Certification",
    // Year only. The announcement post is dated to the month, but a month
    // inferred from a relative "1 month ago" timestamp is not worth asserting
    // on a credential — add the exact month when you have the certificate.
    date: "2026",
    skills: ["Machine Learning", "Artificial Intelligence", "AWS"],
  },
  {
    id: "generative-ai-microsoft-learn",
    title: "Generative AI & AI Foundations",
    issuer: "Microsoft Learn",
    detail: "3 courses",
    skills: ["Generative AI", "AI Foundations"],
  },
];

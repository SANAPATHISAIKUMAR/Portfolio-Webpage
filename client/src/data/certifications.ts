import type { Certification } from "../types";

/**
 * Real certifications only.
 *
 * This array previously shipped three placeholder cards whose issuer literally
 * read "Add issuer (e.g. Coursera / Udemy / NPTEL)" — visible to anyone who
 * loaded the site. Both the Certifications section and the résumé page hide
 * themselves while this is empty, which is strictly better than displaying
 * credentials that aren't real.
 *
 * To add one:
 *   {
 *     id: "genai-guvi",
 *     title: "Generative AI",
 *     issuer: "HCL GUVI",
 *     date: "Mar 2025",
 *     skills: ["Generative AI", "Prompt Engineering"],
 *     credentialUrl: "https://…",          // public verification link
 *     image: "/certificates/genai.png",     // optional, drop file in public/certificates/
 *   }
 *
 * Known from the achievements data but not yet filled in: Generative AI,
 * JavaScript, and HTML/CSS certificates from HCL GUVI and Microsoft.
 */
export const certifications: Certification[] = [];

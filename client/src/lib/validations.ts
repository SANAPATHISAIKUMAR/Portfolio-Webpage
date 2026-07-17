import { z } from "zod";

/**
 * Contact form schema — single source of truth for validation, shared by the
 * form (via @hookform/resolvers) and any future server handler. Messages are
 * user-facing.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name looks too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(3, "Add a short subject.")
    .max(120, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message is too long."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Copy, Check } from "lucide-react";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { SectionHeading } from "../ui/SectionHeading";
import { GradientBlobs } from "../effects/GradientBlobs";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { siteConfig } from "../../config/site";
import { cn } from "../../lib/utils";
import { contactSchema, type ContactFormValues } from "../../lib/validations";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("submitting");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY as string | undefined;

    // Graceful fallback: with no serverless email key configured, open the
    // visitor's mail client with the message pre-filled instead of failing.
    if (!accessKey) {
      const body = encodeURIComponent(
        `${data.message}\n\n— ${data.name} (${data.email})`
      );
      const subject = encodeURIComponent(data.subject);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — silently ignore.
    }
  };

  const inputClasses = cn(
    "w-full px-4 py-3 rounded-xl",
    "bg-surface-1 backdrop-blur-sm",
    "border border-hairline",
    "text-text-primary text-sm placeholder:text-text-muted",
    "focus:outline-none focus:border-accent-blue/40 focus:ring-1 focus:ring-accent-blue/20",
    "transition-colors duration-300"
  );

  const labelClasses = "mb-1.5 block text-caption font-medium text-text-secondary";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative section-padding overflow-hidden"
    >
      <GradientBlobs className="opacity-30" />

      <div className="section-container">
        {/* Header */}
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Get in Touch"
            title={
              <>
                Let&apos;s Build <span className="gradient-text">Together</span>
              </>
            }
            subtitle="Have a project in mind? I'd love to hear about it."
            headingId="contact-heading"
          />
        </RevealOnScroll>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info — Left */}
          <RevealOnScroll direction="left" className="md:col-span-2">
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg text-text-primary mb-4">
                  Contact Info
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-6">
                  Feel free to reach out for collaborations, opportunities, or just a
                  friendly chat about tech.
                </p>
              </div>

              <div className="space-y-4">
                {/* Email + copy */}
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 group min-w-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors shrink-0">
                      <Mail size={16} className="text-accent-blue" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-text-muted">Email</p>
                      <p className="text-sm text-text-primary truncate">
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    className="shrink-0 rounded-lg border border-hairline bg-surface-1 p-2 text-text-muted hover:text-text-primary hover:border-hairline-strong transition-colors"
                  >
                    {copied ? (
                      <Check size={15} className="text-green-400" />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-accent-purple" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Location</p>
                    <p className="text-sm text-text-primary">{siteConfig.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <p className="text-xs text-text-muted uppercase tracking-wider mb-3">
                  Follow me
                </p>
                <div className="flex gap-2">
                  {siteConfig.links.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target={link.platform !== "Email" ? "_blank" : undefined}
                      rel={link.platform !== "Email" ? "noopener noreferrer" : undefined}
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        "bg-surface-1 border border-hairline",
                        "text-text-muted hover:text-text-primary",
                        "hover:border-accent-blue/20 hover:bg-accent-blue/10",
                        "transition-all duration-300"
                      )}
                      aria-label={link.label}
                    >
                      {link.platform === "GitHub" ? (
                        <GithubIcon size={16} />
                      ) : link.platform === "LinkedIn" ? (
                        <LinkedinIcon size={16} />
                      ) : (
                        <Mail size={16} />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Form — Right */}
          <RevealOnScroll direction="right" className="md:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className={cn(
                "p-6 md:p-8 rounded-2xl",
                "bg-surface-1 backdrop-blur-sm",
                "border border-hairline"
              )}
            >
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className={labelClasses}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={cn(inputClasses, errors.name && "border-red-500/60")}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className={labelClasses}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={cn(inputClasses, errors.email && "border-red-500/60")}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className={labelClasses}>
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="What's this about?"
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    className={cn(inputClasses, errors.subject && "border-red-500/60")}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p
                      id="contact-subject-error"
                      role="alert"
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelClasses}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell me a little about it…"
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={cn(inputClasses, "resize-none", errors.message && "border-red-500/60")}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit / status */}
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="status"
                      className="flex items-center gap-2 text-green-400 py-3"
                    >
                      <CheckCircle size={18} />
                      <span className="text-sm">
                        Message sent! I&apos;ll get back to you soon.
                      </span>
                    </motion.div>
                  ) : status === "error" ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="alert"
                      className="flex items-center gap-2 text-red-400 py-3"
                    >
                      <AlertCircle size={18} />
                      <span className="text-sm">
                        Something went wrong. Please try again.
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div key="submit" layout>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className={cn(
                          "w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl",
                          "font-medium tracking-[-0.01em]",
                          "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]",
                          "hover:bg-[var(--btn-primary-bg-hover)]",
                          "transition-colors duration-200",
                          "cursor-pointer select-none",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          "disabled:opacity-60 disabled:cursor-not-allowed"
                        )}
                      >
                        {status === "submitting" ? (
                          <>
                            <motion.span
                              className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full"
                              animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                            />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={16} />
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

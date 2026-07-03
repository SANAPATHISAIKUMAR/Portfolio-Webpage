import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, MapPin } from "lucide-react";
import { RevealOnScroll } from "../effects/RevealOnScroll";

import { GradientBlobs } from "../effects/GradientBlobs";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { siteConfig } from "../../config/site";
import { cn } from "../../lib/utils";
import type { ContactFormData } from "../../types";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

    // Graceful fallback: if no serverless email key is configured, open the
    // visitor's mail client with the message pre-filled instead of failing.
    if (!accessKey) {
      const body = encodeURIComponent(
        `${formData.message}\n\n— ${formData.name} (${formData.email})`
      );
      const subject = encodeURIComponent(formData.subject);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = cn(
    "w-full px-4 py-3 rounded-xl",
    "bg-background-secondary/60 backdrop-blur-sm",
    "border border-white/[0.06]",
    "text-text-primary text-sm placeholder:text-text-muted",
    "focus:outline-none focus:border-accent-blue/40 focus:ring-1 focus:ring-accent-blue/20",
    "transition-all duration-300"
  );

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <GradientBlobs className="opacity-30" />

      <div className="section-container">
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent-blue mb-3 block">
              Get in Touch
            </span>
            <h2 className="font-display text-section-title font-bold text-text-primary mb-4">
              Let's Build{" "}
              <span className="gradient-text">Together</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-section-subtitle">
              Have a project in mind? I'd love to hear about it.
            </p>
          </div>
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
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                    <Mail size={16} className="text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Email</p>
                    <p className="text-sm text-text-primary">{siteConfig.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center">
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
                        "bg-white/[0.04] border border-white/[0.06]",
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
              onSubmit={handleSubmit}
              className={cn(
                "p-6 md:p-8 rounded-2xl",
                "bg-background-secondary/30 backdrop-blur-sm",
                "border border-white/[0.06]"
              )}
            >
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(inputClasses, errors.name && "border-red-500/50")}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(inputClasses, errors.email && "border-red-500/50")}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={cn(
                      inputClasses,
                      errors.subject && "border-red-500/50"
                    )}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={cn(
                      inputClasses,
                      "resize-none",
                      errors.message && "border-red-500/50"
                    )}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-green-400 py-3"
                    >
                      <CheckCircle size={18} />
                      <span className="text-sm">
                        Message sent! I'll get back to you soon.
                      </span>
                    </motion.div>
                  ) : status === "error" ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
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
                        className="w-full relative inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-xl px-8 py-4 text-lg bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-glow hover:shadow-glow-lg hover:brightness-110 transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {status === "submitting" ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                ease: "linear",
                              }}
                            />
                            Sending...
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


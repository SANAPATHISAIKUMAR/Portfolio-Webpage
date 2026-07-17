"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, ImageOff } from "lucide-react";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Modal } from "../ui/Modal";
import { cn } from "../../lib/utils";
import { EASE_OUT_EXPO } from "../../lib/motion";
import { certifications } from "../../data/certifications";
import type { Certification } from "../../types";

export function Certifications() {
  const [active, setActive] = useState<Certification | null>(null);

  // Hide the whole section if there's nothing to show — never render empty cards.
  if (certifications.length === 0) return null;

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative section-padding overflow-hidden"
    >
      <div className="section-container">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Certifications"
            title={
              <>
                Credentials & <span className="gradient-text">Learning</span>
              </>
            }
            subtitle="Courses and certifications that back up the skills above."
            headingId="certifications-heading"
          />
        </RevealOnScroll>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.button
              key={cert.id}
              type="button"
              onClick={() => setActive(cert)}
              aria-label={`View ${cert.title} certificate`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: Math.min(index * 0.06, 0.3),
                ease: EASE_OUT_EXPO,
              }}
              className={cn(
                "group flex h-full flex-col rounded-2xl p-6 text-left",
                "border border-hairline bg-surface-1 backdrop-blur-sm",
                "transition-colors duration-500 hover:border-hairline-strong",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50"
              )}
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue transition-transform duration-500 group-hover:scale-105"
                  aria-hidden
                >
                  <Award size={20} />
                </span>
                <span className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Calendar size={12} />
                  {cert.date}
                </span>
              </div>

              <span className="mb-1 block font-display text-base font-semibold text-text-primary">
                {cert.title}
              </span>
              <span className="mb-4 block text-sm text-text-secondary">{cert.issuer}</span>

              {cert.skills && cert.skills.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <Badge key={skill} size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Certificate preview modal */}
      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        title={active?.title ?? "Certificate"}
      >
        {active && (
          <div className="space-y-4">
            {active.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.image}
                alt={`${active.title} certificate issued by ${active.issuer}`}
                className="w-full rounded-xl border border-hairline"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-hairline-strong bg-surface-1 py-14 text-center">
                <ImageOff size={26} className="text-text-muted" aria-hidden />
                <p className="text-sm text-text-muted">
                  Certificate image not added yet.
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-text-primary">{active.issuer}</p>
                <p className="text-xs text-text-muted">Issued {active.date}</p>
              </div>
              {active.credentialUrl && (
                <a
                  href={active.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-hairline-strong bg-surface-1 px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface-2 transition-colors"
                >
                  Verify credential
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

            {active.skills && active.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 border-t border-hairline pt-4">
                {active.skills.map((skill) => (
                  <Badge key={skill} size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";

/** Reserves vertical space so lazily-loaded sections don't cause layout shift,
 *  and keeps the anchor id present before hydration. */
function SectionPlaceholder({ id }: { id: string }) {
  return <section id={id} aria-hidden className="min-h-[520px]" />;
}

/**
 * The two heaviest client-only widgets are loaded with `ssr: false`, so their
 * dependencies (React Query for OpenSource, React Hook Form + Zod for Contact)
 * ship in lazy chunks instead of the initial bundle. They render no meaningful
 * SEO content on their own (live GitHub data / a contact form), so skipping SSR
 * costs nothing crawlable. Must live in a client module — `ssr: false` isn't
 * allowed from a Server Component.
 */
export const OpenSource = dynamic(
  () => import("./OpenSource").then((m) => m.OpenSource),
  { ssr: false, loading: () => <SectionPlaceholder id="opensource" /> }
);

export const Contact = dynamic(
  () => import("./Contact").then((m) => m.Contact),
  { ssr: false, loading: () => <SectionPlaceholder id="contact" /> }
);

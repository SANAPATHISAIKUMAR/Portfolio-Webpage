"use client";

import { Printer } from "lucide-react";

/**
 * Secondary action on /resume: print the page.
 *
 * The primary action is a real PDF download (a plain <a download> in the server
 * component, so it needs no JS). This stays as a fallback for anyone who wants
 * to print directly or save with their own page setup — the @media print rules
 * in globals.css strip the site chrome either way.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-hairline bg-surface-1 px-4 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50"
    >
      <Printer size={15} aria-hidden />
      Print
    </button>
  );
}

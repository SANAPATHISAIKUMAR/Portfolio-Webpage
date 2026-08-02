"use client";

import { Printer } from "lucide-react";

/**
 * Triggers the browser's print dialog, where "Save as PDF" produces the
 * downloadable résumé. Keeps /resume a server component — only this button
 * needs the client.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-hairline-strong bg-surface-1 px-4 text-sm font-medium text-text-primary transition-colors hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50"
    >
      <Printer size={15} aria-hidden />
      Download PDF
    </button>
  );
}

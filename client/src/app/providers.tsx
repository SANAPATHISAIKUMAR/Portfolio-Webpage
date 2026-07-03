"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { SmoothScroll } from "../components/layout/SmoothScroll";
import { MouseFollower } from "../components/effects/MouseFollower";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <MouseFollower />
        {children}
      </SmoothScroll>
    </ThemeProvider>
  );
}

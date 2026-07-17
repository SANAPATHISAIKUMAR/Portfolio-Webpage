import type { ComponentType, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface StatCardProps {
  value: ReactNode;
  label: string;
  /** Optional lucide-style icon rendered above the value. */
  icon?: ComponentType<{ size?: number; className?: string }>;
  iconClassName?: string;
  valueClassName?: string;
  className?: string;
}

/**
 * Icon + value + label tile. Theme-aware (surface/hairline tokens) and
 * server-safe. Replaces the three near-identical stat-tile implementations in
 * About, Hackathons, and OpenSource.
 */
export function StatCard({
  value,
  label,
  icon: Icon,
  iconClassName,
  valueClassName,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-hairline bg-surface-1 p-4 text-center",
        "transition-colors duration-300 hover:border-hairline-strong",
        className
      )}
    >
      {Icon && (
        <Icon size={18} className={cn("mx-auto mb-2 text-accent-blue", iconClassName)} />
      )}
      <div
        className={cn(
          "font-display text-2xl font-bold text-text-primary",
          valueClassName
        )}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </div>
    </div>
  );
}

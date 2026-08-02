/**
 * "3 days ago" style label for a timestamp.
 *
 * Call this on the server only and pass the resulting string to client
 * components — deriving it during hydration risks the client crossing a
 * boundary ("23 hours" → "1 day") and mismatching the server HTML.
 */
export function relativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";

  const seconds = Math.round((now.getTime() - then) / 1000);
  if (seconds < 60) return "just now";

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["week", 60 * 60 * 24 * 7],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];

  // "always" not "auto": a stats strip reading "Updated 1 day ago" beside
  // "Updated 3 months ago" scans better than mixing in "yesterday"/"last week".
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "always" });
  for (const [unit, secondsPerUnit] of units) {
    const value = Math.floor(seconds / secondsPerUnit);
    if (value >= 1) return formatter.format(-value, unit);
  }
  return "just now";
}

/** Compact star/fork counts: 1200 → "1.2k". */
export function compactNumber(value: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

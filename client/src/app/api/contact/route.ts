import { NextResponse } from "next/server";
import { contactSchema } from "../../../lib/validations";

/**
 * POST /api/contact — receives the contact form and forwards it to Web3Forms.
 *
 * Moved off the client for three reasons:
 *   - the access key is no longer baked into the JS bundle;
 *   - the payload is re-validated with the same Zod schema server-side, so a
 *     crafted request can't bypass the browser checks;
 *   - a simple per-IP throttle stops the form being used as a spam relay.
 *
 * With no WEB3FORMS_ACCESS_KEY configured the route reports `configured: false`
 * and the client falls back to opening the visitor's mail client.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;

/**
 * In-memory throttle. Adequate for a single-instance portfolio; swap for a
 * shared store (Upstash/Redis) if this ever runs on several instances.
 */
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    submissions.set(ip, recent);
    return true;
  }

  recent.push(now);
  submissions.set(ip, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (submissions.size > 5000) {
    for (const [key, times] of submissions) {
      if (times.every((t) => now - t >= WINDOW_MS)) submissions.delete(key);
    }
  }
  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    // Not an error — the client has a documented mailto fallback for this.
    return NextResponse.json(
      {
        configured: false,
        message: "Email delivery is not configured on this deployment.",
      },
      { status: 501 }
    );
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { message: "Too many messages sent. Please try again later." },
      { status: 429 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see.
  if (
    typeof payload === "object" &&
    payload !== null &&
    "company" in payload &&
    typeof (payload as { company: unknown }).company === "string" &&
    (payload as { company: string }).company.length > 0
  ) {
    // Report success so bots don't learn they were caught.
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Please check the form and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject,
        message,
        from_name: "Portfolio Contact Form",
        replyto: email,
      }),
    });

    const result = (await response.json()) as { success?: boolean; message?: string };

    if (!response.ok || !result.success) {
      console.error("[contact] Web3Forms rejected the submission", result);
      return NextResponse.json(
        { message: "Message could not be delivered. Please email me directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      { message: "Message could not be delivered. Please email me directly." },
      { status: 502 }
    );
  }
}

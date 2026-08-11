import { NextRequest, NextResponse } from "next/server";
import { upsertFeedback, isConfigured, type Vote } from "@/lib/feedbackStore";

/**
 * POST /api/feedback — records one investor's reaction to the deck.
 *
 * Always answers 200 with { ok: true } for any well-formed submission, even
 * when the database is unreachable. The investor's experience must not depend
 * on our infrastructure; failures are logged server-side for us to notice.
 *
 * Runs on the Node runtime because @neondatabase/serverless needs it.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Deliberately permissive: the goal is to reject typos and obvious junk, not
 * to adjudicate RFC 5322. A real investor with an unusual address must never be
 * turned away by our regex.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LENGTH = 254; // RFC 5321

/**
 * Best-effort per-IP throttle. Module scope means it resets on cold start and
 * isn't shared across serverless instances — that's fine. It exists to blunt a
 * crude flood, not to be an authoritative rate limiter. Anything stronger would
 * need Redis, which isn't worth it at pitch-deck traffic.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  // Honeypot: a field hidden from humans via CSS. Anything that fills it is a
  // bot. Answer 200 so the bot has no signal it was caught, but store nothing.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const vote = data.vote;
  if (vote !== "up" && vote !== "down") {
    return NextResponse.json({ ok: false, error: "invalid vote" }, { status: 400 });
  }

  const sessionId =
    typeof data.sessionId === "string" && data.sessionId.length <= 64
      ? data.sessionId
      : null;
  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "missing session" }, { status: 400 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: "rate limited" }, { status: 429 });
  }

  let email: string | null = null;
  if (typeof data.email === "string" && data.email.trim() !== "") {
    const candidate = data.email.trim().toLowerCase();
    if (candidate.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(candidate)) {
      return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });
    }
    email = candidate;
  }

  // Deliberately NOT stored: IP address, or any fingerprint. Referrer and a
  // coarse viewport are kept because they inform how the deck is being shared
  // and read; neither identifies a person.
  const result = await upsertFeedback({
    vote: vote as Vote,
    email,
    sessionId,
    referrer: typeof data.referrer === "string" ? data.referrer.slice(0, 500) : null,
    userAgent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
    viewport: typeof data.viewport === "string" ? data.viewport.slice(0, 32) : null,
  });

  if (!result.stored) {
    // Visible in `vercel logs`. Not surfaced to the client on purpose.
    console.error(
      `[feedback] not persisted (${result.reason}) — vote=${vote} email=${email ? "yes" : "no"}${
        isConfigured() ? "" : " — set DATABASE_URL to enable storage"
      }`
    );
  }

  return NextResponse.json({ ok: true });
}

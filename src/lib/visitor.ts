/**
 * The visitor's identity, shared by every capture surface on the deck.
 *
 * Both the Section 09 verdict and the header Invest button write against the
 * same id, so one person's actions join into a single story rather than looking
 * like two strangers. Phase 2 (per-section dwell time) will reuse this key
 * again, which is why it lives here rather than inside a component.
 *
 * All access is wrapped: localStorage throws in Safari private mode, and a
 * pitch deck must not break because a browser refused to remember something.
 */

const STORAGE_KEY = "jedlik-feedback-v1";

interface StoredState {
  sessionId?: string;
  vote?: "up" | "down";
  emailGiven?: boolean;
  invested?: boolean;
}

function read(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredState) : {};
  } catch {
    return {};
  }
}

function write(next: StoredState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* Non-fatal: the visitor is simply asked again on a future visit. */
  }
}

/** Merge a partial update into the stored record, preserving other fields. */
export function updateState(patch: Partial<StoredState>) {
  write({ ...read(), ...patch });
}

export function getState(): StoredState {
  return read();
}

/**
 * The stable per-visitor id, created on first call and reused thereafter.
 * Falls back to a random string where crypto.randomUUID is unavailable.
 */
export function getSessionId(): string {
  const existing = read().sessionId;
  if (existing) return existing;

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `s-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;

  updateState({ sessionId: id });
  return id;
}

/** Shared client-side check. The server validates independently. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Post a capture event. Never throws and never rejects: callers advance their
 * UI regardless, so an outage is invisible to the investor.
 */
export async function postCapture(payload: {
  intent: "verdict" | "invest";
  vote?: "up" | "down";
  email?: string;
  sessionId: string;
  honeypot?: string;
}): Promise<void> {
  try {
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intent: payload.intent,
        vote: payload.vote,
        email: payload.email,
        sessionId: payload.sessionId,
        website: payload.honeypot ?? "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
        viewport:
          typeof window !== "undefined"
            ? `${window.innerWidth}x${window.innerHeight}`
            : "",
      }),
    });
  } catch {
    /* Swallowed by design. */
  }
}

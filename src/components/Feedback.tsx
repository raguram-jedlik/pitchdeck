"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { feedbackCopy } from "@/data/jedlikData";

/**
 * Section 09 — the only place the deck asks the investor for anything.
 *
 * Two steps on purpose. The vote is one click with no typing, so nearly
 * everyone answers it; the email is asked only after a positive vote, when
 * intent is already demonstrated. Asking for an address upfront would suppress
 * both numbers.
 *
 * Nothing here can break the deck: every network call is fire-and-forget and
 * the UI advances on failure exactly as it does on success. An investor must
 * never see an error because our database is down.
 */

type Step = "vote" | "email" | "done";
type Vote = "up" | "down";

const STORAGE_KEY = "jedlik-feedback-v1";

/**
 * A random per-visitor id, persisted so a returning visitor keeps one identity.
 * Phase 2 (per-section dwell time) will reuse this key to stitch a visit's
 * events to its verdict, which is why it lives in its own record rather than
 * being derived from the vote.
 */
function getSessionId(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { sessionId?: string };
      if (parsed.sessionId) return parsed.sessionId;
    }
  } catch {
    /* localStorage unavailable (private mode) — fall through to a fresh id. */
  }
  return crypto.randomUUID().slice(0, 36);
}

function readStoredVote(): Vote | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { vote?: Vote };
    return parsed.vote ?? null;
  } catch {
    return null;
  }
}

function persist(sessionId: string, vote: Vote, emailGiven: boolean) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ sessionId, vote, emailGiven })
    );
  } catch {
    /* Non-fatal: they'll simply be asked again on a future visit. */
  }
}

export default function Feedback() {
  const [step, setStep] = useState<Step>("vote");
  const [vote, setVote] = useState<Vote | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [ready, setReady] = useState(false);

  // Read localStorage after mount only — touching it during render would break
  // hydration, since the server has no idea whether this visitor has voted.
  useEffect(() => {
    setSessionId(getSessionId());
    if (readStoredVote()) setStep("done");
    setReady(true);
  }, []);

  async function send(payload: { vote: Vote; email?: string }) {
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          sessionId,
          website: honeypot, // honeypot — real users never fill this
          referrer: typeof document !== "undefined" ? document.referrer : "",
          viewport:
            typeof window !== "undefined"
              ? `${window.innerWidth}x${window.innerHeight}`
              : "",
        }),
      });
    } catch {
      /* Swallowed by design — see the component note above. */
    }
  }

  function handleVote(v: Vote) {
    setVote(v);
    persist(sessionId, v, false);
    void send({ vote: v });
    // A negative voter is never asked for anything further.
    setStep(v === "up" ? "email" : "done");
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setError(feedbackCopy.invalidEmail);
      return;
    }
    setError(null);
    setSubmitting(true);
    await send({ vote: "up", email: trimmed });
    persist(sessionId, "up", true);
    setSubmitting(false);
    setStep("done");
  }

  const thanksMessage =
    vote === "down"
      ? feedbackCopy.thanksDown
      : email
        ? feedbackCopy.thanksEmail
        : feedbackCopy.thanksUp;

  return (
    <section className="relative bg-paper px-6 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">{feedbackCopy.eyebrow}</p>

        {/* min-height holds the layout steady as steps swap, so the page
            never jumps under the reader mid-interaction. */}
        <div className="mt-4 min-h-[13rem]">
          <AnimatePresence mode="wait">
            {!ready ? null : step === "vote" ? (
              <motion.div
                key="vote"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="display-lg max-w-[16ch] text-ink">
                  {feedbackCopy.heading}
                </h2>
                <p className="mt-4 max-w-xl text-base text-muted md:text-lg">
                  {feedbackCopy.sub}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleVote("up")}
                    className="border border-ink bg-ink px-8 py-4 font-display text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-red hover:border-red"
                  >
                    {feedbackCopy.voteUp}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVote("down")}
                    className="border border-rule px-8 py-4 font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    {feedbackCopy.voteDown}
                  </button>
                </div>
              </motion.div>
            ) : step === "email" ? (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="display-lg max-w-[16ch] text-ink">
                  {feedbackCopy.emailPrompt}
                </h2>
                <p className="mt-4 max-w-xl text-base text-muted md:text-lg">
                  {feedbackCopy.emailSub}
                </p>

                <form
                  onSubmit={handleEmail}
                  className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
                >
                  {/* Honeypot — hidden from humans and from assistive tech,
                      visible to naive bots. */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="pointer-events-none absolute h-0 w-0 opacity-0"
                  />
                  <label htmlFor="feedback-email" className="sr-only">
                    {feedbackCopy.emailPrompt}
                  </label>
                  <input
                    id="feedback-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={feedbackCopy.emailPlaceholder}
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={error ? "feedback-email-error" : undefined}
                    className="flex-1 border border-rule bg-paper px-4 py-4 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="border border-ink bg-ink px-8 py-4 font-display text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:border-red hover:bg-red disabled:opacity-50"
                  >
                    {feedbackCopy.emailSubmit}
                  </button>
                </form>

                {error && (
                  <p
                    id="feedback-email-error"
                    role="alert"
                    className="mt-3 text-sm text-red"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setStep("done")}
                  className="mt-4 text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  {feedbackCopy.emailSkip}
                </button>

                <p className="mt-6 max-w-xl text-xs text-muted/70">
                  {feedbackCopy.privacy}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                aria-live="polite"
              >
                <h2 className="display-lg max-w-[18ch] text-ink">
                  {thanksMessage}
                </h2>
                <span className="dot mt-6 block" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

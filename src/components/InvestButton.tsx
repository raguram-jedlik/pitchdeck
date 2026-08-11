"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { investCopy } from "@/data/jedlikData";
import { getSessionId, getState, updateState, postCapture, EMAIL_RE } from "@/lib/visitor";

/**
 * The one persistent call to action — a red button pinned beside the logo,
 * visible on every screen of the deck rather than waiting for the end.
 *
 * Opens a small dialog asking only for an email. Recorded with intent
 * "invest", which is deliberately a different signal from the Section 09
 * thumbs-up: someone who clicks this is asking to be contacted, and should
 * never be averaged in with mild approval.
 *
 * Like every capture on the deck, a failed request still shows the thank-you.
 */

type Step = "closed" | "form" | "done";

export default function InvestButton() {
  const [step, setStep] = useState<Step>("closed");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [alreadyInvested, setAlreadyInvested] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSessionId(getSessionId());
    setAlreadyInvested(Boolean(getState().invested));
  }, []);

  // Focus the field when the dialog opens; restore focus to the button when it
  // closes, so keyboard users aren't dumped at the top of the document.
  useEffect(() => {
    if (step === "form") inputRef.current?.focus();
    if (step === "closed") triggerRef.current?.focus();
  }, [step]);

  // Escape closes the dialog, as any dialog should.
  useEffect(() => {
    if (step === "closed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStep("closed");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError(investCopy.invalidEmail);
      return;
    }
    setError(null);
    setSubmitting(true);
    await postCapture({
      intent: "invest",
      email: trimmed,
      sessionId,
      honeypot,
    });
    updateState({ invested: true });
    setAlreadyInvested(true);
    setSubmitting(false);
    setStep("done");
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setStep(alreadyInvested ? "done" : "form")}
        className="mr-6 mt-3 border border-red bg-red px-4 py-2 font-display text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-ink hover:border-ink md:mr-10 md:mt-4 md:px-5 md:py-2.5 md:text-xs"
      >
        {investCopy.button}
      </button>

      <AnimatePresence>
        {step !== "closed" && (
          <motion.div
            key="invest-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            // z-index sits above the nav (z-40) and its progress bar (z-50).
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 px-6"
            onClick={() => setStep("closed")}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="invest-heading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              // Stop clicks inside the panel from closing it via the backdrop.
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-paper p-8 md:p-10"
            >
              {step === "form" ? (
                <>
                  <h2 id="invest-heading" className="display-md text-ink">
                    {investCopy.heading}
                  </h2>
                  <p className="mt-3 text-base text-muted">{investCopy.sub}</p>

                  <form onSubmit={handleSubmit} className="mt-6">
                    {/* Honeypot — hidden from humans and assistive tech. */}
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
                    <label htmlFor="invest-email" className="sr-only">
                      {investCopy.heading}
                    </label>
                    <input
                      ref={inputRef}
                      id="invest-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={investCopy.placeholder}
                      aria-invalid={error ? "true" : undefined}
                      aria-describedby={error ? "invest-email-error" : undefined}
                      className="w-full border border-rule bg-paper px-4 py-4 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
                    />

                    {error && (
                      <p
                        id="invest-email-error"
                        role="alert"
                        className="mt-3 text-sm text-red"
                      >
                        {error}
                      </p>
                    )}

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="border border-ink bg-ink px-8 py-4 font-display text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:border-red hover:bg-red disabled:opacity-50"
                      >
                        {investCopy.submit}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep("closed")}
                        className="border border-rule px-8 py-4 font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:border-ink hover:text-ink"
                      >
                        {investCopy.cancel}
                      </button>
                    </div>
                  </form>

                  <p className="mt-6 text-xs text-muted/70">{investCopy.privacy}</p>
                </>
              ) : (
                <div aria-live="polite">
                  <h2 id="invest-heading" className="display-md text-ink">
                    {investCopy.thanks}
                  </h2>
                  <span className="dot mt-5 block" />
                  <button
                    type="button"
                    onClick={() => setStep("closed")}
                    className="mt-6 border border-ink bg-ink px-8 py-4 font-display text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:border-red hover:bg-red"
                  >
                    {investCopy.close}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

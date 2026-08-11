import { neon } from "@neondatabase/serverless";

/**
 * Storage for investor feedback.
 *
 * The deck must never depend on this working. If DATABASE_URL is absent (local
 * dev, a preview deploy, a misconfigured env) every function here degrades to a
 * no-op that reports `stored: false` instead of throwing. The widget thanks the
 * investor either way — a dead database is our problem, not something an
 * investor should ever see on screen.
 *
 * Schema is created lazily on first write so there is no migration step to run
 * and no way to forget it. CREATE TABLE IF NOT EXISTS is cheap and idempotent.
 */

export type Vote = "up" | "down";

export interface FeedbackRecord {
  vote: Vote;
  email: string | null;
  sessionId: string;
  referrer: string | null;
  userAgent: string | null;
  viewport: string | null;
}

/** True when a database is configured. Used to pick the code path, not to gate the UI. */
export function isConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function db() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

let schemaReady = false;

/**
 * Create the table on first use. Kept to a single flat table for now: Phase 2
 * (per-section dwell time) will add a separate `events` table keyed by the same
 * session_id, so this row stays joinable to the full visit without a rewrite.
 */
async function ensureSchema(sql: NonNullable<ReturnType<typeof db>>) {
  if (schemaReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS feedback (
      id          BIGSERIAL PRIMARY KEY,
      vote        TEXT        NOT NULL CHECK (vote IN ('up', 'down')),
      email       TEXT,
      session_id  TEXT        NOT NULL,
      referrer    TEXT,
      user_agent  TEXT,
      viewport    TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS feedback_session_idx ON feedback (session_id)`;
  await sql`CREATE INDEX IF NOT EXISTS feedback_created_idx ON feedback (created_at DESC)`;
  schemaReady = true;
}

/**
 * Persist one response. Returns whether it actually landed in a database so the
 * route can log honestly, but never throws — callers treat failure as success
 * from the investor's point of view.
 */
export async function saveFeedback(
  record: FeedbackRecord
): Promise<{ stored: boolean; reason?: string }> {
  const sql = db();
  if (!sql) return { stored: false, reason: "DATABASE_URL not set" };

  try {
    await ensureSchema(sql);
    await sql`
      INSERT INTO feedback (vote, email, session_id, referrer, user_agent, viewport)
      VALUES (
        ${record.vote}, ${record.email}, ${record.sessionId},
        ${record.referrer}, ${record.userAgent}, ${record.viewport}
      )
    `;
    return { stored: true };
  } catch (err) {
    // Reset so a transient failure doesn't leave us assuming the schema exists.
    schemaReady = false;
    return {
      stored: false,
      reason: err instanceof Error ? err.message : "unknown database error",
    };
  }
}

/**
 * A session votes once. Second submissions update the existing row rather than
 * inserting a duplicate, so someone who votes and *then* adds their email
 * produces one complete record instead of two partial ones.
 */
export async function upsertFeedback(
  record: FeedbackRecord
): Promise<{ stored: boolean; reason?: string }> {
  const sql = db();
  if (!sql) return { stored: false, reason: "DATABASE_URL not set" };

  try {
    await ensureSchema(sql);
    const existing = await sql`
      SELECT id FROM feedback WHERE session_id = ${record.sessionId} LIMIT 1
    `;

    if (existing.length > 0) {
      // COALESCE keeps a previously captured email if this update omits one.
      await sql`
        UPDATE feedback
        SET vote  = ${record.vote},
            email = COALESCE(${record.email}, email)
        WHERE session_id = ${record.sessionId}
      `;
      return { stored: true };
    }

    return await saveFeedback(record);
  } catch (err) {
    schemaReady = false;
    return {
      stored: false,
      reason: err instanceof Error ? err.message : "unknown database error",
    };
  }
}

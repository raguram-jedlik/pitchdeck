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

/**
 * What the person did. "verdict" is the Section 09 thumbs up/down; "invest" is
 * the header button, which is a far stronger signal and is kept separate so the
 * two are never averaged together in a query.
 */
export type Intent = "verdict" | "invest";

export interface FeedbackRecord {
  /** Null for an invest submission — there is no thumbs up/down involved. */
  vote: Vote | null;
  intent: Intent;
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
 * Create the table on first use, and bring an older table up to date.
 *
 * The ALTER statements matter: a database created before the Invest button
 * existed has `vote NOT NULL` and no `intent` column, which would reject every
 * invest submission. All three statements are idempotent, so this is safe to
 * run on both a fresh and an existing database.
 *
 * Phase 2 (per-section dwell time) will add a separate `events` table keyed by
 * the same session_id, so these rows stay joinable to the full visit.
 */
async function ensureSchema(sql: NonNullable<ReturnType<typeof db>>) {
  if (schemaReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS feedback (
      id          BIGSERIAL PRIMARY KEY,
      vote        TEXT        CHECK (vote IN ('up', 'down')),
      intent      TEXT        NOT NULL DEFAULT 'verdict',
      email       TEXT,
      session_id  TEXT        NOT NULL,
      referrer    TEXT,
      user_agent  TEXT,
      viewport    TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  // Migrate a table created before the Invest button shipped.
  await sql`ALTER TABLE feedback ADD COLUMN IF NOT EXISTS intent TEXT NOT NULL DEFAULT 'verdict'`;
  await sql`ALTER TABLE feedback ALTER COLUMN vote DROP NOT NULL`;
  await sql`CREATE INDEX IF NOT EXISTS feedback_session_idx ON feedback (session_id)`;
  await sql`CREATE INDEX IF NOT EXISTS feedback_created_idx ON feedback (created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS feedback_intent_idx ON feedback (intent)`;
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
      INSERT INTO feedback (vote, intent, email, session_id, referrer, user_agent, viewport)
      VALUES (
        ${record.vote}, ${record.intent}, ${record.email}, ${record.sessionId},
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
 * One row per session *per intent*. Someone can both rate the deck and ask to
 * invest, and those are two separate facts — so the key is (session_id, intent)
 * rather than session_id alone. Repeating the same intent updates in place, so
 * voting and then adding an email yields one complete row, not two partial ones.
 */
export async function upsertFeedback(
  record: FeedbackRecord
): Promise<{ stored: boolean; reason?: string }> {
  const sql = db();
  if (!sql) return { stored: false, reason: "DATABASE_URL not set" };

  try {
    await ensureSchema(sql);
    const existing = await sql`
      SELECT id FROM feedback
      WHERE session_id = ${record.sessionId} AND intent = ${record.intent}
      LIMIT 1
    `;

    if (existing.length > 0) {
      // COALESCE keeps a previously captured value if this update omits one.
      await sql`
        UPDATE feedback
        SET vote  = COALESCE(${record.vote}, vote),
            email = COALESCE(${record.email}, email)
        WHERE session_id = ${record.sessionId} AND intent = ${record.intent}
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

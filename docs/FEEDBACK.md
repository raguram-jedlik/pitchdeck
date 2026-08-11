# Feedback capture — setup

Section 09 asks each investor whether the deck landed, then asks positive
responders for an email. Responses go to a Postgres table.

**The deck works with or without a database.** With no `DATABASE_URL` the widget
behaves normally for the investor and the response is logged to the server
console instead of stored. Nothing breaks; you just don't keep the data. So set
this up before sending the link to anyone whose answer you want to keep.

## 1. Create a database

[Neon](https://neon.tech) free tier is enough (Vercel Postgres is the same
thing, resold). Create a project, then copy the connection string — it looks
like:

```
postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
```

## 2. Local development

Create `.env.local` in the project root (git-ignored, never committed):

```
DATABASE_URL="postgresql://...your connection string..."
```

Then `npm run dev` and submit a test response.

## 3. Production

In the Vercel dashboard: **Project → Settings → Environment Variables**, add
`DATABASE_URL` with the same value, for the Production and Preview environments.
Redeploy for it to take effect.

## 4. Reading the responses

The `feedback` table is created automatically on the first submission — there is
no migration to run. Query it from the Neon SQL editor:

```sql
-- Everyone who left an address, newest first
SELECT email, created_at, referrer
FROM feedback
WHERE email IS NOT NULL
ORDER BY created_at DESC;

-- The score
SELECT vote, COUNT(*) FROM feedback GROUP BY vote;

-- Conversion: what share of positive responders left an email
SELECT
  COUNT(*) FILTER (WHERE vote = 'up')                      AS liked,
  COUNT(*) FILTER (WHERE vote = 'up' AND email IS NOT NULL) AS gave_email
FROM feedback;
```

## What is stored

| Column | Why |
|---|---|
| `vote` | `up` or `down` |
| `email` | Only if volunteered; lower-cased |
| `session_id` | Random per-browser id, so repeat visits don't double-count |
| `referrer` | Which channel sent them (LinkedIn, email, direct) |
| `user_agent` | Browser/device, for reading mobile vs desktop |
| `viewport` | Screen size at the time of response |
| `created_at` | Timestamp |

**Not stored:** IP addresses, or any fingerprinting. The privacy line shown
beside the email field states exactly this — keep the two in sync if you change
what is collected.

## Notes

- One row per session. Voting and then adding an email updates the same row
  rather than inserting a second.
- A hidden honeypot field plus per-IP rate limiting (10/min) blunt casual bots.
- `session_id` is deliberately the same key Phase 2 (per-section dwell time)
  will use, so analytics events can be joined to the verdict later without a
  schema rewrite.

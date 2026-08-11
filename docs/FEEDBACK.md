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
-- Hottest leads first: everyone who clicked "Invest in Us"
SELECT email, created_at, referrer
FROM feedback
WHERE intent = 'invest'
ORDER BY created_at DESC;

-- Everyone who left an address by any route
SELECT email, intent, vote, created_at
FROM feedback
WHERE email IS NOT NULL
ORDER BY created_at DESC;

-- The score (verdicts only — invest rows have no vote)
SELECT vote, COUNT(*) FROM feedback WHERE intent = 'verdict' GROUP BY vote;

-- People who both rated the deck AND asked to invest, joined by session
SELECT
  v.vote,
  i.email,
  i.created_at
FROM feedback i
JOIN feedback v
  ON v.session_id = i.session_id AND v.intent = 'verdict'
WHERE i.intent = 'invest';
```

## What is stored

| Column | Why |
|---|---|
| `intent` | `verdict` (Section 09 rating) or `invest` (header button) |
| `vote` | `up` or `down`. Null for an invest row — there is no vote involved |
| `email` | Only if volunteered; lower-cased. Always present on an invest row |
| `session_id` | Random per-browser id, shared by both capture surfaces |
| `referrer` | Which channel sent them (LinkedIn, email, direct) |
| `user_agent` | Browser/device, for reading mobile vs desktop |
| `viewport` | Screen size at the time of response |
| `created_at` | Timestamp |

**Not stored:** IP addresses, or any fingerprinting. The privacy lines shown in
the widget and the invest dialog state exactly this — keep them in sync if you
change what is collected.

## Notes

- One row per session *per intent*. The same person can rate the deck and ask to
  invest; those are two rows sharing a `session_id`, joinable as above.
- Repeating the same intent updates that row rather than inserting a duplicate.
- An invest submission without an email is rejected — there would be no way to
  follow up, which is the point of the button.
- A hidden honeypot field plus per-IP rate limiting (10/min) blunt casual bots.
- The schema self-migrates: a table created before the Invest button shipped
  gains the `intent` column and drops the `NOT NULL` on `vote` automatically on
  the next write.
- `session_id` is deliberately the same key Phase 2 (per-section dwell time)
  will use, so analytics events can be joined to these rows later without a
  schema rewrite.

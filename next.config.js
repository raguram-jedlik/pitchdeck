/** @type {import('next').NextConfig} */

// Dev and production used to share the default `.next` directory. That
// meant clearing or rebuilding the dev bundle (a stale-cache fix, a
// `rm -rf .next`, a fresh clone) silently destroyed the artefacts the
// running production server was serving from — the site kept answering
// but routes that needed a file from `.next` started returning 500.
//
// Production now builds into `.next-prod` and dev stays on `.next`, so
// the two can never collide. `npm run build:prod` and `npm run start`
// are wired to the same directory.
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

module.exports = nextConfig;

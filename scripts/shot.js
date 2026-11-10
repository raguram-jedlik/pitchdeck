// Screenshot helper for pitch-deck visual checks.
// Usage: CHROME_PATH=... node scripts/shot.js <url> <outPrefix> [width] [height]
// Captures full-page + per-section screenshots into .shots/ (gitignored).
const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

(async () => {
  const url = process.env.SHOT_URL || process.argv[2] || "http://localhost:3111";
  const prefix = process.argv[3] || "shot";
  const width = parseInt(process.argv[4] || "1440", 10);
  const height = parseInt(process.argv[5] || "900", 10);
  const outDir = path.resolve(__dirname, "..", ".shots");
  fs.mkdirSync(outDir, { recursive: true });

  const launchOpts = {
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  };
  const chromePath = process.env.CHROME_PATH || "/home/jedlik/.local/bin/google-chrome";
  if (fs.existsSync(chromePath)) launchOpts.executablePath = chromePath;

  const browser = await puppeteer.launch(launchOpts);
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));

  const full = path.join(outDir, `${prefix}-full.png`);
  await page.screenshot({ path: full, fullPage: true });
  console.log("FULL=" + full);

  // One screenshot per section, so each can be eyeballed.
  // The deck wraps its sections in .deck-shell (one-screen-per-section snap
  // scrolling), so that is the selector to use — plain "main > section" misses
  // them because DeckShell is the direct child of <main>.
  const sections = await page.evaluate(() => {
    const nodes = Array.from(
      document.querySelectorAll(".deck-shell > section, main > section, section[id]")
    );
    return nodes.map((n, i) => ({
      i,
      id: n.id || n.className.toString().slice(0, 40),
      title: (n.querySelector("h1,h2,h3")?.innerText || "").trim().slice(0, 60),
      top: n.getBoundingClientRect().top + window.scrollY,
      h: n.getBoundingClientRect().height,
    }));
  });
  console.log("SECTIONS=" + JSON.stringify(sections));

  for (const s of sections) {
    if (s.h < 40) continue;
    await page.evaluate((t) => window.scrollTo(0, t), s.top);
    await new Promise((r) => setTimeout(r, 900));
    const file = path.join(outDir, `${prefix}-${String(s.i).padStart(2, "0")}.png`);
    await page.screenshot({ path: file });
    console.log("SEC=" + file + " | " + s.title);
  }

  await browser.close();
  console.log("DONE");
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});

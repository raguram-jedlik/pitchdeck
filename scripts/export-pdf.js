const puppeteer = require("puppeteer");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

(async () => {
  const url = process.env.EXPORT_URL || "http://localhost:3000";
  const outPath = path.resolve(__dirname, "..", "Jedlik-Pitch-Deck.pdf");
  const contentViewportWidth = 1440;
  // Standard 16:9 widescreen slide size, matching a presentation deck.
  const PAGE_W = 1920;
  const PAGE_H = 1080;

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: contentViewportWidth, height: 900, deviceScaleFactor: 2 });

  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

  // Pin <main> to a fixed layout width for the rest of this script. Without
  // this, switching the browser viewport to the wider PAGE_W frame later
  // (so the fixed header aligns with the slide) would make <main> reflow to
  // fill that width, invalidating any height measured beforehand — that
  // mismatch was cutting content off mid-section.
  await page.addStyleTag({
    content: `main { width: ${contentViewportWidth}px !important; max-width: ${contentViewportWidth}px !important; }`,
  });

  // Kill smooth-scroll so our programmatic scrolling is instant/predictable.
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });

  // Scroll down in small steps so every IntersectionObserver / whileInView
  // trigger fires exactly as it would for a real visitor, then give the
  // last animations time to settle before scrolling back to the top.
  await page.evaluate(async () => {
    const step = 300;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    let last = -1;
    while (true) {
      const scrollHeight = document.body.scrollHeight;
      window.scrollBy(0, step);
      await delay(120);
      if (window.scrollY === last || window.scrollY + window.innerHeight >= scrollHeight) {
        break;
      }
      last = window.scrollY;
    }
    await delay(1000);
    window.scrollTo(0, 0);
    await delay(500);
  });

  // Freeze everything at its final resolved state and strip animation/
  // transition so the PDF renders crisp, fully-settled frames. Some
  // whileInView elements (e.g. the persona cards) never fire their
  // IntersectionObserver during fast programmatic scrolling and are left
  // at their `initial` opacity:0/translateY — force every framer-motion
  // inline style to its resolved end-state so nothing is left invisible.
  //
  // Also strip the PDF-only exclusions: the red "Invest in us" button in
  // the header, and Section 11 (the interactive verdict/feedback block),
  // which doesn't make sense as a static page.
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-play-state: paused !important;
        animation-delay: -9999s !important;
        transition: none !important;
      }
      .section-reveal { opacity: 1 !important; transform: none !important; }
      [style*="opacity"] { opacity: 1 !important; }
      [style*="transform"]:not(main) { transform: none !important; }
      header > button { display: none !important; }
    `,
  });

  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 500));

  // Build the page groups: each top-level block (<section> / <footer>) starts
  // a new page unless it has no eyebrow label of its own (e.g. the E-POD
  // reveal stage that immediately follows the "Unveil" tease) — those merge
  // into the previous page. Section 11 (Feedback) is dropped entirely.
  const groupCount = await page.evaluate(() => {
    const blocks = Array.from(document.querySelectorAll("main > section, main > footer"));
    const feedback = blocks.find((el) => /Section 11/i.test(el.textContent || ""));
    if (feedback) feedback.style.display = "none";
    const kept = blocks.filter((el) => el !== feedback);

    const groups = [];
    kept.forEach((el, i) => {
      const hasEyebrow = !!el.querySelector(".eyebrow");
      const isFooter = el.tagName === "FOOTER";
      if (i === 0 || hasEyebrow || isFooter) {
        groups.push([el]);
      } else {
        groups[groups.length - 1].push(el);
      }
    });

    window.__pdfGroups = groups;
    window.__pdfAllBlocks = kept;
    groups.forEach((g, gi) => g.forEach((el) => el.setAttribute("data-pdf-group", String(gi))));
    return groups.length;
  });

  const buffers = [];
  for (let i = 0; i < groupCount; i++) {
    // Show only this group's elements; measure their combined natural size.
    const { naturalWidth, naturalHeight, bg } = await page.evaluate((index) => {
      const all = window.__pdfAllBlocks;
      all.forEach((el) => {
        const gi = Number(el.getAttribute("data-pdf-group"));
        el.style.display = gi === index ? "" : "none";
      });
      window.scrollTo(0, 0);

      const groupEls = window.__pdfGroups[index];
      const first = groupEls[0].getBoundingClientRect();
      const last = groupEls[groupEls.length - 1].getBoundingClientRect();
      const width = Math.max(...groupEls.map((el) => el.getBoundingClientRect().width));
      const height = last.bottom - first.top;
      const bgColor = getComputedStyle(groupEls[0]).backgroundColor;
      return { naturalWidth: width, naturalHeight: height, bg: bgColor };
    }, i);

    const scale = Math.min(PAGE_W / naturalWidth, PAGE_H / naturalHeight, 1) * 0.99;
    const offsetX = Math.round((PAGE_W - naturalWidth * scale) / 2);
    const offsetY = Math.round((PAGE_H - naturalHeight * scale) / 2);

    // Resize the real viewport to the target page frame so the fixed header
    // (logo) aligns with it too, then scale + center <main> inside it.
    await page.setViewport({ width: PAGE_W, height: PAGE_H, deviceScaleFactor: 2 });
    await page.evaluate(
      ({ scale, offsetX, offsetY, bg }) => {
        const main = document.querySelector("main");
        main.style.transformOrigin = "top left";
        main.style.transform = `scale(${scale})`;
        main.style.position = "fixed";
        main.style.left = `${offsetX}px`;
        main.style.top = `${offsetY}px`;
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.margin = "0";
        document.body.style.background = bg && bg !== "rgba(0, 0, 0, 0)" ? bg : "#ffffff";
      },
      { scale, offsetX, offsetY, bg }
    );

    const buf = await page.pdf({
      printBackground: true,
      width: `${PAGE_W}px`,
      height: `${PAGE_H}px`,
      pageRanges: "1",
    });
    buffers.push(buf);

    // Reset positioning before the next iteration measures fresh.
    await page.evaluate(() => {
      const main = document.querySelector("main");
      main.style.transform = "";
      main.style.position = "";
      main.style.left = "";
      main.style.top = "";
    });
    await page.setViewport({ width: contentViewportWidth, height: 900, deviceScaleFactor: 2 });
  }

  const merged = await PDFDocument.create();
  for (const buf of buffers) {
    const src = await PDFDocument.load(buf);
    const pages = await merged.copyPages(src, src.getPageIndices());
    pages.forEach((p) => merged.addPage(p));
  }
  const mergedBytes = await merged.save();
  require("fs").writeFileSync(outPath, mergedBytes);

  await browser.close();
  console.log(`Saved ${groupCount} pages to`, outPath);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});

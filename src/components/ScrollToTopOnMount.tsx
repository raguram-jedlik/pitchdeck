"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTopOnMount — hard reset of the scroll position on route change.
 *
 * The bug this fixes
 * -----------------
 * The decks use CSS scroll snapping (`html:has(.deck-shell)` gets
 * `scroll-snap-type: y mandatory`). When the reader clicks "Know more"
 * at the bottom of the brief deck, Next.js performs a client-side
 * navigation to /detail and the browser keeps the scroll offset it was
 * at — near the bottom of the outgoing page. The mandatory snap then
 * pulls the incoming page to the *nearest* snap target, which is the
 * last one. So the detailed deck opens on its final page instead of
 * its first.
 *
 * `history.scrollRestoration = "manual"` alone does not fix it: the
 * browser restores the offset after React has mounted, so a reset in a
 * mount effect is overwritten. This component resets on every pathname
 * change, in a layout effect (before paint), and then re-asserts the
 * position on the next frame and again after the page settles — the
 * mandatory snap needs a beat to take its own hold on the position, so
 * the last reset has to come after it.
 *
 * A URL hash (a Contents jump inside /detail) is left alone: that
 * navigation *intends* to land on a specific section.
 */
export default function ScrollToTopOnMount() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const toTop = () => window.scrollTo(0, 0);

    toTop();
    // The browser can restore the outgoing offset after mount, and the
    // mandatory snap re-asserts a position of its own once it has the
    // new layout. Reset past both.
    const raf = requestAnimationFrame(toTop);
    const settle = window.setTimeout(toTop, 120);
    const late = window.setTimeout(toTop, 400);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.clearTimeout(late);
    };
  }, [pathname]);

  return null;
}

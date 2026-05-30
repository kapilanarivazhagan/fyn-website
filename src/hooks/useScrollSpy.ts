"use client";

import { useState, useEffect } from "react";
import { MajorView, majorScrollSections } from "./scrollTypes";

// The stable scrolled-state navbar height. Mirrors getNavbarHeight() in
// useHashNavigation so the two systems stay in sync without coupling.
const NAV_OFFSET = 64; // px

export function useScrollSpy(showIntro: boolean): MajorView {
  const [navActiveView, setNavActiveView] = useState<MajorView>("home");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mountedSections = majorScrollSections
      .map((s) => ({ ...s, element: document.getElementById(s.id) }))
      .filter(
        (s): s is { id: string; view: MajorView; element: HTMLElement } =>
          Boolean(s.element)
      );

    if (!mountedSections.length) return;

    let rafId: number | null = null;
    let committed: MajorView = "home";

    const detect = () => {
      rafId = null;

      const viewportHeight = window.innerHeight;
      const viewportMid = viewportHeight * 0.5;

      let bestView: MajorView = "home";
      let bestDist = Infinity;

      for (const { view, element } of mountedSections) {
        const rect = element.getBoundingClientRect();

        // Clamp the section to the *visible* viewport band (below navbar, above
        // fold). Using raw section midpoints fails for tall sections: a 2700px
        // "About" section scrolled to its top has its geometric center at ~1400px
        // viewport position — further from center than a partially-visible hero
        // section above it, causing the wrong nav item to light up. Clamping to
        // what is actually visible on screen makes the comparison meaningful.
        const visTop = Math.max(rect.top, NAV_OFFSET);
        const visBottom = Math.min(rect.bottom, viewportHeight);

        // Skip sections not visible at all in the usable viewport band.
        if (visBottom <= visTop) continue;

        const visMid = (visTop + visBottom) * 0.5;
        const dist = Math.abs(visMid - viewportMid);

        if (dist < bestDist) {
          bestDist = dist;
          bestView = view;
        }
      }

      if (bestView !== committed) {
        committed = bestView;
        setNavActiveView(bestView);
      }
    };

    // Coalesce high-frequency scroll/resize events into one detection pass
    // per animation frame.
    const schedule = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(detect);
    };

    detect();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [showIntro]);

  return navActiveView;
}

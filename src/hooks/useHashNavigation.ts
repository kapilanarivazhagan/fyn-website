"use client";

import React, { useCallback, useEffect } from "react";
import {
  MajorView,
  ViewType,
  hashTargets,
  legacyContentTargets,
  majorSectionTargets,
} from "./scrollTypes";

// Always return the SCROLLED navbar height (py-3 state), not the current
// transitioning height. Any programmatic navigation immediately causes
// scrollY > 20, which triggers the navbar to shrink from py-5 (81px) to
// py-3 (~64px) over 500ms. If we calculate the offset with the larger
// unscrolled height, the section lands 17px too low after the navbar settles.
// We derive the scrolled height dynamically: inner-content-height + py-3*2,
// so it stays correct if the inner content or base font-size ever changes.
function getNavbarHeight(): number {
  const nav = document.getElementById("fyn-navbar-cinematic");
  if (!nav) return 64;
  const inner = nav.firstElementChild as HTMLElement | null;
  const innerHeight = inner ? inner.offsetHeight : 40;
  // py-3 = 0.75rem — compute from the document root font-size so it
  // remains correct even when the user has changed their browser default.
  const py3 = Math.round(
    0.75 * parseFloat(getComputedStyle(document.documentElement).fontSize)
  );
  return innerHeight + py3 * 2;
}

export function useHashNavigation() {
  const scrollToTarget = useCallback((targetId: string) => {
    if (typeof window === "undefined") return;

    if (targetId === "home-master") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(targetId);
    if (!el) return;

    // One rAF lets any in-flight React renders flush so getBoundingClientRect
    // measures the settled DOM position, not a mid-paint snapshot.
    requestAnimationFrame(() => {
      // Pull the landing point 16px past the strict navbar bottom so the
      // section heading is immediately visible rather than sitting deep
      // behind padding. Each section has 32–56px of top padding that acts
      // as clearance — the heading is never hidden behind the navbar.
      const top =
        el.getBoundingClientRect().top + window.scrollY - getNavbarHeight() + 16;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "").toLowerCase();
      if (!hash) {
        scrollToTarget("home-master");
        return;
      }
      if (hashTargets[hash]) {
        scrollToTarget(hashTargets[hash]);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [scrollToTarget]);

  const handleMajorNavigate = useCallback(
    (view: MajorView) => scrollToTarget(majorSectionTargets[view]),
    [scrollToTarget]
  );

  const handleSetActiveView = useCallback<
    React.Dispatch<React.SetStateAction<ViewType>>
  >(
    (value) => {
      const next = typeof value === "function" ? value("home") : value;
      scrollToTarget(legacyContentTargets[next]);
    },
    [scrollToTarget]
  );

  return { scrollToTarget, handleMajorNavigate, handleSetActiveView };
}

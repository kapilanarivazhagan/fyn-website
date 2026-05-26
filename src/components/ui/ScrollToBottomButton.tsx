"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export const ScrollToBottomButton = () => {
  const [visible, setVisible] = useState(false);
  const lastScrollYRef = useRef<number>(0);
  const visibleRef = useRef(false);
  const rafRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    lastScrollYRef.current = typeof window !== "undefined" ? window.scrollY : 0;

    const updateVisible = (nextVisible: boolean) => {
      if (visibleRef.current === nextVisible) return;
      visibleRef.current = nextVisible;
      setVisible(nextVisible);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const current = window.scrollY;
        const delta = current - lastScrollYRef.current;

        if (Math.abs(delta) >= 3) {
          updateVisible(delta > 0);
        }

        lastScrollYRef.current = current;

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => updateVisible(false), 1500);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToBottom = () => {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to footer"
      onClick={scrollToBottom}
      className="
        fixed
        right-6
        top-1/2
        translate-y-16
        z-[45]
        flex h-10 w-10
        items-center justify-center
        rounded-full
        border border-white/35
        bg-[#0b0b0b]/82
        text-white
        shadow-[0_0_18px_rgba(255,255,255,0.18)]
        backdrop-blur-md
        transition-all duration-300
        hover:scale-110
        hover:shadow-[0_0_24px_rgba(255,255,255,0.32)]
        hover:border-white/70
        hover:bg-white
        hover:text-black
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/55
        sm:right-7
        md:right-8
      "
    >
      <ChevronDown className="h-5 w-5" />
    </button>
  );
};

"use client";

import React, { useState, useRef, useEffect } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { PartnerLogo } from "../ui/PartnerLogo";
import { SectionBackground } from "../ui/SectionBackground";
import { partnersList } from "@/data/partners";

const CARD_WIDTH = 160; // px
const CARD_GAP = 16;   // px (mr-4)
const SCROLL_SPEED = 0.5; // px per frame (cinematic speed)
type PartnerCategory = "oem" | "financing" | "charging";

export const ClientsPartners = () => {
  const [activeCategory, setActiveCategory] = useState<PartnerCategory>("oem");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isInView = useRef(false);
  const shouldReduceMotion = useRef(false);
  
  // Interaction states
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const categories: {
    id: PartnerCategory;
    label: string;
  }[] = [
    { id: "oem", label: "OEM Partners" },
    { id: "charging", label: "Charging & Swapping" },
    { id: "financing", label: "Financing Partners" }
  ];

  const filteredPartners = partnersList.filter(
    (p) => p.category === activeCategory
  );

  // Dynamic duplicate logic: ensure track is wide enough to avoid empty spaces
  const repeatFactor = filteredPartners.length < 4 ? 6 : 4;
  const items = Array(repeatFactor).fill(filteredPartners).flat();
  const singleSetWidth = filteredPartners.length * (CARD_WIDTH + CARD_GAP);

  // Whether scroll position has been initialized (prevents RAF jump on mount)
  const scrollReady = useRef(false);

  useEffect(() => {
    shouldReduceMotion.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      isInView.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
      },
      {
        root: null,
        rootMargin: "160px 0px",
        threshold: 0,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // ─── Initialize scroll position in the middle set ──────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    scrollReady.current = false;
    el.scrollLeft = singleSetWidth * 2;
    // Defer ready flag one frame so RAF doesn't fire before scroll is set
    requestAnimationFrame(() => {
      scrollReady.current = true;
    });
  }, [activeCategory, singleSetWidth]);

  // ─── RAF Auto-Scroll: Moves from Left to Right ──────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let running = true;

    const loop = () => {
      if (!running) return;
      if (
        scrollReady.current &&
        isInView.current &&
        !shouldReduceMotion.current &&
        !isHovered.current &&
        !isDragging.current &&
        el
      ) {
        el.scrollLeft -= SCROLL_SPEED;

        // Loop boundary wrap — keep inside middle region
        if (el.scrollLeft <= singleSetWidth) {
          el.scrollLeft += singleSetWidth;
        } else if (el.scrollLeft >= singleSetWidth * 3) {
          el.scrollLeft -= singleSetWidth;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [singleSetWidth]);

  // ─── Mobile Touch Swipe Event Overrides ────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const dx = Math.abs(e.touches[0].clientX - touchStartX);
      const dy = Math.abs(e.touches[0].clientY - touchStartY);
      if (dx > dy) {
        e.preventDefault();
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // ─── Drag Controls ──────────────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startScroll.current = containerRef.current?.scrollLeft ?? 0;
    try {
      containerRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const dx = startX.current - e.clientX;
    let next = startScroll.current + dx;

    // Boundaries loop logic
    if (next <= singleSetWidth) {
      next += singleSetWidth;
      startX.current = e.clientX;
      startScroll.current = next;
    } else if (next >= singleSetWidth * 3) {
      next -= singleSetWidth;
      startX.current = e.clientX;
      startScroll.current = next;
    }
    containerRef.current.scrollLeft = next;
  };

  const onPointerUp = () => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  return (
    <section
      id="clients-partners"
      className="py-12 sm:py-16 md:py-20 bg-[#0F0F0F] relative overflow-hidden font-barlow border-t border-fyn-border/10"
    >
      <SectionBackground variant="partners" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="Ecosystem Infrastructure"
          title="Clients & Partners"
          description="We unify clean energy components. By integrating leading vehicle manufacturers, battery swapping networks, and specialized finance channels, we optimize delivery corridors."
        />

        {/* Short Premium Intro Statement */}
        <div className="max-w-3xl mx-auto px-6 text-center mt-6">
          <p className="text-sm md:text-base font-medium text-fyn-pink uppercase tracking-wider leading-relaxed border-y border-fyn-pink/15 py-3.5 bg-fyn-pink/[0.01]">
            “Powering sustainable mobility and last-mile logistics for India’s leading enterprise brands.”
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex justify-center space-x-2 border-b border-fyn-border/40 pb-6 mt-10 mb-10 max-w-lg mx-auto px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-fyn-pink text-fyn-text shadow-[0_0_15px_rgba(232,25,122,0.2)]"
                  : "bg-fyn-surface/60 border border-fyn-border/40 text-fyn-text-muted hover:border-fyn-border hover:text-fyn-text"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Horizontal Marquee */}
        <div className="relative mt-8 min-h-[160px]">
          {/* Fades */}
          <div
            className="absolute inset-y-0 left-0 w-12 md:w-32 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #0F0F0F, transparent)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-12 md:w-32 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #0F0F0F, transparent)" }}
          />

          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; }}
            className="flex overflow-x-auto no-scrollbar pb-4 px-4"
            style={{
              cursor: "grab",
              userSelect: "none",
              WebkitOverflowScrolling: "touch",
              transform: "translateZ(0)",
              willChange: "scroll-position",
              touchAction: "pan-y",
              scrollBehavior: "auto",
            }}
          >
            {items.map((partner, idx) => (
              <div
                key={`${partner.id}-${idx}`}
                className="shrink-0 animate-fade-in"
                style={{
                  width: `${CARD_WIDTH}px`,
                  marginRight: `${CARD_GAP}px`,
                }}
              >
                <PartnerLogo
                  name={partner.name}
                  logo={partner.logo}
                  logoClass={partner.logoClass}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

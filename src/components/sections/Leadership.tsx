"use client";

import React, { useRef, useEffect } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { TeamCard } from "../ui/TeamCard";
import { leadershipList } from "@/data/leadership";
import { SectionBackground } from "../ui/SectionBackground";

// ─── Carousel constants ───────────────────────────────────────────────────────
const CARD_WIDTH = 288;  // px (w-72)
const CARD_GAP   = 24;   // px (mr-6)
const SCROLL_SPEED = 0.7; // px per RAF frame (smooth premium cinematic feel)

export const Leadership = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);

  // Interaction refs to avoid component re-renders during 60fps scrolling
  const isHovered   = useRef(false);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const startScroll = useRef(0);
  const scrollReady = useRef(false);
  const revealStartedAt = useRef(0);
  const hasUserInteracted = useRef(false);  // Track if user has triggered animation

  // Triplicate list so the carousel always has a copy on the left and right
  const items = [...leadershipList, ...leadershipList, ...leadershipList];
  
  // Width of a single set of leadership cards
  const singleSetWidth = leadershipList.length * (CARD_WIDTH + CARD_GAP);

  // ─── Center Visakh (CEO/Founder) on Mount ──────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    scrollReady.current = false;

    const centerFirstCard = () => {
      const viewportWidth = el.clientWidth;
      const foundersWidth = (CARD_WIDTH + CARD_GAP) * 4 - CARD_GAP;
      const founderInset = Math.max(16, Math.min(48, (viewportWidth - foundersWidth) / 2));
      const initialScroll = singleSetWidth - founderInset;
      el.scrollLeft = initialScroll;
      revealStartedAt.current = performance.now();
      requestAnimationFrame(() => {
        scrollReady.current = true;
      });
    };

    centerFirstCard();
    window.addEventListener("resize", centerFirstCard);
    return () => window.removeEventListener("resize", centerFirstCard);
  }, [singleSetWidth]);

  // ─── RAF Auto-Scroll ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let running = true;

    const loop = () => {
      if (!running) return;
      // Only scroll if: carousel is ready AND user has interacted AND not hovering/dragging
      if (scrollReady.current && !isHovered.current && !isDragging.current && el) {
        const elapsed = performance.now() - revealStartedAt.current;
        const speed = SCROLL_SPEED;  // Use constant speed after interaction
        el.scrollLeft += speed;

        // Wrap boundaries inside the middle copy to ensure infinite loop
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        } else if (el.scrollLeft < singleSetWidth) {
          el.scrollLeft += singleSetWidth;
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

  // ─── iOS Safari: prevent page scroll during horizontal swipe ───────────────
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
      // Predominantly horizontal swiping gets touch-behavior override
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

  // ─── Drag Controls (Mouse + Touch Pointer events) ──────────────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    hasUserInteracted.current = true;  // Trigger animation on first interaction
    revealStartedAt.current = performance.now();  // Reset timer for consistent speed
    isDragging.current = true;
    startX.current     = e.clientX;
    startScroll.current = containerRef.current?.scrollLeft ?? 0;
    try {
      containerRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback if unsupported
    }
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const dx = startX.current - e.clientX;
    let next = startScroll.current + dx;

    // Wrap dynamically while dragging to prevent boundary jumps
    if (next < singleSetWidth) {
      next += singleSetWidth;
      startX.current = e.clientX;
      startScroll.current = next;
    } else if (next >= singleSetWidth * 2) {
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
      id="leadership"
      className="py-12 sm:py-16 md:py-20 relative overflow-x-hidden font-barlow border-t border-fyn-border/10"
    >
      <SectionBackground variant="careers" />
      {/* Ambient spotlights */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-fyn-pink/[0.01] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-fyn-pink/[0.01] blur-[120px] pointer-events-none" />

      {/* Section heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="Ecosystem Creators"
          title="The team behind Fyn"
          description="A multidisciplinary crew of logistics experts, software engineers, operations specialists, and supply chain builders."
        />
      </div>

      {/* ── Full-bleed carousel ── */}
      <div className="relative z-10 mt-12">
        {/* Wider premium fade gradients */}
        <div
          className="absolute inset-y-0 left-0 w-16 md:w-36 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0F0F0F, transparent)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-16 md:w-36 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0F0F0F, transparent)" }}
        />

        {/* Scrollable track */}
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onMouseEnter={() => {
            hasUserInteracted.current = true;  // Trigger animation on first hover
            revealStartedAt.current = performance.now();  // Reset timer
            isHovered.current = true;
          }}
          onMouseLeave={() => { isHovered.current = false; }}
          className="flex overflow-x-auto no-scrollbar pb-6 px-4"
          style={{
            cursor: "grab",
            userSelect: "none",
            WebkitOverflowScrolling: "touch",
            // GPU-accelerate the scroll container on Safari
            transform: "translateZ(0)",
            willChange: "scroll-position",
            touchAction: "pan-y",
            scrollBehavior: "auto",
          }}
        >
          {items.map((leader, idx) => (
            <div
              key={`${leader.id}-${idx}`}
              className="shrink-0"
              style={{
                width: `${CARD_WIDTH}px`,
                marginRight: `${CARD_GAP}px`,
              }}
            >
              <TeamCard
                name={leader.name}
                role={leader.role}
                bio={leader.bio}
                imageName={leader.imageName}
              />
            </div>
          ))}
        </div>
      </div>

      {/* User interaction cues */}
      <div className="flex justify-center items-center gap-2 mt-4 text-[10px] font-mono tracking-widest text-fyn-text-muted/50 uppercase select-none">
        <span className="hidden md:block">Hover to pause · Drag to explore</span>
        <span className="md:hidden">Swipe to explore team</span>
        <span className="w-1.5 h-1.5 rounded-full bg-fyn-pink animate-ping" />
      </div>
    </section>
  );
};

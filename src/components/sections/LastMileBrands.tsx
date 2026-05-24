"use client";

import React, { useRef, useEffect } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { PartnerLogo } from "../ui/PartnerLogo";
import { clientsList } from "@/data/clients";
import { SectionBackground } from "../ui/SectionBackground";

const CARD_WIDTH = 160; // px (width of logo card)
const CARD_GAP = 16;   // px (mr-4)
const SCROLL_SPEED = 0.5; // px per RAF frame (slow cinematic motion)

export const LastMileBrands = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Refs to avoid state updates triggering re-renders in RAF loop
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const scrollReady = useRef(false);

  // Triplicate the clientsList for seamless continuous looping in wide viewports
  const items = [...clientsList, ...clientsList, ...clientsList];
  const singleSetWidth = clientsList.length * (CARD_WIDTH + CARD_GAP);

  // ─── Initialize Scroll position to the middle copy ─────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    scrollReady.current = false;
    el.scrollLeft = singleSetWidth;
    requestAnimationFrame(() => {
      scrollReady.current = true;
    });
  }, [singleSetWidth]);

  // ─── RAF Auto-Scroll: Moves from Left to Right (decreases scrollLeft) ───────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let running = true;

    const loop = () => {
      if (!running) return;
      if (scrollReady.current && !isHovered.current && !isDragging.current && el) {
        // Decrement scroll to scroll left-to-right
        el.scrollLeft -= SCROLL_SPEED;

        // Seamless wrap: stay within the middle copy
        if (el.scrollLeft <= 0) {
          el.scrollLeft += singleSetWidth;
        } else if (el.scrollLeft >= singleSetWidth * 2) {
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

  // ─── iOS Safari prevent vertical bounce on horizontal swipes ───────────────
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

  // ─── Mouse/Touch drag interaction controls ─────────────────────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startScroll.current = containerRef.current?.scrollLeft ?? 0;
    try {
      containerRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // ignore if pointer capture is unsupported
    }
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const dx = startX.current - e.clientX;
    let next = startScroll.current + dx;

    // Boundary wrapping during dragging
    if (next <= 0) {
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
      id="last-mile-brands"
      className="relative isolate overflow-hidden py-12 sm:py-16 border-t border-fyn-border/20 font-barlow"
    >
       <SectionBackground variant="impact" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="Enterprise Deliveries"
          title="Powering Last-Mile Deliveries"
          description="Fyn coordinates clean last-mile logistics for India's leading enterprise e-commerce and quick-commerce brands."
        />
      </div>

      {/* Cinematic Marquee Slider */}
      <div className="relative z-10 mt-10">
        {/* Ambient Left Fade */}
        <div
          className="absolute inset-y-0 left-0 w-12 md:w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(8,8,8,0.95), transparent)" }}
        />
        {/* Ambient Right Fade */}
        <div
          className="absolute inset-y-0 right-0 w-12 md:w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(8,8,8,0.95), transparent)" }}
        />

        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
          className="flex overflow-x-auto no-scrollbar pb-2 px-4"
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
          {items.map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="shrink-0"
              style={{
                width: `${CARD_WIDTH}px`,
                marginRight: `${CARD_GAP}px`,
              }}
            >
              <PartnerLogo name={client.name} logo={client.logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

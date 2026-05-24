"use client";

import React, {
  useRef,
  useEffect,
} from "react";

import { motion } from "framer-motion";

import { SectionHeading } from "../ui/SectionHeading";
import { InvestorCard } from "../ui/InvestorCard";
import { SectionBackground } from "../ui/SectionBackground";

import { investorsList } from "@/data/investors";

/* =========================================
   MARQUEE CONFIG
========================================= */

const CARD_WIDTH = 420;

const CARD_GAP = 24;

const SCROLL_SPEED = 0.45;

/* =========================================
   COMPONENT
========================================= */

export const Investors = () => {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const rafRef = useRef<number>(0);

  const isHovered = useRef(false);

  const isDragging = useRef(false);

  const startX = useRef(0);

  const startScroll = useRef(0);

  /* =========================================
     DUPLICATE ITEMS
  ========================================= */

  const repeatFactor =
    investorsList.length < 4 ? 6 : 4;

  const items = Array(repeatFactor)
    .fill(investorsList)
    .flat();

  const singleSetWidth =
    investorsList.length *
    (CARD_WIDTH + CARD_GAP);

  const scrollReady = useRef(false);

  /* =========================================
     INITIALIZE CENTER POSITION
  ========================================= */

  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    scrollReady.current = false;

    el.scrollLeft = singleSetWidth * 2;

    requestAnimationFrame(() => {
      scrollReady.current = true;
    });
  }, [singleSetWidth]);

  /* =========================================
     RAF AUTO SCROLL
  ========================================= */

  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    let running = true;

    const loop = () => {
      if (!running) return;

      if (
        scrollReady.current &&
        !isHovered.current &&
        !isDragging.current &&
        el
      ) {
        el.scrollLeft -=
          SCROLL_SPEED;

        if (
          el.scrollLeft <=
          singleSetWidth
        ) {
          el.scrollLeft +=
            singleSetWidth;
        } else if (
          el.scrollLeft >=
          singleSetWidth * 3
        ) {
          el.scrollLeft -=
            singleSetWidth;
        }
      }

      rafRef.current =
        requestAnimationFrame(loop);
    };

    rafRef.current =
      requestAnimationFrame(loop);

    return () => {
      running = false;

      cancelAnimationFrame(
        rafRef.current
      );
    };
  }, [singleSetWidth]);

  /* =========================================
     TOUCH SUPPORT
  ========================================= */

  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    let touchStartX = 0;

    let touchStartY = 0;

    const onTouchStart = (
      e: TouchEvent
    ) => {
      touchStartX =
        e.touches[0].clientX;

      touchStartY =
        e.touches[0].clientY;
    };

    const onTouchMove = (
      e: TouchEvent
    ) => {
      const dx = Math.abs(
        e.touches[0].clientX -
          touchStartX
      );

      const dy = Math.abs(
        e.touches[0].clientY -
          touchStartY
      );

      if (dx > dy) {
        e.preventDefault();
      }
    };

    el.addEventListener(
      "touchstart",
      onTouchStart,
      {
        passive: true,
      }
    );

    el.addEventListener(
      "touchmove",
      onTouchMove,
      {
        passive: false,
      }
    );

    return () => {
      el.removeEventListener(
        "touchstart",
        onTouchStart
      );

      el.removeEventListener(
        "touchmove",
        onTouchMove
      );
    };
  }, []);

  /* =========================================
     DRAG CONTROLS
  ========================================= */

  const onPointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    isDragging.current = true;

    startX.current = e.clientX;

    startScroll.current =
      containerRef.current
        ?.scrollLeft ?? 0;

    try {
      containerRef.current?.setPointerCapture(
        e.pointerId
      );
    } catch {}

    if (containerRef.current) {
      containerRef.current.style.cursor =
        "grabbing";
    }
  };

  const onPointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (
      !isDragging.current ||
      !containerRef.current
    )
      return;

    const dx =
      startX.current - e.clientX;

    let next =
      startScroll.current + dx;

    if (
      next <= singleSetWidth
    ) {
      next += singleSetWidth;

      startX.current = e.clientX;

      startScroll.current = next;
    } else if (
      next >=
      singleSetWidth * 3
    ) {
      next -= singleSetWidth;

      startX.current = e.clientX;

      startScroll.current = next;
    }

    containerRef.current.scrollLeft =
      next;
  };

  const onPointerUp = () => {
    isDragging.current = false;

    if (containerRef.current) {
      containerRef.current.style.cursor =
        "grab";
    }
  };

  return (
    <section
      id="financial-banking"
      className="
        py-20
        px-6 md:px-12
        bg-[#080808]
        relative
        overflow-hidden
        font-barlow
      "
    >
      <SectionBackground variant="investors" />

      <div
        className="
          absolute inset-0
          bg-grid-dots
          opacity-20
          pointer-events-none
        "
      />

      <div
        className="
          max-w-7xl mx-auto
          relative z-10
        "
      >
        <SectionHeading
          eyebrow="Financial Backing"
          title="Backed by partners who open doors"
          description="Fyn is supported by prominent corporate VC structures, institutional angel networks, veterans of the public sector, and social impact funds."
        />

        {/* =========================================
            MARQUEE CONTAINER
        ========================================= */}

        <div
          className="
            relative
            mt-14
            min-h-[260px]
          "
        >
          {/* LEFT FADE */}
          <div
            className="
              absolute inset-y-0 left-0
              w-12 md:w-32
              z-10
              pointer-events-none
            "
            style={{
              background:
                "linear-gradient(to right, #080808, transparent)",
            }}
          />

          {/* RIGHT FADE */}
          <div
            className="
              absolute inset-y-0 right-0
              w-12 md:w-32
              z-10
              pointer-events-none
            "
            style={{
              background:
                "linear-gradient(to left, #080808, transparent)",
            }}
          />

          {/* =========================================
              SCROLL TRACK
          ========================================= */}

          <div
            ref={containerRef}
            onPointerDown={
              onPointerDown
            }
            onPointerMove={
              onPointerMove
            }
            onPointerUp={onPointerUp}
            onPointerCancel={
              onPointerUp
            }
            onMouseEnter={() => {
              isHovered.current =
                true;
            }}
            onMouseLeave={() => {
              isHovered.current =
                false;
            }}
            className="
              flex
              overflow-x-auto
              no-scrollbar
              pb-4
              px-4
            "
            style={{
              cursor: "grab",

              userSelect: "none",

              WebkitOverflowScrolling:
                "touch",

              transform:
                "translateZ(0)",

              willChange:
                "scroll-position",

              touchAction: "pan-y",

              scrollBehavior:
                "auto",
            }}
          >
            {items.map(
              (investor, idx) => (
                <motion.div
                  key={`${investor.id}-${idx}`}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay:
                      idx * 0.03,
                  }}
                  className="
                    shrink-0
                    animate-fade-in
                  "
                  style={{
                    width: `${CARD_WIDTH}px`,
                    marginRight: `${CARD_GAP}px`,
                  }}
                >
                  <InvestorCard
                    name={investor.name}
                    type={investor.type}
                    description={
                      investor.description
                    }
                  />
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
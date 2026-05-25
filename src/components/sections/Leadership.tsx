"use client";

import React, {
  useRef,
  useEffect,
} from "react";

import { SectionHeading } from "../ui/SectionHeading";
import { TeamCard } from "../ui/TeamCard";

import { leadershipList } from "@/data/leadership";

import { SectionBackground } from "../ui/SectionBackground";

/* =========================================
   CAROUSEL CONFIG
========================================= */

const CARD_WIDTH =
  typeof window !== "undefined" &&
  window.innerWidth >= 1280
    ? 420
    : typeof window !== "undefined" &&
      window.innerWidth >= 768
    ? 340
    : 260;

const CARD_GAP = 24;

const SCROLL_SPEED = 0.7;

/* =========================================
   COMPONENT
========================================= */

export const Leadership = () => {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const rafRef =
    useRef<number>(0);

  /* =========================================
     INTERACTION REFS
  ========================================= */

  const isHovered =
    useRef(false);

  const isDragging =
    useRef(false);

  const startX =
    useRef(0);

  const startScroll =
    useRef(0);

  const scrollReady =
    useRef(false);

  const revealStartedAt =
    useRef(0);

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 768;

  /* =========================================
     TRIPLICATE LIST
  ========================================= */

  const items = [
    ...leadershipList,
    ...leadershipList,
    ...leadershipList,
  ];

  const singleSetWidth =
    leadershipList.length *
    (CARD_WIDTH + CARD_GAP);

  /* =========================================
     CENTER 4 LEADERS INITIALLY
  ========================================= */

  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    scrollReady.current = false;

    const centerCards = () => {
      const viewportWidth =
        el.clientWidth;

      const visibleCardsWidth =
        (CARD_WIDTH + CARD_GAP) *
          4 -
        CARD_GAP;

      const inset = Math.max(
        16,
        Math.min(
          48,
          (viewportWidth -
            visibleCardsWidth) /
            2
        )
      );

      const initialScroll =
        singleSetWidth - inset;

      el.scrollLeft =
        initialScroll;

      requestAnimationFrame(() => {
        scrollReady.current =
          true;
      });
    };

    centerCards();

    window.addEventListener(
      "resize",
      centerCards
    );

    return () =>
      window.removeEventListener(
        "resize",
        centerCards
      );
  }, [singleSetWidth]);

  /* =========================================
     RAF AUTO SCROLL
     ONLY ON HOVER
  ========================================= */

  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    let running = true;

    const loop = () => {
      if (!running) return;

      if (
        scrollReady.current &&
        (isHovered.current || isMobile) &&
        !isDragging.current &&
        el
      ) {
        el.scrollLeft +=
          SCROLL_SPEED;

        /* LOOP INSIDE MIDDLE COPY */

        if (
          el.scrollLeft >=
          singleSetWidth * 2
        ) {
          el.scrollLeft -=
            singleSetWidth;
        } else if (
          el.scrollLeft <
          singleSetWidth
        ) {
          el.scrollLeft +=
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
    isDragging.current =
      true;

    startX.current =
      e.clientX;

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

    /* LOOP WHILE DRAGGING */

    if (
      next < singleSetWidth
    ) {
      next += singleSetWidth;

      startX.current =
        e.clientX;

      startScroll.current =
        next;
    } else if (
      next >=
      singleSetWidth * 2
    ) {
      next -= singleSetWidth;

      startX.current =
        e.clientX;

      startScroll.current =
        next;
    }

    containerRef.current.scrollLeft =
      next;
  };

  const onPointerUp = () => {
    isDragging.current =
      false;

    if (containerRef.current) {
      containerRef.current.style.cursor =
        "grab";
    }
  };

  return (
    <section
      id="leadership"
      className="
        py-8 sm:py-10 md:py-14
        relative
        overflow-x-hidden
        font-barlow
        border-t border-fyn-border/10
      "
    >
      <SectionBackground variant="careers" />

      {/* AMBIENT LIGHTS */}

      <div
        className="
          absolute top-0 left-0
          w-96 h-96
          rounded-full
          bg-fyn-pink/[0.01]
          blur-[120px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute bottom-0 right-0
          w-96 h-96
          rounded-full
          bg-fyn-pink/[0.01]
          blur-[120px]
          pointer-events-none
        "
      />

      {/* SECTION HEADING */}

      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 md:px-12
          relative z-10
        "
      >
        <SectionHeading
          eyebrow="Ecosystem Creators"
          title="The team behind Fyn"
          description="A multidisciplinary crew of logistics experts, software engineers, operations specialists, and supply chain builders."
        />
      </div>

      {/* =========================================
          CAROUSEL
      ========================================= */}

      <div
        className="
          relative z-10
          mt-2 md:mt-3 lg:mt-4
        "
      >
        {/* LEFT FADE */}

        <div
          className="
            absolute inset-y-0 left-0
            w-16 md:w-36
            z-10
            pointer-events-none
          "
          style={{
            background:
              "linear-gradient(to right, #0F0F0F, transparent)",
          }}
        />

        {/* RIGHT FADE */}

        <div
          className="
            absolute inset-y-0 right-0
            w-16 md:w-36
            z-10
            pointer-events-none
          "
          style={{
            background:
              "linear-gradient(to left, #0F0F0F, transparent)",
          }}
        />

        {/* TRACK */}

        <div
          ref={containerRef}
          onPointerDown={
            onPointerDown
          }
          onPointerMove={
            onPointerMove
          }
          onPointerUp={
            onPointerUp
          }
          onPointerCancel={
            onPointerUp
          }
          onMouseEnter={() => {
            isHovered.current =
              true;

            revealStartedAt.current =
              performance.now();
          }}
          onMouseLeave={() => {
            isHovered.current =
              false;
          }}
          className="
            flex
            overflow-x-auto
            no-scrollbar
            pb-4 sm:pb-5 md:pb-6
            px-4 sm:px-6
          "
          style={{
            cursor: "grab",

            userSelect: "none",

            WebkitOverflowScrolling:
              "touch",

            WebkitTransform:
              "translate3d(0, 0, 0)",

            transform:
              "translate3d(0, 0, 0)",

            willChange:
              "scroll-position",

            touchAction: "pan-y",

            scrollBehavior:
              "auto",
          }}
        >
          {items.map(
            (leader, idx) => (
              <div
                key={`${leader.id}-${idx}`}
                className="
                  shrink-0
                "
                style={{
                  width: `${CARD_WIDTH}px`,
                  marginRight: `${CARD_GAP}px`,
                }}
              >
                <TeamCard
                  name={leader.name}
                  role={leader.role}
                  bio={leader.bio}
                  imageName={
                    leader.imageName
                  }
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* INTERACTION TEXT */}

      <div
        className="
          flex justify-center items-center
          gap-2
          mt-6 md:mt-8

          text-[9px] sm:text-[10px]
          font-mono
          tracking-widest
          text-fyn-text-muted/40
          uppercase

          select-none
          pointer-events-none
        "
      >
        <span className="hidden md:block">
          Hover to explore leadership
        </span>

        <span className="md:hidden">
          Auto-scrolling leadership
        </span>

        <span
          className="
            w-1.5 h-1.5
            rounded-full
            bg-fyn-pink
            animate-ping
          "
        />
      </div>
    </section>
  );
}
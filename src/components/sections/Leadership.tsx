"use client";

import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { SectionHeading } from "../ui/SectionHeading";
import { TeamCard } from "../ui/TeamCard";

import { leadershipList } from "@/data/leadership";

import { SectionBackground } from "../ui/SectionBackground";

/* =========================================
   SLIDER CONFIG
========================================= */

const CARD_GAP = 24;
const DRAG_THRESHOLD = 10;
const MOMENTUM_FRICTION = 0.94;
const MOMENTUM_MIN_VELOCITY = 0.02;
const SNAP_IDLE_DELAY = 140;

/* =========================================
   FOUNDER-FIRST ORDERING
========================================= */

const getOrderedLeadership = () => {
  const founderIds = [
    "visakh",
    "niroop",
    "manu",
  ];

  const coreLead = ["swagata"];
  const restIds = [
    "deeksha",
    "abhishek",
    "anant",
  ];

  const getByIds = (ids: string[]) =>
    ids
      .map((id) =>
        leadershipList.find(
          (l) => l.id === id
        )
      )
      .filter(Boolean) as typeof leadershipList;

  const extended = leadershipList.filter(
    (l) =>
      ![
        ...founderIds,
        ...coreLead,
        ...restIds,
      ].includes(l.id)
  );

  return [
    ...getByIds(founderIds),
    ...getByIds(coreLead),
    ...getByIds(restIds),
    ...extended,
  ];
};

/* =========================================
   COMPONENT
========================================= */

export const Leadership = () => {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);
  const currentIndexRef = useRef(0);

  const [cardsToMove, setCardsToMove] =
    useState(3);

  const [cardWidth, setCardWidth] =
    useState(420);

  const [isPointerDragging, setIsPointerDragging] =
    useState(false);

  // Drag, momentum, and native scroll refs
  const pointerIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const lastScrollLeftRef = useRef(0);
  const velocityRef = useRef(0);
  const momentumAnimationRef =
    useRef<number>(0);
  const scrollAnimationRef =
    useRef<number>(0);
  const snapTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );
  const lastTimeRef = useRef(0);

  const orderedLeaders = useMemo(
    getOrderedLeadership,
    []
  );

  const allSlides = useMemo(
    () => [
      ...orderedLeaders,
      ...orderedLeaders,
      ...orderedLeaders,
    ],
    [orderedLeaders]
  );

  const singleSetLength =
    orderedLeaders.length;
  // Start in the middle set
  const middleSetStart =
    singleSetLength;
  const slideUnit = cardWidth + CARD_GAP;

  /* =========================================
     RESPONSIVE SETUP
  ========================================= */

  useEffect(() => {
    const handleResize = () => {
      const width =
        typeof window !== "undefined"
          ? window.innerWidth
          : 1280;

      if (width >= 1280) {
        setCardWidth(420);
        setCardsToMove(3);
      } else if (width >= 768) {
        setCardWidth(340);
        setCardsToMove(2);
      } else {
        setCardWidth(260);
        setCardsToMove(1);
      }
    };

    handleResize();
    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  /* =========================================
     NATIVE SCROLL LOOPING
  ========================================= */

  const normalizeIndex = (
    rawIndex: number
  ) => {
    const normalized =
      ((rawIndex % singleSetLength) +
        singleSetLength) %
      singleSetLength;

    return normalized;
  };

  const syncScrollState = () => {
    const container =
      containerRef.current;
    if (!container) return;

    const rawIndex =
      container.scrollLeft / slideUnit;
    const nextIndex = normalizeIndex(
      Math.round(rawIndex)
    );

    if (
      currentIndexRef.current !==
      nextIndex
    ) {
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
    }
  };

  const keepScrollInMiddleSet = () => {
    const container =
      containerRef.current;
    if (!container) return;

    const setWidth =
      singleSetLength * slideUnit;
    const minScroll = setWidth * 0.5;
    const maxScroll = setWidth * 2.5;

    if (
      container.scrollLeft < minScroll
    ) {
      container.scrollLeft += setWidth;
      dragStartScrollLeftRef.current +=
        setWidth;
      lastScrollLeftRef.current += setWidth;
    } else if (
      container.scrollLeft > maxScroll
    ) {
      container.scrollLeft -= setWidth;
      dragStartScrollLeftRef.current -=
        setWidth;
      lastScrollLeftRef.current -= setWidth;
    }
  };

  const clearSnapTimer = () => {
    if (snapTimeoutRef.current) {
      clearTimeout(
        snapTimeoutRef.current
      );
      snapTimeoutRef.current = null;
    }
  };

  const softSnapToNearest = (
    behavior: ScrollBehavior = "smooth"
  ) => {
    const container =
      containerRef.current;
    if (!container) return;

    const target =
      Math.round(
        container.scrollLeft / slideUnit
      ) * slideUnit;

    container.scrollTo({
      left: target,
      behavior,
    });
  };

  const scheduleSoftSnap = () => {
    clearSnapTimer();
    snapTimeoutRef.current = setTimeout(
      () => {
        if (!isDraggingRef.current) {
          softSnapToNearest();
        }
      },
      SNAP_IDLE_DELAY
    );
  };

  useEffect(() => {
    const container =
      containerRef.current;
    if (!container) return;

    container.scrollLeft =
      middleSetStart * slideUnit;
    setCurrentIndex(0);

    return () => {
      cancelAnimationFrame(
        momentumAnimationRef.current
      );
      cancelAnimationFrame(
        scrollAnimationRef.current
      );
      clearSnapTimer();
    };
  }, [middleSetStart, slideUnit]);

  const handleScroll = () => {
    cancelAnimationFrame(
      scrollAnimationRef.current
    );

    scrollAnimationRef.current =
      requestAnimationFrame(() => {
        keepScrollInMiddleSet();
        syncScrollState();

        if (!isDraggingRef.current) {
          scheduleSoftSnap();
        }
      });
  };

  /* =========================================
     NAVIGATION HANDLERS
  ========================================= */

  const stopMotion = () => {
    cancelAnimationFrame(
      momentumAnimationRef.current
    );
    clearSnapTimer();
    velocityRef.current = 0;
  };

  const scrollByCards = (
    direction: -1 | 1
  ) => {
    const container =
      containerRef.current;
    if (!container) return;

    stopMotion();
    container.scrollBy({
      left:
        direction *
        cardsToMove *
        slideUnit,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    scrollByCards(-1);
  };

  const handleNext = () => {
    scrollByCards(1);
  };

  /* =========================================
     DESKTOP DRAG MOMENTUM
  ========================================= */

  const startMomentum = () => {
    const container =
      containerRef.current;
    if (!container) return;

    const step = () => {
      velocityRef.current *=
        MOMENTUM_FRICTION;
      container.scrollLeft +=
        velocityRef.current * 16;
      keepScrollInMiddleSet();
      syncScrollState();

      if (
        Math.abs(
          velocityRef.current
        ) > MOMENTUM_MIN_VELOCITY
      ) {
        momentumAnimationRef.current =
          requestAnimationFrame(step);
        return;
      }

      softSnapToNearest();
    };

    if (
      Math.abs(
        velocityRef.current
      ) > MOMENTUM_MIN_VELOCITY
    ) {
      momentumAnimationRef.current =
        requestAnimationFrame(step);
    } else {
      softSnapToNearest();
    }
  };

  const isInteractiveTarget = (
    target: EventTarget
  ) =>
    target instanceof Element &&
    Boolean(
      target.closest(
        "a, button, input, textarea, select, [role='button']"
      )
    );

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (
      e.pointerType === "touch" ||
      isInteractiveTarget(e.target)
    ) {
      return;
    }

    const container =
      containerRef.current;
    if (!container) return;

    stopMotion();
    pointerIdRef.current = e.pointerId;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setIsPointerDragging(true);

    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current =
      container.scrollLeft;
    lastScrollLeftRef.current =
      container.scrollLeft;
    lastTimeRef.current =
      performance.now();

    container.setPointerCapture(
      e.pointerId
    );
  };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const container =
      containerRef.current;
    if (
      !container ||
      !isDraggingRef.current ||
      pointerIdRef.current !==
        e.pointerId
    ) {
      return;
    }

    e.preventDefault();

    const dragDelta =
      e.clientX - dragStartXRef.current;

    if (
      Math.abs(dragDelta) >
      DRAG_THRESHOLD
    ) {
      hasDraggedRef.current = true;
    }

    container.scrollLeft =
      dragStartScrollLeftRef.current -
      dragDelta;
    keepScrollInMiddleSet();
    syncScrollState();

    const now = performance.now();
    const timeDelta = Math.max(
      now - lastTimeRef.current,
      1
    );
    velocityRef.current =
      (container.scrollLeft -
        lastScrollLeftRef.current) /
      timeDelta;
    lastScrollLeftRef.current =
      container.scrollLeft;
    lastTimeRef.current = now;
  };

  const endPointerDrag = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const container =
      containerRef.current;
    if (
      !container ||
      !isDraggingRef.current ||
      pointerIdRef.current !==
        e.pointerId
    ) {
      return;
    }

    isDraggingRef.current = false;
    pointerIdRef.current = null;
    setIsPointerDragging(false);

    if (
      container.hasPointerCapture(
        e.pointerId
      )
    ) {
      container.releasePointerCapture(
        e.pointerId
      );
    }

    startMomentum();
  };

  const handleClickCapture = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (
      hasDraggedRef.current &&
      !isInteractiveTarget(e.target)
    ) {
      e.preventDefault();
      e.stopPropagation();
    }

    hasDraggedRef.current = false;
  };

  return (
    <section
      id="leadership"
      className="
        py-8 sm:py-10 md:py-14
        relative
        overflow-hidden
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
          SLIDER CONTAINER
      ========================================= */}

      <div
        className="
          relative z-10
          mt-2 md:mt-3 lg:mt-4
        "
      >
        {/* LEFT FADE OVERLAY */}

        <div
          className="
            absolute inset-y-0 left-0
            w-16 md:w-24 lg:w-32
            z-20
            pointer-events-none
          "
          style={{
            background:
              "linear-gradient(to right, #0F0F0F, transparent)",
          }}
        />

        {/* RIGHT FADE OVERLAY */}

        <div
          className="
            absolute inset-y-0 right-0
            w-16 md:w-24 lg:w-32
            z-20
            pointer-events-none
          "
          style={{
            background:
              "linear-gradient(to left, #0F0F0F, transparent)",
          }}
        />

        {/* NAVIGATION ARROWS */}

        <button
          onClick={handlePrev}
          aria-label="Previous leadership member"
          className="
            group
            absolute
            left-2 sm:left-4 md:left-6 lg:left-8
            top-1/2
            -translate-y-1/2
            z-30

            w-11 h-11
            sm:w-12 sm:h-12
            md:w-13 md:h-13
            lg:w-14 lg:h-14

            flex items-center justify-center

            rounded-full

            bg-fyn-pink/10
            backdrop-blur-lg
            border border-fyn-pink/20

            hover:bg-fyn-pink/20
            hover:border-fyn-pink/40
            hover:shadow-[0_0_20px_rgba(255,95,150,0.35)]

            active:scale-90

            transition-all
            duration-300
            ease-out

            select-none
            cursor-pointer

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-fyn-pink/60
            focus-visible:ring-offset-2
            focus-visible:ring-offset-black/50
          "
        >
          <ChevronLeft
            size={22}
            className="
              sm:w-6 sm:h-6
              md:w-7 md:h-7
              lg:w-8 lg:h-8
              text-fyn-pink
              group-hover:text-white
              transition-all
              duration-300
              group-hover:scale-110
            "
            strokeWidth={2.5}
          />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next leadership member"
          className="
            group
            absolute
            right-2 sm:right-4 md:right-6 lg:right-8
            top-1/2
            -translate-y-1/2
            z-30

            w-11 h-11
            sm:w-12 sm:h-12
            md:w-13 md:h-13
            lg:w-14 lg:h-14

            flex items-center justify-center

            rounded-full

            bg-fyn-pink/10
            backdrop-blur-lg
            border border-fyn-pink/20

            hover:bg-fyn-pink/20
            hover:border-fyn-pink/40
            hover:shadow-[0_0_20px_rgba(255,95,150,0.35)]

            active:scale-90

            transition-all
            duration-300
            ease-out

            select-none
            cursor-pointer

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-fyn-pink/60
            focus-visible:ring-offset-2
            focus-visible:ring-offset-black/50
          "
        >
          <ChevronRight
            size={22}
            className="
              sm:w-6 sm:h-6
              md:w-7 md:h-7
              lg:w-8 lg:h-8
              text-fyn-pink
              group-hover:text-white
              transition-all
              duration-300
              group-hover:scale-110
            "
            strokeWidth={2.5}
          />
        </button>

        {/* SLIDER TRACK */}

        <div
          ref={containerRef}
          onScroll={handleScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endPointerDrag}
          onPointerCancel={endPointerDrag}
          onClickCapture={handleClickCapture}
          onDragStart={(e) =>
            e.preventDefault()
          }
          className="
            relative
            overflow-x-auto
            overflow-y-hidden
            pb-4 sm:pb-5 md:pb-6
            px-4 sm:px-6
            select-none
            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
          style={{
            WebkitOverflowScrolling: "touch",
            cursor: isPointerDragging
              ? "grabbing"
              : "grab",
            scrollBehavior: "auto",
            scrollPaddingInline: "1.5rem",
            scrollSnapType:
              isPointerDragging
                ? "none"
                : "x proximity",
            touchAction: "pan-x pan-y",
          }}
        >
          <div
            className="
              flex
              gap-6
            "
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              width: "max-content",
            }}
          >
            {allSlides.map(
              (leader, idx) => (
                <div
                  key={`${leader.id}-${idx}`}
                  className="
                    shrink-0
                  "
                  style={{
                    width: `${cardWidth}px`,
                    scrollSnapAlign: "start",
                  }}
                >
                  <TeamCard
                    name={leader.name}
                    role={leader.role}
                    bio={leader.bio}
                    imageName={
                      leader.imageName
                    }
                    linkedin={
                      leader.linkedin
                    }
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* SLIDER INDICATORS */}

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
        <span>
          {((currentIndex %
            singleSetLength) +
            1) % singleSetLength ||
            singleSetLength}{" "}
          / {singleSetLength}
        </span>

        <span
          className="
            w-1.5 h-1.5
            rounded-full
            bg-fyn-pink
            shadow-[0_0_12px_rgba(232,25,122,0.45)]
          "
        />
      </div>
    </section>
  );
}

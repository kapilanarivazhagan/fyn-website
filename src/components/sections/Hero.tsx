"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { Button } from "../ui/Button";

import {
  animate,
  motion,
  useReducedMotion,
} from "framer-motion";

import { ArrowRight } from "lucide-react";

type ViewType =
  | "home"
  | "about"
  | "vision"
  | "what-we-do"
  | "refynd"
  | "infynity"
  | "clients"
  | "media"
  | "careers"
  | "get-involved";

type HeroStat = {
  value: number;
  suffix: string;
  label: string;
  formatter?: (value: number) => string;
};

const heroStats: HeroStat[] = [
  {
    value: 1500,
    suffix: "+",
    label: "EVs on Road",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Drivers Onboarded",
  },
  {
    value: 20,
    suffix: "M+",
    label: "Green KMs Run",
  },
  {
    value: 3,
    suffix: " Cities",
    label: "Multi-City Operations",
  },
];

const formatCount = (
  value: number,
  formatter?: (value: number) => string
) => {
  if (formatter) {
    return formatter(value);
  }

  return Math.round(value).toLocaleString("en-IN");
};

const AnimatedStatCard = ({
  stat,
  index,
  replayKey,
  isActive,
  canDisplay,
}: {
  stat: HeroStat;
  index: number;
  replayKey: number;
  isActive: boolean;
  canDisplay: boolean;
}) => {
  const [displayValue, setDisplayValue] =
    useState(0);

  const [isCounting, setIsCounting] =
    useState(false);

  const shouldReduceMotion =
    useReducedMotion();

  const lastPlayedKeyRef =
    React.useRef(-1);
  const controlsRef =
    React.useRef<
      ReturnType<typeof animate> | undefined
    >(undefined);

  useLayoutEffect(() => {
    if (!isActive || replayKey === 0) {
      return;
    }

    if (
      lastPlayedKeyRef.current === replayKey
    ) {
      return;
    }

    lastPlayedKeyRef.current = replayKey;

    if (shouldReduceMotion) {
      setIsCounting(false);
      setDisplayValue(stat.value);
      return;
    }

    controlsRef.current?.stop();
    setDisplayValue(0);
    setIsCounting(true);

    const startDelay =
      index * 0.025;
    const countDuration =
      stat.value <= 3
        ? 0.85
        : stat.value <= 20
          ? 1.05
          : 1.5;

    const timeoutId = window.setTimeout(() => {
      controlsRef.current?.stop();

      controlsRef.current = animate(
        0,
        stat.value,
        {
          duration: countDuration,
          ease: [0.18, 0.74, 0.2, 1],
          onUpdate: (latest) =>
            setDisplayValue(latest),
          onComplete: () =>
            setIsCounting(false),
        }
      );
    }, startDelay * 1000);

    return () => {
      window.clearTimeout(timeoutId);
      controlsRef.current?.stop();
      setIsCounting(false);
    };
  }, [
    index,
    isActive,
    replayKey,
    shouldReduceMotion,
    stat.value,
  ]);

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.025,
              y: -2,
            }
      }
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: canDisplay ? 1 : 0,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        ease: [0.18, 0.74, 0.2, 1],
      }}
      className={`
        group
        fyn-hero-stat-card
        ${isCounting ? "fyn-hero-stat-card-counting" : ""}
        relative
        overflow-hidden
        isolate
        min-h-[5.35rem]
        transform-gpu
        rounded-lg
        border
        border-white/10
        bg-[#080808]/42
        px-4
        py-4
        backdrop-blur-md
        transition-colors
        duration-300
        hover:border-fyn-pink/45
        hover:bg-fyn-pink/[0.07]
        hover:shadow-[0_0_22px_rgba(232,25,122,0.16)]
      `}
    >
      <div
        className="
          relative
          z-10
          inline-block
          min-w-[4.75rem]
          text-2xl
          md:text-3xl
          font-black
          text-fyn-text
          uppercase
          tracking-tight
          tabular-nums
          drop-shadow-[0_0_16px_rgba(232,25,122,0.2)]
          transition-colors
          duration-300
          group-hover:text-white
        "
      >
        {formatCount(
          displayValue,
          stat.formatter
        )}
        {stat.suffix}
      </div>

      <div
        className="
          relative
          z-10
          mt-1
          text-xs
          font-semibold
          uppercase
          tracking-widest
          text-fyn-text-muted
          transition-colors
          duration-300
          group-hover:text-white/72
        "
      >
        {stat.label}
      </div>
    </motion.div>
  );
};

export const Hero = ({
  introComplete = true,
  setActiveView,
}: {
  introComplete?: boolean;

  setActiveView: React.Dispatch<
    React.SetStateAction<ViewType>
  >;
}) => {
  const [statsReplayKey, setStatsReplayKey] =
    useState(0);

  const [heroInView, setHeroInView] =
    useState(true);

  const heroRef =
    React.useRef<HTMLElement>(null);
  const heroWasVisibleRef =
    React.useRef(false);
  const lastReplayAtRef =
    React.useRef(0);
  const introReplayDoneRef =
    React.useRef(false);

  const triggerStatsReplay =
    React.useCallback(() => {
      const now = performance.now();

      if (
        now - lastReplayAtRef.current <
        520
      ) {
        return;
      }

      lastReplayAtRef.current = now;

      setStatsReplayKey((current) =>
        current + 1
      );
    }, []);

  const isHeroVisibleNow =
    React.useCallback(() => {
      const heroElement = heroRef.current;

      if (
        !heroElement ||
        typeof window === "undefined"
      ) {
        return false;
      }

      const viewportHeight =
        window.innerHeight ||
        document.documentElement.clientHeight;
      const rect =
        heroElement.getBoundingClientRect();
      const visiblePixels =
        Math.min(rect.bottom, viewportHeight) -
        Math.max(rect.top, 0);
      const visibleRatio =
        visiblePixels /
        Math.max(
          1,
          Math.min(rect.height, viewportHeight)
        );

      return (
        visiblePixels > 96 &&
        visibleRatio >= 0.18 &&
        rect.top < viewportHeight * 0.94 &&
        rect.bottom > viewportHeight * 0.06
      );
    }, []);

  useEffect(() => {
    const heroElement = heroRef.current;

    if (
      !heroElement ||
      typeof IntersectionObserver ===
        "undefined"
    ) {
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          const viewportHeight =
            window.innerHeight ||
            document.documentElement
              .clientHeight;
          const rect =
            entry.boundingClientRect;
          const visibleEnough =
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.16 &&
            rect.top <
              viewportHeight * 0.94 &&
            rect.bottom >
              viewportHeight * 0.06;

          setHeroInView(visibleEnough);

          if (
            visibleEnough &&
            !heroWasVisibleRef.current
          ) {
            heroWasVisibleRef.current =
              true;
            if (introComplete) {
              timeoutId = setTimeout(() => {
                triggerStatsReplay();
              }, 400);
            }
            return;
          }

          if (!visibleEnough) {
            heroWasVisibleRef.current =
              false;
            clearTimeout(timeoutId);
          }
        },
        {
          root: null,
          rootMargin:
            "0px 0px -8% 0px",
          threshold: [
            0,
            0.08,
            0.16,
            0.28,
            0.45,
            0.65,
            0.8,
            1,
          ],
        }
      );

    observer.observe(heroElement);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [introComplete, triggerStatsReplay]);

  useLayoutEffect(() => {
    if (
      !introComplete ||
      introReplayDoneRef.current
    ) {
      return;
    }

    introReplayDoneRef.current = true;

    let timeoutId: NodeJS.Timeout;
    let rafId = 0;

    const startIfVisible = () => {
      const visibleNow =
        isHeroVisibleNow();

      setHeroInView(visibleNow);

      if (visibleNow) {
        heroWasVisibleRef.current = true;
        timeoutId = setTimeout(() => {
          triggerStatsReplay();
        }, 400);
      }
    };

    startIfVisible();

    rafId =
      window.requestAnimationFrame(
        startIfVisible
      );

    return () => {
      clearTimeout(timeoutId);
      window.cancelAnimationFrame(rafId);
    };
  }, [
    introComplete,
    isHeroVisibleNow,
    triggerStatsReplay,
  ]);

  return (
    <motion.section
      ref={heroRef}
      initial={{
        opacity: 0,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 1,
        delay:
          introComplete ? 0 : 0.15,
        ease: "easeOut",
      }}
      id="hero"
      className="
        relative
        min-h-[92vh]
        min-h-[92svh]
        lg:min-h-[94vh]

        flex
        items-center
        justify-center

        overflow-hidden

        bg-transparent

        pt-28
        pb-14
        md:pt-32
        md:pb-16

        px-6
        md:px-10
        xl:px-12
      "
    >
      {/* RESPONSIVE BACKGROUND */}

      <div className="absolute inset-0 z-0 overflow-hidden">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/Images/intro/mobile_bg2.webp"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/Images/intro/desktop_bg2.webp"
          />
          <img
            src="/Images/intro/desktop_bg2.webp"
            alt=""
            aria-hidden="true"
            width={1672}
            height={941}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-[center_top]
              md:object-[left_center]
            "
          />
        </picture>
      </div>

      {/* ATMOSPHERIC OVERLAYS */}

      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[#080808]/22 md:bg-[#080808]/26" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/24 via-[#080808]/08 to-[#080808]/40" />

        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#080808]/6 via-[#080808]/6 to-[#080808]/48 md:block" />
      </div>

      {/* AMBIENT GLOWS */}

      <div
        className="
          absolute
          inset-0
          z-[2]

          pointer-events-none

        "
      >
        <div
          className="
            absolute

            top-1/4
            left-1/4

            -translate-x-1/2
            -translate-y-1/2

            w-96
            h-96

            rounded-full

            bg-fyn-pink/[0.075]

            blur-[52px]
            md:blur-[100px]

            hidden
            sm:block
          "
        />

        <div
          className="
            absolute

            bottom-1/4
            right-[18%]

            translate-x-1/2
            translate-y-1/2

            w-[350px]
            h-[350px]

            md:w-[450px]
            md:h-[450px]

            rounded-full

            bg-fyn-pink/[0.04]

            blur-[64px]
            md:blur-[130px]

            hidden
            md:block
          "
        />

        <div
          className="
            absolute
            right-[4%]
            top-1/2
            hidden
            h-[520px]
            w-[560px]
            -translate-y-1/2
            rounded-full
            bg-[radial-gradient(circle,rgba(232,25,122,0.16)_0%,rgba(8,8,8,0.60)_42%,transparent_72%)]
            blur-[46px]
            lg:block
          "
        />
      </div>

      {/* HERO CONTENT */}

      <div
        className="
          relative
          z-10

          grid
          w-full
          max-w-7xl
          grid-cols-1
          items-center
          gap-8
          md:grid-cols-[minmax(0,1fr)_minmax(0,0.96fr)]
          lg:gap-10
          xl:gap-12

          mx-auto
        "
      >
        <div
          className="
            hidden
            md:block
          "
          aria-hidden="true"
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 28,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mx-auto
            w-full
            max-w-[40rem]
            text-center
            md:mx-auto
            md:max-w-[37.5rem]
            md:text-left
          "
        >
          <div
            className="
              absolute
              -inset-x-8
              -inset-y-10
              -z-10
              rounded-[2rem]
              bg-[radial-gradient(circle_at_48%_42%,rgba(232,25,122,0.18),rgba(8,8,8,0.72)_44%,rgba(8,8,8,0.22)_70%,transparent_82%)]
              blur-lg
              md:-inset-x-14
              md:-inset-y-12
              md:blur-xl
            "
          />

          {/* HEADLINE */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            text-[2.7rem]
            xs:text-5xl
            sm:text-6xl
            md:text-7xl
            xl:text-[5.35rem]

            font-black

            text-fyn-text

            tracking-tighter
            uppercase

            leading-[0.92]

            font-barlow
            drop-shadow-[0_6px_28px_rgba(0,0,0,0.82)]
          "
        >
          RedeFYNing <br />

          <span
            className="
              text-transparent
              bg-clip-text

              bg-gradient-to-r
              from-fyn-text
              via-fyn-pink
              to-fyn-text

              bg-[length:200%_100%]
            "
          >
            EV Mobility
          </span>
        </motion.h1>

        {/* SUBHEADLINE */}

        <motion.p
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-6
            md:mt-7

            text-base
            sm:text-lg
            md:text-xl

            text-white/90

            font-medium

            max-w-[33rem]
            mx-auto
            md:mx-0

            leading-[1.65]

            font-barlow

            drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)]
          "
        >
          India&apos;s largest,
          tech-enabled EV supply
          ecosystem. Connecting
          enterprise demand with
          trained driver partners,
          smart electric vehicles,
          and predictive mobility
          infrastructure.
        </motion.p>

        {/* CTA BUTTONS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
            delay: 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-8
            md:mt-9

            flex
            flex-col
            sm:flex-row

            items-center
            justify-center
            md:justify-start

            gap-3
            sm:gap-4
          "
        >
          {/* PRIMARY CTA */}

          <Button
            variant="primary"
            size="lg"
            className="
              w-full
              min-h-[3.5rem]
              px-7
              flex-nowrap
              whitespace-nowrap
              sm:w-auto
              sm:min-w-[11.25rem]
              transform-gpu
              shadow-[0_0_26px_rgba(232,25,122,0.36)]
            "
            onClick={() =>
              setActiveView(
                "about"
              )
            }
          >
            Learn About Us

            <ArrowRight
              className="
                w-5
                h-5

                ml-2

                shrink-0
              "
            />
          </Button>

          {/* CONNECT WITH US */}

          <Button
            variant="glass"
            size="lg"
            className="
              w-full
              min-h-[3.5rem]
              px-7
              flex-nowrap
              whitespace-nowrap
              sm:w-auto
              sm:min-w-[11.25rem]
              transform-gpu
            "
            onClick={() =>
              setActiveView(
                "get-involved"
              )
            }
          >
            Connect With Us

            <ArrowRight
              className="
                w-5
                h-5

                ml-2

                shrink-0
              "
            />
          </Button>
        </motion.div>

        {/* STATS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.34,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-14
            md:mt-16

            border-t
            border-fyn-border/40

            pt-6

            grid
            grid-cols-2
            sm:grid-cols-4

            gap-3
            sm:gap-4

            text-left

            max-w-[38rem]
            mx-auto
            md:mx-0

            font-barlow
          "
        >
          {heroStats.map((stat, index) => (
            <AnimatedStatCard
              key={stat.label}
              stat={stat}
              index={index}
              replayKey={statsReplayKey}
              isActive={
                introComplete && heroInView
              }
              canDisplay={
                introComplete || statsReplayKey > 0
              }
            />
          ))}
        </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

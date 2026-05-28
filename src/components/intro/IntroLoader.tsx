"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function IntroLoader({
  onFinish,
}: {
  onFinish?: () => void;
}) {
  const [hide, setHide] = useState(false);
  const [isMobileBg, setIsMobileBg] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)")
        .matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px)"
    );

    const handleMediaChange = (
      event: MediaQueryListEvent
    ) => {
      setIsMobileBg(event.matches);
    };

    setIsMobileBg(mediaQuery.matches);
    mediaQuery.addEventListener(
      "change",
      handleMediaChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleMediaChange
      );
    };
  }, []);

  useEffect(() => {
    const totalMs = 3500;
    const unmountExitMs = 800; // must match exit.duration

    const timer = window.setTimeout(() => {
      // Trigger exit animation/unmount via AnimatePresence
      setHide(true);

      // Notify parent when overlay is gone (homepage can reveal safely)
      window.setTimeout(() => {
        onFinish?.();
      }, unmountExitMs);
    }, totalMs);

    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          className="
            fixed inset-0 z-[9999]
            overflow-hidden
            bg-black
          "
          exit={{
            opacity: 0,
            y: 12,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <div className="absolute inset-0">
            <Image
              src={
                isMobileBg
                  ? "/Images/intro/intro_20260522_060018.webp"
                  : "/Images/intro/intro_20260522_062525.webp"
              }
              alt="intro background"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/20 z-10" />

          {/* CENTER TEXT */}
          <motion.div
            initial={{
              x: -120,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              inset-0
              z-30
              flex
              flex-col
              items-center
              justify-center
              text-center
              px-6
              pointer-events-none
            "
          >
            {/* FYN */}
            <h1
              className="
                text-[72px]
                sm:text-[90px]
                md:text-[140px]
                font-[900]
                font-teko
                italic
                uppercase
                leading-[0.85]
                tracking-[0.10em]
                md:tracking-[0.08em]
                font-stretch-[expanded]
                [text-transform:uppercase]
                [transform:skewX(-6deg)]
                [text-shadow:0_0_28px_rgba(232,25,122,0.18)]
                text-[#F5F5F5]
              "
            >
              <Image
                src="/logos/fyn-logo-negative-2.png"
                alt="Fyn"
                width={320}
                height={120}
                priority
                className="h-auto w-full max-w-[520px] drop-shadow-[0_0_24px_rgba(232,25,122,0.18)]"
              />
            </h1>

            {/* TAGLINE */}
            <h2
              className="
                mt-2
                md:mt-3
                text-[22px]
                sm:text-[28px]
                md:text-[44px]
                font-[700]
                font-rajdhani
                uppercase
                tracking-[0.08em]
                leading-[1.05]
                text-white
              "
            >
              Rede
              <span className="text-[#E8197A]">FYN</span>
              ing EV Mobility
            </h2>

            {/* SUBTEXT */}
            <p
              className="
                mt-4
                md:mt-5
                text-[13px]
                sm:text-[15px]
                md:text-[22px]
                font-[500]
                font-rajdhani
                tracking-[0.08em]
                leading-[1.25]
                text-white/80
              "
            >
              India’s Largest EV Supply Ecosystem
            </p>

            {/* LINE */}
            <div
              className="
                w-[60px]
                md:w-[90px]
                h-[4px]
                bg-[#E8197A]
                mt-6
                md:mt-8
                rounded-full
              "
            />
          </motion.div>

          {/* VEHICLE */}
          <motion.div
            initial={{
              x: "-140vw",
              opacity: 1,
            }}
            animate={{
              x: "140vw",
              y: [0, -6, 0],
            }}
            transition={{
              duration: 8,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ willChange: "transform" }}
            className="
              absolute
              bottom-[-5%]
              left-[-45%]
              md:left-[-25%]

              z-40

              w-[420px]
              h-[420px]

              sm:w-[560px]
              sm:h-[560px]

              md:w-[850px]
              md:h-[850px]

              pointer-events-none
            "
          >
            <Image
              src="/Images/intro/intro_vehicle.webp"
              alt="vehicle"
              fill
              priority
              className="
                object-contain
                scale-[1]
              "
            />
          </motion.div>

          {/* SPEED LIGHT */}
          <motion.div
            initial={{
              x: "-140%",
              opacity: 0,
            }}
            animate={{
              x: "180%",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              ease: "linear",
            }}
            style={{ willChange: "transform, opacity" }}
            className="
              absolute
              bottom-[18%]
              left-0

              w-[400px]
              md:w-[1000px]

              h-[120px]
              md:h-[200px]

              bg-gradient-to-r
              from-transparent
              via-[#E8197A]/30
              to-transparent

              z-20
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
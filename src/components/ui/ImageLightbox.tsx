"use client";

import React, {
  useEffect,
  useRef,
} from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

export interface LightboxImage {
  alt: string;
  caption: string;
  label: string;
  src: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox = ({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) => {
  const touchStartXRef = useRef(0);
  const activeImage =
    activeIndex !== null
      ? images[activeIndex]
      : null;

  const goTo = (direction: -1 | 1) => {
    if (activeIndex === null) return;

    onNavigate(
      (activeIndex +
        direction +
        images.length) %
        images.length
    );
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const originalOverflow =
      document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      } else if (
        event.key === "ArrowLeft"
      ) {
        goTo(-1);
      } else if (
        event.key === "ArrowRight"
      ) {
        goTo(1);
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;
      window.removeEventListener(
        "keydown",
        onKeyDown
      );
    };
  }, [activeIndex, onClose]);

  return (
    <AnimatePresence>
      {activeImage && (
        <motion.div
          className="
            fixed inset-0 z-[120]
            flex items-center justify-center
            bg-black/92
            px-4 py-5 sm:px-6 md:px-10
            backdrop-blur-md
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onTouchStart={(event) => {
            touchStartXRef.current =
              event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            const delta =
              event.changedTouches[0].clientX -
              touchStartXRef.current;

            if (Math.abs(delta) < 48) return;

            goTo(delta > 0 ? -1 : 1);
          }}
        >
          <button
            type="button"
            aria-label="Close image preview"
            onClick={onClose}
            className="
              absolute right-4 top-4 z-20
              flex h-11 w-11 items-center justify-center
              rounded-full
              border border-white/10
              bg-white/8 text-white
              backdrop-blur-md
              transition-all duration-200
              hover:border-fyn-pink/50 hover:bg-fyn-pink/20
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-fyn-pink/70
            "
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={() => goTo(-1)}
            className="
              absolute left-3 top-1/2 z-20
              hidden h-12 w-12 -translate-y-1/2
              items-center justify-center
              rounded-full
              border border-white/10
              bg-white/8 text-white
              backdrop-blur-md
              transition-all duration-200
              hover:border-fyn-pink/50 hover:bg-fyn-pink/20
              md:flex
            "
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={() => goTo(1)}
            className="
              absolute right-3 top-1/2 z-20
              hidden h-12 w-12 -translate-y-1/2
              items-center justify-center
              rounded-full
              border border-white/10
              bg-white/8 text-white
              backdrop-blur-md
              transition-all duration-200
              hover:border-fyn-pink/50 hover:bg-fyn-pink/20
              md:flex
            "
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <motion.div
            key={activeImage.src}
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="
              relative z-10
              flex h-full max-h-[88vh] w-full max-w-6xl
              flex-col overflow-hidden
              rounded-lg
              border border-white/10
              bg-[#080808]
              shadow-[0_28px_100px_rgba(0,0,0,0.65)]
            "
          >
            <div className="relative min-h-0 flex-1 bg-black">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </div>

            <div className="border-t border-white/10 bg-[#090909]/95 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink">
                    {activeImage.label}
                  </p>
                  <p className="mt-1 max-w-3xl text-sm font-semibold leading-relaxed text-fyn-text">
                    {activeImage.caption}
                  </p>
                </div>

                <p className="text-[10px] font-mono uppercase tracking-widest text-fyn-text-muted">
                  {(activeIndex ?? 0) + 1} / {images.length}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

"use client";

import React from "react";
import { motion } from "framer-motion";

export interface StoryImageProps {
  alt: string;
  caption: string;
  className?: string;
  image: string;
  priority?: boolean;
  source: string;
  tone?: "pink" | "neutral";
}

export const StoryImage = ({
  alt,
  caption,
  className = "",
  image,
  priority = false,
  source,
  tone = "neutral",
}: StoryImageProps) => {
  const srcBase = `/images/storytelling/${image}`;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-lg border border-fyn-border/35 bg-[#0b0b0b]/80 shadow-[0_18px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      <img
        src={`${srcBase}-md.webp`}
        srcSet={`${srcBase}-sm.webp 640w, ${srcBase}-md.webp 960w, ${srcBase}-lg.webp 1400w`}
        sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw"
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/22 to-black/8" />
      <div
        className={`absolute left-0 top-0 h-full w-1 ${
          tone === "pink" ? "bg-fyn-pink/80" : "bg-white/18"
        }`}
      />

      <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink/90">
          {source}
        </p>
        <p className="mt-1 max-w-[28rem] text-sm font-semibold leading-snug text-fyn-text">
          {caption}
        </p>
      </figcaption>
    </motion.figure>
  );
};

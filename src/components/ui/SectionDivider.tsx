"use client";

import React from "react";

interface SectionDividerProps {
  direction?: "down" | "up";
  variant?: "default" | "accent";
}

/**
 * Premium Cinematic Section Divider Component
 *
 * Features:
 * - Overlapping angled cross-cut transition
 * - Negative margins create seamless section blending
 * - Layered diagonal geometry with architectural flow
 * - Compact, elegant architectural transition
 * - Dark gradients with Fyn pink accents
 * - Safari-compatible transforms (no clip-path hacks)
 * - Responsive across all breakpoints
 *
 * Overlaps adjacent sections to feel integrated into page flow
 * (not a separate rectangular band)
 */
export const SectionDivider: React.FC<
  SectionDividerProps
> = ({ direction = "down", variant = "default" }) => {
  const isPrimary = variant === "default";

  return (
    <div
      className="
        relative
        w-full
        h-12 sm:h-14 md:h-16 lg:h-20
        overflow-visible
        pointer-events-none
        z-20
        -my-6 sm:-my-7 md:-my-8 lg:-my-10
      "
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
    >
      {/* =============================================
          ARCHITECTURAL CROSS-CUT LAYER 1
          Primary angled cut with skew
      ============================================= */}
      <div
        className="absolute inset-0"
        style={{
          background:
            direction === "down"
              ? "linear-gradient(125deg, transparent 0%, rgba(8,8,8,0.6) 30%, rgba(8,8,8,0.8) 50%, rgba(15,10,13,0.7) 70%, transparent 100%)"
              : "linear-gradient(-125deg, transparent 0%, rgba(8,8,8,0.6) 30%, rgba(8,8,8,0.8) 50%, rgba(15,10,13,0.7) 70%, transparent 100%)",
          transform:
            direction === "down"
              ? "skewY(-4deg) translateZ(0)"
              : "skewY(4deg) translateZ(0)",
          WebkitTransform:
            direction === "down"
              ? "skewY(-4deg) translateZ(0)"
              : "skewY(4deg) translateZ(0)",
          transformOrigin: "center",
        }}
      />

      {/* =============================================
          FYN PINK ACCENT LAYER
          Subtle brand color diagonal stripe
      ============================================= */}
      <div
        className="absolute inset-0"
        style={{
          background:
            direction === "down"
              ? "linear-gradient(125deg, transparent 0%, transparent 35%, rgba(232, 25, 122, 0.08) 48%, rgba(232, 25, 122, 0.12) 52%, transparent 65%, transparent 100%)"
              : "linear-gradient(-125deg, transparent 0%, transparent 35%, rgba(232, 25, 122, 0.08) 48%, rgba(232, 25, 122, 0.12) 52%, transparent 65%, transparent 100%)",
          transform:
            direction === "down"
              ? "skewY(-3deg) translateZ(0)"
              : "skewY(3deg) translateZ(0)",
          WebkitTransform:
            direction === "down"
              ? "skewY(-3deg) translateZ(0)"
              : "skewY(3deg) translateZ(0)",
        }}
      />

      {/* =============================================
          DEPTH LAYER
          Layered gradients for architectural depth
      ============================================= */}
      <div
        className="absolute inset-0"
        style={{
          background:
            direction === "down"
              ? "linear-gradient(to bottom, rgba(232, 25, 122, 0.03) 0%, transparent 50%, rgba(8, 8, 8, 0.08) 100%)"
              : "linear-gradient(to top, rgba(232, 25, 122, 0.03) 0%, transparent 50%, rgba(8, 8, 8, 0.08) 100%)",
          transform: "translateZ(0)",
        }}
      />

      {/* =============================================
          SECONDARY ANGLE LAYER
          Counter-skew for architectural complexity
      ============================================= */}
      <div
        className="absolute inset-0"
        style={{
          background:
            direction === "down"
              ? "linear-gradient(240deg, transparent 20%, rgba(15,10,13,0.4) 45%, rgba(8,8,8,0.3) 55%, transparent 80%)"
              : "linear-gradient(120deg, transparent 20%, rgba(15,10,13,0.4) 45%, rgba(8,8,8,0.3) 55%, transparent 80%)",
          transform:
            direction === "down"
              ? "skewY(2deg) translateZ(0)"
              : "skewY(-2deg) translateZ(0)",
          WebkitTransform:
            direction === "down"
              ? "skewY(2deg) translateZ(0)"
              : "skewY(-2deg) translateZ(0)",
          opacity: 0.5,
        }}
      />

      {/* =============================================
          EDGE ACCENT TOP
          Architectural line definition
      ============================================= */}
      <div
        className="
          absolute
          top-0 left-0 right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#E8197A]/20
          to-transparent
        "
        style={{
          transform: "translateZ(0)",
        }}
      />

      {/* =============================================
          EDGE ACCENT BOTTOM
          Architectural line definition
      ============================================= */}
      <div
        className="
          absolute
          bottom-0 left-0 right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#E8197A]/15
          to-transparent
        "
        style={{
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
};

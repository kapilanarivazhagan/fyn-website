"use client";

import React from "react";

type SectionBackgroundVariant =
  | "about"
  | "vision"
  | "ecosystem"
  | "operations"
  | "platforms"
  | "refynd"
  | "infynity"
  | "impact"
  | "partners"
  | "investors"
  | "media"
  | "careers"
  | "involved";

const IMAGE_BASE = "/Images/sections";

const cinematicBackgrounds: Record<
  SectionBackgroundVariant,
  {
    desktop: string;
    mobile: string;
    desktopPosition?: string;
    mobilePosition?: string;
    overlay?: number;
    mobileOverlay?: number;
  }
> = {
  about: {
    desktop: `${IMAGE_BASE}/about_desktop.webp`,
    mobile: `${IMAGE_BASE}/about_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center",
    overlay: 0.50,
    mobileOverlay: 0.64,
  },

  vision: {
    desktop: `${IMAGE_BASE}/vision_desktop.webp`,
    mobile: `${IMAGE_BASE}/vision_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center bottom",
    overlay: 0.52,
    mobileOverlay: 0.64,
  },

  ecosystem: {
    desktop: `${IMAGE_BASE}/ecosystem_desktop.webp`,
    mobile: `${IMAGE_BASE}/ecosystem_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center",
    overlay: 0.28,
    mobileOverlay: 0.40,
  },

  operations: {
    desktop: `${IMAGE_BASE}/what_we_do_desktop.webp`,
    mobile: `${IMAGE_BASE}/what_we_do_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center bottom",
    overlay: 0.52,
    mobileOverlay: 0.64,
  },

  platforms: {
    desktop: `${IMAGE_BASE}/platform_desktop.webp`,
    mobile: `${IMAGE_BASE}/platform_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center bottom",
    overlay: 0.52,
    mobileOverlay: 0.64,
  },

  refynd: {
    desktop: `${IMAGE_BASE}/refynd_desktop.webp`,
    mobile: `${IMAGE_BASE}/refynd_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center",
    overlay: 0.52,
    mobileOverlay: 0.64,
  },

  infynity: {
    desktop: `${IMAGE_BASE}/infynity_desktop.webp`,
    mobile: `${IMAGE_BASE}/infynity_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center bottom",
    overlay: 0.52,
    mobileOverlay: 0.64,
  },

  impact: {
    desktop: `${IMAGE_BASE}/fleet_desktop.webp`,
    mobile: `${IMAGE_BASE}/fleet_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center",
    overlay: 0.52,
    mobileOverlay: 0.64,
  },

  partners: {
    desktop: `${IMAGE_BASE}/clients_desktop.webp`,
    mobile: `${IMAGE_BASE}/clients_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center bottom",
    overlay: 0.52,
    mobileOverlay: 0.64,
  },

  investors: {
    desktop: `${IMAGE_BASE}/investors_desktop.webp`,
    mobile: `${IMAGE_BASE}/investors_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center",
    overlay: 0.52,
    mobileOverlay: 0.64,
  },

  media: {
    desktop: `${IMAGE_BASE}/media_desktop.webp`,
    mobile: `${IMAGE_BASE}/media_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center",
    overlay: 0.52,
    mobileOverlay: 0.64,
  },

  careers: {
    desktop: `${IMAGE_BASE}/careers_desktop.webp`,
    mobile: `${IMAGE_BASE}/careers_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center bottom",
    overlay: 0.52,
    mobileOverlay: 0.64,
  },

  involved: {
    desktop: `${IMAGE_BASE}/get_involved_desktop.webp`,
    mobile: `${IMAGE_BASE}/get_involved_mobile.webp`,
    desktopPosition: "center",
    mobilePosition: "center",
    overlay: 0.52,
    mobileOverlay: 0.64,
  },
};

interface SectionBackgroundProps {
  variant?: SectionBackgroundVariant;
}

export const SectionBackground = ({
  variant = "about",
}: SectionBackgroundProps) => {
  const background = cinematicBackgrounds[variant];
  const overlay = background.overlay ?? 0.58;
  const mobileOverlay = background.mobileOverlay ?? 0.72;

  return (
    <>
      {/* BACKGROUND IMAGE LAYER
          Uses <img loading="lazy"> instead of CSS background-image so the
          browser's lazy-load threshold (~1200px) applies even inside
          contain:paint cinematic layers. CSS background-image inside
          contain:paint can be deferred until the element is painted, causing
          a blank/black background on fast scroll. */}
      <div className="section-bg-image absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* DESKTOP IMAGE */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={background.desktop}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: background.desktopPosition ?? "center",
            transform: "scale(1.04) translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden" as React.CSSProperties["WebkitBackfaceVisibility"],
          }}
        />

        {/* MOBILE IMAGE */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={background.mobile}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="block md:hidden absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: background.mobilePosition ?? "center",
            transform: "scale(1.04) translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden" as React.CSSProperties["WebkitBackfaceVisibility"],
          }}
        />

        {/* DESKTOP GRADIENT OVERLAY — separate from image element so no
            filter compositor layer is needed on the image itself */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 72% 35%, rgba(232, 25, 122, 0.08), transparent 34%),
              linear-gradient(
                to bottom,
                rgba(8, 8, 8, ${overlay}),
                rgba(8, 8, 8, ${(overlay * 0.72).toFixed(2)}),
                rgba(8, 8, 8, ${overlay})
              )
            `,
          }}
        />

        {/* MOBILE GRADIENT OVERLAY */}
        <div
          className="block md:hidden absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 82%, rgba(232, 25, 122, 0.06), transparent 36%),
              linear-gradient(
                to bottom,
                rgba(8, 8, 8, ${mobileOverlay}),
                rgba(8, 8, 8, ${(mobileOverlay * 0.72).toFixed(2)}),
                rgba(8, 8, 8, ${mobileOverlay})
              )
            `,
          }}
        />
      </div>

      {/* CINEMATIC OVERLAYS — no backdrop-filter; the removed
          lg:backdrop-blur-[1px] was creating a compositor layer per section */}
      <div className="section-bg-overlay absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-[#080808]/08" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/18 via-[#080808]/05 to-[#080808]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/15 via-transparent to-[#080808]/15" />
      </div>

      {/* AMBIENT GLOW — reduced blur radii (80px→28px, 90px→32px);
          these are near-invisible at 0.03/0.025 opacity but were creating
          large compositing surfaces at the original radii */}
      <div
        className="section-bg-glow absolute inset-0 z-[2] pointer-events-none"
      >
        <div
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-fyn-pink/[0.03] blur-[28px]"
        />
        <div
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-fyn-pink/[0.025] blur-[32px]"
        />
      </div>
    </>
  );
};

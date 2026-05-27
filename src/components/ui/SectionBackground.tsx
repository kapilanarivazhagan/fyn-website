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

  return (
    <>
      {/* RESPONSIVE BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none safari-gpu">

        {/* DESKTOP */}
        <div
          className="hidden md:block absolute inset-0 safari-gpu"
          style={{
            backgroundImage: `
              radial-gradient(circle at 72% 35%, rgba(232, 25, 122, 0.08), transparent 34%),
              linear-gradient(
                to bottom,
                rgba(8, 8, 8, ${background.overlay ?? 0.58}),
                rgba(8, 8, 8, ${background.overlay ?? 0.42}),
                rgba(8, 8, 8, ${background.overlay ?? 0.68})
              ),
              url('${background.desktop}')
            `,
            backgroundSize: "cover",
            backgroundPosition:
              background.desktopPosition ?? "center",
            backgroundRepeat: "no-repeat",
            transform: "translateZ(0)",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />

        {/* MOBILE */}
        <div
          className="block md:hidden absolute inset-0 safari-gpu"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 82%, rgba(232, 25, 122, 0.06), transparent 36%),
              linear-gradient(
                to bottom,
                rgba(8, 8, 8, ${background.mobileOverlay ?? 0.72}),
                rgba(8, 8, 8, ${background.mobileOverlay ?? 0.52}),
                rgba(8, 8, 8, ${background.mobileOverlay ?? 0.78})
              ),
              url('${background.mobile}')
            `,
            backgroundSize: "cover",
            backgroundPosition:
              background.mobilePosition ?? "center",
            backgroundRepeat: "no-repeat",
            transform: "translateZ(0)",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />
      </div>

      {/* HERO-STYLE CINEMATIC OVERLAYS */}
      <div className="absolute inset-0 z-[1] pointer-events-none safari-gpu">

        {/* Soft cinematic darkness */}
        <div className="absolute inset-0 bg-[#080808]/08" />

        {/* Vertical cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/18 via-[#080808]/05 to-[#080808]/30" />

        {/* Horizontal cinematic contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/15 via-transparent to-[#080808]/15" />

        {/* EXACT HERO BLUR STYLE */}
        <div className="absolute inset-0 bg-[#080808]/10 md:backdrop-blur-[2px]" />
      </div>

      {/* HERO-STYLE AMBIENT GLOW */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none safari-gpu"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        {/* TOP LEFT GLOW */}
        <div
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-fyn-pink/[0.03] blur-[80px]"
          style={{
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        />

        {/* BOTTOM RIGHT GLOW */}
        <div
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-fyn-pink/[0.025] blur-[90px]"
          style={{
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        />
      </div>
    </>
  );
};

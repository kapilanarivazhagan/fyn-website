"use client";

import React, { useState, useEffect } from "react";

import IntroLoader from "../components/intro/IntroLoader";

import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionAtmosphere } from "../components/ui/SectionAtmosphere";
import { ScrollToTopButton } from "../components/ui/ScrollToTopButton";

import { Hero } from "../components/sections/Hero";

import { About } from "../components/sections/About";
import { VisionMission } from "../components/sections/VisionMission";
import { Leadership } from "../components/sections/Leadership";
import { Ecosystem } from "../components/sections/Ecosystem";
import { GetInvolved } from "../components/sections/GetInvolved";

import { WhatWeDo } from "../components/sections/WhatWeDo";
import { LastMileBrands } from "../components/sections/LastMileBrands";
import { Platforms } from "../components/sections/Platforms";
import { FleetImpact } from "../components/sections/FleetImpact";

import { Refynd } from "../components/sections/Refynd";
import { Infynity } from "../components/sections/Infynity";

import { ClientsPartners } from "../components/sections/ClientsPartners";
import { Investors } from "../components/sections/Investors";

import { Media } from "../components/sections/Media";
import { Careers } from "../components/sections/Careers";

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

const hashRoutes: Record<
  string,
  { view: ViewType; targetId: string }
> = {
  "about-us": { view: "about", targetId: "about-us" },
  "vision-mission": { view: "vision", targetId: "vision-mission" },
  "future-of-fyn": { view: "vision", targetId: "future-of-fyn" },
  "what-we-do": { view: "what-we-do", targetId: "what-we-do" },
  ecosystem: { view: "what-we-do", targetId: "ecosystem" },
  platforms: { view: "what-we-do", targetId: "platforms" },
  "fleet-impact": { view: "what-we-do", targetId: "fleet-impact" },
  refynd: { view: "refynd", targetId: "refynd" },
  infynity: { view: "infynity", targetId: "infynity" },
  "clients-partners": { view: "clients", targetId: "clients-partners" },
  "financial-banking": { view: "clients", targetId: "financial-banking" },
  media: { view: "media", targetId: "media" },
  careers: { view: "careers", targetId: "careers" },
  "get-involved": { view: "get-involved", targetId: "get-involved" },
  "get-involved-invest": { view: "get-involved", targetId: "get-involved" },
  "get-involved-enterprise": {
    view: "get-involved",
    targetId: "get-involved",
  },
  "get-involved-refynd": { view: "get-involved", targetId: "get-involved" },
  "get-involved-infynity": {
    view: "get-involved",
    targetId: "get-involved",
  },
  "get-involved-drive": { view: "get-involved", targetId: "get-involved" },
  home: { view: "home", targetId: "" },
};

export default function Home() {
  const [showIntro, setShowIntro] =
    useState(true);

  const [activeView, setActiveView] =
    useState<ViewType>("home");

  /* =========================================
     HASH-BASED VIEW NAVIGATION
  ========================================= */

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
        .replace(/^#/, "")
        .toLowerCase();

      if (!hash) {
        setActiveView("home");
        return;
      }

      if (hashRoutes[hash]) {
        setActiveView(hashRoutes[hash].view);
      }
    };

    handleHashChange();
    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, []);

  /* =========================================
     SCROLL TO SECTION WHEN VIEW CHANGES
  ========================================= */

  useEffect(() => {
    const hash = window.location.hash
      .replace(/^#/, "")
      .toLowerCase();

    if (!hash) return;

    const targetId = hashRoutes[hash]?.targetId ?? hash;

    const timeoutId = setTimeout(() => {
      const section = document.getElementById(targetId);

      if (section) {
        const navbarOffset = 96;
        const targetTop =
          section.getBoundingClientRect().top +
          window.scrollY -
          navbarOffset;

        window.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: "smooth",
        });
      }
    }, 160);

    return () =>
      clearTimeout(timeoutId);
  }, [activeView]);

  return (
    <>
      <div
        className="
          relative
          min-h-screen
          bg-[#080808]
          overflow-x-hidden
        "
      >
        {/* NAVBAR */}

        <Navbar
          activeView={activeView}
          setActiveView={setActiveView}
        />

        {/* MAIN CONTENT */}

        <main className="relative z-10">
          {/* =========================================
              HOME / HERO
          ========================================= */}

          {activeView === "home" && (
            <>
              <Hero
                introComplete={!showIntro}
                setActiveView={
                  setActiveView
                }
              />
            </>
          )}

          {/* =========================================
              ABOUT US
          ========================================= */}

          {activeView === "about" && (
            <>
              <SectionAtmosphere exit tone="warm">
                <About />
              </SectionAtmosphere>
              <SectionAtmosphere enter exit>
                <VisionMission />
              </SectionAtmosphere>
              <SectionAtmosphere enter exit tone="deep">
                <Leadership />
              </SectionAtmosphere>
              <SectionAtmosphere enter exit>
                <Ecosystem />
              </SectionAtmosphere>
              <SectionAtmosphere enter>
                <GetInvolved />
              </SectionAtmosphere>

              <Footer />
            </>
          )}

          {/* =========================================
              VISION & MISSION
          ========================================= */}

          {activeView === "vision" && (
            <>
              <SectionAtmosphere exit>
                <VisionMission />
              </SectionAtmosphere>
              <SectionAtmosphere enter exit tone="warm">
                <LastMileBrands />
              </SectionAtmosphere>
              <SectionAtmosphere enter tone="deep">
                <Investors />
              </SectionAtmosphere>

              <Footer />
            </>
          )}

          {/* =========================================
              WHAT WE DO
          ========================================= */}

          {activeView ===
            "what-we-do" && (
            <>
              <SectionAtmosphere exit>
                <WhatWeDo />
              </SectionAtmosphere>
              <SectionAtmosphere enter exit>
                <Ecosystem />
              </SectionAtmosphere>
              <SectionAtmosphere enter exit tone="warm">
                <Platforms />
              </SectionAtmosphere>
              <SectionAtmosphere enter tone="deep">
                <FleetImpact />
              </SectionAtmosphere>

              <Footer />
            </>
          )}

          {/* =========================================
              REFYND
          ========================================= */}

          {activeView === "refynd" && (
            <>
              <Refynd />

              <Footer />
            </>
          )}

          {/* =========================================
              INFYNITY
          ========================================= */}

          {activeView ===
            "infynity" && (
            <>
              <Infynity />

              <Footer />
            </>
          )}

          {/* =========================================
              CLIENTS & PARTNERS
          ========================================= */}

          {activeView === "clients" && (
            <>
              <SectionAtmosphere exit>
                <ClientsPartners />
              </SectionAtmosphere>
              <SectionAtmosphere enter tone="deep">
                <Investors />
              </SectionAtmosphere>

              <Footer />
            </>
          )}

          {/* =========================================
              MEDIA
          ========================================= */}

          {activeView === "media" && (
            <>
              <Media />

              <Footer />
            </>
          )}

          {/* =========================================
              OUR CULTURE & CAREERS
          ========================================= */}

          {activeView === "careers" && (
            <>
              <SectionAtmosphere exit tone="warm">
                <Careers />
              </SectionAtmosphere>
              <SectionAtmosphere enter>
                <GetInvolved />
              </SectionAtmosphere>

              <Footer />
            </>
          )}

          {/* =========================================
              GET INVOLVED ONLY
          ========================================= */}

          {activeView ===
            "get-involved" && (
            <>
              <GetInvolved />

              <Footer />
            </>
          )}
        </main>

        <ScrollToTopButton />
      </div>

      {/* INTRO LOADER */}

      {showIntro && (
        <IntroLoader
          onFinish={() =>
            setShowIntro(false)
          }
        />
      )}
    </>
  );
}

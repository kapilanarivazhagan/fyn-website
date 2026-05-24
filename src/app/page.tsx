"use client";

import React, { useState } from "react";

import IntroLoader from "../components/intro/IntroLoader";

import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

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

export default function Home() {
  const [showIntro, setShowIntro] =
    useState(true);

  const [activeView, setActiveView] =
    useState<ViewType>("home");

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
              <About />

              <VisionMission />

              <Leadership />

              <Ecosystem />

              <GetInvolved />

              <Footer />
            </>
          )}

          {/* =========================================
              VISION & MISSION
          ========================================= */}

          {activeView === "vision" && (
            <>
              <VisionMission />

              <LastMileBrands />

              <Investors />

              <Footer />
            </>
          )}

          {/* =========================================
              WHAT WE DO
          ========================================= */}

          {activeView ===
            "what-we-do" && (
            <>
              <WhatWeDo />

              <Ecosystem />

              <Platforms />

              <FleetImpact />

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
              <ClientsPartners />

              <Investors />

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
              <Careers />

              <GetInvolved />

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
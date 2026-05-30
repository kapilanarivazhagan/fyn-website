"use client";

import React from "react";
import dynamic from "next/dynamic";

import IntroLoader from "../components/intro/IntroLoader";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionAtmosphere } from "../components/ui/SectionAtmosphere";
import { ScrollToTopButton } from "../components/ui/ScrollToTopButton";
import { ScrollToBottomButton } from "../components/ui/ScrollToBottomButton";

import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { VisionMission } from "../components/sections/VisionMission";
import { Leadership } from "../components/sections/Leadership";

import { useIntroLoader } from "../hooks/useIntroLoader";
import { useHashNavigation } from "../hooks/useHashNavigation";
import { useScrollSpy } from "../hooks/useScrollSpy";

const WhatWeDo = dynamic(
  () => import("../components/sections/WhatWeDo").then((mod) => mod.WhatWeDo),
  { ssr: true }
);
const Ecosystem = dynamic(
  () => import("../components/sections/Ecosystem").then((mod) => mod.Ecosystem),
  { ssr: true }
);
const Platforms = dynamic(
  () => import("../components/sections/Platforms").then((mod) => mod.Platforms),
  { ssr: true }
);
const FleetImpact = dynamic(
  () => import("../components/sections/FleetImpact").then((mod) => mod.FleetImpact),
  { ssr: true }
);
const ClientsPartners = dynamic(
  () => import("../components/sections/ClientsPartners").then((mod) => mod.ClientsPartners),
  { ssr: true }
);
const Investors = dynamic(
  () => import("../components/sections/Investors").then((mod) => mod.Investors),
  { ssr: true }
);
const Media = dynamic(
  () => import("../components/sections/Media").then((mod) => mod.Media),
  { ssr: true }
);
const Refynd = dynamic(
  () => import("../components/sections/Refynd").then((mod) => mod.Refynd),
  { ssr: true }
);
const Infynity = dynamic(
  () => import("../components/sections/Infynity").then((mod) => mod.Infynity),
  { ssr: true }
);
const Careers = dynamic(
  () => import("../components/sections/Careers").then((mod) => mod.Careers),
  { ssr: true }
);
const GetInvolved = dynamic(
  () => import("../components/sections/GetInvolved").then((mod) => mod.GetInvolved),
  { ssr: true }
);

export default function Home() {
  const { showIntro, handleIntroFinish } = useIntroLoader();
  const { scrollToTarget, handleMajorNavigate, handleSetActiveView } = useHashNavigation();
  const navActiveView = useScrollSpy(showIntro);

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
          activeView={navActiveView}
          onNavigate={handleMajorNavigate}
          onConnect={() => scrollToTarget("get-involved")}
        />

        {/* MAIN CONTENT */}

        <main className="relative z-10">
          <div id="home-master" className="cinematic-layer-stack">
            <div className="cinematic-layer" style={{ "--layer-index": 1 } as React.CSSProperties}>
              <Hero introComplete={!showIntro} setActiveView={handleSetActiveView} />
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 2 } as React.CSSProperties}>
              <SectionAtmosphere exit tone="warm">
                <About />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 3 } as React.CSSProperties}>
              <SectionAtmosphere enter exit>
                <VisionMission />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 4 } as React.CSSProperties}>
              <SectionAtmosphere enter exit tone="deep">
                <Leadership />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 5 } as React.CSSProperties}>
              <SectionAtmosphere enter exit>
                <WhatWeDo />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 6 } as React.CSSProperties}>
              <SectionAtmosphere enter exit tone="warm">
                <Ecosystem />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 7 } as React.CSSProperties}>
              <SectionAtmosphere enter exit>
                <Platforms />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 8 } as React.CSSProperties}>
              <SectionAtmosphere enter exit tone="deep">
                <FleetImpact />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 9 } as React.CSSProperties}>
              <SectionAtmosphere enter exit>
                <ClientsPartners />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 10 } as React.CSSProperties}>
              <SectionAtmosphere enter exit tone="deep">
                <Investors />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 11 } as React.CSSProperties}>
              <SectionAtmosphere enter exit>
                <Media />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 12 } as React.CSSProperties}>
              <SectionAtmosphere enter exit>
                <Refynd />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 13 } as React.CSSProperties}>
              <SectionAtmosphere enter exit tone="deep">
                <Infynity />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 14 } as React.CSSProperties}>
              <SectionAtmosphere enter exit tone="warm">
                <Careers />
              </SectionAtmosphere>
            </div>

            <div className="cinematic-layer" style={{ "--layer-index": 15 } as React.CSSProperties}>
              <SectionAtmosphere enter>
                <GetInvolved />
              </SectionAtmosphere>
            </div>

            <Footer />
          </div>
        </main>

        <ScrollToTopButton />
        <ScrollToBottomButton />
      </div>

      {/* INTRO LOADER */}

      {showIntro && <IntroLoader onFinish={handleIntroFinish} />}
    </>
  );
}

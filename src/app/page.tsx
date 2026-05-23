"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import IntroLoader from "../components/intro/IntroLoader";
import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { VisionMission } from "../components/sections/VisionMission";
import { Ecosystem } from "../components/sections/Ecosystem";
import { WhatWeDo } from "../components/sections/WhatWeDo";
import { Platforms } from "../components/sections/Platforms";
import { Refynd } from "../components/sections/Refynd";
import { Infynity } from "../components/sections/Infynity";
import { FleetImpact } from "../components/sections/FleetImpact";
import { ClientsPartners } from "../components/sections/ClientsPartners";
import { Investors } from "../components/sections/Investors";
import { Leadership } from "../components/sections/Leadership";
import { Media } from "../components/sections/Media";
import { GetInvolved } from "../components/sections/GetInvolved";
import { Careers } from "../components/sections/Careers";
import { Footer } from "../components/layout/Footer";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  // Always show: hero, about (on default). When a section is selected, show: hero, selected, footer
  // This ensures single-section-at-a-time behavior (not accumulative)
  const visibleSections = activeSectionId 
    ? ["hero", activeSectionId]  // Show only hero + selected section
    : ["hero", "about-us"];       // Default: show hero + about

  useEffect(() => {
    const handler = (e: any) => {
      const id = e?.detail?.id;
      if (!id) return;
      setActiveSectionId(id);
      // Allow the section to mount then scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 280);
    };
    window.addEventListener("fyn:open-section", handler as EventListener);
    return () => window.removeEventListener("fyn:open-section", handler as EventListener);
  }, []);

  return (
    <>
      <div className="relative min-h-screen bg-[#080808]">
          {/* Cinematic global background layer */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/Images/intro/ChatGPT Image May 23, 2026, 07_20_23 PM.png"
              alt=""
              fill
              className="object-cover object-center opacity-5 md:opacity-8"
              sizes="100vw"
              priority={false}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/80 to-[#080808]/90" />
          </div>

          <Navbar />
          <main className="relative z-10">
            {visibleSections.includes("hero") && <Hero introComplete={!showIntro} />}
            {visibleSections.includes("about-us") && <About />}
            {visibleSections.includes("vision-mission") && <VisionMission />}
            {visibleSections.includes("what-we-do") && <WhatWeDo />}
            {visibleSections.includes("refynd") && <Refynd />}
            {visibleSections.includes("infynity") && <Infynity />}
            {visibleSections.includes("fleet-impact") && <FleetImpact />}
            {visibleSections.includes("clients-partners") && <ClientsPartners />}
            {visibleSections.includes("investors") && <Investors />}
            {visibleSections.includes("leadership") && <Leadership />}
            {visibleSections.includes("media") && <Media />}
            {visibleSections.includes("get-involved") && <GetInvolved />}
            {visibleSections.includes("careers") && <Careers />}
            {visibleSections.includes("platforms") && <Platforms />}
            {visibleSections.includes("ecosystem") && <Ecosystem />}
          </main>
          <Footer />
      </div>
      {showIntro && (
        <IntroLoader onFinish={() => setShowIntro(false)} />
      )}
    </>
  );
}

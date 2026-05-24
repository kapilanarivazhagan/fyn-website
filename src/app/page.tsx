"use client";

import React, { useState } from "react";
import IntroLoader from "../components/intro/IntroLoader";
import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { VisionMission } from "../components/sections/VisionMission";
import { WhatWeDo } from "../components/sections/WhatWeDo";
import { LastMileBrands } from "../components/sections/LastMileBrands";
import { Ecosystem } from "../components/sections/Ecosystem";
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
import { ConnectWithUs } from "../components/sections/ConnectWithUs";
import { Footer } from "../components/layout/Footer";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <div className="relative min-h-screen bg-[#080808]">
        <div className="relative z-10">
          <Navbar />

          <main>
            <Hero introComplete={!showIntro} />
            <About />
            <VisionMission />
            <WhatWeDo />
            <LastMileBrands />
            <Ecosystem />
            <Platforms />
            <Refynd />
            <Infynity />
            <FleetImpact />
            <ClientsPartners />
            <Investors />
            <Leadership />
            <Media />
            <GetInvolved />
            <Careers />
          </main>

          <Footer />
        </div>
      </div>

      {showIntro && (
        <IntroLoader onFinish={() => setShowIntro(false)} />
      )}
    </>
  );
}
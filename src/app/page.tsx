"use client";

import React, {
  useCallback,
  useState,
  useEffect,
} from "react";

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
import { Ecosystem } from "../components/sections/Ecosystem";
import { GetInvolved } from "../components/sections/GetInvolved";

import { WhatWeDo } from "../components/sections/WhatWeDo";
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

type MajorView =
  | "home"
  | "about"
  | "vision"
  | "what-we-do"
  | "refynd"
  | "infynity"
  | "clients"
  | "media"
  | "careers";

const majorSectionTargets: Record<
  MajorView,
  string
> = {
  home: "home-master",
  about: "about-us",
  vision: "vision-mission",
  "what-we-do": "what-we-do",
  refynd: "refynd",
  infynity: "infynity",
  clients: "clients-partners",
  media: "media",
  careers: "careers",
};

const legacyContentTargets: Record<
  ViewType,
  string
> = {
  home: "home-master",
  about: "about-us",
  vision: "vision-mission",
  "what-we-do": "what-we-do",
  refynd: "refynd",
  infynity: "infynity",
  clients: "clients-partners",
  media: "media",
  careers: "careers",
  "get-involved": "get-involved",
};

const hashTargets: Record<string, string> = {
  home: "home-master",
  "about-us": "about-us",
  about: "about-us",
  "vision-mission": "vision-mission",
  vision: "vision-mission",
  "what-we-do": "what-we-do",
  ecosystem: "ecosystem",
  platforms: "platforms",
  "fleet-impact": "fleet-impact",
  refynd: "refynd",
  infynity: "infynity",
  "clients-partners": "clients-partners",
  clients: "clients-partners",
  "financial-banking": "financial-banking",
  media: "media",
  careers: "careers",
  "culture-careers": "careers",
  "get-involved": "get-involved",
};

const majorScrollSections: {
  id: string;
  view: MajorView;
}[] = [
  { id: "hero", view: "home" },
  { id: "about-us", view: "about" },
  { id: "vision-mission", view: "vision" },
  { id: "leadership", view: "about" },
  { id: "what-we-do", view: "what-we-do" },
  { id: "ecosystem", view: "what-we-do" },
  { id: "platforms", view: "what-we-do" },
  { id: "fleet-impact", view: "what-we-do" },
  { id: "clients-partners", view: "clients" },
  { id: "financial-banking", view: "clients" },
  { id: "media", view: "media" },
  { id: "refynd", view: "refynd" },
  { id: "infynity", view: "infynity" },
  { id: "careers", view: "careers" },
];

export default function Home() {
  const [showIntro, setShowIntro] =
    useState(true);

  const [navActiveView, setNavActiveView] =
    useState<MajorView>("home");

  const scrollToTarget = useCallback(
    (targetId: string) => {
      if (
        typeof window === "undefined" ||
        typeof document === "undefined"
      ) {
        return;
      }

      if (targetId === "home-master") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const section =
        document.getElementById(targetId);

      if (!section) return;

      const navbarOffset = 96;
      const targetTop =
        section.getBoundingClientRect().top +
        window.scrollY -
        navbarOffset;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: "smooth",
      });
    },
    []
  );

  const handleMajorNavigate = useCallback(
    (view: MajorView) => {
      scrollToTarget(
        majorSectionTargets[view]
      );
    },
    [scrollToTarget]
  );

  const handleSetActiveView = useCallback<
    React.Dispatch<
      React.SetStateAction<ViewType>
    >
  >(
    (value) => {
      const next =
        typeof value === "function"
          ? value("home")
          : value;

      scrollToTarget(
        legacyContentTargets[next]
      );
    },
    [scrollToTarget]
  );

  /* =========================================
     HASH-BASED VIEW NAVIGATION
  ========================================= */

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
        .replace(/^#/, "")
        .toLowerCase();

      if (!hash) {
        scrollToTarget("home-master");
        return;
      }

      if (hashTargets[hash]) {
        scrollToTarget(
          hashTargets[hash]
        );
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
  }, [scrollToTarget]);

  /* =========================================
     NAVBAR SCROLLSPY
  ========================================= */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mountedSections =
      majorScrollSections
        .map((section) => ({
          ...section,
          element:
            document.getElementById(
              section.id
            ),
        }))
        .filter(
          (
            section
          ): section is {
            id: string;
            view: MajorView;
            element: HTMLElement;
          } => Boolean(section.element)
        );

    if (!mountedSections.length) {
      setNavActiveView("home");
      return;
    }

    let rafId = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (window.scrollY < 140) {
          setNavActiveView((current) =>
            current === "home"
              ? current
              : "home"
          );
          return;
        }

        const viewportHeight =
          window.innerHeight;
        const navOffset = 96;
        const focusLine = Math.max(
          navOffset + 24,
          viewportHeight * 0.42
        );

        let activeCandidate:
          | {
              view: MajorView;
              score: number;
            }
          | undefined;

        let visibleCandidate:
          | {
              view: MajorView;
              score: number;
            }
          | undefined;

        mountedSections.forEach(
          ({ view, element }) => {
            const rect =
              element.getBoundingClientRect();

            const visibleTop = Math.max(
              rect.top,
              navOffset
            );
            const visibleBottom = Math.min(
              rect.bottom,
              viewportHeight
            );
            const visiblePixels =
              Math.max(
                0,
                visibleBottom - visibleTop
              );

            if (visiblePixels <= 0) return;

            const sectionWindow =
              Math.max(
                1,
                Math.min(
                  rect.height,
                  viewportHeight - navOffset
                )
              );
            const visibleRatio =
              visiblePixels / sectionWindow;
            const ownsFocusLine =
              rect.top <= focusLine &&
              rect.bottom >= focusLine;
            const topProximity =
              1 -
              Math.min(
                Math.abs(
                  rect.top - navOffset
                ) / viewportHeight,
                1
              );

            const visibleScore =
              visibleRatio * 0.8 +
              topProximity * 0.2;

            if (
              !visibleCandidate ||
              visibleScore >
                visibleCandidate.score
            ) {
              visibleCandidate = {
                view,
                score: visibleScore,
              };
            }

            if (!ownsFocusLine) return;

            const focusDistance =
              Math.abs(
                rect.top - focusLine
              );
            const focusScore =
              1 -
              Math.min(
                focusDistance /
                  viewportHeight,
                1
              );

            if (
              !activeCandidate ||
              focusScore >
                activeCandidate.score
            ) {
              activeCandidate = {
                view,
                score: focusScore,
              };
            }
          }
        );

        const nextView =
          activeCandidate?.view ??
          visibleCandidate?.view ??
          "home";

        setNavActiveView((current) =>
          current === nextView
            ? current
            : nextView
        );
      });
    };

    const observer =
      new IntersectionObserver(
        updateActiveSection,
        {
          root: null,
          rootMargin:
            "-96px 0px -32% 0px",
          threshold: [
            0,
            0.1,
            0.25,
            0.5,
            0.75,
            1,
          ],
        }
      );

    mountedSections.forEach(
      ({ element }) =>
        observer.observe(element)
    );

    updateActiveSection();
    window.addEventListener(
      "scroll",
      updateActiveSection,
      { passive: true }
    );
    window.addEventListener(
      "resize",
      updateActiveSection
    );

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener(
        "scroll",
        updateActiveSection
      );
      window.removeEventListener(
        "resize",
        updateActiveSection
      );
    };
  }, [showIntro]);

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
          onNavigate={
            handleMajorNavigate
          }
          onConnect={() =>
            scrollToTarget("get-involved")
          }
        />

        {/* MAIN CONTENT */}

        <main className="relative z-10">
          <div
            id="home-master"
            className="cinematic-layer-stack"
          >
            <div className="cinematic-layer" style={{ "--layer-index": 1 } as React.CSSProperties}>
              <Hero
                introComplete={!showIntro}
                setActiveView={
                  handleSetActiveView
                }
              />
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

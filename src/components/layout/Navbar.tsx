"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { Button } from "../ui/Button";

type ViewType =
  | "home"
  | "about"
  | "vision"
  | "what-we-do"
  | "refynd"
  | "infynity"
  | "clients"
  | "media"
  | "careers";

interface NavbarProps {
  activeView: ViewType;
  setActiveView: React.Dispatch<
    React.SetStateAction<ViewType>
  >;
}

export const Navbar = ({
  activeView,
  setActiveView,
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  /* =========================================
     SCROLL DETECTION
  ========================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =========================================
     MOBILE MENU BODY LOCK
  ========================================= */

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow =
        mobileMenuOpen
          ? "hidden"
          : "unset";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow =
          "unset";
      }
    };
  }, [mobileMenuOpen]);

  /* =========================================
     DEBUG MARKER
  ========================================= */

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(
        "Navbar mounted (cinematic grouped-view)"
      );
    }
  }, []);

  /* =========================================
     NAVIGATION LINKS
  ========================================= */

  const navLinks: {
    label: string;
    view: ViewType;
  }[] = [
    {
      label: "Home",
      view: "home",
    },
    {
      label: "About Us",
      view: "about",
    },
    {
      label: "Vision & Mission",
      view: "vision",
    },
    {
      label: "What We Do",
      view: "what-we-do",
    },
    {
      label: "Refynd",
      view: "refynd",
    },
    {
      label: "INFYNITY",
      view: "infynity",
    },
    {
      label: "Clients & Partners",
      view: "clients",
    },
    {
      label: "Media",
      view: "media",
    },
    {
      label: "Our Culture & Careers",
      view: "careers",
    },
  ];

  /* =========================================
     VIEW SWITCH HANDLER
  ========================================= */

  const handleViewChange = (
    view: ViewType
  ) => {
    setActiveView(view);

    setMobileMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header
        id="fyn-navbar-cinematic"
        data-nav-canonical="true"
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          font-barlow
          ${
            scrolled
              ? "backdrop-blur-md bg-[#080808]/85 border-b border-fyn-pink/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
              : "bg-transparent py-5 border-b border-transparent"
          }
        `}
      >
        <div
          className="
            max-w-7xl mx-auto
            px-4 sm:px-6 md:px-12
            flex items-center justify-between
          "
        >
          {/* LOGO */}
          <button
            onClick={() =>
              handleViewChange("home")
            }
            className="
              relative z-50
              flex items-center group
            "
          >
            <div
              className="
                relative
                w-28 h-9
                md:w-32 md:h-10
                transition-transform duration-300
                group-hover:scale-[1.02]
              "
            >
              <Image
                src="/logos/fyn-logo-negative-2.png"
                alt="Fyn Mobility Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </button>

          {/* DESKTOP NAV */}
          <nav
            className="
              hidden xl:flex
              items-center
              space-x-2.5 2xl:space-x-4
            "
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() =>
                  handleViewChange(
                    link.view
                  )
                }
                className={`
                  relative group whitespace-nowrap
                  py-1.5
                  text-[10px]
                  2xl:text-[11px]
                  font-bold
                  uppercase
                  tracking-wider
                  transition-colors duration-300
                  ${
                    activeView ===
                    link.view
                      ? "text-fyn-text"
                      : "text-fyn-text-muted hover:text-fyn-text"
                  }
                `}
              >
                {link.label}

                <span
                  className={`
                    absolute bottom-0 left-0
                    h-0.5
                    bg-fyn-pink
                    transition-all duration-300
                    ${
                      activeView ===
                      link.view
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }
                  `}
                />
              </button>
            ))}
          </nav>

          {/* DESKTOP CTA */}
          <div
            className="
              hidden xl:flex
              items-center ml-2
            "
          >
            <button
              onClick={() =>
                handleViewChange(
                  "careers"
                )
              }
            >
              <Button
                variant="primary"
                size="sm"
                className="
                  font-bold
                  cursor-pointer
                  text-[10px]
                  px-3 py-1.5
                  2xl:text-xs
                  2xl:px-4
                  2xl:py-1.5
                "
              >
                Connect With Us

                <ArrowRight
                  className="
                    w-3 h-3
                    2xl:w-3.5 2xl:h-3.5
                    ml-1.5
                  "
                />
              </Button>
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setMobileMenuOpen(
                (prev) => !prev
              )
            }
            className="
              xl:hidden
              relative z-50
              p-2
              text-fyn-text
              hover:text-fyn-pink
              transition-colors
              cursor-pointer
            "
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              fixed inset-0 z-40
              bg-[#080808]
              pt-24 px-8 pb-12
              flex flex-col justify-between
              overflow-y-auto
              overflow-x-hidden
              font-barlow
              xl:hidden
            "
          >
            {/* GRID BG */}
            <div
              className="
                absolute inset-0
                bg-grid-dots
                opacity-20
                pointer-events-none
              "
            />

            {/* MOBILE LINKS */}
            <div
              className="
                relative z-10
                flex flex-col
                space-y-6
              "
            >
              {navLinks.map(
                (link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay:
                        idx * 0.05,
                    }}
                  >
                    <button
                      onClick={() =>
                        handleViewChange(
                          link.view
                        )
                      }
                      className={`
                        block
                        text-left
                        text-xl
                        font-black
                        uppercase
                        tracking-tight
                        transition-colors duration-300
                        ${
                          activeView ===
                          link.view
                            ? "text-fyn-pink"
                            : "text-fyn-text hover:text-fyn-pink"
                        }
                      `}
                    >
                      {link.label}
                    </button>
                  </motion.div>
                )
              )}
            </div>

            {/* MOBILE FOOTER */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
              }}
              className="
                relative z-10
                space-y-6
                pt-6
                border-t border-fyn-border/40
              "
            >
              <div
                className="
                  flex flex-col
                  space-y-3
                "
              >
                <span
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-widest
                    text-fyn-text-muted
                  "
                >
                  Central Operations Desk
                </span>

                <span
                  className="
                    text-sm
                    font-semibold
                    text-fyn-text
                  "
                >
                  info@fynmobility.com
                </span>

                <span
                  className="
                    text-xs
                    text-fyn-text-muted
                  "
                >
                  RedeFYNing EV Mobility
                  across India
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={() =>
                  handleViewChange(
                    "careers"
                  )
                }
                className="block w-full"
              >
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Connect With Us

                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
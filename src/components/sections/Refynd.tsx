"use client";

import React from "react";

import { GlowCard } from "../ui/GlowCard";
import { Button } from "../ui/Button";

import {
  ShoppingBag,
  ShieldCheck,
  HeartHandshake,
  Percent,
} from "lucide-react";

import { motion } from "framer-motion";

import { SectionBackground } from "../ui/SectionBackground";

export const Refynd = () => {
  const pillars = [
    {
      title: "Leasing Ecosystem",

      description:
        "Custom long-term leases with full maintenance coverage for institutional logistics and regional fleet operators.",

      icon: HeartHandshake,
    },

    {
      title: "Financing Ecosystem",

      description:
        "Direct tie-ups with leading green energy financiers (Ecofy, Chola, Altmobility) guaranteeing rapid approvals.",

      icon: Percent,
    },

    {
      title:
        "Reselling & Swap Marketplace",

      description:
        "Fully certified pre-owned EVs with certified battery state-of-health scoring, allowing clean transitions.",

      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="refynd"
      className="
        py-12
        sm:py-16
        md:py-20

        px-4
        sm:px-6
        md:px-12

        bg-[#0F0F0F]

        relative
        overflow-hidden

        font-barlow
      "
    >
      {/* BACKGROUND */}

      <SectionBackground variant="refynd" />

      {/* AMBIENT GLOW */}

      <div
        className="
          absolute
          top-0
          right-0

          w-80
          h-80

          rounded-full

          bg-fyn-pink/[0.03]

          blur-[100px]

          pointer-events-none
        "
      />

      <div
        className="
          max-w-7xl
          mx-auto

          relative
          z-10
        "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-12

            gap-12

            items-center
          "
        >
          {/* =========================================
              LEFT CONTENT
          ========================================= */}

          <div className="lg:col-span-4 text-left">
            <span
              className="
                text-xs
                font-mono
                uppercase
                tracking-widest

                text-fyn-pink

                bg-fyn-pink/10

                border
                border-fyn-pink/20

                px-2.5
                py-1

                rounded

                w-fit
                block

                mb-4
              "
            >
              Procurement & Asset Allocation
            </span>

            <h2
              className="
                text-4xl
                md:text-6xl

                font-black

                text-fyn-text

                uppercase
                tracking-tight

                leading-[0.92]

                mb-6
              "
            >
              REFYND: 
              <br />
              THE EV MARKETPLACE
            </h2>

            <p
              className="
                text-xl

                text-fyn-text

                leading-relaxed

                mb-6

                font-semibold

                opacity-90
              "
            >
              Lease, rent, or buy —
              flexible procurement
              channels custom-tailored
              for fleet operators,
              driver-owners, and
              enterprises looking to
              transition to zero-carbon
              fleets.
            </p>

            <p
              className="
                text-[15px]

                text-fyn-text

                leading-relaxed

                mb-8

                font-medium

                opacity-80
              "
            >
              Refynd removes the heavy
              upfront capital barrier.
              By bridging direct OEM
              supplies, vetted financing
              partners, and certified
              pre-owned marketplaces,
              we make fleet scaling
              fully transaction-ready.
            </p>

            {/* CTA */}

            <Button
              variant="primary"
              size="lg"
              className="
                w-full
                sm:w-auto
              "
              onClick={() =>
                window.open(
                  "https://refyndev.com/",
                  "_blank"
                )
              }
            >
              Visit Refynd Marketplace

              <ShoppingBag
                className="
                  w-5
                  h-5
                  ml-2
                "
              />
            </Button>
          </div>

          {/* =========================================
              RIGHT SIDE CARDS
          ========================================= */}

          <div
            className="
              lg:col-span-8

              space-y-5
            "
          >
            {pillars.map(
              (pil, index) => {
                const Icon = pil.icon;

                return (
                  <motion.div
                    key={pil.title}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay:
                        index * 0.1,
                    }}
                  >
                    <GlowCard
                      className="
                        px-7
                        py-6

                        border-fyn-border/40

                        bg-[#0b0b0b]/85
                      "
                      glowColor="rgba(232, 25, 122, 0.08)"
                    >
                      <div
                        className="
                          flex
                          items-start

                          gap-5
                        "
                      >
                        {/* ICON */}

                        <div
                          className="
                            p-3

                            rounded-2xl

                            bg-fyn-pink/10

                            border
                            border-fyn-pink/20

                            text-fyn-pink

                            flex-shrink-0
                          "
                        >
                          <Icon
                            className="
                              w-6
                              h-6
                            "
                          />
                        </div>

                        {/* CONTENT */}

                        <div className="flex-1">
                          <h3
                            className="
                              !text-[1.45rem]

                              font-black

                              text-fyn-text

                              uppercase

                              tracking-tight

                              leading-none

                              mb-3
                            "
                          >
                            {pil.title}
                          </h3>

                          <p
                            className="
                              text-[15px]

                              text-fyn-text

                              leading-relaxed

                              font-semibold

                              opacity-80
                            "
                          >
                            {pil.description}
                          </p>
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
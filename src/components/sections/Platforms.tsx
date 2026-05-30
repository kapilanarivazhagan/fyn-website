"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlowCard } from "../ui/GlowCard";
import { Button } from "../ui/Button";
import { platformsList } from "@/data/platforms";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionBackground } from "../ui/SectionBackground";

export const Platforms = () => {
  return (
    <section id="platforms" className="py-10 sm:py-12 md:py-14 px-6 md:px-12 bg-[#080808] relative overflow-hidden font-barlow">
      <SectionBackground variant="platforms" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Proprietary Technology"
          title="The Platform Suite"
          description="Our full-stack hardware-software platform powers operational coordination. Each component is purpose-built to empower drivers, fleet managers, and enterprises."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {platformsList.map((plat, idx) => {
            return (
              <motion.div
                key={plat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "120px 0px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <GlowCard className="flex flex-col justify-between h-full p-8 bg-[#0b0b0b] border-fyn-border/50 hover:border-fyn-pink/35" glowColor="rgba(232, 25, 122, 0.15)">
                  <div>
                    {/* Header */}
                    <div className="border-b border-fyn-border/40 pb-5 mb-5 flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-black text-fyn-text uppercase tracking-tight">
                          {plat.name}
                        </h3>
                        <span className="text-xs text-fyn-pink/80 font-bold uppercase tracking-wider block mt-1">
                          {plat.tagline}
                        </span>
                      </div>
                      
                      {/* Technical visual badge */}
                      <span className="text-[9px] font-mono text-fyn-text-muted/50 border border-fyn-border px-2 py-0.5 rounded">
                        SYS_{plat.id.toUpperCase()}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-fyn-text-muted leading-relaxed mb-6">
                      {plat.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-3 mb-8">
                      {plat.features.map((feat) => (
                        <div key={feat} className="flex items-start space-x-2 text-left">
                          <CheckCircle2 className="w-4 h-4 text-fyn-pink mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-fyn-text-muted/95 leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="border-t border-fyn-border/40 pt-6 mt-6">
                    <Button
                      variant={plat.id === "optifyn" ? "secondary" : "outline"}
                      size="md"
                      className="w-full flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        if (plat.ctaLink.startsWith("#")) {
                          const targetId = plat.ctaLink.substring(1);
                          const el = document.getElementById(targetId);
                          if (el) {
                            const navbarOffset =
                              document.getElementById(
                                "fyn-navbar-cinematic"
                              )?.offsetHeight ?? 53;
                            const top =
                              el.getBoundingClientRect().top +
                              window.scrollY -
                              navbarOffset;
                            window.scrollTo({
                              top: Math.max(top, 0),
                              behavior: "smooth",
                            });
                          }
                        } else {
                          window.open(plat.ctaLink, "_blank");
                        }
                      }}
                    >
                      {plat.ctaText}
                      <ArrowUpRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

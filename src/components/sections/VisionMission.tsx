"use client";

import React from "react";
import { GlowCard } from "../ui/GlowCard";
import {
  Activity,
  BrainCircuit,
  Cable,
  DatabaseZap,
  Eye,
  Network,
  Route,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionBackground } from "../ui/SectionBackground";
import { SectionHeading } from "../ui/SectionHeading";

const futurePillars = [
  {
    title: "AI Dispatch Layer",
    description:
      "Demand forecasting, route density, battery state, and driver availability converging into smarter fleet decisions.",
    icon: BrainCircuit,
  },
  {
    title: "Connected Fleet Spine",
    description:
      "Vehicle health, charging readiness, service alerts, and hub-level operations tracked as one live mobility network.",
    icon: Network,
  },
  {
    title: "Autonomous-Ready Ops",
    description:
      "Structured telemetry, standardized hubs, and predictable routes designed to support future autonomous workflows.",
    icon: Route,
  },
  {
    title: "Driver Growth System",
    description:
      "Training, welfare, credit access, safety, and earning pathways built into the same operating ecosystem.",
    icon: Activity,
  },
];

const systemSignals = [
  "Fleet uptime prediction",
  "Battery lifecycle intelligence",
  "Hub capacity planning",
  "Enterprise SLA routing",
  "Driver readiness scoring",
  "Carbon-light commerce lanes",
];

export const VisionMission = () => {
  return (
    <section
      id="vision-mission"
      className="py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-12 bg-[#0F0F0F] relative overflow-hidden font-barlow"
    >
      <SectionBackground variant="vision" />

      <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-px w-[82vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-fyn-pink/25 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1}}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ transform: "translateZ(0)" }}
          >
            <GlowCard
              interactive={false}
              className="
                fyn-vision-card-bg
                !bg-transparent
                !backdrop-blur-none
                border-white/[0.02]
                h-full
                flex
                flex-col
                justify-between
                p-8
                md:p-10
                relative
                overflow-hidden
                isolate
              "
              glowColor="transparent"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-full bg-fyn-pink/10 border border-fyn-pink/15 text-fyn-pink">
                    <Eye className="w-6 h-6" />
                  </div>

                  <h3 className="text-3xl font-black text-fyn-text uppercase tracking-tight">
                    Our Vision
                  </h3>
                </div>

                <p className="fyn-panel-body-copy text-lg text-white/90 leading-relaxed font-medium max-w-xl">
                  Enabling dignity, income, and ownership for marginalized
                  communities through tech-enabled, sustainable mobility.
                </p>
              </div>
            </GlowCard>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1}}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ transform: "translateZ(0)" }}
          >
            <GlowCard
              className="
                fyn-mission-card-bg
                !bg-transparent
                !backdrop-blur-none
                border-white/[0.02]
                h-full
                flex
                flex-col
                justify-between
                p-8
                md:p-10
                relative
                overflow-hidden
                isolate
              "
              glowColor="transparent"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-full bg-fyn-pink/10 border border-fyn-pink/15 text-fyn-pink">
                    <Target className="w-6 h-6" />
                  </div>

                  <h3 className="text-3xl font-black text-fyn-text uppercase tracking-tight">
                    Our Mission
                  </h3>
                </div>

                <p className="fyn-panel-body-copy text-lg text-white/90 leading-relaxed font-medium max-w-xl">
                  To create a scalable tech mobility platform enabling
                  marginalized communities to earn sustainably, access
                  financial services, and progress from daily income to
                  long-term ownership.
                </p>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        <div
          id="future-of-fyn"
          className="mt-16 border-t border-fyn-border/20 pt-14 sm:mt-20 sm:pt-16"
        >
          <SectionHeading
            eyebrow="Future We're Building"
            title="An intelligent operating layer for EV commerce"
            description="Fyn's next chapter is not just more vehicles on road. It is a connected EV-tech platform where fleet intelligence, charging infrastructure, enterprise demand, and driver progress move as one system."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
            
            {/* LEFT BIG PANEL */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="
                fyn-live-graph-panel
                relative
                min-h-[460px]
                overflow-hidden
                rounded-lg
                border
                border-fyn-pink/15
                bg-[#090909]/70
                p-5
                sm:p-7
                lg:col-span-7
              "
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(232,25,122,0.12),transparent_28%),radial-gradient(circle_at_76%_42%,rgba(255,255,255,0.04),transparent_24%)]" />

              <div className="fyn-live-graph-grid relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-6">
                
                <div className="fyn-live-graph-cell fyn-live-graph-cell-primary rounded-lg border border-white/[0.04] bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-fyn-pink">
                    <DatabaseZap className="h-5 w-5" />

                    <span className="fyn-readable-pink-label text-[10px] font-mono uppercase tracking-widest">
                      Live Mobility Graph
                    </span>
                  </div>

                  <p className="mt-4 text-2xl font-black uppercase leading-tight text-fyn-text sm:text-3xl">
                    Every trip becomes operational intelligence.
                  </p>
                </div>

                <div className="fyn-live-graph-cell fyn-live-graph-cell-control rounded-lg border border-white/[0.04] bg-black/15 p-4">
                  <Cable className="h-6 w-6 text-fyn-pink" />

                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-fyn-text">
                    Charging, hubs, vehicles, and drivers linked into one control plane.
                  </p>
                </div>

                <div className="fyn-live-graph-cell fyn-live-graph-cell-decision rounded-lg border border-white/[0.04] bg-fyn-pink/8 p-4">
                  <p className="fyn-readable-pink-label font-mono text-[10px] uppercase tracking-widest text-fyn-pink">
                    Next decision
                  </p>

                  <p className="mt-3 text-sm font-semibold leading-relaxed text-fyn-text">
                    Allocate the right EV, to the right driver, from the right hub, before demand peaks.
                  </p>
                </div>

                <div className="fyn-live-graph-cell fyn-live-graph-cell-commerce rounded-lg border border-white/[0.04] bg-white/[0.02] p-4">
                  <p className="fyn-readable-muted font-mono text-[10px] uppercase tracking-widest text-fyn-text-muted">
                    Sustainable commerce movement
                  </p>

                  <p className="mt-3 text-sm font-semibold leading-relaxed text-fyn-text">
                    Cleaner last-mile capacity for merchants, marketplaces, and city logistics corridors.
                  </p>
                </div>

                <div className="fyn-live-graph-cell fyn-live-graph-cell-bars grid grid-cols-3 gap-3">
                  {["Demand", "Battery", "Driver"].map((label) => (
                    <div
                      key={label}
                      className="rounded-lg border border-white/[0.04] bg-black/15 px-3 py-3 text-center"
                    >
                      <p className="fyn-readable-muted text-[10px] font-mono uppercase tracking-widest text-fyn-text-muted">
                        {label}
                      </p>

                      <div className="mx-auto mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-3/4 rounded-full bg-fyn-pink" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT SMALL CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5">
              {futurePillars.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.06,
                    }}
                  >
                    <GlowCard
                      className="h-full p-5 border-white/[0.03]"
                      glowColor="rgba(232, 25, 122, 0.06)"
                    >
                      <Icon className="h-5 w-5 text-fyn-pink" />

                      <h3 className="mt-5 text-base font-black uppercase tracking-wide text-fyn-text">
                        {pillar.title}
                      </h3>

                      <p className="mt-3 text-xs leading-relaxed text-fyn-text-muted">
                        {pillar.description}
                      </p>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {systemSignals.map((signal) => (
              <div
                key={signal}
                className="rounded-lg border border-white/[0.03] bg-[#101010]/60 px-4 py-4 text-center"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-fyn-text-muted">
                  {signal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
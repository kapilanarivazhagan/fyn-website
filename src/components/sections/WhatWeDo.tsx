"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlowCard } from "../ui/GlowCard";
import { Truck, ShieldCheck, TrendingUp, Navigation, Smartphone, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionBackground } from "../ui/SectionBackground";

export const WhatWeDo = () => {
  const coreActivities = [
    {
      step: "01",
      layer: "Fleet Activation",
      title: "Vehicle Procurement",
      description: "Direct strategic OEM pipeline sourcing high-spec connected electric two-wheelers and three-wheelers.",
      icon: Truck
    },
    {
      step: "02",
      layer: "Driver Enablement",
      title: "Driver Onboarding",
      description: "Verification, compliance check, professional driving training, and mobile onboarding via the INFYNITY app.",
      icon: ShieldCheck
    },
    {
      step: "03",
      layer: "Operations Engine",
      title: "Fleet Deployment",
      description: "Hyper-local vehicle allocation aligned with enterprise demands, optimized dynamically for peak commerce hours.",
      icon: TrendingUp
    },
    {
      step: "04",
      layer: "Enterprise Integration",
      title: "Enterprise Logistics",
      description: "Fulfilling strict SLA targets for e-commerce, quick-commerce, and logistics, reducing delivery cost parameters.",
      icon: Navigation
    },
    {
      step: "05",
      layer: "Scale Network",
      title: "Ride Hailing Operations",
      description: "Powering smart city mobility channels through direct driver-partner ride-hailing app integrations.",
      icon: Smartphone
    },
    {
      step: "06",
      layer: "Mobility Intelligence",
      title: "Real-Time Fleet Management",
      description: "24/7 centralized monitoring via OptiFyn, providing live battery metrics, location telemetry, and alerts.",
      icon: BarChart3
    }
  ];

  return (
    <section id="what-we-do" className="py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-12 bg-[#0F0F0F] relative overflow-hidden font-barlow">
      <SectionBackground variant="operations" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Core Operations"
          title="What We Do"
          description="Fyn engineers and coordinates all aspects of the EV logistics workflow. From asset procurement to real-time predictive analytics, we own the operational layer."
        />

        {/* Operational Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {coreActivities.map((act, index) => {
            const IconComponent = act.icon;
            return (
              <motion.div
                key={act.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "120px 0px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <GlowCard className="h-full flex flex-col justify-between p-6" glowColor="rgba(232, 25, 122, 0.08)">
                  <div>
                    <div className="flex items-center justify-between border-b border-fyn-border/40 pb-4 mb-4">
                      <span className="text-xs font-mono font-bold text-fyn-pink bg-fyn-pink/10 border border-fyn-pink/20 px-2 py-0.5 rounded">
                        {act.layer}
                      </span>
                      <IconComponent className="w-5 h-5 text-fyn-pink" />
                    </div>
                    <h3 className="text-xl font-bold uppercase text-fyn-text tracking-wide mb-2">
                      {act.title}
                    </h3>
                    <p className="text-sm text-fyn-text-muted leading-relaxed">
                      {act.description}
                    </p>
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

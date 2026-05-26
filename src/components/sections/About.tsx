"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlowCard } from "../ui/GlowCard";
import { Zap, GitBranch, Share2, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { SectionBackground } from "../ui/SectionBackground";
import { StoryImage } from "../ui/StoryImage";

const aboutStoryImages = [
  {
    image: "about-leadership-fe",
    alt: "Fyn leadership standing with orange electric three wheelers",
    caption:
      "Founder-led operating conversations anchored in fleet deployment, city expansion, and customer partnerships.",
    source: "Financial Express / Leadership",
    className: "lg:col-span-7 lg:row-span-2 min-h-[360px] sm:min-h-[440px]",
    tone: "pink" as const,
    priority: true,
  },
  {
    image: "about-dubai-north-star",
    alt: "Fyn Mobility at Dubai Expand North Star event booth",
    caption:
      "Global startup ecosystem presence, investor visibility, and mobility-market participation.",
    source: "LinkedIn / Expand North Star",
    className: "lg:col-span-5 min-h-[260px]",
  },
  {
    image: "about-ecosystem-truck",
    alt: "Fyn branded electric cargo vehicle and charging station graphic",
    caption:
      "EV ecosystem planning across vehicles, energy partners, and charging infrastructure.",
    source: "Fyn official / EV ecosystem",
    className: "lg:col-span-5 min-h-[260px]",
  },
];

const leadershipPortraits = [
  {
    image: "about-founder-visakh",
    alt: "Visakh Sasikumar Fyn founder portrait",
    name: "Visakh Sasikumar",
    role: "Founder perspective",
  },
  {
    image: "about-founder-manu",
    alt: "Manu Iyer Fyn leadership portrait",
    name: "Manu Iyer",
    role: "Strategy and scale",
  },
  {
    image: "about-leader-niroop",
    alt: "Niroop Janardhanan Fyn leadership portrait",
    name: "Niroop Janardhanan",
    role: "Business operations",
  },
];

export const About = () => {
  return (
    <section id="about-us" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-[#080808] relative overflow-hidden font-barlow">
      <SectionBackground variant="about" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Who We Are"
          title="Fyn is more than a fleet operator"
          description="We are India’s first fully integrated EV Supply Ecosystem. We bridge the gap between demand and delivery through technology-first, asset-light operations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-12">
          {/* Big highlight statement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between p-8 rounded-2xl border border-fyn-pink/20 bg-gradient-to-br from-[#12080f] via-[#0b0809] to-[#080808] relative overflow-hidden min-h-[350px]"
          >
            {/* Ambient pink spotlight */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-fyn-pink/[0.04] blur-[80px]" />
            
            <div className="relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink bg-fyn-pink/10 border border-fyn-pink/20 px-2.5 py-1 rounded-md">
                Ecosystem Evolution
              </span>
              
              <h3 className="text-2xl md:text-4xl font-black text-fyn-text uppercase mt-6 leading-tight tracking-tight">
                Empowering the future of green commerce through holistic logistics engineering.
              </h3>
            </div>
            
            <p className="text-fyn-text-muted mt-8 leading-relaxed max-w-lg relative z-10">
              Fyn began with a simple mission: clean up last-mile deliveries. But we soon realized that simple vehicle deployment is not enough. To truly scale, India needs an interconnected framework that unites drivers, smart infrastructure, flexible financial leasing, and predictive telemetry. Today, we are that ecosystem.
            </p>
          </motion.div>

          {/* Cards for pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlowCard className="h-full flex flex-col justify-between" glowColor="rgba(232, 25, 122, 0.08)">
                <div>
                  <div className="p-2.5 rounded-lg bg-fyn-pink/10 border border-fyn-pink/20 text-fyn-pink w-fit mb-4">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-fyn-text uppercase tracking-wider mb-2">Asset-Light Scale</h4>
                  <p className="text-sm text-fyn-text-muted leading-relaxed">
                    By partnering with bulk vehicle lessors, financial institutions, and OEMs, we scale rapidly without heavy asset ownership overhead.
                  </p>
                </div>
              </GlowCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlowCard className="h-full flex flex-col justify-between" glowColor="rgba(232, 25, 122, 0.08)">
                <div>
                  <div className="p-2.5 rounded-lg bg-fyn-pink/10 border border-fyn-pink/20 text-fyn-pink w-fit mb-4">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-fyn-text uppercase tracking-wider mb-2">Predictive Telemetry</h4>
                  <p className="text-sm text-fyn-text-muted leading-relaxed">
                    OptiFyn tracks real-time battery temperatures, cell-level degradation, and routing efficiency, keeping fleets operating at peak charge.
                  </p>
                </div>
              </GlowCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlowCard className="h-full flex flex-col justify-between" glowColor="rgba(232, 25, 122, 0.08)">
                <div>
                  <div className="p-2.5 rounded-lg bg-fyn-pink/10 border border-fyn-pink/20 text-fyn-pink w-fit mb-4">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-fyn-text uppercase tracking-wider mb-2">Connected Infrastructure</h4>
                  <p className="text-sm text-fyn-text-muted leading-relaxed">
                    We bring active charging hubs and swapping systems into a singular network, assuring drivers of zero range anxiety.
                  </p>
                </div>
              </GlowCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlowCard className="h-full flex flex-col justify-between" glowColor="rgba(232, 25, 122, 0.08)">
                <div>
                  <div className="p-2.5 rounded-lg bg-fyn-pink/10 border border-fyn-pink/20 text-fyn-pink w-fit mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-fyn-text uppercase tracking-wider mb-2">Welfare Integrity</h4>
                  <p className="text-sm text-fyn-text-muted leading-relaxed">
                    Through INFYNITY, we provide gig-economy drivers with life insurance, micro-credit lines, and healthcare, building a dedicated community.
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="mt-20 pt-16 border-t border-fyn-border/30">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-black text-fyn-pink mb-3 tracking-tight">1,500+</div>
              <p className="text-xs md:text-sm uppercase tracking-widest text-fyn-text-muted font-semibold">EVs on Road</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-black text-fyn-pink mb-3 tracking-tight">5,000+</div>
              <p className="text-xs md:text-sm uppercase tracking-widest text-fyn-text-muted font-semibold">Drivers Onboarded</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-black text-fyn-pink mb-3 tracking-tight">10M+</div>
              <p className="text-xs md:text-sm uppercase tracking-widest text-fyn-text-muted font-semibold">Orders Delivered</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-black text-fyn-pink mb-3 tracking-tight">20M+</div>
              <p className="text-xs md:text-sm uppercase tracking-widest text-fyn-text-muted font-semibold">Green KMs Run</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-black text-fyn-pink mb-3 tracking-tight">51K</div>
              <p className="text-xs md:text-sm uppercase tracking-widest text-fyn-text-muted font-semibold">Trees Equivalent</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-black text-fyn-pink mb-3 tracking-tight">3</div>
              <p className="text-xs md:text-sm uppercase tracking-widest text-fyn-text-muted font-semibold">Major Cities</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-black text-fyn-pink mb-3 tracking-tight">2X</div>
              <p className="text-xs md:text-sm uppercase tracking-widest text-fyn-text-muted font-semibold">YoY Growth</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-black text-fyn-pink mb-3 tracking-tight">125+</div>
              <p className="text-xs md:text-sm uppercase tracking-widest text-fyn-text-muted font-semibold">Team Members</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

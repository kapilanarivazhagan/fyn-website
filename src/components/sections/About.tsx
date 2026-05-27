"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { GlowCard } from "../ui/GlowCard";
import { Zap, GitBranch, Share2, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { SectionBackground } from "../ui/SectionBackground";
import { ImageLightbox } from "../ui/ImageLightbox";

const aboutStoryImages = [
  {
    src: "/about_us/grp_pic.webp",
    alt: "Fyn team group moment",
    caption:
      "The operating team behind every city rollout, partner commitment, and fleet milestone.",
    label: "Team Engine",
    className: "lg:col-span-7 h-[360px] sm:h-[430px] lg:h-[610px]",
  },
  {
    src: "/about_us/visakh_public_meeting3.webp",
    alt: "Fyn founder speaking at a public meeting",
    caption:
      "Founder-led conversations that connect clean mobility, commerce, and public infrastructure.",
    label: "Founder Voice",
    className: "lg:col-span-5 h-[280px] sm:h-[320px] lg:h-[295px]",
  },
  {
    src: "/about_us/townhall general.webp",
    alt: "Fyn townhall gathering",
    caption:
      "Townhalls turn operating lessons into shared context across teams and functions.",
    label: "Culture Sync",
    className: "lg:col-span-5 h-[280px] sm:h-[320px] lg:h-[295px]",
  },
  {
    src: "/about_us/college_meeting.webp",
    alt: "Fyn team meeting with students and collaborators",
    caption:
      "Ecosystem building extends into colleges, hiring channels, and future operator communities.",
    label: "Campus Bridge",
    className: "md:col-span-4 h-[260px] md:h-[300px]",
  },
  {
    src: "/about_us/visakh_public_meeting2.webp",
    alt: "Fyn founder speaking at public meeting",
    caption:
      "Recognition gained through consistent engagement with communities and ecosystem partners.",
    label: "Community Voice",
    className: "md:col-span-4 h-[260px] md:h-[300px]",
  },
  {
    src: "/about_us/townhall_niroop.webp",
    alt: "Fyn leadership townhall session",
    caption:
      "Business, technology, and field operations stay aligned through high-context leadership rituals.",
    label: "Operating Cadence",
    className: "md:col-span-4 h-[260px] md:h-[300px]",
  },
];

export const About = () => {
  const [previewIndex, setPreviewIndex] =
    useState<number | null>(null);

  return (
    <section id="about-us" className="py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-12 bg-[#080808] relative overflow-hidden font-barlow">
      <SectionBackground variant="about" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Who We Are"
          title="Fyn is more than a fleet operator"
          description="We are India's first fully integrated EV Supply Ecosystem. We bridge the gap between demand and delivery through technology-first, asset-light operations."
        />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-12">
          {/* Big highlight statement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="fyn-ecosystem-evolution-bg rounded-2xl border border-white/[0.04] hover:border-fyn-pink/12 bg-transparent relative overflow-hidden transition-colors duration-500 bg-cover bg-center"
            style={{
              backgroundImage: "url('/career/townhall.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "520px"
            }}
          >
            {/* Relative container to capture direct child stylesheet rules */}
            <div className="relative min-h-[520px] w-full">
              {/* Background overlay for readability */}
              <div className="absolute inset-0 bg-black/65 rounded-2xl z-0" />
              
              {/* Ambient pink spotlight */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-fyn-pink/[0.04] blur-[80px] z-0" />
              
              {/* Content wrapper with isolated flex layout */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                <div className="fyn-cinematic-copy-support pt-0">
                  <span className="fyn-readable-pink-label text-[10px] font-mono uppercase tracking-widest text-fyn-pink bg-fyn-pink/10 border border-fyn-pink/20 px-2.5 py-1 rounded-md">
                    Ecosystem Evolution
                  </span>
                  
                  <h3 className="text-2xl md:text-4xl font-black text-fyn-text uppercase mt-3 leading-tight tracking-tight">
                    Empowering the future of{" "}
                    <span className="text-fyn-pink">
                      green commerce
                    </span>{" "}
                    through holistic logistics engineering.
                  </h3>
                </div>
                
                <p className="fyn-cinematic-copy-support fyn-panel-body-copy text-fyn-text-muted mt-4 pt-0 leading-relaxed max-w-lg">
                  Fyn began with a simple mission: clean up last-mile deliveries. But we soon realized that simple vehicle deployment is not enough. To truly scale, India needs an interconnected framework that unites drivers, smart infrastructure, flexible financial leasing, and predictive telemetry. Today, we are that ecosystem.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cards for pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:auto-rows-max">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlowCard className="flex flex-col" glowColor="rgba(232, 25, 122, 0.08)">
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
              <GlowCard className="flex flex-col" glowColor="rgba(232, 25, 122, 0.08)">
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
              <GlowCard className="flex flex-col" glowColor="rgba(232, 25, 122, 0.08)">
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
              <GlowCard className="flex flex-col" glowColor="rgba(232, 25, 122, 0.08)">
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

        {/* Editorial Storytelling */}
        <div className="mt-20 border-t border-fyn-border/30 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="fyn-visual-story-heading mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="fyn-readable-pink-label text-[10px] font-mono uppercase tracking-widest text-fyn-pink">
                Visual Story
              </p>
              <h3 className="mt-3 max-w-3xl text-2xl font-black uppercase leading-tight tracking-tight text-fyn-text md:text-4xl">
                Built through field conviction, founder proximity, and operating rhythm.
              </h3>
            </div>

            <p className="fyn-readable-muted max-w-md text-sm leading-relaxed text-fyn-text-muted">
              Fyn's ecosystem is shaped in rooms, yards, campuses, and city conversations where the clean mobility transition becomes practical.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            {aboutStoryImages.map((image, index) => (
              <motion.figure
                key={image.src}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                role="button"
                tabIndex={0}
                onClick={() => setPreviewIndex(index)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    setPreviewIndex(index);
                  }
                }}
                className={`fyn-media-frame group relative cursor-zoom-in overflow-hidden rounded-lg border border-fyn-border/35 bg-[#0b0b0b]/80 shadow-[0_18px_60px_rgba(0,0,0,0.38)] outline-none transition-colors duration-300 hover:border-fyn-pink/35 focus-visible:ring-2 focus-visible:ring-fyn-pink/70 ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(min-width: 1024px) 58vw, 100vw"
                      : "(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
                  }
                  className="fyn-media-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/36 to-black/10" />
                <div className="absolute left-0 top-0 h-full w-1 bg-fyn-pink/80" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-fyn-pink/[0.035]" />

                <figcaption className="fyn-story-text-plate absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="fyn-story-label text-[10px] font-mono uppercase tracking-widest text-fyn-pink">
                    {image.label}
                  </p>
                  <p className="fyn-story-caption mt-1 max-w-[32rem] text-sm font-semibold leading-snug text-white">
                    {image.caption}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
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

      <ImageLightbox
        images={aboutStoryImages}
        activeIndex={previewIndex}
        onClose={() => setPreviewIndex(null)}
        onNavigate={setPreviewIndex}
      />
    </section>
  );
};

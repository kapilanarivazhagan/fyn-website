"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlowCard } from "../ui/GlowCard";
import { mediaList, mediaMarqueeSources } from "@/data/media";
import { PlayCircle, Podcast, ArrowUpRight, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionBackground } from "../ui/SectionBackground";

export const Media = () => {
  return (
    <section id="media" className="py-12 sm:py-16 md:py-20 bg-[#080808] relative overflow-hidden font-barlow">
      <SectionBackground variant="media" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="Press Coverage"
          title="Who’s talking about Fyn"
          description="Conversations, coverage, and recognition across India’s mobility ecosystem."
        />
      </div>

      {/* Scrolling Marquee */}
      <div className="relative z-10 w-full overflow-hidden border-y border-fyn-border/40 py-6 mb-16 bg-[#0a0a0a]">
        <div className="flex w-max">
          {/* Double map for seamless looping */}
          <div className="flex space-x-12 animate-marquee shrink-0 uppercase font-black text-2xl tracking-widest text-fyn-text-muted/20 select-none">
            {mediaMarqueeSources.map((source, idx) => (
              <span key={`marquee-1-${idx}`} className="hover:text-fyn-pink/40 transition-colors">
                {source}
              </span>
            ))}
          </div>
          <div className="flex space-x-12 animate-marquee shrink-0 uppercase font-black text-2xl tracking-widest text-fyn-text-muted/20 select-none">
            {mediaMarqueeSources.map((source, idx) => (
              <span key={`marquee-2-${idx}`} className="hover:text-fyn-pink/40 transition-colors">
                {source}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mediaList.slice(0, 3).map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <GlowCard className="h-full flex flex-col justify-between p-6 bg-[#0c0c0c]/80 border-fyn-border/40" glowColor="rgba(232, 25, 122, 0.08)">
                <div>
                  <div className="flex items-center justify-between border-b border-fyn-border/40 pb-3 mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-fyn-pink font-semibold">
                      {art.source}
                    </span>
                    <span className="text-[10px] text-fyn-text-muted font-mono">{art.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold uppercase text-fyn-text tracking-wide mb-3 leading-snug hover:text-fyn-pink transition-colors">
                    {art.headline}
                  </h3>
                  
                  <p className="text-xs text-fyn-text-muted leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="border-t border-fyn-border/40 pt-4 mt-6 flex items-center justify-between text-xs text-fyn-pink hover:text-[#ff2d92] font-semibold transition-colors cursor-pointer">
                  <span>Read Full Coverage</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Podcast / Video Placeholder Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-12 text-left">
          {/* Video interview placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-fyn-border bg-[#0b0b0b] p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-fyn-pink/[0.02] blur-[80px] pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-fyn-border/40 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink bg-fyn-pink/10 border border-fyn-pink/20 px-2 py-0.5 rounded">
                  Founder Interviews
                </span>
                <PlayCircle className="w-5 h-5 text-fyn-pink animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-fyn-text uppercase tracking-tight mb-2">
                Reimagining Green Logistics
              </h3>
              <p className="text-sm text-fyn-text-muted leading-relaxed">
                Visakh Sasikumar speaks on the transition to an integrated EV supply ecosystem, addressing the core financing bottlenecks, charging synergies, and software optimization metrics.
              </p>
            </div>

            <div className="flex items-center justify-center aspect-video w-full rounded-xl bg-gradient-to-br from-[#121212] to-[#1a1a1a] border border-fyn-border/60 overflow-hidden relative group mt-6 select-none cursor-pointer">
              <div className="absolute inset-0 bg-grid-dots opacity-40" />
              <div className="absolute w-12 h-12 rounded-full bg-fyn-pink/10 border border-fyn-pink/35 flex items-center justify-center text-fyn-pink group-hover:scale-110 transition-transform duration-300">
                <PlayCircle className="w-6 h-6 fill-fyn-pink/20" />
              </div>
              <span className="absolute bottom-2 right-2 text-[8px] font-mono text-fyn-text-muted/60 uppercase tracking-widest">
                Duration: 14:22 mins
              </span>
            </div>
          </motion.div>

          {/* Podcast placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-fyn-border bg-[#0b0b0b] p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-fyn-pink/[0.02] blur-[80px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-fyn-border/40 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink bg-fyn-pink/10 border border-fyn-pink/20 px-2 py-0.5 rounded">
                  Ecosystem Podcasts
                </span>
                <Podcast className="w-5 h-5 text-fyn-pink" />
              </div>
              <h3 className="text-2xl font-black text-fyn-text uppercase tracking-tight mb-2">
                India’s Green Corridor Podcast
              </h3>
              <p className="text-sm text-fyn-text-muted leading-relaxed">
                Niroop Janardhanan explains the asset-light playbook, the role of corporate venture families, and driving driver empowerment inside India's logistics corridors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-[#121212] to-[#1a1a1a] border border-fyn-border/60 flex items-center justify-between mt-6 select-none cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-fyn-pink/10 border border-fyn-pink/20 flex items-center justify-center text-fyn-pink group-hover:scale-105 transition-transform duration-200">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-fyn-text block">EP_08: Building Green Hubs</span>
                  <span className="text-[9px] font-mono text-fyn-text-muted/60 uppercase">Stream on Spotify & Apple</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-fyn-pink opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import { GlowCard } from "../ui/GlowCard";
import { Eye, Target } from "lucide-react";
import { motion } from "framer-motion";

export const VisionMission = () => {
  return (
    <section id="vision-mission" className="py-20 px-6 md:px-12 bg-[#0F0F0F] relative overflow-hidden font-barlow">
      {/* Background dot grid pattern */}
      <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlowCard className="h-full flex flex-col justify-between p-8 md:p-10" glowColor="rgba(232, 25, 122, 0.15)">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-full bg-fyn-pink/10 border border-fyn-pink/20 text-fyn-pink">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-black text-fyn-text uppercase tracking-tight">
                    Our Vision
                  </h3>
                </div>
                
                <p className="text-lg text-fyn-text-muted leading-relaxed font-medium">
                  Enabling dignity, income, and ownership for marginalized communities through tech-enabled, sustainable mobility.
                </p>
              </div>
            </GlowCard>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowCard className="h-full flex flex-col justify-between p-8 md:p-10" glowColor="rgba(232, 25, 122, 0.15)">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-full bg-fyn-pink/10 border border-fyn-pink/20 text-fyn-pink">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-black text-fyn-text uppercase tracking-tight">
                    Our Mission
                  </h3>
                </div>
                
                <p className="text-lg text-fyn-text-muted leading-relaxed font-medium">
                  To create a scalable tech mobility platform enabling marginalized communities to earn sustainably, access financial services, and progress from daily income to long-term ownership.
                </p>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

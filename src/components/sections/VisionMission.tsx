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
                <div className="flex items-center justify-between mb-8 border-b border-fyn-border/40 pb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-fyn-pink bg-fyn-pink/10 px-2 py-0.5 rounded">
                    Global Direction
                  </span>
                  <div className="p-3 rounded-full bg-fyn-pink/10 border border-fyn-pink/20 text-fyn-pink">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-3xl font-black text-fyn-text uppercase tracking-tight mb-6">
                  Our Vision
                </h3>
                
                <p className="text-xl text-fyn-text-muted leading-relaxed font-medium">
                  “Powering 100% green last-mile logistics and building India's largest, most resilient EV Supply Ecosystem, setting the benchmark for net-zero operational scale globally.”
                </p>
              </div>

              <div className="mt-12 text-[10px] font-mono text-fyn-text-muted/40 uppercase tracking-widest flex justify-between">
                <span>Ref: FYN_SYS_V1.0</span>
                <span>Target: 2030 Net-Zero</span>
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
                <div className="flex items-center justify-between mb-8 border-b border-fyn-border/40 pb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-fyn-pink bg-fyn-pink/10 px-2 py-0.5 rounded">
                    Action Plan
                  </span>
                  <div className="p-3 rounded-full bg-fyn-pink/10 border border-fyn-pink/20 text-fyn-pink">
                    <Target className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-3xl font-black text-fyn-text uppercase tracking-tight mb-6">
                  Our Mission
                </h3>
                
                <p className="text-xl text-fyn-text-muted leading-relaxed font-medium">
                  “Connecting enterprises, smart electric vehicles, charging infrastructures, and empowered driver partners through an asset-light, full-stack predictive software suite.”
                </p>
              </div>

              <div className="mt-12 text-[10px] font-mono text-fyn-text-muted/40 uppercase tracking-widest flex justify-between">
                <span>Ref: FYN_OPS_M1.0</span>
                <span>Method: Tech Integration</span>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

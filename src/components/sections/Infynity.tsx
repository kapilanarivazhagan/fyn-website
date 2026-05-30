"use client";

import React from "react";
import { GlowCard } from "../ui/GlowCard";
import { Button } from "../ui/Button";
import { PlayCircle, Shield, Heart, Landmark, BookOpen, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { SectionBackground } from "../ui/SectionBackground";

export const Infynity = () => {
  const pillars = [
    {
      title: "Driver Empowerment",
      description: "Building pride and high agency inside the delivery corridors. Drivers are partners in our net-zero vision.",
      icon: HeartHandshake
    },
    {
      title: "Comprehensive Insurance",
      description: "Accident protection, third-party liability, and emergency life coverage secured for every driver in the ecosystem.",
      icon: Shield
    },
    {
      title: "Healthcare Benefits",
      description: "Regular medical checkups, health insurance plans, and digital doctor consultations for drivers and their families.",
      icon: Heart
    },
    {
      title: "Financial Inclusion",
      description: "Zero-fee bank accounts, instant micro-credit loans, and daily earnings withdrawal directly through the app.",
      icon: Landmark
    },
    {
      title: "Formal Training & Certification",
      description: "Structured safety training, battery swap guidelines, and customer service certification modules.",
      icon: BookOpen
    }
  ];

  return (
    <section id="infynity" className="py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-12 bg-[#080808] relative overflow-hidden font-barlow">
      <SectionBackground variant="infynity" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-fyn-pink/[0.02] blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Driver app features */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 order-2 lg:order-1">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <motion.div
                  key={pil.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "120px 0px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={idx === 4 ? "md:col-span-2" : ""}
                >
                  <GlowCard className="h-full flex flex-col justify-between p-6 border-fyn-border/40 bg-[#0c0c0c]/90" glowColor="rgba(232, 25, 122, 0.08)">
                    <div>
                      <div className="p-2.5 rounded-lg bg-fyn-pink/10 border border-fyn-pink/20 text-fyn-pink w-fit mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-black text-fyn-text uppercase tracking-wide mb-2">
                        {pil.title}
                      </h3>
                      <p className="text-sm text-fyn-text leading-relaxed font-semibold opacity-85">
                        {pil.description}
                      </p>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>

          {/* Core App Download Narrative */}
          <div className="lg:col-span-5 text-left order-1 lg:order-2">
            <span className="text-xs font-mono uppercase tracking-widest text-fyn-pink bg-fyn-pink/10 border border-fyn-pink/20 px-2.5 py-1 rounded w-fit block mb-4">
              Welfare & Driver Platform
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-fyn-text uppercase tracking-tight leading-none mb-6">
              INFYNITY: MORE THAN A JOB
            </h2>
            <p className="text-xl text-fyn-text leading-relaxed font-semibold mb-6 opacity-90">
              A community for drivers. INFYNITY elevates India's last-mile gig-economy workers through healthcare, insurance, and direct financial inclusion.
            </p>
            <p className="text-[15px] text-fyn-text leading-relaxed font-medium mb-8 opacity-80">
              We believe in driver-first logistics. By providing formal certification pathways, instant micro-payout mechanisms, and robust family medical security, we keep our 5,000+ driver network safe, loyal, and highly productive.
            </p>
            
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => window.open("https://play.google.com/store/apps/details?id=com.fynmobility.infynity&hl=en-US", "_blank")}
            >
              Get INFYNITY on Play Store
              <PlayCircle className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-fyn-bg pt-28 px-6 md:px-12">
      {/* Cinematic background image — darkened atmospheric layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/intro/intro.jpg"
          alt=""
          fill
          className="object-cover object-right"
          sizes="100vw"
          priority
          aria-hidden="true"
        />
        {/* Heavy dark overlays for readability */}
        <div className="absolute inset-0 bg-[#080808]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/60 to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-[#080808]/50" />
        <div className="absolute inset-0 bg-[#080808]/80 md:backdrop-blur-[2px]" />
      </div>

      {/* Soft glowing ambient circles */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-fyn-pink/10 blur-[80px] md:blur-[100px] md:animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-fyn-pink/[0.04] blur-[90px] md:blur-[130px] md:animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-5xl text-center mx-auto">
        {/* Big Bold Geometric Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black text-fyn-text tracking-tighter uppercase leading-none font-barlow"
        >
          India&apos;s EV <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fyn-text via-fyn-pink to-fyn-text bg-[length:200%_100%]">
            Supply Ecosystem
          </span>
        </motion.h1>

        {/* Statement Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-base md:text-xl text-fyn-text-muted max-w-3xl mx-auto leading-relaxed font-barlow"
        >
          A tech-enabled, asset-light platform building India&apos;s largest EV supply ecosystem — connecting enterprise demand with trained drivers, smart electric vehicles, and a full-stack tech suite.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={() => {
            const el = document.getElementById("ecosystem");
            el?.scrollIntoView({ behavior: "smooth" });
          }}>
            Explore Ecosystem
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => {
            const el = document.getElementById("get-involved");
            el?.scrollIntoView({ behavior: "smooth" });
          }}>
            Partner with Us
          </Button>
        </motion.div>
        
        {/* Subtle decorative dashboard statistics indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 border-t border-fyn-border/40 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto font-barlow"
        >
          <div>
            <div className="text-2xl md:text-3xl font-black text-fyn-text uppercase tracking-tight">1,500+</div>
            <div className="text-xs uppercase tracking-widest text-fyn-text-muted mt-1 font-semibold">Active smart EVs</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-fyn-text uppercase tracking-tight">5,000+</div>
            <div className="text-xs uppercase tracking-widest text-fyn-text-muted mt-1 font-semibold">Trained Drivers</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-fyn-text uppercase tracking-tight">20M+</div>
            <div className="text-xs uppercase tracking-widest text-fyn-text-muted mt-1 font-semibold">Green KMs Driven</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-fyn-text uppercase tracking-tight">Bengaluru+</div>
            <div className="text-xs uppercase tracking-widest text-fyn-text-muted mt-1 font-semibold">Operations in 3 Cities</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

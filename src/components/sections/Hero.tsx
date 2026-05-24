"use client";

import React from "react";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const scrollToSection = (id: string) => {
  if (typeof window !== "undefined") {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

export const Hero = ({
  introComplete = true,
}: {
  introComplete?: boolean;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, filter: "blur(12px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{
        duration: 1,
        delay: introComplete ? 0 : 0.15,
        ease: "easeOut",
      }}
      id="hero"
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        bg-transparent
        pt-32 pb-16
        px-6
        md:px-12
      "
    >
      {/* RESPONSIVE BACKGROUND */}
      <div className="absolute inset-0 z-0 safari-gpu">

        {/* Desktop Background */}
        <div
          className="hidden md:block absolute inset-0 safari-gpu"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(8, 8, 8, 0.10),
                rgba(8, 8, 8, 0.30)
              ),
              url('/Images/intro/desktop_bg.webp')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Mobile Background */}
        <div
          className="block md:hidden absolute inset-0 safari-gpu"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(8, 8, 8, 0.15),
                rgba(8, 8, 8, 0.38)
              ),
              url('/Images/intro/mobile_bg.webp')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Atmospheric cinematic overlays */}
      <div className="absolute inset-0 z-[1] safari-gpu">
        <div className="absolute inset-0 bg-[#080808]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/20 via-[#080808]/5 to-[#080808]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/20 via-transparent to-[#080808]/15" />
        <div className="absolute inset-0 backdrop-blur-[2px] md:backdrop-blur-[3px]" />
      </div>

      {/* Ambient glow blobs */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none safari-gpu"
        style={{ willChange: "transform" }}
      >
        <div
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-fyn-pink/10 blur-[80px] md:blur-[100px] animate-pulse safari-gpu"
          style={{ transform: "translateZ(0)", willChange: "transform" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-fyn-pink/[0.05] blur-[90px] md:blur-[130px] animate-pulse safari-gpu"
          style={{ transform: "translateZ(0)", willChange: "transform" }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl text-center mx-auto px-4">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-[2.5rem] xs:text-5xl sm:text-6xl md:text-8xl font-black text-fyn-text tracking-tighter uppercase leading-none font-barlow"
        >
          RedeFYNing <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fyn-text via-fyn-pink to-fyn-text bg-[length:200%_100%]">
            EV Mobility
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8
          text-base
          md:text-xl
          text-white/90
          font-medium
          max-w-3xl
          mx-auto
          leading-relaxed
          font-barlow
          drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
        >
          India&apos;s largest, tech-enabled EV supply ecosystem.
          Connecting enterprise demand with trained driver
          partners, smart electric vehicles, and predictive
          mobility infrastructure.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => setActiveView("about")}
          >
            Learn About Us
            <ArrowRight className="w-5 h-5 ml-2 shrink-0" />
          </Button>

          {/* Secondary — Connect With Us (glassmorphism) */}
          <Button
            variant="glass"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => setActiveView("get-involved")}
          >
            Connect With Us
            <ArrowRight className="w-5 h-5 ml-2 shrink-0" />
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 border-t border-fyn-border/40 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto font-barlow"
        >
          <div>
            <div className="text-2xl md:text-3xl font-black text-fyn-text uppercase tracking-tight">
              1,500+
            </div>
            <div className="text-xs uppercase tracking-widest text-fyn-text-muted mt-1 font-semibold">
              EVs on Road
            </div>
          </div>

          <div>
            <div className="text-2xl md:text-3xl font-black text-fyn-text uppercase tracking-tight">
              5,000+
            </div>
            <div className="text-xs uppercase tracking-widest text-fyn-text-muted mt-1 font-semibold">
              Drivers Onboarded
            </div>
          </div>

          <div>
            <div className="text-2xl md:text-3xl font-black text-fyn-text uppercase tracking-tight">
              20M+
            </div>
            <div className="text-xs uppercase tracking-widest text-fyn-text-muted mt-1 font-semibold">
              Green KMs Run
            </div>
          </div>

          <div>
            <div className="text-2xl md:text-3xl font-black text-fyn-text uppercase tracking-tight">
              3 Cities
            </div>
            <div className="text-xs uppercase tracking-widest text-fyn-text-muted mt-1 font-semibold">
              Multi-City Operations
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
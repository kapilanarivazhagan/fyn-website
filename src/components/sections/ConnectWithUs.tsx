"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlowCard } from "../ui/GlowCard";
import { Mail, MapPin, Phone, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const ConnectWithUs = () => {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Operations HQ",
      value: "Fyn Mobility Headquarters, HSR Layout, Bengaluru, Karnataka, India",
      actionLabel: "Locate on Map",
      link: "https://maps.google.com/?q=HSR+Layout,+Bengaluru",
    },
    {
      icon: Mail,
      title: "Central Support",
      value: "info@fynmobility.com",
      actionLabel: "Send Parameter Logs",
      link: "mailto:info@fynmobility.com",
    },
    {
      icon: Phone,
      title: "Regional Coverage",
      value: "Active Hubs: Bengaluru · Chennai · Hyderabad",
      actionLabel: "Operational 24/7",
      link: "#",
    },
  ];

  const socials = [
    {
      name: "LinkedIn",
      handle: "pibeam",
      url: "https://www.linkedin.com/company/pibeam/",
      description: "Corporate updates & telemetry logs",
    },
    {
      name: "Instagram",
      handle: "fyn_mobility",
      url: "https://www.instagram.com/fyn_mobility/",
      description: "Operational moments & driver spotlights",
    },
    {
      name: "Facebook",
      handle: "fynmobility",
      url: "https://www.facebook.com/fynmobility/#",
      description: "Ecosystem campaigns & local events",
    },
  ];

  return (
    <section
      id="connect-with-us"
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#080808] relative overflow-hidden font-barlow border-t border-fyn-border/20"
    >
      {/* Dynamic tech mesh grid background */}
      <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-fyn-pink/[0.03] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Central Communications"
          title="Connect With Us"
          description="Ready to scale your enterprise green fleet? Connect with our central ops desk or follow our telemetry updates across social networks."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-fyn-text-muted mb-4 border-b border-fyn-border/40 pb-2">
              Telemetry Terminals
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactDetails.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <motion.div
                    key={detail.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "120px 0px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={idx === 0 ? "md:col-span-2" : "col-span-1"}
                  >
                    <GlowCard className="p-6 h-full flex flex-col justify-between" glowColor="rgba(232, 25, 122, 0.06)">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 rounded-lg bg-fyn-pink/10 border border-fyn-pink/20 text-fyn-pink">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs uppercase tracking-widest font-black text-fyn-text">
                            {detail.title}
                          </span>
                        </div>
                        <p className="text-sm text-fyn-text-muted leading-relaxed min-h-[44px]">
                          {detail.value}
                        </p>
                      </div>
                      
                      {detail.link !== "#" && (
                        <a
                          href={detail.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 text-[10px] uppercase font-mono font-bold tracking-widest text-fyn-pink hover:text-fyn-text transition-colors flex items-center group"
                        >
                          {detail.actionLabel}
                          <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                    </GlowCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Social Channels */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-fyn-text-muted mb-4 border-b border-fyn-border/40 pb-2">
              Social Hub Channels
            </h3>

            <div className="space-y-4">
              {socials.map((social, idx) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "120px 0px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <GlowCard className="p-5 flex items-center justify-between hover:border-fyn-pink/30 transition-all duration-300 bg-[#0c0c0c]" glowColor="rgba(232, 25, 122, 0.08)">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-fyn-surface/80 border border-fyn-border/60 flex items-center justify-center text-fyn-text-muted group-hover:text-fyn-pink group-hover:border-fyn-pink/30 transition-all duration-300">
                          {social.name === "LinkedIn" ? (
                            <Linkedin className="w-4 h-4" />
                          ) : social.name === "Instagram" ? (
                            <Instagram className="w-4 h-4" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.1c0-2.2 1.3-3.5 3.3-3.5.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.6h2.3l-.4 2.9h-1.9v7A10 10 0 0022 12z"/></svg>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-xs uppercase font-mono font-bold text-fyn-text group-hover:text-fyn-pink transition-colors">
                              {social.name}
                            </span>
                            <span className="text-[10px] text-fyn-text-muted font-mono">
                              @{social.handle}
                            </span>
                          </div>
                          <p className="text-xs text-fyn-text-muted mt-1 leading-snug">
                            {social.description}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-fyn-text-muted/60 group-hover:text-fyn-pink transition-colors" />
                    </GlowCard>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

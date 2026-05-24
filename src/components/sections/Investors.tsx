"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { InvestorCard } from "../ui/InvestorCard";
import { SectionBackground } from "../ui/SectionBackground";
import { investorsList } from "@/data/investors";
import { motion } from "framer-motion";

export const Investors = () => {
  return (
    <section id="investors" className="py-20 px-6 md:px-12 bg-[#080808] relative overflow-hidden font-barlow">
      <SectionBackground variant="investors" />
      <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Financial Backing"
          title="Backed by partners who open doors"
          description="Fyn is supported by prominent corporate VC structures, institutional angel networks, veterans of the public sector, and social impact funds."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {investorsList.map((investor, idx) => (
            <motion.div
              key={investor.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <InvestorCard
                name={investor.name}
                type={investor.type}
                description={investor.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

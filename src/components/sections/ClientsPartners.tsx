"use client";

import React, { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { PartnerLogo } from "../ui/PartnerLogo";
import { partnersList } from "@/data/partners";
import { motion, AnimatePresence } from "framer-motion";

export const ClientsPartners = () => {
  const [activeCategory, setActiveCategory] = useState<"oem" | "financing" | "charging">("oem");

  const categories = [
    { id: "oem", label: "OEM Partners" },
    { id: "charging", label: "Charging & Swapping" },
    { id: "financing", label: "Financing Partners" }
  ];

  const filteredPartners = partnersList.filter(
    (p) => p.category === activeCategory
  );

  return (
    <section id="clients-&-partners" className="py-20 px-6 md:px-12 bg-[#0F0F0F] relative overflow-hidden font-barlow">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Ecosystem Infrastructure"
          title="Clients & Partners"
          description="We unify clean energy components. By integrating leading vehicle manufacturers, battery swapping networks, and specialized finance channels, we optimize delivery corridors."
        />

        {/* Categories Tab Selector */}
        <div className="flex justify-center space-x-2 border-b border-fyn-border/40 pb-6 mb-12 max-w-lg mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-fyn-pink text-fyn-text shadow-[0_0_15px_rgba(232, 25, 122, 0.2)]"
                  : "bg-fyn-surface/60 border border-fyn-border/40 text-fyn-text-muted hover:border-fyn-border hover:text-fyn-text"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category Logos Grid */}
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
            >
              {filteredPartners.map((partner) => (
                <PartnerLogo key={partner.id} name={partner.name} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

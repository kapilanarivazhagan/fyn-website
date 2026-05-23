"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { TeamCard } from "../ui/TeamCard";
import { leadershipList } from "@/data/leadership";
import { motion } from "framer-motion";

export const Leadership = () => {
  return (
    <section id="leadership" className="py-20 px-6 md:px-12 bg-[#0F0F0F] relative overflow-hidden font-barlow">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-fyn-pink/[0.01] blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Ecosystem Creators"
          title="The team behind Fyn"
          description="A multidisciplinary crew of logistics experts, software engineers, operations specialists, and supply chain builders."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {leadershipList.map((leader, idx) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
            >
              <TeamCard
                name={leader.name}
                role={leader.role}
                bio={leader.bio}
                imageName={leader.imageName}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlowCard } from "../ui/GlowCard";
import { Button } from "../ui/Button";
import { openJobsList, startupValues } from "@/data/careers";
import { Flame, GitMerge, Heart, Activity, Briefcase, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Careers = () => {
  const [activeDept, setActiveDept] = useState<string>("All");

  const departments = ["All", "Technology", "Operations", "Product", "Fleet", "HR"];

  const filteredJobs = activeDept === "All"
    ? openJobsList
    : openJobsList.filter((j) => j.department === activeDept);

  // Icon resolver for values
  const getValueIcon = (name: string) => {
    switch (name) {
      case "Flame": return Flame;
      case "Heart": return Heart;
      case "GitMerge": return GitMerge;
      default: return Activity;
    }
  };

  return (
    <section id="careers" className="py-20 px-6 md:px-12 bg-[#080808] relative overflow-hidden font-barlow">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Join Fyn"
          title="Build the future of EV mobility with us"
          description="We're looking for ambitious people who want to solve real-world mobility challenges at scale. Welcome to a high-agency, mission-driven startup."
        />

        {/* Culture / Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 mt-12 text-left">
          {startupValues.map((val) => {
            const Icon = getValueIcon(val.iconName);
            return (
              <GlowCard key={val.title} className="h-full flex flex-col justify-between" glowColor="rgba(232, 25, 122, 0.08)">
                <div>
                  <div className="p-2.5 rounded-lg bg-fyn-pink/10 border border-fyn-pink/20 text-fyn-pink w-fit mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-fyn-text uppercase tracking-wider mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-fyn-text-muted leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </GlowCard>
            );
          })}
        </div>

        {/* Department Filters */}
        <div className="border-t border-fyn-border/40 pt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-fyn-text uppercase tracking-tight mb-8">
            Open Positions
          </h3>

          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeDept === dept
                    ? "bg-fyn-pink text-fyn-text shadow-[0_0_15px_rgba(232, 25, 122, 0.2)]"
                    : "bg-fyn-surface/60 border border-fyn-border/40 text-fyn-text-muted hover:border-fyn-border hover:text-fyn-text"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Openings Grid */}
          <div className="min-h-[200px] text-left max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDept}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 rounded-xl border border-fyn-border/50 bg-[#0c0c0c]/80 flex flex-col justify-between hover:border-fyn-pink/30 hover:shadow-[0_5px_20px_rgba(232, 25, 122, 0.03)] transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-fyn-border/30 mb-4">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink bg-fyn-pink/10 px-2 py-0.5 rounded">
                            {job.department}
                          </span>
                          <span className="text-[10px] text-fyn-text-muted font-mono">{job.type}</span>
                        </div>
                        <h4 className="text-lg font-bold text-fyn-text uppercase tracking-wide mb-3">
                          {job.title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-fyn-border/30 mt-4">
                        <div className="flex items-center space-x-4 text-xs text-fyn-text-muted">
                          <span className="flex items-center">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-fyn-pink" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="w-3.5 h-3.5 mr-1 text-fyn-pink" />
                            {job.experience}
                          </span>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-fyn-pink hover:text-fyn-text hover:bg-fyn-pink p-0 px-3 py-1 cursor-pointer"
                          onClick={() => {
                            const el = document.getElementById("get-involved");
                            el?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 text-fyn-text-muted uppercase font-mono tracking-widest text-sm">
                    No active roles in {activeDept} currently. Submit open application in Get Involved.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

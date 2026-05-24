"use client";

import React, { useEffect, useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlowCard } from "../ui/GlowCard";
import { Button } from "../ui/Button";
import { SectionBackground } from "../ui/SectionBackground";
import { openJobsList, startupValues } from "@/data/careers";
import { Flame, GitMerge, Heart, Activity, Briefcase, MapPin, Send, UploadCloud, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Careers = () => {
  const [activeDept, setActiveDept] = useState<string>("All");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [applicationStatus, setApplicationStatus] = useState<"idle" | "submitted">("idle");
  const [applicationForm, setApplicationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    role: "",
    message: "",
  });

  const departments = ["All", "Technology", "Operations", "Product", "Fleet", "HR"];

  const filteredJobs = activeDept === "All"
    ? openJobsList
    : openJobsList.filter((j) => j.department === activeDept);

  const inputBase =
    "w-full bg-[#101010]/95 border border-fyn-border/70 text-fyn-text rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-fyn-pink/70 transition-colors duration-200 placeholder-fyn-text-muted/60 font-barlow";

  useEffect(() => {
    if (!isApplyModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeApplyModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isApplyModalOpen]);

  const openApplyModal = (role: string) => {
    setApplicationStatus("idle");
    setResumeName("");
    setApplicationForm({
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      role,
      message: "",
    });
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
  };

  const handleApplicationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setApplicationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationStatus("submitted");
  };

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
    <section id="careers" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-[#080808] relative overflow-hidden font-barlow">
      <SectionBackground variant="careers" />
      <div className="max-w-7xl mx-auto relative z-10">
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
                          onClick={() => openApplyModal(job.title)}
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

      <AnimatePresence>
        {isApplyModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            <button
              type="button"
              aria-label="Close application form"
              onClick={closeApplyModal}
              className="absolute inset-0 bg-[#050505]/85 backdrop-blur-[3px] md:backdrop-blur-md cursor-default"
            />

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative z-10 w-full max-w-3xl max-h-[min(90vh,760px)] overflow-y-auto no-scrollbar rounded-2xl border border-fyn-pink/20 bg-[#0b0b0b]/92 shadow-[0_24px_80px_rgba(0,0,0,0.65)] safari-gpu"
              style={{
                WebkitOverflowScrolling: "touch",
                transform: "translateZ(0)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-fyn-pink/[0.08] via-transparent to-[#080808]/70" />
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-fyn-pink/[0.06] blur-[80px] pointer-events-none" />

              <div className="relative p-5 sm:p-8">
                <div className="flex items-start justify-between gap-4 border-b border-fyn-border/50 pb-5 mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink bg-fyn-pink/10 border border-fyn-pink/20 px-2.5 py-1 rounded">
                      Careers Application
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-fyn-text uppercase tracking-tight mt-4">
                      Apply to Fyn
                    </h3>
                  </div>

                  <button
                    type="button"
                    aria-label="Close"
                    onClick={closeApplyModal}
                    className="p-2 rounded-xl border border-fyn-border/60 text-fyn-text-muted hover:text-fyn-text hover:border-fyn-pink/40 bg-[#111]/80 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {applicationStatus === "submitted" ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-fyn-pink/10 border border-fyn-pink/30 text-fyn-pink flex items-center justify-center">
                      <Send className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black text-fyn-text uppercase tracking-tight">
                      Application Captured
                    </h4>
                    <p className="text-sm text-fyn-text-muted mt-3 max-w-md mx-auto leading-relaxed">
                      Thanks. This frontend form is ready for backend integration when the careers pipeline is connected.
                    </p>
                    <Button variant="outline" size="md" className="mt-7" onClick={closeApplyModal}>
                      Close
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleApplicationSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <label className="space-y-2 text-left">
                        <span className="text-xs uppercase tracking-widest font-semibold text-fyn-text-muted">Full Name</span>
                        <input name="fullName" required value={applicationForm.fullName} onChange={handleApplicationChange} className={inputBase} placeholder="Your full name" />
                      </label>
                      <label className="space-y-2 text-left">
                        <span className="text-xs uppercase tracking-widest font-semibold text-fyn-text-muted">Email</span>
                        <input name="email" type="email" required value={applicationForm.email} onChange={handleApplicationChange} className={inputBase} placeholder="you@email.com" />
                      </label>
                      <label className="space-y-2 text-left">
                        <span className="text-xs uppercase tracking-widest font-semibold text-fyn-text-muted">Phone Number</span>
                        <input name="phone" type="tel" required value={applicationForm.phone} onChange={handleApplicationChange} className={inputBase} placeholder="9876543210" />
                      </label>
                      <label className="space-y-2 text-left">
                        <span className="text-xs uppercase tracking-widest font-semibold text-fyn-text-muted">LinkedIn URL</span>
                        <input name="linkedin" type="url" value={applicationForm.linkedin} onChange={handleApplicationChange} className={inputBase} placeholder="https://linkedin.com/in/..." />
                      </label>
                      <label className="space-y-2 text-left">
                        <span className="text-xs uppercase tracking-widest font-semibold text-fyn-text-muted">Resume Upload</span>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required
                            onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? "")}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <div className={`${inputBase} flex items-center justify-between gap-3 text-fyn-text-muted`}>
                            <span className="truncate">{resumeName || "Upload resume"}</span>
                            <UploadCloud className="w-4 h-4 text-fyn-pink shrink-0" />
                          </div>
                        </div>
                      </label>
                      <label className="space-y-2 text-left">
                        <span className="text-xs uppercase tracking-widest font-semibold text-fyn-text-muted">Role Applying For</span>
                        <select name="role" required value={applicationForm.role} onChange={handleApplicationChange} className={`${inputBase} appearance-none`}>
                          <option value="" disabled className="bg-[#101010] text-fyn-text-muted">Select role</option>
                          {openJobsList.map((job) => (
                            <option key={job.id} value={job.title} className="bg-[#101010] text-fyn-text">
                              {job.title}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="space-y-2 text-left block">
                      <span className="text-xs uppercase tracking-widest font-semibold text-fyn-text-muted">Short Message</span>
                      <textarea
                        name="message"
                        required
                        value={applicationForm.message}
                        onChange={handleApplicationChange}
                        rows={4}
                        className={`${inputBase} resize-none`}
                        placeholder="Tell us why this role fits you."
                      />
                    </label>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button variant="primary" size="lg" className="w-full sm:flex-1">
                        Submit
                        <Send className="w-4 h-4 ml-2" />
                      </Button>
                      <Button type="button" variant="outline" size="lg" className="w-full sm:w-auto" onClick={closeApplyModal}>
                        Close
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

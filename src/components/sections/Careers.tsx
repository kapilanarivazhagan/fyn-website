"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { GlowCard } from "../ui/GlowCard";
import { Button } from "../ui/Button";
import { SectionBackground } from "../ui/SectionBackground";
import { startupValues } from "@/data/careers";
import {
  Flame,
  GitMerge,
  Heart,
  Activity,
  Briefcase,
  MapPin,
  Send,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  department: string;
  status: string;
};

const careerStoryImages = [
  {
    src: "/career/grppic3.webp",
    alt: "Fyn team group culture moment",
    label: "One Team",
    caption:
      "Cross-functional teams working close to the operating floor, not far away from it.",
    className: "lg:col-span-7 h-[360px] sm:h-[430px] lg:h-[590px]",
  },
  {
    src: "/career/funfriday.webp",
    alt: "Fyn team fun Friday activity",
    label: "Culture Rituals",
    caption:
      "The week has room for intensity, play, and the small rituals that keep people connected.",
    className: "lg:col-span-5 h-[270px] sm:h-[315px] lg:h-[285px]",
  },
  {
    src: "/career/batteryworking.webp",
    alt: "Fyn team working on battery operations",
    label: "Hands-On Ops",
    caption:
      "Fleet intelligence is built by people who understand batteries, vehicles, routes, and field reality.",
    className: "lg:col-span-5 h-[270px] sm:h-[315px] lg:h-[285px]",
  },
  {
    src: "/career/cricket.webp",
    alt: "Fyn team cricket activity",
    label: "After Hours",
    caption:
      "High-trust teams are built in workshops, huddles, games, and shared wins.",
    className: "md:col-span-4 h-[255px] md:h-[300px]",
  },
  {
    src: "/career/award.webp",
    alt: "Fyn award celebration",
    label: "Recognition",
    caption:
      "The pace is startup-fast, but achievement still gets celebrated properly.",
    className: "md:col-span-4 h-[255px] md:h-[300px]",
  },
  {
    src: "/career/indesk.webp",
    alt: "Fyn desk collaboration",
    label: "Builder Mode",
    caption:
      "Product, operations, and people teams stay close enough to solve together.",
    className: "md:col-span-4 h-[255px] md:h-[300px]",
  },
];

export const Careers = () => {
  const [activeDept, setActiveDept] = useState<string>("All");
  const [activeCity, setActiveCity] = useState<string>("All Cities");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<
    "idle" | "submitted"
  >("idle");
  const [applicationError, setApplicationError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/careers", {
          cache: "no-store",
        });

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => null);
          console.error("Careers API error:", response.status, errorPayload);
          return;
        }

        const rawResult = await response.json();

        if (!Array.isArray(rawResult) && !Array.isArray((rawResult as any)?.values) && !Array.isArray((rawResult as any)?.data)) {
          console.warn("Unexpected careers payload shape:", rawResult);
          return;
        }

        const rows: unknown[] = Array.isArray(rawResult)
          ? rawResult
          : Array.isArray((rawResult as any)?.values)
          ? (rawResult as any).values
          : Array.isArray((rawResult as any)?.data)
          ? (rawResult as any).data
          : [];

        const normalizedRows = rows.filter(
          (row): row is unknown[] => Array.isArray(row)
        );

        const formattedJobs = normalizedRows
          .slice(1)
          .filter((row) => row.length >= 7)
          .map((row) => {
            const [id, title, location, type, experience, department, status] = row;

            const safeValue = (value: unknown) =>
              typeof value === "string"
                ? value.trim()
                : value != null
                ? String(value).trim()
                : "";

            return {
              id: safeValue(id),
              title: safeValue(title),
              location: safeValue(location),
              type: safeValue(type),
              experience: safeValue(experience),
              department: safeValue(department),
              status: safeValue(status),
            } as Job;
          });

        setJobs(formattedJobs);
      } catch (error) {
        console.error("Failed to load careers from Google Sheets:", error);
      }
    };

    fetchJobs();
  }, []);

  const [applicationForm, setApplicationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    resume: "",
    role: "",
    message: "",
  });

  const departments = [
    "All",
    "Technology",
    "Operations",
    "Product",
    "Fleet",
    "HR",
  ];

  const cities = [
    "All Cities",
    ...Array.from(new Set(jobs.map((job) => job.location))).sort(),
  ];

  const filteredJobs = jobs.filter((job) => {
    const departmentMatch =
      activeDept === "All" || job.department === activeDept;
    const cityMatch =
      activeCity === "All Cities" || job.location === activeCity;

    return departmentMatch && cityMatch;
  });

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
    setApplicationError(null);

    setApplicationForm({
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      resume: "",
      role,
      message: "",
    });

    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
  };

  const handleApplicationChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setApplicationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApplicationError(null);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          type: "career",
          fullName: applicationForm.fullName,
          email: applicationForm.email,
          phone: applicationForm.phone,
          linkedin: applicationForm.linkedin,
          resume: applicationForm.resume,
          role: applicationForm.role,
          message: applicationForm.message,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          payload?.error || payload?.message || `Application submission failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

      setApplicationStatus("submitted");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit application.";
      setApplicationError(message);
      console.error("Application submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getValueIcon = (name: string) => {
    switch (name) {
      case "Flame":
        return Flame;
      case "Heart":
        return Heart;
      case "GitMerge":
        return GitMerge;
      default:
        return Activity;
    }
  };

  return (
    <section
      id="careers"
      className="py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-12 relative overflow-hidden font-barlow"
    >
      <SectionBackground variant="careers" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Join Fyn"
          title={
            <>
              Build the future of EV mobility with&nbsp;us
            </>
          }
          description="We're looking for ambitious people who want to solve real-world mobility challenges at scale. Welcome to a high-agency, mission-driven startup. For career inquiries, reach out to kapilan@fynmobility.com"
        />

        {/* Culture / Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 xl:mb-14 2xl:mb-20 mt-12 xl:mt-8 2xl:mt-12 text-left">
          {startupValues.map((val) => {
            const Icon = getValueIcon(val.iconName);

            return (
              <GlowCard
                key={val.title}
                className="h-full flex flex-col justify-between"
                glowColor="rgba(232, 25, 122, 0.08)"
              >
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

        {/* Workplace Storytelling */}
        <div className="mb-20 xl:mb-14 2xl:mb-20 border-y border-fyn-border/35 py-14 xl:py-10 2xl:py-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "120px 0px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="fyn-visual-story-heading mb-8 grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
          >
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink">
                Life At Fyn
              </p>
              <h3 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tight text-fyn-text md:text-4xl">
                Built by people who move between desks, depots, and decisions.
              </h3>
            </div>

            <p className="fyn-readable-muted max-w-2xl text-sm leading-relaxed text-fyn-text-muted lg:ml-auto">
              Careers here are shaped by hands-on operations, high-context collaboration, field exposure, and the energy of a team building something consequential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            {careerStoryImages.map((image, index) => (
              <motion.figure
                key={image.src}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "120px 0px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                className={`fyn-media-frame group relative overflow-hidden rounded-lg border border-fyn-border/35 bg-[#0b0b0b]/80 shadow-[0_18px_60px_rgba(0,0,0,0.38)] transition-colors duration-300 hover:border-fyn-pink/35 ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(min-width: 1024px) 58vw, 100vw"
                      : "(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
                  }
                  className="fyn-media-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/36 to-black/10" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fyn-pink/70 to-transparent" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-fyn-pink/[0.035]" />

                <figcaption className="fyn-story-text-plate absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="fyn-story-label text-[10px] font-mono uppercase tracking-widest text-fyn-pink">
                    {image.label}
                  </p>
                  <p className="fyn-story-caption mt-1 max-w-[32rem] text-sm font-semibold leading-snug text-white">
                    {image.caption}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="border-t border-fyn-border/40 pt-16 xl:pt-10 2xl:pt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-fyn-text uppercase tracking-tight mb-8">
            Open Positions
          </h3>

          {/* Filters */}
          <div className="mb-10 mx-auto max-w-4xl rounded-lg border border-fyn-border/35 bg-[#0b0b0b]/72 p-3 sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      activeDept === dept
                        ? "bg-fyn-pink text-fyn-text shadow-[0_0_15px_rgba(232,25,122,0.2)]"
                        : "bg-fyn-surface/60 border border-fyn-border/40 text-fyn-text-muted hover:border-fyn-border hover:text-fyn-text"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              <label className="flex w-full items-center gap-3 rounded-xl border border-fyn-border/45 bg-[#101010]/90 px-3 py-2 text-left sm:w-auto">
                <span className="shrink-0 text-[10px] font-mono uppercase tracking-widest text-fyn-text-muted">
                  City
                </span>
                <select
                  value={activeCity}
                  onChange={(event) => setActiveCity(event.target.value)}
                  className="w-full min-w-0 bg-transparent text-xs font-bold uppercase tracking-wider text-fyn-text outline-none sm:min-w-[150px]"
                >
                  {cities.map((city) => (
                    <option
                      key={city}
                      value={city}
                      className="bg-[#101010] text-fyn-text"
                    >
                      {city}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Job Grid */}
          <div
            className="h-[620px] md:h-[660px] overflow-y-auto overflow-x-hidden pr-1 text-left max-w-5xl mx-auto"
            style={{
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorY: "auto",
              overscrollBehaviorX: "none",
              touchAction: "pan-y",
            }}
          >
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 content-start"
            >
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.18 }}
                    whileHover={{
                      y: -4,
                      transition: {
                        duration: 0.18,
                      },
                    }}
                    className="
                      p-6
                      rounded-xl
                      border border-fyn-border/50
                      bg-[#0c0c0c]/95
                      flex flex-col justify-between
                      hover:border-fyn-pink/30
                      hover:shadow-[0_5px_20px_rgba(232,25,122,0.03)]
                      transition-all duration-300
                      transform-gpu
                    "
                    style={{
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-fyn-border/30 mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink bg-fyn-pink/10 px-2 py-0.5 rounded">
                          {job.department}
                        </span>

                        <span className="text-[10px] text-fyn-text-muted font-mono">
                          {job.type}
                        </span>
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
                <div className="md:col-span-2 min-h-[340px] flex flex-col items-center justify-center rounded-lg border border-fyn-border/35 bg-[#0c0c0c]/72 px-6 text-center">
                  <p className="text-fyn-text-muted uppercase font-mono tracking-widest text-sm">
                    No active roles for this filter.
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-fyn-text-muted">
                    Submit an open application in Get Involved and our team can
                    route it to the right city or function.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal & Lightbox Portals */}
      {mounted && typeof document !== "undefined" && createPortal(
        <>
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
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="relative z-10 w-full max-w-3xl rounded-2xl border border-fyn-pink/20 bg-[#0b0b0b]/92 p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black text-fyn-text uppercase">
                      Apply to Fyn
                    </h3>

                    <button
                      onClick={closeApplyModal}
                      className="text-fyn-text-muted hover:text-fyn-text"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {applicationStatus === "submitted" ? (
                    <div className="text-center py-10">
                      <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-fyn-pink/10 border border-fyn-pink/30 text-fyn-pink flex items-center justify-center">
                        <Send className="w-6 h-6" />
                      </div>

                      <h4 className="text-xl font-black text-fyn-text uppercase">
                        Application Captured
                      </h4>

                      <p className="text-sm text-fyn-text-muted mt-3">
                        Application submitted successfully. We’ll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form
                      className="space-y-5"
                      onSubmit={handleApplicationSubmit}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <input
                          name="fullName"
                          required
                          value={applicationForm.fullName}
                          onChange={handleApplicationChange}
                          className={inputBase}
                          placeholder="Full Name"
                        />

                        <input
                          name="email"
                          type="email"
                          required
                          value={applicationForm.email}
                          onChange={handleApplicationChange}
                          className={inputBase}
                          placeholder="Email"
                        />

                        <input
                          name="phone"
                          type="tel"
                          required
                          value={applicationForm.phone}
                          onChange={handleApplicationChange}
                          className={inputBase}
                          placeholder="Phone Number"
                        />

                        <input
                          name="linkedin"
                          type="url"
                          value={applicationForm.linkedin}
                          onChange={handleApplicationChange}
                          className={inputBase}
                          placeholder="LinkedIn URL"
                        />

                        <input
                          name="resume"
                          type="url"
                          value={applicationForm.resume}
                          onChange={handleApplicationChange}
                          className={inputBase}
                          placeholder="Resume URL (Google Drive / PDF / Portfolio)"
                        />
                      </div>

                      <textarea
                        name="message"
                        required
                        value={applicationForm.message}
                        onChange={handleApplicationChange}
                        rows={4}
                        className={`${inputBase} resize-none`}
                        placeholder="Tell us why this role fits you."
                      />

                      {applicationError ? (
                        <p className="text-sm text-rose-400">
                          {applicationError}
                        </p>
                      ) : null}

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full sm:flex-1"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              Submitting...
                              <div className="w-4 h-4 ml-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            </>
                          ) : (
                            <>
                              Submit
                              <Send className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="w-full sm:w-auto"
                          onClick={closeApplyModal}
                        >
                          Close
                        </Button>
                      </div>
                    </form>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </section>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlowCard } from "../ui/GlowCard";
import { FormInput } from "../ui/FormInput";
import { Button } from "../ui/Button";
import { SectionBackground } from "../ui/SectionBackground";
import { CheckCircle2, ShieldCheck, MailOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormTab = "invest" | "enterprise" | "refynd" | "infynity" | "drive";

export const GetInvolved = () => {
  const [activeTab, setActiveTab] = useState<FormTab>("invest");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Unified form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    phone: "",
    investment: "",
    fleetSize: "",
    partnerType: "",
    benefitType: "",
    city: "",
    hasEV: "",
    message: "",
  });

  const tabList = [
    { id: "invest", label: "Invest in Fyn" },
    { id: "enterprise", label: "Enterprise Clients" },
    { id: "refynd", label: "Refynd Partner" },
    { id: "infynity", label: "INFYNITY Partner" },
    { id: "drive", label: "Drive with Fyn" },
  ];

  useEffect(() => {
    const hashToTab: Record<string, FormTab> = {
      "get-involved": "invest",
      "get-involved-invest": "invest",
      "get-involved-enterprise": "enterprise",
      "get-involved-refynd": "refynd",
      "get-involved-infynity": "infynity",
      "get-involved-drive": "drive",
    };

    const syncTabFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      const nextTab = hashToTab[hash];

      if (nextTab) {
        setActiveTab(nextTab);
        setSuccess(false);
        setErrors({});
      }
    };

    syncTabFromHash();
    window.addEventListener("hashchange", syncTabFromHash);

    return () => {
      window.removeEventListener("hashchange", syncTabFromHash);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const handleTabChange = (tabId: FormTab) => {
    setActiveTab(tabId);
    setSuccess(false);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      org: "",
      phone: "",
      investment: "",
      fleetSize: "",
      partnerType: "",
      benefitType: "",
      city: "",
      hasEV: "",
      message: "",
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Standard fields based on tab
    if (activeTab === "invest") {
      if (!formData.name) newErrors.name = "Full name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.org) newErrors.org = "Organization is required";
      if (!formData.investment) newErrors.investment = "Please select investment range";
    }

    if (activeTab === "enterprise") {
      if (!formData.name) newErrors.name = "Contact person name is required";
      if (!formData.org) newErrors.org = "Business/Company name is required";
      if (!formData.email) {
        newErrors.email = "Business email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.fleetSize) newErrors.fleetSize = "Please select fleet requirement";
    }

    if (activeTab === "refynd") {
      if (!formData.name) newErrors.name = "Full name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.partnerType) newErrors.partnerType = "Please select partnership type";
    }

    if (activeTab === "infynity") {
      if (!formData.name) newErrors.name = "Contact name is required";
      if (!formData.org) newErrors.org = "Welfare Organization is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.benefitType) newErrors.benefitType = "Please select benefit type";
    }

    if (activeTab === "drive") {
      if (!formData.name) newErrors.name = "Driver name is required";
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone must be exactly 10 digits";
      }
      if (!formData.city) newErrors.city = "Please select your city";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // Simulate API ping
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <section id="get-involved" className="py-10 sm:py-12 md:py-14 px-6 md:px-12 bg-[#0F0F0F] relative overflow-hidden font-barlow">
      <SectionBackground variant="involved" />
      <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Partnership Ecosystem"
          title="Get Involved"
          description="Ready to scale? Select a category and submit. For queries, reach out to kapilan@fynmobility.com"
        />

        {/* Tab Selection */}
        <div
          role="tablist"
          aria-label="Get involved categories"
          className="flex overflow-x-auto border-b border-fyn-border/40 pb-4 mb-8 space-x-2 scroll-smooth"
        >
          {tabList.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as FormTab)}
              className={`px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-fyn-tint border border-fyn-pink text-fyn-text shadow-[0_0_15px_rgba(232,25,122,0.1)]"
                  : "bg-fyn-surface/60 border border-fyn-border/40 text-fyn-text-muted hover:border-fyn-border hover:text-fyn-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Container */}
        <GlowCard className="bg-[#0b0b0b] border-fyn-border/60 p-8" glowColor="rgba(232, 25, 122, 0.15)">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="p-4 rounded-full bg-fyn-pink/10 border border-fyn-pink/30 text-fyn-pink mb-6 shadow-[0_0_24px_rgba(232,25,122,0.18)]">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black text-fyn-text uppercase tracking-tight mb-2">
                  Application Received
                </h3>
                <p className="text-sm text-fyn-text-muted max-w-md leading-relaxed">
                  Thank you! Your application has been received successfully. Our team will review your submission and contact you within 24 hours.
                </p>
                <Button
                  variant="outline"
                  size="md"
                  className="mt-8"
                  onClick={() => setSuccess(false)}
                >
                  Submit Another Application
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                {activeTab === "invest" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Full Name"
                      id="name"
                      placeholder="e.g. Vijay Kedia"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                    />
                    <FormInput
                      label="Email Address"
                      id="email"
                      type="email"
                      placeholder="e.g. partner@vc.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                    <FormInput
                      label="Organization / Venture"
                      id="org"
                      placeholder="e.g. Sincere Syndications"
                      required
                      value={formData.org}
                      onChange={handleInputChange}
                      error={errors.org}
                    />
                    <FormInput
                      label="Investment Bracket"
                      id="investment"
                      type="select"
                      placeholder="Select investment range"
                      required
                      options={["Under ₹1 Cr", "₹1 Cr - ₹5 Cr", "₹5 Cr+"]}
                      value={formData.investment}
                      onChange={handleInputChange}
                      error={errors.investment}
                    />
                  </div>
                )}

                {activeTab === "enterprise" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Company / Business Name"
                      id="org"
                      placeholder="e.g. Porter Logistics"
                      required
                      value={formData.org}
                      onChange={handleInputChange}
                      error={errors.org}
                    />
                    <FormInput
                      label="Contact Person"
                      id="name"
                      placeholder="e.g. Faraz Shaikh"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                    />
                    <FormInput
                      label="Business Email"
                      id="email"
                      type="email"
                      placeholder="e.g. delivery@dhl.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                    <FormInput
                      label="Fleet Requirement"
                      id="fleetSize"
                      type="select"
                      placeholder="Select quantity"
                      required
                      options={["Under 50 EVs", "50 - 200 EVs", "200+ EVs"]}
                      value={formData.fleetSize}
                      onChange={handleInputChange}
                      error={errors.fleetSize}
                    />
                  </div>
                )}

                {activeTab === "refynd" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Full Name"
                      id="name"
                      placeholder="e.g. Niroop J"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                    />
                    <FormInput
                      label="Email Address"
                      id="email"
                      type="email"
                      placeholder="e.g. info@refyndev.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                    <FormInput
                      label="Partnership Sector"
                      id="partnerType"
                      type="select"
                      placeholder="Select sector"
                      required
                      options={[
                        "OEM Manufacturer",
                        "Financing Channel",
                        "Battery Swapping Swapper",
                        "Fleet Operator",
                      ]}
                      value={formData.partnerType}
                      onChange={handleInputChange}
                      error={errors.partnerType}
                    />
                    <FormInput
                      label="Contact Phone"
                      id="phone"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                {activeTab === "infynity" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Welfare Provider Name"
                      id="org"
                      placeholder="e.g. Sattva Welfare"
                      required
                      value={formData.org}
                      onChange={handleInputChange}
                      error={errors.org}
                    />
                    <FormInput
                      label="Primary Contact Person"
                      id="name"
                      placeholder="e.g. Swagata B"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                    />
                    <FormInput
                      label="Contact Email"
                      id="email"
                      type="email"
                      placeholder="e.g. welfare@sattva.co"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                    <FormInput
                      label="Empowerment Sector"
                      id="benefitType"
                      type="select"
                      placeholder="Select welfare type"
                      required
                      options={[
                        "Life & Health Insurance",
                        "Micro-Credit & Banking",
                        "Accidental Claims Support",
                        "Community & Welfare Dev",
                      ]}
                      value={formData.benefitType}
                      onChange={handleInputChange}
                      error={errors.benefitType}
                    />
                  </div>
                )}

                {activeTab === "drive" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Your Full Name"
                      id="name"
                      placeholder="e.g. Manoj Kumar"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                    />
                    <FormInput
                      label="Active Phone Number (10 digits)"
                      id="phone"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                    />
                    <FormInput
                      label="City of Operations"
                      id="city"
                      type="select"
                      placeholder="Select city"
                      required
                      options={["Bengaluru", "Chennai", "Hyderabad"]}
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                    />
                  </div>
                )}

                {/* Unified Message Field */}
                <FormInput
                  label="Detailed Message / Parameters"
                  id="message"
                  type="textarea"
                  placeholder="Tell us more about your target, objectives, or operational parameters..."
                  value={formData.message}
                  onChange={handleInputChange}
                />

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full font-bold cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </GlowCard>
      </div>
    </section>
  );
};

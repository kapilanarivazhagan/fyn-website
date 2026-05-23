"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const footerLinks = {
    platforms: [
      { label: "OptiFyn Ops Suite", href: "#platforms" },
      { label: "Refynd EV Leasing", href: "#refynd" },
      { label: "INFYNITY Driver App", href: "#infynity" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Vision & Mission", href: "#vision-mission" },
      { label: "What We Do", href: "#what-we-do" },
      { label: "Clients & Partners", href: "#clients-partners" },
      { label: "Media & Press", href: "#media" },
      { label: "Careers Hub", href: "#careers" },
    ],
    partnerships: [
      { label: "Invest in Fyn", href: "#get-involved" },
      { label: "Enterprise Fleet", href: "#get-involved" },
      { label: "Refynd Partner", href: "#get-involved" },
      { label: "INFYNITY Partner", href: "#get-involved" },
      { label: "Drive with Fyn", href: "#get-involved" },
    ],
  };

  const socialLinks = [
    { icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter className="w-4 h-4" />, url: "https://twitter.com", label: "X" },
    { icon: <Instagram className="w-4 h-4" />, url: "https://instagram.com", label: "Instagram" },
    { icon: <Youtube className="w-4 h-4" />, url: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-[#080808] border-t border-fyn-border/40 font-barlow relative overflow-hidden">
      {/* Subtle bottom accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-fyn-pink/5 blur-[80px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo Brand Descriptor */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block relative w-32 h-10">
              <Image
                src="/logos/fyn-logo-negative.png"
                alt="Fyn Mobility Logo"
                fill
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-fyn-text-muted leading-relaxed max-w-sm">
              A tech-enabled, asset-light platform building India&apos;s largest EV supply ecosystem — connecting enterprise demand with trained drivers, smart electric vehicles, and a full-stack tech suite.
            </p>
            <div className="flex items-center space-x-3.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-fyn-surface/60 border border-fyn-border/40 flex items-center justify-center text-fyn-text-muted hover:text-fyn-pink hover:border-fyn-pink/60 transition-all duration-300 shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Group 1: Platforms */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-fyn-text mb-6">
              Platforms Suite
            </h4>
            <ul className="space-y-4">
              {footerLinks.platforms.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs font-semibold text-fyn-text-muted hover:text-fyn-text transition-colors duration-200 flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 ml-1 text-fyn-pink opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Group 2: Company */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-fyn-text mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs font-semibold text-fyn-text-muted hover:text-fyn-text transition-colors duration-200 flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 ml-1 text-fyn-pink opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact and HQ hubs */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-fyn-text mb-6">
              Operations HQ
            </h4>
            <ul className="space-y-4 text-xs font-semibold text-fyn-text-muted">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-fyn-pink shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Fyn Mobility Headquarters,<br />
                  HSR Layout, Bengaluru,<br />
                  Karnataka, India
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-fyn-pink shrink-0" />
                <a
                  href="mailto:info@fynmobility.com"
                  className="hover:text-fyn-text transition-colors"
                >
                  info@fynmobility.com
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-fyn-pink shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Hubs: Bengaluru, Chennai, Hyderabad
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Base Legal details */}
        <div className="pt-10 border-t border-fyn-border/40 flex flex-col md:flex-row items-center justify-between text-[11px] font-semibold text-fyn-text-muted space-y-4 md:space-y-0">
          <p>© {currentYear} Fyn Mobility (VNPR Technologies Pvt Ltd). All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-fyn-text transition-colors">Privacy Parameters</a>
            <a href="#" className="hover:text-fyn-text transition-colors">Ecosystem Terms</a>
            <a href="#" className="hover:text-fyn-text transition-colors">Operational Protocols</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

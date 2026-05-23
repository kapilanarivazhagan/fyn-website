"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About Us", href: "#about" },
    { label: "Vision & Mission", href: "#vision-mission" },
    { label: "What We Do", href: "#what-we-do" },
    { label: "Refynd", href: "#refynd" },
    { label: "INFYNITY", href: "#infynity" },
    { label: "Clients & Partners", href: "#clients-partners" },
    { label: "Media", href: "#media" },
    { label: "Get Involved", href: "#get-involved" },
    { label: "Careers", href: "#careers" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-barlow ${
          scrolled
            ? "backdrop-blur-md bg-[#080808]/85 border-b border-fyn-pink/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="relative z-50 flex items-center group">
            <div className="relative w-24 h-8 md:w-28 md:h-9 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/logos/fyn-logo-negative.png"
                alt="Fyn Mobility Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[11px] font-bold uppercase tracking-wider text-fyn-text-muted hover:text-fyn-text transition-colors duration-300 relative py-1.5 group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-fyn-pink transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden xl:flex items-center ml-4">
            <Link href="#get-involved">
              <Button
                variant="primary"
                size="sm"
                className="font-bold cursor-pointer"
              >
                Connect Now <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden relative z-50 p-2 text-fyn-text hover:text-fyn-pink transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#080808] pt-24 px-8 pb-12 flex flex-col justify-between overflow-y-auto font-barlow xl:hidden"
          >
            {/* Dotted Grid Background */}
            <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xl font-black uppercase tracking-tight text-fyn-text hover:text-fyn-pink transition-colors duration-300 block"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 space-y-6 pt-6 border-t border-fyn-border/40"
            >
              <div className="flex flex-col space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-fyn-text-muted">
                  Central Operations Desk
                </span>
                <span className="text-sm font-semibold text-fyn-text">
                  info@fynmobility.com
                </span>
                <span className="text-xs text-fyn-text-muted">
                  RedeFYNing EV Mobility across India
                </span>
              </div>

              <Link href="#get-involved" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full font-bold cursor-pointer"
                >
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ArrowUpRight,
  Shield,
  Layers,
  Award,
  Terminal,
} from "lucide-react";
import { Button } from "../ui/Button";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  links?: { label: string; url: string; external?: boolean }[];
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiKey = process.env.NEXT_PUBLIC_CHAT_API_KEY || "UNCONFIGURED";

  useEffect(() => {
    // Initial greeting
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages([
      {
        sender: "bot",
        text: "System initialized. Welcome to the Fyn Mobility EV Control Center. I can assist you with fleet leasing, driver empowerment, investment operations, or career listings. How can we redeFYNe your mobility parameters today?",
        timestamp: now,
      },
    ]);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: "Lease/Rent EVs", query: "I want to lease an EV for fleet operations" },
    { label: "Driver Community", query: "Tell me about the INFYNITY App for drivers" },
    { label: "Investment Options", query: "How do I invest in Fyn Mobility?" },
    { label: "Join the Team", query: "What career openings are currently active?" },
  ];

  const handleResponse = (query: string) => {
    setIsTyping(true);
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setTimeout(() => {
      let botResponse: ChatMessage = {
        sender: "bot",
        text: "",
        timestamp: now,
      };

      const q = query.toLowerCase();

      if (q.includes("lease") || q.includes("rent") || q.includes("refynd") || q.includes("buy")) {
        botResponse.text = "Through our Refynd platform, you can lease, rent, or purchase high-performance commercial EVs with complete maintenance and battery assurance. We provide asset-light flexibility for fleet operators, logistics companies, and driver-owners.";
        botResponse.links = [
          { label: "Explore Refynd EV", url: "https://refyndev.com/", external: true },
          { label: "Log Telemetry (Partner Form)", url: "#get-involved" },
        ];
      } else if (q.includes("driver") || q.includes("infynity") || q.includes("app") || q.includes("play")) {
        botResponse.text = "Our INFYNITY ecosystem is much more than a job. It provides our driver-partners with healthcare support, comprehensive insurance, micro-credit lines, skill training, and robust financial inclusion. Download the INFYNITY App to join today.";
        botResponse.links = [
          {
            label: "Download INFYNITY App",
            url: "https://play.google.com/store/apps/details?id=com.fynmobility.infynity&hl=en-US",
            external: true,
          },
          { label: "Driver Sign-Up Form", url: "#get-involved" },
        ];
      } else if (q.includes("invest") || q.includes("venture") || q.includes("backing") || q.includes("funding")) {
        botResponse.text = "Fyn Mobility is a high-growth, tech-enabled, asset-light platform backing India's largest EV Supply Ecosystem. We are trusted by leaders like TVS Mobility, Vijay Kedia, and Bluehill Capital. Interested in accelerating our growth corridor?";
        botResponse.links = [
          { label: "Invest in Fyn Form", url: "#get-involved" },
        ];
      } else if (q.includes("career") || q.includes("job") || q.includes("openings") || q.includes("team") || q.includes("join")) {
        botResponse.text = "We build a mission-driven, high-agency startup culture for individuals looking to change the urban transportation landscape. Explore our active careers dashboard to view available openings in Technology, Operations, and Expansion.";
        botResponse.links = [
          { label: "View Open Careers", url: "#careers" },
        ];
      } else {
        botResponse.text = "I've logged your query parameters. For immediate support, you can submit an official inquiry in our operational categories under the 'Get Involved' section, or reach our central inbox directly.";
        botResponse.links = [
          { label: "Central Contact Desk", url: "#get-involved" },
          { label: "Mail Operations Desk", url: "mailto:info@fynmobility.com", external: true },
        ];
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newUserMsg: ChatMessage = {
      sender: "user",
      text,
      timestamp: now,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    handleResponse(text);
  };

  const handleLinkClick = (url: string, external?: boolean) => {
    if (url.startsWith("#")) {
      const el = document.getElementById(url.substring(1));
      if (el) {
        setIsOpen(false);
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.open(url, external ? "_blank" : "_self", "noopener,noreferrer");
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-14 h-14 rounded-full text-[#F4F4EF] cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(232,25,122,0.35)] transition-all duration-300 ${
            isOpen ? "bg-[#1E1E1E] border border-fyn-pink" : "bg-fyn-pink"
          }`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          {!isOpen && (
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4F4EF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F4F4EF]"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Expanded Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[520px] rounded-2xl bg-[#0F0F0F] border border-fyn-border/80 shadow-2xl flex flex-col z-50 overflow-hidden font-barlow"
          >
            {/* Header */}
            <div className="bg-[#161616] p-4 border-b border-fyn-border/60 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-fyn-pink/10 border border-fyn-pink/30 flex items-center justify-center text-fyn-pink">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#161616] rounded-full"></span>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-fyn-text">
                    Fyn Ops AI
                  </h4>
                  <div className="flex items-center text-[10px] text-fyn-text-muted">
                    <Terminal className="w-3 h-3 mr-1 text-fyn-pink" />
                    <span>Telemetry Gateway</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-fyn-text-muted hover:text-fyn-text transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Header API Key Status */}
            <div className="bg-[#1E1E1E] px-4 py-1.5 border-b border-fyn-border/30 flex items-center justify-between text-[9px] tracking-wider text-fyn-text-muted uppercase">
              <span className="flex items-center">
                <Shield className="w-2.5 h-2.5 mr-1 text-green-500" />
                API Session: Active
              </span>
              <span className="font-mono text-fyn-pink truncate max-w-[160px]">
                Key: {apiKey.substring(0, 12)}...
              </span>
            </div>

            {/* Message Pane */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar bg-[#080808]/60">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-fyn-pink text-[#F4F4EF] rounded-tr-none shadow-[0_4px_12px_rgba(232,25,122,0.15)]"
                        : "bg-fyn-surface/90 border border-fyn-border/40 text-fyn-text rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Action Links */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-fyn-border/20">
                        {msg.links.map((link, lIndex) => (
                          <button
                            key={lIndex}
                            onClick={() => handleLinkClick(link.url, link.external)}
                            className="flex items-center text-[10px] font-bold uppercase tracking-wider bg-black/40 hover:bg-black/80 text-fyn-text border border-fyn-pink/30 hover:border-fyn-pink px-2.5 py-1.5 rounded-lg transition-all duration-300 cursor-pointer"
                          >
                            {link.label}
                            <ArrowUpRight className="w-3 h-3 ml-1 text-fyn-pink" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-fyn-text-muted mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-fyn-surface/90 border border-fyn-border/40 text-fyn-text rounded-2xl rounded-tl-none p-3.5 flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-fyn-pink rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-fyn-pink rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-fyn-pink rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="p-3 bg-[#161616]/40 border-t border-fyn-border/40 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-fyn-text-muted px-1 flex items-center">
                  <Layers className="w-3 h-3 mr-1 text-fyn-pink" /> Recommended Controls
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {quickPrompts.map((p, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(p.query)}
                      className="text-left text-[10px] font-medium text-fyn-text-muted hover:text-fyn-text bg-[#161616]/80 hover:bg-[#1E1E1E] border border-fyn-border/40 hover:border-fyn-pink/60 px-2 py-2 rounded-xl transition-all duration-300 cursor-pointer truncate"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <div className="bg-[#161616] p-3 border-t border-fyn-border/60">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Query system parameters..."
                  className="flex-1 bg-[#080808] border border-fyn-border/60 focus:border-fyn-pink/80 rounded-xl px-3.5 py-2 text-xs text-fyn-text focus:outline-none placeholder-fyn-text-muted transition-all duration-300"
                />
                <button
                  type="submit"
                  className="bg-fyn-pink hover:bg-fyn-pink/80 text-[#F4F4EF] p-2.5 rounded-xl transition-all duration-300 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  Layers,
  MessageSquare,
  Send,
  Sparkles,
  X,
} from "lucide-react";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  links?: {
    label: string;
    url: string;
    external?: boolean;
  }[];
}

const languages = ["English", "தமிழ்", "ಕನ್ನಡ", "తెలుగు", "हिन्दी"];

const quickPrompts = [
  {
    label: "Lease EV Fleet",
    query: "I want EV leasing solutions",
  },
  {
    label: "Become Driver",
    query: "Tell me about driver onboarding",
  },
  {
    label: "Join Fyn",
    query: "Tell me about careers at Fyn",
  },
  {
    label: "Investors",
    query: "Tell me about Fyn investments",
  },
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("English");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages([
      {
        sender: "bot",
        text:
          "Hey, I'm FYNN.\n\nYour intelligent EV mobility assistant for Fyn Mobility.\n\nI can help with:\n• EV leasing\n• Driver onboarding\n• Careers\n• Partnerships\n• Investments\n• INFYNITY ecosystem\n\nHow can I help today?",
        timestamp: now,
        links: [
          {
            label: "Explore Refynd",
            url: "#refynd",
          },
          {
            label: "Explore Careers",
            url: "#careers",
          },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isTyping]);

  const handleResponse = async (query: string) => {
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
          language: activeLanguage,
        }),
      });

      const data = await response.json();
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply || "FYNN is thinking...",
          timestamp: now,
          links: data.links || [],
        },
      ]);
    } catch (error) {
      console.log(error);

      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "FYNN is temporarily offline.",
          timestamp: now,
        },
      ]);
    }

    setIsTyping(false);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text,
        timestamp: now,
      },
    ]);

    setInputValue("");
    handleResponse(text);
  };

  const handleLinkClick = (url: string, external?: boolean) => {
    if (!url) return;

    if (external || url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    const hash = url.replace("/#", "").replace("#", "");
    window.location.hash = hash;
  };

  return (
    <>
      <div className="fyn-chatbot-launcher">
        <motion.button
          type="button"
          aria-label={isOpen ? "Close FYNN assistant" : "Open FYNN assistant"}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative flex h-14 w-14 transform-gpu items-center justify-center rounded-full
            shadow-lg transition-all duration-300
            ${
              isOpen
                ? "border border-fyn-pink bg-[#1E1E1E]"
                : "bg-fyn-pink"
            }
          `}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <>
              <MessageSquare className="h-6 w-6 text-white" />
              <span className="absolute right-0 top-0 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
              </span>
            </>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="
              fyn-chatbot-panel flex flex-col rounded-2xl border border-fyn-border/80
              bg-[#0F0F0F] font-barlow shadow-2xl
            "
          >
            <div className="flex items-center justify-between border-b border-fyn-border/60 bg-[#161616] px-3.5 py-3.5 sm:p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-fyn-pink/30 bg-fyn-pink/10 sm:h-10 sm:w-10">
                  <Sparkles className="h-5 w-5 text-fyn-pink" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-black uppercase leading-tight tracking-wide text-fyn-text">
                    FYNN
                  </h4>
                  <p className="fyn-chatbot-text text-[10px] leading-snug text-green-400">
                    Intelligent EV Assistant
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close FYNN assistant"
                onClick={() => setIsOpen(false)}
                className="shrink-0 text-fyn-text-muted hover:text-fyn-text"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-fyn-border/40 bg-[#1A1A1A] px-3 py-2 sm:px-4">
              <Globe className="h-3 w-3 shrink-0 text-fyn-pink" />

              {languages.map((lang) => (
                <button
                  type="button"
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`
                    whitespace-nowrap rounded-full px-2.5 py-1.5 text-[10px] leading-none
                    transition-all sm:px-3 sm:text-[11px]
                    ${
                      activeLanguage === lang
                        ? "bg-fyn-pink text-white"
                        : "bg-[#222] text-fyn-text-muted"
                    }
                  `}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="fyn-chatbot-scroll flex-1 space-y-4 overflow-y-auto bg-[#080808]/60 p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`
                      fyn-chatbot-text max-w-[88%] rounded-2xl p-3.5 text-[12px]
                      leading-relaxed sm:max-w-[85%] sm:text-xs
                      ${
                        msg.sender === "user"
                          ? "rounded-tr-none bg-fyn-pink text-white"
                          : "rounded-tl-none border border-fyn-border/40 bg-fyn-surface/90 text-fyn-text"
                      }
                    `}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {!!msg.links?.length && (
                      <div className="mt-3 flex flex-wrap gap-2 border-t border-fyn-border/20 pt-2">
                        {msg.links.map((link, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleLinkClick(link.url, link.external);
                            }}
                            className="
                              fyn-chatbot-text inline-flex max-w-full items-center rounded-lg border
                              border-fyn-pink/30 bg-black/40 px-2.5 py-1.5 text-[10px]
                              font-bold uppercase tracking-wider text-fyn-text transition-all
                              hover:border-fyn-pink hover:bg-black/80
                            "
                          >
                            {link.label}
                            <ArrowUpRight className="ml-1 h-3 w-3 shrink-0 text-fyn-pink" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="mt-1 px-1 text-[9px] text-fyn-text-muted">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-1.5 rounded-2xl rounded-tl-none border border-fyn-border/40 bg-fyn-surface/90 p-3.5 text-fyn-text">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-fyn-pink" />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-fyn-pink"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-fyn-pink"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-fyn-border/40 bg-[#161616]/40 p-3">
              <span className="mb-2 flex items-center px-1 text-[10px] font-bold uppercase tracking-widest text-fyn-text-muted">
                <Layers className="mr-1 h-3 w-3 text-fyn-pink" />
                Popular Queries
              </span>

              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    type="button"
                    key={prompt.query}
                    onClick={() => handleSend(prompt.query)}
                    className="
                      fyn-chatbot-text rounded-xl border border-fyn-border/40 bg-[#161616]/80
                      px-2 py-2 text-left text-[10px] font-medium leading-snug
                      text-fyn-text-muted transition-all hover:border-fyn-pink/60
                      hover:bg-[#1E1E1E] hover:text-fyn-text
                    "
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-fyn-border/60 bg-[#161616] p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask FYNN anything..."
                  className="
                    fyn-chatbot-text min-w-0 flex-1 rounded-xl border border-fyn-border/60
                    bg-[#080808] px-3.5 py-2 text-xs text-fyn-text
                    placeholder-fyn-text-muted focus:border-fyn-pink/80 focus:outline-none
                  "
                />

                <button
                  type="submit"
                  aria-label="Send message"
                  className="shrink-0 rounded-xl bg-fyn-pink p-2.5 text-white transition-all hover:bg-fyn-pink/80"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

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

// ── Language definitions ───────────────────────────────────────────────────
const languages = ["English", "தமிழ்", "ಕನ್ನಡ", "తెలుగు", "हिन्दी"];

// All static UI strings + initial greeting keyed by language.
// Keeping translations here means a single language switch instantly
// updates every UI element without any API round-trip.
const chatUI: Record<
  string,
  {
    subtitle: string;
    popularQueries: string;
    placeholder: string;
    offline: string;
    prompts: { label: string; query: string }[];
    greeting: string;
    greetingLinks: { label: string; url: string }[];
  }
> = {
  English: {
    subtitle: "Intelligent EV Assistant",
    popularQueries: "Popular Queries",
    placeholder: "Ask FYNN anything...",
    offline: "FYNN is temporarily offline.",
    prompts: [
      { label: "Lease EV Fleet",   query: "I want EV leasing solutions" },
      { label: "Become Driver",    query: "Tell me about driver onboarding" },
      { label: "Join Fyn",         query: "Tell me about careers at Fyn" },
      { label: "Investors",        query: "Tell me about Fyn investments" },
    ],
    greeting:
      "Hey, I'm FYNN.\n\nYour intelligent EV mobility assistant for Fyn Mobility.\n\nI can help with:\n• EV leasing\n• Driver onboarding\n• Careers\n• Partnerships\n• Investments\n• INFYNITY ecosystem\n\nHow can I help today?",
    greetingLinks: [
      { label: "Explore Refynd",  url: "#refynd" },
      { label: "Explore Careers", url: "#careers" },
    ],
  },

  "தமிழ்": {
    subtitle: "திறமையான EV உதவியாளர்",
    popularQueries: "பிரபலமான கேள்விகள்",
    placeholder: "FYNN-ஐ கேளுங்கள்...",
    offline: "FYNN தற்காலிகமாக இல்லை.",
    prompts: [
      { label: "EV வாகன குத்தகை",   query: "நான் EV குத்தகை தீர்வுகளை விரும்புகிறேன்" },
      { label: "டிரைவர் ஆவது",      query: "டிரைவர் பதிவு பற்றி சொல்லுங்கள்" },
      { label: "Fyn-ஐ சேர",         query: "Fyn-ல் வேலைகள் பற்றி சொல்லுங்கள்" },
      { label: "முதலீட்டாளர்கள்",   query: "Fyn முதலீடுகள் பற்றி சொல்லுங்கள்" },
    ],
    greeting:
      "வணக்கம், நான் FYNN.\n\nFyn Mobility-ன் திறமையான EV உதவியாளர்.\n\nநான் உதவலாம்:\n• EV குத்தகை\n• டிரைவர் பதிவு\n• வேலைகள்\n• கூட்டுத்தொழில்\n• முதலீடுகள்\n• INFYNITY சுற்றுச்சூழல்\n\nஇன்று எப்படி உதவலாம்?",
    greetingLinks: [
      { label: "Refynd ஆராய",   url: "#refynd" },
      { label: "வேலைகள் ஆராய", url: "#careers" },
    ],
  },

  "ಕನ್ನಡ": {
    subtitle: "ಬುದ್ಧಿವಂತ EV ಸಹಾಯಕ",
    popularQueries: "ಜನಪ್ರಿಯ ಪ್ರಶ್ನೆಗಳು",
    placeholder: "FYNN ಅನ್ನು ಕೇಳಿ...",
    offline: "FYNN ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಭ್ಯವಿಲ್ಲ.",
    prompts: [
      { label: "EV ಫ್ಲೀಟ್ ಲೀಸ್",   query: "ನನಗೆ EV ಲೀಸಿಂಗ್ ಪರಿಹಾರಗಳು ಬೇಕು" },
      { label: "ಚಾಲಕರಾಗಿ",          query: "ಚಾಲಕ ನೋಂದಣಿ ಬಗ್ಗೆ ಹೇಳಿ" },
      { label: "Fyn ಸೇರಿ",           query: "Fyn ನಲ್ಲಿ ವೃತ್ತಿಗಳ ಬಗ್ಗೆ ಹೇಳಿ" },
      { label: "ಹೂಡಿಕೆದಾರರು",       query: "Fyn ಹೂಡಿಕೆಗಳ ಬಗ್ಗೆ ಹೇಳಿ" },
    ],
    greeting:
      "ನಮಸ್ಕಾರ, ನಾನು FYNN.\n\nFyn Mobility-ಗೆ ನಿಮ್ಮ ಬುದ್ಧಿವಂತ EV ಸಹಾಯಕ.\n\nನಾನು ಸಹಾಯ ಮಾಡಬಹುದು:\n• EV ಲೀಸಿಂಗ್\n• ಚಾಲಕ ನೋಂದಣಿ\n• ವೃತ್ತಿಗಳು\n• ಪಾಲುದಾರಿಕೆ\n• ಹೂಡಿಕೆ\n• INFYNITY ಪರಿಸರ\n\nಇಂದು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    greetingLinks: [
      { label: "Refynd ಅನ್ವೇಷಿಸಿ",  url: "#refynd" },
      { label: "ವೃತ್ತಿ ಅನ್ವೇಷಿಸಿ", url: "#careers" },
    ],
  },

  "తెలుగు": {
    subtitle: "తెలివైన EV సహాయకుడు",
    popularQueries: "జనప్రియ ప్రశ్నలు",
    placeholder: "FYNN ని అడగండి...",
    offline: "FYNN తాత్కాలికంగా అందుబాటులో లేదు.",
    prompts: [
      { label: "EV ఫ్లీట్ లీజ్",      query: "నాకు EV లీజింగ్ పరిష్కారాలు కావాలి" },
      { label: "డ్రైవర్ అవ్వండి",    query: "డ్రైవర్ నమోదు గురించి చెప్పండి" },
      { label: "Fyn లో చేరండి",       query: "Fyn లో కెరీర్ల గురించి చెప్పండి" },
      { label: "పెట్టుబడిదారులు",    query: "Fyn పెట్టుబడుల గురించి చెప్పండి" },
    ],
    greeting:
      "నమస్కారం, నేను FYNN.\n\nFyn Mobility కోసం మీ తెలివైన EV సహాయకుడు.\n\nనేను సహాయం చేయగలను:\n• EV లీజింగ్\n• డ్రైవర్ నమోదు\n• కెరీర్లు\n• భాగస్వామ్యాలు\n• పెట్టుబడులు\n• INFYNITY పర్యావరణం\n\nఈరోజు ఎలా సహాయం చేయాలి?",
    greetingLinks: [
      { label: "Refynd అన్వేషించండి",    url: "#refynd" },
      { label: "కెరీర్లు అన్వేషించండి", url: "#careers" },
    ],
  },

  "हिन्दी": {
    subtitle: "बुद्धिमान EV सहायक",
    popularQueries: "लोकप्रिय प्रश्न",
    placeholder: "FYNN से कुछ भी पूछें...",
    offline: "FYNN अस्थायी रूप से ऑफलाइन है।",
    prompts: [
      { label: "EV फ्लीट लीज़",   query: "मुझे EV लीजिंग समाधान चाहिए" },
      { label: "ड्राइवर बनें",    query: "ड्राइवर ऑनबोर्डिंग के बारे में बताएं" },
      { label: "Fyn से जुड़ें",   query: "Fyn में करियर के बारे में बताएं" },
      { label: "निवेशक",          query: "Fyn निवेश के बारे में बताएं" },
    ],
    greeting:
      "नमस्ते, मैं FYNN हूं।\n\nFyn Mobility का आपका बुद्धिमान EV सहायक।\n\nमैं मदद कर सकता हूं:\n• EV लीजिंग\n• ड्राइवर ऑनबोर्डिंग\n• करियर\n• साझेदारियां\n• निवेश\n• INFYNITY पारिस्थितिकी\n\nआज मैं आपकी कैसे मदद कर सकता हूं?",
    greetingLinks: [
      { label: "Refynd एक्सप्लोर करें",   url: "#refynd" },
      { label: "करियर एक्सप्लोर करें",   url: "#careers" },
    ],
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function buildGreeting(lang: string): ChatMessage {
  const t = chatUI[lang] ?? chatUI["English"];
  return {
    sender: "bot",
    text: t.greeting,
    timestamp: nowTime(),
    links: t.greetingLinks,
  };
}

// ── Component ──────────────────────────────────────────────────────────────

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("English");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Seed initial greeting on first mount.
  useEffect(() => {
    setMessages([buildGreeting("English")]);
  }, []);

  // Auto-scroll to newest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  // ── Language switch ──────────────────────────────────────────────────────
  // Updates activeLanguage AND replaces the initial greeting (messages[0])
  // with the translated version so all static UI switches atomically.
  const handleLanguageChange = (lang: string) => {
    setActiveLanguage(lang);
    setMessages((prev) => {
      if (prev.length === 0) return [buildGreeting(lang)];
      // Only update the very first bot message (the initial greeting).
      const updated = [...prev];
      if (updated[0].sender === "bot") {
        updated[0] = { ...buildGreeting(lang), timestamp: updated[0].timestamp };
      }
      return updated;
    });
  };

  // ── API response ─────────────────────────────────────────────────────────
  const handleResponse = async (query: string) => {
    setIsTyping(true);
    const t = chatUI[activeLanguage] ?? chatUI["English"];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, language: activeLanguage }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply || "FYNN is thinking...",
          timestamp: nowTime(),
          links: data.links || [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: t.offline, timestamp: nowTime() },
      ]);
    }

    setIsTyping(false);
  };

  // ── Send ─────────────────────────────────────────────────────────────────
  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text, timestamp: nowTime() },
    ]);

    setInputValue("");
    handleResponse(text);
  };

  // ── Navigation links ─────────────────────────────────────────────────────
  const handleLinkClick = (url: string, external?: boolean) => {
    if (!url) return;
    if (external || url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    const hash = url.replace("/#", "").replace("#", "");
    window.location.hash = hash;
  };

  // ── Active UI strings ─────────────────────────────────────────────────────
  const t = chatUI[activeLanguage] ?? chatUI["English"];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="fyn-chatbot-launcher">
        <motion.button
          type="button"
          aria-label={isOpen ? "Close FYNN assistant" : "Open FYNN assistant"}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative flex h-14 w-14 transform-gpu items-center justify-center rounded-full
            shadow-lg transition-all duration-300
            ${isOpen ? "border border-fyn-pink bg-[#1E1E1E]" : "bg-fyn-pink"}
          `}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <>
              <MessageSquare className="h-6 w-6 text-white" />
              <span className="absolute right-0 top-0 flex h-3 w-3">
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
              </span>
            </>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 22 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="
              fyn-chatbot-panel flex flex-col rounded-2xl border border-fyn-border/80
              bg-[#0F0F0F] font-barlow shadow-2xl
            "
          >
            {/* ── Header ──────────────────────────────────────────────── */}
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
                    {t.subtitle}
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

            {/* ── Language selector ────────────────────────────────────── */}
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-fyn-border/40 bg-[#1A1A1A] px-3 py-2 sm:px-4">
              <Globe className="h-3 w-3 shrink-0 text-fyn-pink" />

              {languages.map((lang) => (
                <button
                  type="button"
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`
                    whitespace-nowrap rounded-full px-2.5 py-1.5 text-[10px] leading-none
                    transition-all sm:px-3 sm:text-[11px]
                    ${activeLanguage === lang
                      ? "bg-fyn-pink text-white"
                      : "bg-[#222] text-fyn-text-muted"}
                  `}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* ── Messages ─────────────────────────────────────────────── */}
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
                      ${msg.sender === "user"
                        ? "rounded-tr-none bg-fyn-pink text-white"
                        : "rounded-tl-none border border-fyn-border/40 bg-fyn-surface/90 text-fyn-text"}
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
                  <span className="h-2 w-2 rounded-full bg-fyn-pink opacity-60" />
                  <span className="h-2 w-2 rounded-full bg-fyn-pink opacity-80" />
                  <span className="h-2 w-2 rounded-full bg-fyn-pink" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick prompts ────────────────────────────────────────── */}
            <div className="border-t border-fyn-border/40 bg-[#161616]/40 p-3">
              <span className="mb-2 flex items-center px-1 text-[10px] font-bold uppercase tracking-widest text-fyn-text-muted">
                <Layers className="mr-1 h-3 w-3 text-fyn-pink" />
                {t.popularQueries}
              </span>

              <div className="grid grid-cols-2 gap-2">
                {t.prompts.map((prompt) => (
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

            {/* ── Input ────────────────────────────────────────────────── */}
            <div className="border-t border-fyn-border/60 bg-[#161616] p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2"
              >
                {/* font-size: 16px via inline style prevents iOS Safari from
                    auto-zooming the viewport when this input receives focus.
                    iOS zooms in when any input has font-size < 16px. */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t.placeholder}
                  style={{ fontSize: "16px" }}
                  className="
                    fyn-chatbot-text min-w-0 flex-1 rounded-xl border border-fyn-border/60
                    bg-[#080808] px-3.5 py-2 text-fyn-text
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

"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  MessageSquare,
  X,
  Send,
  ArrowUpRight,
  Layers,
  Sparkles,
  Globe,
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

export const Chatbot = () => {
  const [isOpen, setIsOpen] =
    useState(false);

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [inputValue, setInputValue] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const [activeLanguage, setActiveLanguage] =
    useState("English");

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  /* =========================================
     INITIAL GREETING
  ========================================= */

  useEffect(() => {
    const now =
      new Date().toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );

    setMessages([
      {
        sender: "bot",

        text:
          "⚡ Hey, I’m FYNN.\n\nYour intelligent EV mobility assistant for Fyn Mobility.\n\nI can help with:\n• EV leasing\n• Driver onboarding\n• Careers\n• Partnerships\n• Investments\n• INFYNITY ecosystem\n\nHow can I help today?",

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

  /* =========================================
     AUTO SCROLL
  ========================================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior: "smooth",
      }
    );
  }, [messages, isTyping]);

  /* =========================================
     QUICK PROMPTS
  ========================================= */

  const quickPrompts = [
    {
      label: "Lease EV Fleet",
      query:
        "I want EV leasing solutions",
    },

    {
      label: "Become Driver",
      query:
        "Tell me about driver onboarding",
    },

    {
      label: "Join Fyn",
      query:
        "Tell me about careers at Fyn",
    },

    {
      label: "Investors",
      query:
        "Tell me about Fyn investments",
    },
  ];

  /* =========================================
     SEND TO API
  ========================================= */

  const handleResponse = async (
    query: string
  ) => {
    setIsTyping(true);

    try {
      const response =
        await fetch("/api/chat", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message: query,

            language:
              activeLanguage,
          }),
        });

      const data =
        await response.json();

      const now =
        new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );

      setMessages((prev) => [
        ...prev,

        {
          sender: "bot",

          text:
            data.reply ||
            "FYNN is thinking...",

          timestamp: now,

          links:
            data.links || [],
        },
      ]);
    } catch (error) {
      console.log(error);

      const now =
        new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );

      setMessages((prev) => [
        ...prev,

        {
          sender: "bot",

          text:
            "⚠️ FYNN is temporarily offline.",

          timestamp: now,
        },
      ]);
    }

    setIsTyping(false);
  };

  /* =========================================
     SEND MESSAGE
  ========================================= */

  const handleSend = (
    text: string
  ) => {
    if (!text.trim()) return;

    const now =
      new Date().toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );

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

  /* =========================================
     LINK HANDLER
  ========================================= */

  const handleLinkClick = (
    url: string,
    external?: boolean
  ) => {
    if (!url) return;

    if (external || url.startsWith("http")) {
      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    const hash = url
      .replace("/#", "")
      .replace("#", "");

    console.log("NAVIGATING TO:", hash);

    window.location.hash = hash;
  };
  return (
    <>
      {/* FLOATING BUTTON */}

      <div
        className="
          fixed
          bottom-6
          right-6
          z-50
        "
      >
        <motion.button
          onClick={() =>
            setIsOpen(!isOpen)
          }
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className={`
            relative

            w-14
            h-14

            rounded-full

            flex
            items-center
            justify-center

            transition-all
            duration-300

            shadow-lg

            ${
              isOpen
                ? "bg-[#1E1E1E] border border-fyn-pink"
                : "bg-fyn-pink"
            }
          `}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-white" />

              <span
                className="
                  absolute
                  top-0
                  right-0

                  flex
                  h-3
                  w-3
                "
              >
                <span
                  className="
                    animate-ping
                    absolute
                    inline-flex
                    h-full
                    w-full
                    rounded-full
                    bg-white
                    opacity-75
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    rounded-full
                    h-3
                    w-3
                    bg-white
                  "
                />
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* CHAT WINDOW */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            className="
              fixed
              bottom-24
              right-6

              w-96
              max-w-[calc(100vw-2rem)]

              h-[620px]

              rounded-2xl

              bg-[#0F0F0F]

              border
              border-fyn-border/80

              shadow-2xl

              flex
              flex-col

              z-50

              font-barlow
            "
          >
            {/* HEADER */}

            <div
              className="
                bg-[#161616]

                p-4

                border-b
                border-fyn-border/60

                flex
                items-center
                justify-between
              "
            >
              <div
                className="
                  flex
                  items-center
                  space-x-3
                "
              >
                <div
                  className="
                    w-10
                    h-10

                    rounded-full

                    bg-fyn-pink/10

                    border
                    border-fyn-pink/30

                    flex
                    items-center
                    justify-center
                  "
                >
                  <Sparkles
                    className="
                      w-5
                      h-5

                      text-fyn-pink
                    "
                  />
                </div>

                <div>
                  <h4
                    className="
                      text-sm
                      font-black
                      uppercase
                      tracking-wide

                      text-fyn-text
                    "
                  >
                    FYNN
                  </h4>

                  <p
                    className="
                      text-[10px]
                      text-green-400
                    "
                  >
                    Intelligent EV Assistant
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setIsOpen(false)
                }
                className="
                  text-fyn-text-muted
                  hover:text-fyn-text
                "
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* LANGUAGE BAR */}

            <div
              className="
                bg-[#1A1A1A]

                px-4
                py-2

                border-b
                border-fyn-border/40

                flex
                items-center
                gap-2

                overflow-x-auto
              "
            >
              <Globe
                className="
                  w-3
                  h-3

                  text-fyn-pink
                "
              />

              {[
                "English",
                "தமிழ்",
                "ಕನ್ನಡ",
                "తెలుగు",
              ].map((lang) => (
                <button
                  key={lang}
                  onClick={() =>
                    setActiveLanguage(
                      lang
                    )
                  }
                  className={`
                    text-[11px]

                    px-3
                    py-1.5

                    rounded-full

                    whitespace-nowrap

                    transition-all

                    ${
                      activeLanguage ===
                      lang
                        ? "bg-fyn-pink text-white"
                        : "bg-[#222] text-fyn-text-muted"
                    }
                  `}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* MESSAGES */}

            <div
              className="
                flex-1

                overflow-y-auto

                p-4

                space-y-4

                bg-[#080808]/60
              "
            >
              {messages.map(
                (msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.sender ===
                      "user"
                        ? "items-end"
                        : "items-start"
                    }`}
                  >
                    <div
                      className={`
                        max-w-[85%]

                        rounded-2xl

                        p-3.5

                        text-xs

                        leading-relaxed

                        ${
                          msg.sender ===
                          "user"
                            ? "bg-fyn-pink text-white rounded-tr-none"
                            : "bg-fyn-surface/90 border border-fyn-border/40 text-fyn-text rounded-tl-none"
                        }
                      `}
                    >
                      <p className="whitespace-pre-line">
                        {msg.text}
                      </p>

                      {/* ACTION LINKS */}

                      {msg.links &&
                        msg.links
                          .length >
                          0 && (
                          <div
                            className="
                              mt-3

                              flex
                              flex-wrap

                              gap-2

                              pt-2

                              border-t
                              border-fyn-border/20
                            "
                          >
                            {msg.links.map(
                              (
                                link,
                                idx
                              ) => (
                                <button
                                  type="button"
                                  key={idx}
                                  onClick={(e) => {
                                    e.preventDefault();

                                    e.stopPropagation();

                                    handleLinkClick(
                                      link.url,
                                      link.external
                                    );
                                  }}
                                  className="
                                    flex
                                    items-center

                                    text-[10px]

                                    font-bold

                                    uppercase

                                    tracking-wider

                                    bg-black/40

                                    hover:bg-black/80

                                    text-fyn-text

                                    border
                                    border-fyn-pink/30

                                    hover:border-fyn-pink

                                    px-2.5
                                    py-1.5

                                    rounded-lg

                                    transition-all
                                  "
                                >
                                  {
                                    link.label
                                  }

                                  <ArrowUpRight
                                    className="
                                      w-3
                                      h-3

                                      ml-1

                                      text-fyn-pink
                                    "
                                  />
                                </button>
                              )
                            )}
                          </div>
                        )}
                    </div>

                    <span
                      className="
                        text-[9px]

                        text-fyn-text-muted

                        mt-1
                        px-1
                      "
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                )
              )}

              {/* TYPING */}

              {isTyping && (
                <div
                  className="
                    bg-fyn-surface/90

                    border
                    border-fyn-border/40

                    text-fyn-text

                    rounded-2xl
                    rounded-tl-none

                    p-3.5

                    flex
                    items-center
                    space-x-1.5
                  "
                >
                  <span
                    className="
                      w-2
                      h-2

                      bg-fyn-pink

                      rounded-full

                      animate-bounce
                    "
                  />

                  <span
                    className="
                      w-2
                      h-2

                      bg-fyn-pink

                      rounded-full

                      animate-bounce
                    "
                    style={{
                      animationDelay:
                        "150ms",
                    }}
                  />

                  <span
                    className="
                      w-2
                      h-2

                      bg-fyn-pink

                      rounded-full

                      animate-bounce
                    "
                    style={{
                      animationDelay:
                        "300ms",
                    }}
                  />
                </div>
              )}

              <div
                ref={messagesEndRef}
              />
            </div>

            {/* QUICK ACTIONS */}

            <div
              className="
                p-3

                bg-[#161616]/40

                border-t
                border-fyn-border/40
              "
            >
              <span
                className="
                  text-[10px]

                  font-bold

                  uppercase

                  tracking-widest

                  text-fyn-text-muted

                  px-1

                  flex
                  items-center

                  mb-2
                "
              >
                <Layers
                  className="
                    w-3
                    h-3

                    mr-1

                    text-fyn-pink
                  "
                />

                Popular Queries
              </span>

              <div
                className="
                  grid
                  grid-cols-2

                  gap-2
                "
              >
                {quickPrompts.map(
                  (p, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        handleSend(
                          p.query
                        )
                      }
                      className="
                        text-left

                        text-[10px]

                        font-medium

                        text-fyn-text-muted

                        hover:text-fyn-text

                        bg-[#161616]/80

                        hover:bg-[#1E1E1E]

                        border
                        border-fyn-border/40

                        hover:border-fyn-pink/60

                        px-2
                        py-2

                        rounded-xl

                        transition-all
                      "
                    >
                      {p.label}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* INPUT */}

            <div
              className="
                bg-[#161616]

                p-3

                border-t
                border-fyn-border/60
              "
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  handleSend(
                    inputValue
                  );
                }}
                className="
                  flex
                  items-center
                  space-x-2
                "
              >
                <input
                  type="text"
                  value={
                    inputValue
                  }
                  onChange={(e) =>
                    setInputValue(
                      e.target.value
                    )
                  }
                  placeholder="Ask FYNN anything..."
                  className="
                    flex-1

                    bg-[#080808]

                    border
                    border-fyn-border/60

                    focus:border-fyn-pink/80

                    rounded-xl

                    px-3.5
                    py-2

                    text-xs

                    text-fyn-text

                    placeholder-fyn-text-muted

                    focus:outline-none
                  "
                />

                <button
                  type="submit"
                  className="
                    bg-fyn-pink

                    hover:bg-fyn-pink/80

                    text-white

                    p-2.5

                    rounded-xl

                    transition-all
                  "
                >
                  <Send
                    className="
                      w-4
                      h-4
                    "
                  />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
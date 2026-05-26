"use client";

import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 520);

      const footer = document.querySelector("footer");
      const footerRect = footer?.getBoundingClientRect();
      setFooterVisible(
        Boolean(footerRect && footerRect.top < window.innerHeight - 24)
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && !footerVisible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 10, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.94 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-fyn-pink/45 bg-[#0b0b0b]/88 text-fyn-text shadow-[0_0_22px_rgba(232,25,122,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-fyn-pink hover:bg-fyn-pink hover:text-white sm:right-6"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

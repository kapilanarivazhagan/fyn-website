"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  interactive?: boolean;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className,
  glowColor = "rgba(232, 25, 122, 0.08)",
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setIsTouchDevice(!mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsTouchDevice(!e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;

    const rect = e.currentTarget.getBoundingClientRect();
    glowRef.current?.style.setProperty(
      "--glow-x",
      `${e.clientX - rect.left}px`
    );
    glowRef.current?.style.setProperty(
      "--glow-y",
      `${e.clientY - rect.top}px`
    );
  };

  const baseClassName = cn(
    "relative overflow-hidden rounded-2xl border border-fyn-border bg-fyn-surface/75 p-6 backdrop-blur-md transition-colors duration-300 font-barlow",
    className
  );

  // ─── Non-interactive or touch device: plain div (no Framer Motion props on DOM) ───
  if (!interactive || isTouchDevice) {
    return (
      <div className={baseClassName}>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  // ─── Desktop with hover capability: motion.div with whileHover ───
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        baseClassName,
        "hover:border-fyn-pink/30 hover:shadow-[0_10px_30px_rgba(232,25,122,0.05)]"
      )}
    >
      {isHovered && (
        <div
          ref={glowRef}
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

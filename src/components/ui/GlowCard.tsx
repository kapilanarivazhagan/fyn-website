"use client";

import React, { useState } from "react";
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
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const CardWrapper = interactive ? motion.div : "div";

  return (
    <CardWrapper
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={interactive ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-fyn-border bg-fyn-surface/75 p-6 backdrop-blur-md transition-all duration-300 font-barlow",
        interactive && "hover:border-fyn-pink/30 hover:shadow-[0_10px_30px_rgba(232,25,122,0.05)]",
        className
      )}
    >
      {interactive && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </CardWrapper>
  );
};

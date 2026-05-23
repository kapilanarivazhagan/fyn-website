"use client";

import React from "react";
import { GlowCard } from "./GlowCard";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  imageName: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role,
  bio,
  imageName,
}) => {
  // Get initials for placeholder avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <GlowCard className="group h-full flex flex-col justify-between" glowColor="rgba(232, 25, 122, 0.08)">
      <div>
        {/* Stylized high-tech avatar placeholder instead of missing stock images */}
        <div className="relative w-full aspect-square rounded-xl bg-gradient-to-br from-[#121212] to-[#1E1E1E] border border-fyn-border/60 overflow-hidden mb-5 flex items-center justify-center group-hover:border-fyn-pink/30 transition-all duration-300">
          {/* Subtle background tech grid lines */}
          <div className="absolute inset-0 bg-grid-dots opacity-40" />
          
          {/* Decorative pink glowing circle inside the avatar */}
          <div className="absolute w-24 h-24 rounded-full bg-fyn-pink/5 blur-xl group-hover:bg-fyn-pink/10 transition-all duration-300" />
          
          {/* Initials with premium typographic treatment */}
          <span className="text-4xl font-black text-fyn-text tracking-tighter opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
            {initials}
          </span>
          
          {/* Decorative scanner line */}
          <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[8px] font-mono text-fyn-text-muted/50 tracking-widest uppercase">
            <span>FYN SYS</span>
            <span>SEC_LOC_{initials}</span>
          </div>
        </div>

        <h3 className="text-xl font-black text-fyn-text uppercase tracking-tight group-hover:text-fyn-pink transition-colors duration-300">
          {name}
        </h3>
        <p className="text-xs uppercase tracking-widest font-semibold text-fyn-pink/80 mt-1 mb-3">
          {role}
        </p>
      </div>

      <p className="text-sm text-fyn-text-muted leading-relaxed border-t border-fyn-border/40 pt-4 mt-4">
        {bio}
      </p>
    </GlowCard>
  );
};

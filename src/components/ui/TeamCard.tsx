"use client";

import React from "react";
import Image from "next/image";
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
  // Get initials for scanner label
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <GlowCard
      className="group h-full flex flex-col justify-between"
      glowColor="rgba(232, 25, 122, 0.08)"
    >
      <div>
        {/* PROFILE IMAGE */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 border border-fyn-border/60 bg-[#121212] group-hover:border-fyn-pink/30 transition-all duration-500">

          {/* IMAGE */}
          <Image
            src={imageName}
            alt={name}
            fill
            sizes="400px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority={false}
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />

          {/* AMBIENT PINK GLOW */}
          <div className="absolute inset-0 bg-fyn-pink/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* TECH LABEL */}
          <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[8px] font-mono text-white/60 tracking-widest uppercase z-10">
            <span>FYN SYS</span>
            <span>SEC_LOC_{initials}</span>
          </div>
        </div>

        {/* NAME */}
        <h3 className="text-xl font-black text-fyn-text uppercase tracking-tight group-hover:text-fyn-pink transition-colors duration-300">
          {name}
        </h3>

        {/* ROLE */}
        <p className="text-xs uppercase tracking-widest font-semibold text-fyn-pink/80 mt-1 mb-3">
          {role}
        </p>
      </div>

      {/* BIO */}
      <p className="text-sm text-fyn-text-muted leading-relaxed border-t border-fyn-border/40 pt-4 mt-4">
        {bio}
      </p>
    </GlowCard>
  );
};
"use client";

import React, { useEffect, useState } from "react";
import { GlowCard } from "./GlowCard";
import { cn } from "@/lib/utils";

interface InvestorCardProps {
  name: string;
  type: string;
  description: string;
  logo?: string;
  logoClass?: string;
}

export const InvestorCard: React.FC<InvestorCardProps> = ({
  name,
  type,
  description,
  logo,
  logoClass,
}) => {
  const [imgError, setImgError] = useState(false);
  const showLogo = logo && !imgError;

  useEffect(() => {
    setImgError(false);
  }, [logo]);

  return (
    <GlowCard className="flex h-full min-h-[270px] flex-col justify-between" glowColor="rgba(232, 25, 122, 0.06)">
      <div>
        <div
          className="
            mb-5 flex h-20 w-full items-center justify-center
            rounded-lg
            border border-white/[0.04]
            bg-black/12
            px-5
          "
        >
          {showLogo ? (
            <img
              src={logo}
              alt={`${name} Logo`}
              loading="lazy"
              decoding="async"
              className={cn(
                "h-auto max-h-12 w-auto max-w-[68%] object-contain opacity-95",
                logoClass
              )}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex items-center justify-center space-x-3 text-center">
              <div className="w-2.5 h-2.5 rounded-full bg-fyn-pink" />
              <h3 className="text-lg font-black text-fyn-text uppercase tracking-tight">
                {name}
              </h3>
            </div>
          )}
        </div>
        
        <div className="min-h-[22px]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink/80 bg-fyn-pink/10 border border-fyn-pink/20 px-2 py-0.5 rounded">
            {type}
          </span>
        </div>
      </div>

      <p className="text-sm text-fyn-text-muted mt-5 leading-relaxed min-h-[88px]">
        {description}
      </p>
    </GlowCard>
  );
};

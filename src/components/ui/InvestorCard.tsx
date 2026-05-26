"use client";

import React, { useState } from "react";
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

  return (
    <GlowCard className="flex flex-col justify-between h-full" glowColor="rgba(232, 25, 122, 0.06)">
      <div>
        <div className="flex items-center mb-4 min-h-12">
          {showLogo ? (
            <img
              src={logo}
              alt={`${name} Logo`}
              className={cn(
                "max-w-[62%] max-h-12 object-contain",
                logoClass
              )}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-fyn-pink" />
              <h3 className="text-lg font-black text-fyn-text uppercase tracking-tight">
                {name}
              </h3>
            </div>
          )}
        </div>
        
        <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-pink/80 bg-fyn-pink/10 border border-fyn-pink/20 px-2 py-0.5 rounded">
          {type}
        </span>
      </div>

      <p className="text-sm text-fyn-text-muted mt-5 leading-relaxed">
        {description}
      </p>
    </GlowCard>
  );
};

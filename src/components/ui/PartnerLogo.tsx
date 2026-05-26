"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface PartnerLogoProps {
  name: string;
  logo?: string;
  className?: string;
  logoClass?: string;
}

export const PartnerLogo: React.FC<PartnerLogoProps> = ({ name, logo, className, logoClass }) => {
  const [imgError, setImgError] = useState(false);

  // Show image only if logo is specified and has not thrown a loading error
  const showImage = logo && logo !== "" && !imgError;

  return (
    <div
      className={cn(
        "flex items-center justify-center p-4 rounded-xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border border-fyn-border/40 hover:border-fyn-pink/20 transition-all duration-300 select-none group font-barlow w-full aspect-[2.5/1] sm:aspect-square relative overflow-hidden",
        className
      )}
    >
      {showImage ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={logo}
            alt={`${name} Logo`}
            className={cn(
              "max-w-[80%] max-h-[80%] object-contain transition-transform duration-300 group-hover:scale-105",
              logoClass
            )}
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          {/* Subtle geometric prefix logo indicator */}
          <div className="w-1.5 h-1.5 bg-fyn-pink/40 group-hover:bg-fyn-pink rounded-sm transition-colors duration-300" />
          <span className="text-xs sm:text-sm font-bold text-fyn-text-muted group-hover:text-fyn-text tracking-wider uppercase transition-colors duration-300 text-center">
            {name}
          </span>
        </div>
      )}
    </div>
  );
};

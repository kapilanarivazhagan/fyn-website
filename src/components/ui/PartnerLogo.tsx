import React from "react";
import { cn } from "@/lib/utils";

interface PartnerLogoProps {
  name: string;
  className?: string;
}

export const PartnerLogo: React.FC<PartnerLogoProps> = ({ name, className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border border-fyn-border/40 hover:border-fyn-pink/20 transition-all duration-300 select-none group font-barlow",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        {/* Subtle geometric prefix logo indicator */}
        <div className="w-1.5 h-1.5 bg-fyn-pink/40 group-hover:bg-fyn-pink rounded-sm transition-colors duration-300" />
        <span className="text-sm font-bold text-fyn-text-muted group-hover:text-fyn-text tracking-wider uppercase transition-colors duration-300">
          {name}
        </span>
      </div>
    </div>
  );
};

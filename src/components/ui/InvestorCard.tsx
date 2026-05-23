import React from "react";
import { GlowCard } from "./GlowCard";

interface InvestorCardProps {
  name: string;
  type: string;
  description: string;
}

export const InvestorCard: React.FC<InvestorCardProps> = ({
  name,
  type,
  description,
}) => {
  return (
    <GlowCard className="flex flex-col justify-between h-full" glowColor="rgba(232, 25, 122, 0.06)">
      <div>
        {/* Typographic styled logo instead of loading slow broken images */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-fyn-pink" />
          <h3 className="text-lg font-black text-fyn-text uppercase tracking-tight">
            {name}
          </h3>
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

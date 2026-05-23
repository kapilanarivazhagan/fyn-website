"use client";

import React from "react";
import { GlowCard } from "./GlowCard";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

interface MetricCardProps {
  value: string;
  label: string;
  sublabel?: string;
  description: string;
  iconName: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  sublabel,
  description,
  iconName,
}) => {
  // Dynamically resolve icon component
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;

  return (
    <GlowCard className="h-full flex flex-col justify-between" glowColor="rgba(232, 25, 122, 0.12)">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="text-fyn-text-muted text-xs uppercase tracking-widest font-semibold">
            {sublabel || label}
          </div>
          <div className="p-2 rounded-lg bg-fyn-pink/10 border border-fyn-pink/20 text-fyn-pink">
            <IconComponent className="w-5 h-5" />
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-fyn-text tracking-tight mb-2"
        >
          {value}
        </motion.div>
        
        <div className="text-lg font-bold text-fyn-text mb-2 uppercase tracking-wide">
          {label}
        </div>
      </div>
      
      <p className="text-sm text-fyn-text-muted leading-relaxed mt-2 border-t border-fyn-border/40 pt-4">
        {description}
      </p>
    </GlowCard>
  );
};

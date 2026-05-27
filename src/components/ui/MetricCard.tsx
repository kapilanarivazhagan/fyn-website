"use client";

import React, {
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import { GlowCard } from "./GlowCard";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion, animate } from "framer-motion";

interface MetricCardProps {
  value: string;
  label: string;
  sublabel?: string;
  description: string;
  iconName: string;
  isActive?: boolean;
  replayKey?: number;
  index?: number;
}

const parseMetricValue = (valStr: string) => {
  const cleanStr = valStr.replace(/,/g, "");
  const match = cleanStr.match(/^([\d.]+)\s*(.*)$/);
  if (!match) {
    return { numericValue: 0, suffix: valStr, hasCommas: false };
  }
  return {
    numericValue: parseFloat(match[1]),
    suffix: match[2],
    hasCommas: valStr.includes(","),
  };
};

const formatCount = (
  value: number,
  suffix: string,
  hasCommas: boolean
) => {
  const rounded = Math.round(value);
  if (hasCommas) {
    return rounded.toLocaleString("en-IN") + suffix;
  }
  return rounded.toString() + suffix;
};

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  sublabel,
  description,
  iconName,
  isActive,
  replayKey,
  index,
}) => {
  const [displayValue, setDisplayValue] = useState<number | null>(null);
  const [isCounting, setIsCounting] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const lastPlayedKeyRef = useRef(-1);
  const controlsRef = useRef<ReturnType<typeof animate> | undefined>(undefined);

  const { numericValue, suffix, hasCommas } = React.useMemo(
    () => parseMetricValue(value),
    [value]
  );

  useLayoutEffect(() => {
    if (replayKey === undefined || isActive === undefined) {
      setDisplayValue(numericValue);
      return;
    }

    if (!isActive || replayKey === 0) {
      setDisplayValue(0);
      return;
    }

    if (lastPlayedKeyRef.current === replayKey) {
      return;
    }

    lastPlayedKeyRef.current = replayKey;

    if (shouldReduceMotion) {
      setIsCounting(false);
      setDisplayValue(numericValue);
      return;
    }

    controlsRef.current?.stop();
    setDisplayValue(0);
    setIsCounting(true);

    const startDelay = (index ?? 0) * 0.08;
    const countDuration =
      numericValue <= 3
        ? 0.85
        : numericValue <= 20
          ? 1.05
          : 1.5;

    const timeoutId = window.setTimeout(() => {
      controlsRef.current?.stop();

      controlsRef.current = animate(
        0,
        numericValue,
        {
          duration: countDuration,
          ease: [0.18, 0.74, 0.2, 1],
          onUpdate: (latest) => setDisplayValue(latest),
          onComplete: () => setIsCounting(false),
        }
      );
    }, startDelay * 1000);

    return () => {
      window.clearTimeout(timeoutId);
      controlsRef.current?.stop();
      setIsCounting(false);
    };
  }, [index, isActive, replayKey, shouldReduceMotion, numericValue]);

  const iconMap = Icons as unknown as Record<
    string,
    LucideIcon
  >;
  const IconComponent =
    iconMap[iconName] || Icons.HelpCircle;

  const renderedText = displayValue !== null
    ? formatCount(displayValue, suffix, hasCommas)
    : value;

  return (
    <GlowCard 
      className={`h-full flex flex-col justify-between relative ${isCounting ? "fyn-hero-stat-card-counting" : ""}`}
      glowColor="rgba(232, 25, 122, 0.12)"
    >
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
          className="text-4xl md:text-5xl font-black text-fyn-text tracking-tight mb-2 tabular-nums"
        >
          {renderedText}
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

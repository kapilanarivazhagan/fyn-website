"use client";

import React from "react";
import { cn } from "../../lib/utils";

type AtmosphereTone = "default" | "deep" | "warm";

interface SectionAtmosphereProps {
  children: React.ReactNode;
  enter?: boolean;
  exit?: boolean;
  tone?: AtmosphereTone;
  className?: string;
}

export const SectionAtmosphere = ({
  children,
  enter = false,
  exit = false,
  tone = "default",
  className,
}: SectionAtmosphereProps) => {
  return (
    <div
      className={cn(
        "atmospheric-section",
        enter && "atmospheric-enter",
        exit && "atmospheric-exit",
        tone !== "default" && `atmospheric-${tone}`,
        className
      )}
    >
      {children}
    </div>
  );
};

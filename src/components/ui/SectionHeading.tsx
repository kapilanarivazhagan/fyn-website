import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 md:mb-16 font-barlow",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="fyn-readable-pink-label text-xs md:text-sm font-semibold uppercase tracking-widest text-fyn-pink mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-4xl text-balance text-3xl font-black uppercase leading-[1.04] tracking-tight text-fyn-text sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="fyn-readable-muted mt-4 text-base md:text-lg text-fyn-text-muted max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

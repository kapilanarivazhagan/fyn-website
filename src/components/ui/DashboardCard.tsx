import React from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerRight?: React.ReactNode;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  children,
  className,
  headerRight,
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border border-fyn-border bg-[#0a0a0a] overflow-hidden font-barlow",
        className
      )}
    >
      {/* Decorative top scanline gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-fyn-pink/60 to-transparent" />
      
      {/* Dashboard Card Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-fyn-border/40 bg-[#0d0d0d]">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-fyn-text">
            {title}
          </h3>
          {subtitle && (
            <span className="text-xs text-fyn-text-muted mt-0.5 block">
              {subtitle}
            </span>
          )}
        </div>
        {headerRight && <div className="flex items-center space-x-2">{headerRight}</div>}
      </div>

      {/* Main Body */}
      <div className="p-6 flex-1 bg-gradient-to-b from-[#0a0a0a] to-[#080808]">
        {children}
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fyn-pink/50 cursor-pointer font-barlow";
  
  const variants = {
    primary: "bg-fyn-pink text-fyn-text hover:bg-[#ff2d92] shadow-[0_0_20px_rgba(232,25,122,0.35)]",
    secondary: "bg-fyn-surface-light text-fyn-text hover:bg-fyn-surface border border-fyn-border",
    outline: "bg-transparent text-fyn-text hover:bg-fyn-pink/10 border border-fyn-pink/50",
    ghost: "bg-transparent text-fyn-text-muted hover:text-fyn-text hover:bg-fyn-surface/40",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs tracking-wider uppercase",
    md: "px-6 py-2.5 text-sm tracking-wide",
    lg: "px-8 py-3.5 text-base tracking-wide font-semibold",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props as any}
    >
      {children}
    </motion.button>
  );
};

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useColors } from "@/providers/color-provider";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const colors = useColors();

  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded-lg",
    md: `text-sm px-4 py-2 ${colors.effects.roundedSmall || "rounded-xl"}`,
    lg: `text-base px-6 py-3 ${colors.effects.rounded || "rounded-2xl"}`,
  };

  const variantStyles = {
    primary: `${colors.background.accent} ${colors.text.main} border ${colors.border.default} hover:${colors.border.hover} ${colors.effects.shadow}`,
    secondary: `bg-white ${colors.text.inverted} hover:bg-neutral-200 shadow-sm`,
    outline: `bg-transparent ${colors.text.main} border ${colors.border.default} hover:${colors.background.accent} hover:${colors.border.hover}`,
    link: `${colors.brand.primary} hover:underline bg-transparent p-0 shadow-none`,
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
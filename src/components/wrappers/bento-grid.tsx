"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useColors } from "@/providers/color-provider";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoCardButton {
  label: string;
  variant?: "primary" | "secondary" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
}

interface BentoCardProps {
  className?: string;
  children?: React.ReactNode;
  avatar?: {
    src?: string;
    alt: string;
    initials: string;
    size?: "sm" | "md" | "lg" | "xl";
  };
  actions?: BentoCardButton[];
}

export const BentoCard = ({
  className,
  children,
  avatar,
  actions,
}: BentoCardProps) => {
  const colors = useColors();

  return (
    <div
      className={cn(
        "group/bento row-span-1 p-4 transition-all duration-300",
        "border flex flex-col justify-between space-y-4 relative overflow-hidden",
        colors.effects.rounded,
        colors.effects.shadow,
        colors.effects.shadowHover,
        colors.background.card,
        colors.text.main,
        colors.border.default,
        "hover:" + colors.border.hover,
        className
      )}
    >
      {avatar && (
        <div className="flex justify-between items-start w-full">
          <Avatar 
            src={avatar.src} 
            alt={avatar.alt} 
            initials={avatar.initials} 
            size={avatar.size || "md"} 
            className="border-white/10 shadow-md"
          />
        </div>
      )}
      
      <div className="flex-1 flex flex-col">
        {children}
      </div>

      {actions && actions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 mt-auto w-full z-10">
          {actions.map((btn, index) => (
            <Button
              key={`${btn.label}-${index}`}
              variant={btn.variant || "primary"}
              size={btn.size || "sm"}
              onClick={btn.onClick}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
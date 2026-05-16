"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useColors } from "@/providers/color-provider";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";



// 1. ENSURE EXPLICIT BENTOGRID EXPORT IS LOCKED IN
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

export interface BentoCardAction {
  label: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "default" | any;
  size?: "sm" | "md" | "lg"; // Fixed: Match your button contract exactly
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// 2. SUPPORT ALL INTERFACE CONTRACTS RECOGNIZED BY BENTOLAYOUT
interface BentoCardProps extends Omit<HTMLMotionProps<"div">, "children" | "avatar"> {
  className?: string;
  children?: React.ReactNode;
  avatar?: {
    src?: string;
    alt: string;
    initials: string;
    size?: "sm" | "md" | "lg" | "xl";
  };
  actions?: BentoCardAction[];
  motionVariants?: any;
  asMotion?: boolean;
}

export const BentoCard = ({
  className,
  children,
  avatar,
  actions,
  motionVariants,
  asMotion,
  ...props
}: BentoCardProps) => {
  const colors = useColors();

  const classes = cn(
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
  );

  return (
    <motion.div
      variants={motionVariants}
      className={classes}
      {...props}
    >
      {/* Fallback for components explicitly relying on the prop contract */}
      {avatar && (
        <div className="flex justify-between items-start w-full z-10">
          <Avatar 
            src={avatar.src} 
            alt={avatar.alt} 
            initials={avatar.initials} 
            size={avatar.size || "md"} 
            className="border-white/10 shadow-md"
          />
        </div>
      )}
      
      {/* flex-1 full layout container so custom inner DOM items scale perfectly */}
      <div className="flex-1 flex flex-col h-full w-full relative">
        {children}
      </div>

      {actions && actions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 mt-auto w-full z-20">
          {actions.map((btn, index) => {
            // Guard clause to sanitize mixed values and resolve types perfectly
            const finalSize = btn.size === "md" || btn.size === "lg" || btn.size === "sm"
              ? btn.size
              : "sm";

            return (
              <Button
                key={`${btn.label}-${index}`}
                variant={btn.variant === "primary" ? "default" : btn.variant || "default"}
                size={finalSize}
                onClick={btn.onClick}
              >
                {btn.label}
              </Button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
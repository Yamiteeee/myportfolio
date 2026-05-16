"use client";

import React from "react";
import { BentoCard } from "@/components/wrappers/bento-grid";
import { Variants } from "framer-motion";

interface AutomationCardProps {
  item: any;
  colors: any;
  variants: Variants;
  formattedActions: any[] | undefined;
}

export function AutomationCard({ item, colors, variants, formattedActions }: AutomationCardProps) {
  return (
    <BentoCard className={item.gridClasses} actions={formattedActions} motionVariants={variants}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider text-purple-500 uppercase">
            {item.subtitle}
          </span>
          <h3 className="font-bold text-xl mt-1 leading-snug">{item.title}</h3>
          <p className={`${colors.text.muted} text-sm mt-2 leading-relaxed`}>
            {item.description}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
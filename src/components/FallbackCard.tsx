"use client";

import React from "react";
import { BentoCard } from "@/components/wrappers/bento-grid";
import { Variants } from "framer-motion";

interface FallbackCardProps {
  item: any;
  colors: any;
  variants: Variants;
  formattedActions: any[] | undefined;
}

export function FallbackCard({ item, colors, variants, formattedActions }: FallbackCardProps) {
  return (
    <BentoCard className={item.gridClasses} actions={formattedActions} motionVariants={variants}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h3 className="font-bold text-xl leading-snug">{item.title}</h3>
          <p className={`${colors.text.muted} text-sm mt-2 max-w-xl leading-relaxed`}>
            {item.description}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
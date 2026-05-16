"use client";

import React from "react";
import { BentoCard } from "@/components/wrappers/bento-grid";
import { Variants } from "framer-motion";

interface LocationCardProps {
  item: any;
  colors: any;
  variants: Variants;
}

export function LocationCard({ item, colors, variants }: LocationCardProps) {
  return (
    <BentoCard key={item.id} className={item.gridClasses} motionVariants={variants}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <span className="text-xs font-semibold tracking-wider text-blue-500 uppercase block mb-1">
            {item.subtitle || "Location"}
          </span>
          <h3 className="font-bold text-lg leading-snug">{item.title}</h3>
          <p className={`${colors.text.muted} text-sm mt-1 leading-relaxed`}>{item.description}</p>
        </div>
        {item.meta && (
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs opacity-50">
            <span>{item.meta.label}</span>
            <span className="font-mono">{item.meta.value}</span>
          </div>
        )}
      </div>
    </BentoCard>
  );
}
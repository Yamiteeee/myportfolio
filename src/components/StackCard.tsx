"use client";

import React from "react";
import { BentoCard } from "@/components/wrappers/bento-grid";
import { Variants } from "framer-motion";

interface StackCardProps {
  item: any;
  colors: any;
  variants: Variants;
}

export function StackCard({ item, colors, variants }: StackCardProps) {
  return (
    <BentoCard className={item.gridClasses} motionVariants={variants}>
      <div className="flex flex-col h-full">
        <h3 className="font-bold text-lg leading-snug">{item.title}</h3>
        <p className={`${colors.text.muted} text-xs mt-0.5 mb-4`}>{item.subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags?.map((tech: string) => (
            <span
              key={tech}
              className={`px-2.5 py-1 ${colors.badges.default} ${colors.effects.roundedSmall} text-xs font-medium`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
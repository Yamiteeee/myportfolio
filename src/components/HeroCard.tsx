"use client";

import React from "react";
import { BentoCard } from "@/components/wrappers/bento-grid";
import { Avatar } from "@/components/ui/avatar";
import { Variants } from "framer-motion";

interface HeroCardProps {
  item: any;
  colors: any;
  variants: Variants;
}

export function HeroCard({ item, colors, variants }: HeroCardProps) {
  return (
    <BentoCard
      className={`${colors.gradients.hero} ${colors.effects.shadowLarge} ${item.gridClasses} !p-0 flex flex-col overflow-hidden`}
      motionVariants={variants}
    >
      <div className="relative w-full flex-none overflow-hidden" style={{ height: "52%" }}>
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${colors.assets.heroBg})`,
            backgroundSize: colors.bgSize,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div
        className="flex-1 flex flex-col items-center text-center px-6 pb-6 w-full"
        style={{ marginTop: "-2.75rem" }}
      >
        <Avatar
          alt={item.title || "User"}
          initials="JA"
          size="xl"
          className={`flex-shrink-0 shadow-2xl shadow-black/60 border-[3px] ${colors.theme === "dark" ? "border-white/90" : "border-neutral-800"} ring-2 ring-white/20`}
        />

        <div className={`mt-3 flex flex-col items-center gap-0.5 ${colors.text.white}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-60">
            {item.subtitle}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight drop-shadow-md">
            {item.title}
          </h1>
          <p className="mt-1.5 text-xs opacity-70 max-w-[14rem] leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
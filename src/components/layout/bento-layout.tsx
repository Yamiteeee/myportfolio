"use client";

import React from "react";
import { BentoGrid, BentoCard } from "@/components/wrappers/bento-grid";
import { Avatar } from "@/components/ui/avatar";
import { useColors } from "@/providers/color-provider";

export function BentoLayout() {
  const colors = useColors();

  return (
    <BentoGrid>
      {/* 1. Hero Card - Fully centered layout */}
      <BentoCard 
        className={`${colors.gradients.hero} ${colors.text.white} ${colors.border.none} ${colors.effects.shadowLarge} md:col-span-2 md:row-span-2 flex flex-col justify-center items-center p-6`}
      >
        {/* Unified container to keep the avatar and labels grouped and centered */}
        <div className="flex flex-col items-center justify-center text-center w-full h-full my-auto">
          <Avatar 
            alt="Jason Adrian"
            initials="JA"
            size="xl"
            className="border-white/20 shadow-md mb-6" 
          />
          
          <p className="text-sm font-medium uppercase tracking-widest opacity-80">Full-Stack Developer</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">Jason Adrian</h1>
          <p className="mt-4 text-base opacity-90 max-w-sm leading-relaxed">
            Building high-performance web & mobile solutions with a focus on automation.
          </p>
        </div>
      </BentoCard>

      {/* 2. Projects Card */}
      <BentoCard 
        className="md:col-span-2"
        actions={[
          { label: "Explore Projects", variant: "secondary" },
          { label: "View Source", variant: "outline" }
        ]}
      >
        <div>
          <h3 className="font-bold text-xl">Featured Projects</h3>
          <p className={`${colors.text.muted} text-sm mt-1`}>
            Enterprise Learning Management Systems, mobile IT ticketing applications, and AI integrations.
          </p>
        </div>
      </BentoCard>

      {/* 3. Location Card */}
      <BentoCard className="md:col-span-1">
        <div>
          <h3 className="font-bold text-lg">Location</h3>
          <p className={`${colors.text.muted} text-sm mt-1`}>San Pablo City, PH</p>
        </div>
      </BentoCard>

      {/* 4. Tech Stack Card */}
      <BentoCard className="md:col-span-1">
        <div>
          <h3 className="font-bold text-lg">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {["Next.js", "Flutter", "TypeScript"].map((tech) => (
              <span 
                key={tech} 
                className={`px-2 py-1 ${colors.badges.default} ${colors.effects.roundedSmall} text-xs font-medium`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </BentoCard>
    </BentoGrid>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { BentoGrid, BentoCard } from "@/components/wrappers/bento-grid";
import { Avatar } from "@/components/ui/avatar";
import { useColors } from "@/providers/color-provider";
import { gridLayoutItems, mockProjects } from "@/lib/mock-data";

export function BentoLayout() {
  const colors = useColors();
  const [activeSlide, setActiveSlide] = useState(0);

  const currentProject = mockProjects[activeSlide];

  // Auto-slide effect loop (Cycles every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % mockProjects.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleRedirect = (href?: string) => {
    if (href) window.open(href, "_blank");
  };

  return (
    <BentoGrid className="p-4 md:p-8">
      {gridLayoutItems.map((item) => {
        
        const formattedActions = item.actions?.map((act) => ({
          label: act.label,
          variant: act.variant,
          onClick: () => handleRedirect(act.href),
        }));

        // 1. DYNAMIC HERO RENDER BLOCK
        if (item.type === "hero") {
          return (
            <BentoCard 
              key={item.id} 
              className={`${colors.gradients.hero} ${colors.text.white} ${colors.border.none} ${colors.effects.shadowLarge} ${item.gridClasses}`}
            >
              <div className="flex flex-col items-center justify-center text-center w-full h-full my-auto">
                <Avatar alt={item.title || "User"} initials="JA" size="xl" className="border-white/20 shadow-md mb-6" />
                <p className="text-sm font-medium uppercase tracking-widest opacity-80">{item.subtitle}</p>
                <h1 className="text-4xl md:text-5xl font-bold mt-2">{item.title}</h1>
                <p className="mt-4 text-base opacity-90 max-w-sm leading-relaxed">{item.description}</p>
              </div>
            </BentoCard>
          );
        }

        // 2. PROJECT CAROUSEL BLOCK
        if (item.type === "project-slider" && currentProject) {
          const sliderActions = currentProject.actions.map((act) => ({
            label: act.label,
            variant: act.variant,
            onClick: () => handleRedirect(act.href),
          }));

          return (
            <BentoCard key={item.id} className={item.gridClasses} actions={sliderActions}>
              <div className="flex flex-col justify-between h-full relative">
                <div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-semibold tracking-wider text-emerald-500 uppercase">
                      {currentProject.subtitle}
                    </span>
                    
                    {/* Visual Slide Pips Indicator */}
                    <div className="flex items-center gap-1.5 bg-black/10 dark:bg-white/5 p-1 rounded-full z-20">
                      {mockProjects.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSlide(idx);
                          }}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === activeSlide ? "w-5 bg-emerald-500" : "w-2 bg-neutral-400 opacity-40"
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Fading text layout key-bound container */}
                  <div key={currentProject.id} className="animate-in fade-in duration-500">
                    <h3 className="font-bold text-3xl mt-2">{currentProject.title}</h3>
                    <p className={`${colors.text.muted} text-base mt-3 leading-relaxed`}>
                      {currentProject.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                  {currentProject.tags.map((t) => (
                    <span key={t} className="text-xs opacity-60 bg-white/5 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>
          );
        }

        // 3. SKILLS & ECOSYSTEM CHIPS
        if (item.type === "tech-stack" || item.type === "mobile") {
          return (
            <BentoCard key={item.id} className={item.gridClasses}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className={`${colors.text.muted} text-xs mt-0.5 mb-3`}>{item.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.map((tech) => (
                      <span key={tech} className={`px-2 py-1 ${colors.badges.default} ${colors.effects.roundedSmall} text-xs font-medium`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BentoCard>
          );
        }

        // 4. AUTOMATION PIPELINE CARD
        if (item.type === "automation") {
          return (
            <BentoCard key={item.id} className={item.gridClasses} actions={formattedActions}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-purple-500 uppercase">{item.subtitle}</span>
                  <h3 className="font-bold text-xl mt-1">{item.title}</h3>
                  <p className={`${colors.text.muted} text-sm mt-2 leading-relaxed`}>{item.description}</p>
                </div>
              </div>
            </BentoCard>
          );
        }

        // 5. METADATA LOCATION BLOCK
        if (item.type === "location") {
          return (
            <BentoCard key={item.id} className={item.gridClasses}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className={`${colors.text.muted} text-sm mt-1`}>{item.description}</p>
                </div>
                {item.meta && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs opacity-60">
                    <span>{item.meta.label}</span>
                    <span className="font-mono">{item.meta.value}</span>
                  </div>
                )}
              </div>
            </BentoCard>
          );
        }

        // 6. COLLABORATE HORIZONTAL CARD
        return (
          <BentoCard key={item.id} className={item.gridClasses} actions={formattedActions}>
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="font-bold text-xl">{item.title}</h3>
                <p className={`${colors.text.muted} text-sm mt-2 max-w-xl leading-relaxed`}>
                  {item.description}
                </p>
              </div>
            </div>
          </BentoCard>
        );
      })}
    </BentoGrid>
  );
}
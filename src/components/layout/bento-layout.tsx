"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Dynamic Motion Additions
import { BentoGrid, BentoCard } from "@/components/wrappers/bento-grid";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useColors } from "@/providers/color-provider";
import { GridItem, SlideProject } from "@/types/portfolio";

export function BentoLayout() {
  const colors = useColors();
  
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [allProjects, setAllProjects] = useState<SlideProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch("/api/portfolio");
        const data = await res.json();
        if (res.ok) {
          setGridItems(data.gridLayoutItems);
          setAllProjects(data.mockProjects);
        }
      } catch (err) {
        console.error("Error loading portfolio pipelines:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  const featuredProjects = allProjects.filter((p) => p.category === "featured");

  useEffect(() => {
    if (featuredProjects.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProjects]);

  const handleRedirect = (href?: string) => {
    if (href) window.open(href, "_blank");
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
        <div className="flex justify-end mb-4 h-9 items-center opacity-0" />
        <BentoGrid className="opacity-30 animate-pulse">
          <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-neutral-900 h-[41rem]" />
          <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-neutral-900 h-[41rem]" />
        </BentoGrid>
      </div>
    );
  }

  const currentFeatured = featuredProjects[activeSlide];

  // Stagger Animation Setup for the core grid block loading sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 } // Fast, sleek cascading drop-in effect
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
      
      {/* Animated Header Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex justify-end items-center mb-6 px-2"
      >
        <ThemeToggle />
      </motion.div>

      {/* Motion-enhanced Grid wrapper */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <BentoGrid>
          {gridItems.map((item) => {
            const formattedActions = item.actions?.map((act) => ({
              label: act.label,
              variant: act.variant,
              onClick: () => handleRedirect(act.href),
            }));

            // 1. HERO CARD
            if (item.type === "hero") {
              return (
                <BentoCard 
                  key={item.id} 
                  className={`${colors.gradients.hero} ${colors.text.white} ${colors.border.none} ${colors.effects.shadowLarge} ${item.gridClasses} transform-none`}
                  asMotion={true} // Injects a wrapper condition flag if supported
                  motionVariants={itemVariants}
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

            // 2. INTERACTIVE SLIDESHOW SHOWCASE (With AnimatePresence Content Transitions)
            if (item.type === "project-slider") {
              if (featuredProjects.length === 0) return null;
              
              const sliderActions = currentFeatured?.actions.map((act) => ({
                label: act.label,
                variant: act.variant,
                onClick: () => handleRedirect(act.href),
              }));

              return (
                <BentoCard key={item.id} className={item.gridClasses} actions={sliderActions} motionVariants={itemVariants}>
                  <div className="flex flex-col justify-between h-full relative overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-semibold tracking-wider text-emerald-500 uppercase">
                          {currentFeatured?.subtitle || "Showcase Platform"}
                        </span>
                        
                        <div className="flex items-center gap-1.5 bg-black/10 dark:bg-white/5 p-1 rounded-full z-20">
                          {featuredProjects.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setActiveSlide(idx); }}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                idx === activeSlide ? "w-5 bg-emerald-500" : "w-2 bg-neutral-400 opacity-40"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Smooth Crossfade content block switches via text layout bounds */}
                      <div className="relative mt-2 min-h-[12rem]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentFeatured?.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0 flex flex-col justify-start"
                          >
                            <h3 className="font-bold text-3xl">{currentFeatured?.title}</h3>
                            <p className={`${colors.text.muted} text-base mt-3 leading-relaxed`}>
                              {currentFeatured?.description}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                      {currentFeatured?.tags.map((t) => (
                        <span key={t} className="text-xs opacity-60 bg-white/5 px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                </BentoCard>
              );
            }

            // 3. ECOSYSTEM & 4. MOBILE TECH-STACKS
            if (item.type === "tech-stack" || item.type === "mobile") {
              return (
                <BentoCard key={item.id} className={item.gridClasses} motionVariants={itemVariants}>
                  <div className="flex flex-col h-full">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className={`${colors.text.muted} text-xs mt-0.5 mb-3`}>{item.subtitle}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {item.tags?.map((tech) => (
                        <span key={tech} className={`px-2 py-1 ${colors.badges.default} ${colors.effects.roundedSmall} text-xs font-medium`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </BentoCard>
              );
            }

            // 5. AI AUTOMATION PIPELINES
            if (item.type === "automation") {
              return (
                <BentoCard key={item.id} className={item.gridClasses} actions={formattedActions} motionVariants={itemVariants}>
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <span className="text-xs font-semibold tracking-wider text-purple-500 uppercase">{item.subtitle}</span>
                      <h3 className="font-bold text-xl mt-1">{item.title}</h3>
                      <p className={`${colors.text.muted} text-sm mt-2 leading-relaxed`}>{item.description}</p>
                    </div>
                  </div>
                </BentoCard>
              );
            }

            // 6. BASE LOCATION
            if (item.type === "location") {
              return (
                <BentoCard key={item.id} className={item.gridClasses} motionVariants={itemVariants}>
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

            // 7. LETS COLLABORATE
            return (
              <BentoCard key={item.id} className={item.gridClasses} actions={formattedActions} motionVariants={itemVariants}>
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
      </motion.div>
    </div>
  );
}
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { BentoGrid } from "@/components/wrappers/bento-grid";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useColors } from "@/providers/color-provider";
import { useBentoSlider } from "@/hooks/use-bento-slider";

// Cards
import { HeroCard } from "@/components/HeroCard";
import { ProjectSliderCard } from "@/components/ProjectSliderCard";
import { StackCard } from "@/components/StackCard";
import { AutomationCard } from "@/components/AutomationCard";
import { LocationCard } from "@/components/LocationCard";
import { FallbackCard } from "@/components/FallbackCard";

import { mockProjects, gridLayoutItems } from "@/lib/mock-data";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      // 🔥 prevents layout shift during stagger
      when: "beforeChildren",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

export function BentoLayout() {
  const colors = useColors();
  const slider = useBentoSlider(mockProjects);

  return (
    <div className="max-w-7xl mx-auto w-full p-4 md:p-8">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end items-center mb-6 px-1"
      >
        <ThemeToggle />
      </motion.div>

      {/* 🔥 CRITICAL FIX: STABLE GRID CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        <BentoGrid className="
          auto-rows-fr 
          items-stretch
        ">
          {gridLayoutItems.map((item) => {
            const formattedActions = item.actions?.map((act) => ({
              label: act.label,
              variant: act.variant,
              onClick: () => slider.handleRedirect(act.href),
            }));

            switch (item.type) {
              case "hero":
                return (
                  <HeroCard
                    key={item.id}
                    item={item}
                    colors={colors}
                    variants={itemVariants}
                  />
                );

              case "project-slider":
                return (
                  <ProjectSliderCard
                    key={item.id}
                    item={item}
                    colors={colors}
                    variants={itemVariants}
                    featuredProjects={slider.featuredProjects}
                    currentFeatured={slider.currentFeatured}
                    activeSlide={slider.activeSlide}
                    setActiveSlide={slider.setActiveSlide}
                    currentActivePreview={slider.currentActivePreview}
                    handleNextSlide={slider.handleNextSlide}
                    handleRedirect={slider.handleRedirect}
                  />
                );

              case "tech-stack":
              case "mobile":
                return (
                  <StackCard
                    key={item.id}
                    item={item}
                    colors={colors}
                    variants={itemVariants}
                  />
                );

              case "automation":
                return (
                  <AutomationCard
                    key={item.id}
                    item={item}
                    colors={colors}
                    variants={itemVariants}
                    formattedActions={formattedActions}
                  />
                );

              case "location":
                return (
                  <LocationCard
                    key={item.id}
                    item={item}
                    colors={colors}
                    variants={itemVariants}
                  />
                );

              default:
                return (
                  <FallbackCard
                    key={item.id}
                    item={item}
                    colors={colors}
                    variants={itemVariants}
                    formattedActions={formattedActions}
                  />
                );
            }
          })}
        </BentoGrid>
      </motion.div>
    </div>
  );
}

export default BentoLayout;
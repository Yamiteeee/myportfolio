"use client";

import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { BentoCard } from "@/components/wrappers/bento-grid";

interface ProjectSliderCardProps {
  item: any;
  colors: any;
  variants: Variants;
  featuredProjects: any[];
  currentFeatured: any;
  activeSlide: number;
  setActiveSlide: (idx: number) => void;
  currentActivePreview: string | null;
  handleNextSlide: (e: React.MouseEvent) => void;
  handleRedirect: (href?: string) => void;
}

export function ProjectSliderCard({
  item,
  colors,
  variants,
  featuredProjects,
  currentFeatured,
  activeSlide,
  setActiveSlide,
  currentActivePreview,
  handleNextSlide,
  handleRedirect,
}: ProjectSliderCardProps) {
  if (featuredProjects.length === 0) return null;

  const sliderActions = currentFeatured?.actions?.map((act: any) => ({
    label: act.label,
    variant: act.variant,
    onClick: () => handleRedirect(act.href),
  }));

  return (
    <BentoCard
      className={`${item.gridClasses} !p-5 overflow-hidden`}
      actions={sliderActions}
      motionVariants={variants}
    >

      {/* 🔥 HARD STRUCTURE GRID (NO FLEX DEPENDENCY) */}
      <div className="h-full w-full grid grid-rows-[40px_70px_1fr_40px] gap-3">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-emerald-500 uppercase">
            {currentFeatured?.subtitle || "Showcase"}
          </span>

          <div className="flex items-center gap-3 bg-neutral-200/60 dark:bg-neutral-800/80 px-3 py-1 rounded-full">
            <div className="flex items-center gap-1.5">
              {featuredProjects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveSlide(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeSlide
                      ? "w-4 bg-emerald-500"
                      : "w-1.5 bg-neutral-400 opacity-40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-neutral-900/10 dark:bg-white/10 hover:bg-emerald-500 hover:text-white transition-all"
            >
              Next
            </button>
          </div>
        </div>

        {/* ================= TEXT ================= */}
        <div className="overflow-hidden">
          <h3 className="font-bold text-2xl tracking-tight leading-tight truncate">
            {currentFeatured?.title}
          </h3>
          <p className={`${colors.text.muted} text-xs md:text-sm mt-1 line-clamp-2`}>
            {currentFeatured?.description}
          </p>
        </div>

        {/* ================= IMAGE VIEWPORT (NO FLOW IMPACT) ================= */}
        <div className="relative overflow-hidden rounded-xl border border-neutral-200/10 dark:border-white/5 bg-neutral-950/40 shadow-inner">

          <AnimatePresence mode="wait">
            {currentActivePreview ? (
              <motion.div
                key={currentActivePreview}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img
                  src={currentActivePreview}
                  alt="Project Preview"
                  className="max-h-full max-w-full object-contain"
                  draggable={false}
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-xs font-mono">
                No Preview Available
              </div>
            )}
          </AnimatePresence>

        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex items-center flex-wrap gap-1.5 border-t border-neutral-200/20 dark:border-white/5 pt-2">
          {currentFeatured?.tags?.map((t: string) => (
            <span
              key={t}
              className="text-[10px] font-mono opacity-70 bg-neutral-200/30 dark:bg-white/5 px-2 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
        </div>

      </div>
    </BentoCard>
  );
}
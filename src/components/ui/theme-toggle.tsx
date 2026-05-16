"use client";

import React from "react";
import { useColors } from "@/providers/color-provider";

export function ThemeToggle() {
  const { theme, toggleTheme, border, background } = useColors();

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center h-9 w-16 p-1 rounded-full cursor-pointer border transition-all duration-300 outline-none select-none ${border.default} ${background.card}`}
      aria-label="Toggle structural display theme"
    >
      {/* Inner Sliding Element */}
      <div
        className={`absolute h-6 w-6 rounded-full shadow-sm bg-gradient-to-br transition-all duration-500 ease-out flex items-center justify-center transform ${
          theme === "dark"
            ? "translate-x-7 from-purple-500 to-indigo-600"
            : "translate-x-0 from-amber-400 to-orange-500"
        }`}
      >
        {/* Dynamic Inner Symbol Mask */}
        {theme === "dark" ? (
          // Moon Icon Spark
          <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          // Sun Icon Burst
          <svg className="h-3.5 w-3.5 text-white animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
            <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </div>

      {/* Subtle Background Icons to give context behind the sliding knob */}
      <div className="flex justify-between w-full px-1.5 opacity-20 pointer-events-none text-[10px] font-bold">
        <span>☀️</span>
        <span>🌙</span>
      </div>
    </button>
  );
}
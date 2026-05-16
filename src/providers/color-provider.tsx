"use client";

import React, { createContext, useContext } from "react";

const palette = {
  background: {
    main: "bg-black",
    card: "bg-neutral-900",
    accent: "bg-zinc-800",
  },
  text: {
    main: "text-neutral-100",
    muted: "text-neutral-500",
    inverted: "text-neutral-900",
    white: "text-white",
  },
  border: {
    default: "border-neutral-800",
    hover: "border-neutral-700",
    none: "border-none",
  },
  effects: {
    shadow: "shadow-sm",
    shadowHover: "hover:shadow-md",
    shadowLarge: "shadow-lg",
    rounded: "rounded-3xl",
    roundedSmall: "rounded",
  },
  gradients: {
    hero: "bg-gradient-to-br from-blue-600 to-purple-600",
  },
  brand: {
    primary: "text-blue-500",
    secondary: "text-purple-500",
    muted: "text-neutral-500",
  },
  badges: {
    default: "bg-neutral-200 dark:bg-zinc-800",
  },
  status: {
    online: "bg-emerald-500",
    away: "bg-amber-500",
  }
};

type PaletteType = typeof palette;

const ColorContext = createContext<PaletteType>(palette);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ColorContext.Provider value={palette}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColors = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColors must be used within a ColorProvider");
  }
  return context;
};
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Define explicit dark and light theme palettes
const darkPalette = {
  background: {
    main: "bg-black",
    card: "bg-neutral-900/90",
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
    shadowHover: "hover:shadow-xl hover:shadow-black/20",
    shadowLarge: "shadow-xl",
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
    default: "bg-zinc-800 text-zinc-300 border border-neutral-800",
  },
  status: {
    online: "bg-emerald-500",
    away: "bg-amber-500",
  }
};

const lightPalette = {
  background: {
    main: "bg-neutral-50",
    card: "bg-white",
    accent: "bg-neutral-100",
  },
  text: {
    main: "text-neutral-900",    // Darkened from 800 to 900 for high-contrast punch
    muted: "text-neutral-600",   // Darkened from 400 to 600 so descriptions are readable
    inverted: "text-neutral-100",
    white: "text-white",
  },
  border: {
    default: "border-neutral-200",
    hover: "border-neutral-300",
    none: "border-none",
  },
  effects: {
    shadow: "shadow-sm",
    shadowHover: "hover:shadow-xl hover:shadow-neutral-200/50",
    shadowLarge: "shadow-lg shadow-neutral-200/40",
    rounded: "rounded-3xl",
    roundedSmall: "rounded",
  },
  gradients: {
    hero: "bg-gradient-to-br from-blue-600 to-purple-600", // Restored full vibrant pop for light view pop
  },
  brand: {
    primary: "text-blue-600",
    secondary: "text-purple-600",
    muted: "text-neutral-500",
  },
  badges: {
    default: "bg-neutral-100 text-neutral-700 border border-neutral-200", // Darkened text here too
  },
  status: {
    online: "bg-emerald-500",
    away: "bg-amber-500",
  }
};

type ThemeType = "dark" | "light";
type PaletteType = typeof darkPalette;

interface ColorContextProps extends PaletteType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const activePalette = theme === "dark" ? darkPalette : lightPalette;

  return (
    <ColorContext.Provider value={{ ...activePalette, theme, toggleTheme }}>
      <div className={`${activePalette.background.main} ${activePalette.text.main} min-h-screen transition-colors duration-500 ease-in-out`}>
        {children}
      </div>
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
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  },
  assets: {
    heroBg: "/asset/rainy-dark.gif",
  },
};

const lightPalette = {
  background: {
    main: "bg-neutral-50",
    card: "bg-white",
    accent: "bg-neutral-100",
  },
  text: {
    main: "text-neutral-900",
    muted: "text-neutral-600",
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
    hero: "bg-gradient-to-br from-blue-600 to-purple-600",
  },
  brand: {
    primary: "text-blue-600",
    secondary: "text-purple-600",
    muted: "text-neutral-500",
  },
  badges: {
    default: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  },
  status: {
    online: "bg-emerald-500",
    away: "bg-amber-500",
  },
  assets: {
    heroBg: "/asset/sunny-light.gif",
  },
};

type ThemeType = "dark" | "light";
type PaletteType = typeof darkPalette;

interface ColorContextProps extends PaletteType {
  theme: ThemeType;
  toggleTheme: () => void;
  /** CSS background-size value computed from the actual GIF dimensions */
  bgSize: string;
  /** CSS background-position value computed from the actual GIF dimensions */
  bgPosition: string;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("dark");
  const [bgSize, setBgSize] = useState<string>("contain");
  const [bgPosition, setBgPosition] = useState<string>("center center");

  const activePalette = theme === "dark" ? darkPalette : lightPalette;

  // Sync theme class to <html>
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Dynamically measure the GIF and pick the best fit strategy
  useEffect(() => {
    const img = new Image();
    img.src = activePalette.assets.heroBg;

    img.onload = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      const ar = w / h;

      if (ar >= 1.6) {
        // Wide / cinematic landscape — contain fits the whole frame perfectly
        setBgSize("contain");
        setBgPosition("center center");
      } else if (ar >= 1.0) {
        // Mildly landscape or square — slight scale-down so nothing is cropped
        setBgSize("95% auto");
        setBgPosition("center center");
      } else {
        // Portrait — let height drive, width auto
        setBgSize("auto 95%");
        setBgPosition("center center");
      }
    };

    img.onerror = () => {
      // Graceful fallback: show as much of the image as possible
      setBgSize("contain");
      setBgPosition("center center");
    };
  }, [activePalette.assets.heroBg]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ColorContext.Provider
      value={{ ...activePalette, theme, toggleTheme, bgSize, bgPosition }}
    >
      <div
        className={`${activePalette.background.main} ${activePalette.text.main} min-h-screen transition-colors duration-500 ease-in-out`}
      >
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
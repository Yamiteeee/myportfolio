"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useColors } from "@/providers/color-provider";

interface AvatarProps {
  src?: string;
  alt: string;
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Avatar({
  src = "/asset/mypic.jpg",
  alt,
  initials,
  size = "md",
  className,
}: AvatarProps) {
  const colors = useColors();
  const [hasError, setHasError] = useState(false);

  const sizeStyles = {
    sm: "h-10 w-10 text-xs",
    md: "h-16 w-16 text-base",
    lg: "h-24 w-24 text-xl",
    xl: "h-32 w-32 text-2xl",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full items-center justify-center font-semibold border select-none",
        colors.background.accent,
        colors.text.main,
        colors.border.default,
        sizeStyles[size],
        className
      )}
    >
      {src && !hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
          className="aspect-square h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="uppercase tracking-wider">{initials}</span>
      )}
    </div>
  );
}
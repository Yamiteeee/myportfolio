"use client";

import { cn } from "@/lib/utils";
import { useColors } from "@/providers/color-provider";

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  const colors = useColors();

  return (
    <div 
      className={cn(
        "min-h-screen w-full flex flex-col justify-center items-center transition-colors duration-300",
        colors.background.main,
        colors.text.main, 
        className
      )}
    >
      <main className="container mx-auto px-4 py-10 md:py-20 w-full flex justify-center items-center">
        <div className="w-full max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
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
        "min-h-screen w-full flex flex-col justify-start items-center transition-colors duration-500 ease-in-out",
        colors.background.main,
        colors.text.main, 
        className
      )}
    >
      {/* Removed the restrictive container wrappers so your BentoLayout layout 
        has total layout authority across full width limits seamlessly 
      */}
      <main className="w-full flex-1 flex flex-col justify-start">
        {children}
      </main>
    </div>
  );
}
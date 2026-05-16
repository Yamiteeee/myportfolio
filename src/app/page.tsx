"use client";

import { DashboardShell } from "@/components/wrappers/dashboard-shell";
import BentoLayout from "@/components/layout/bento-layout";
import { ColorProvider } from "@/providers/color-provider";

export default function Home() {
  return (
    <DashboardShell>
      <ColorProvider>
        <BentoLayout />
      </ColorProvider>
    </DashboardShell>
  );
}
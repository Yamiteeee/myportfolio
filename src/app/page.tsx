"use client";

import { DashboardShell } from "@/components/wrappers/dashboard-shell";
import { BentoLayout } from "@/components/layout/bento-layout";

export default function Home() {
  return (
    <DashboardShell>
      <BentoLayout />
    </DashboardShell>
  );
}
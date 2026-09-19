import type { Metadata } from "next";
import { Suspense } from "react";

import PageLoadingFallback from "../../components/ui/PageLoadingFallback";
import Dashboard from "../../features/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard Monitoring | ElderCare AI",
  description: "Dashboard monitoring kesehatan dan aktivitas lansia ElderCare AI.",
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Dashboard />
    </Suspense>
  );
}

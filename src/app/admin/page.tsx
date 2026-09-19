import type { Metadata } from "next";
import { Suspense } from "react";

import PageLoadingFallback from "../../components/ui/PageLoadingFallback";
import AdminDashboard from "../../features/AdminDashboard";

export const metadata: Metadata = {
  title: "Dashboard Admin | ElderCare AI",
  description: "Ringkasan pengguna, perangkat, dan status sistem ElderCare AI.",
};

export default function AdminPage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <AdminDashboard />
    </Suspense>
  );
}

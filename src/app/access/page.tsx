import type { Metadata } from "next";
import { Suspense } from "react";

import PageLoadingFallback from "../../components/ui/PageLoadingFallback";
import AccessManagement from "../../features/AccessManagement";

export const metadata: Metadata = {
  title: "Pengaturan Izin Akses | ElderCare AI",
  description: "Kelola izin akses tenaga medis terhadap data kesehatan lansia.",
};

export default function AccessPage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <AccessManagement />
    </Suspense>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";

import PageLoadingFallback from "../../../components/ui/PageLoadingFallback";
import UserManagement from "../../../features/UserManagement";

export const metadata: Metadata = {
  title: "Manajemen Pengguna | ElderCare AI",
  description: "Kelola akun Keluarga/Caregiver, Tenaga Medis, dan Admin.",
};

export default function AdminUsersPage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <UserManagement />
    </Suspense>
  );
}

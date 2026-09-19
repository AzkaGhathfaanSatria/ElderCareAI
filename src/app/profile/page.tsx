import type { Metadata } from "next";
import { Suspense } from "react";

import PageLoadingFallback from "../../components/ui/PageLoadingFallback";
import Profile from "../../features/Profile";

export const metadata: Metadata = {
  title: "Profil Saya | ElderCare AI",
  description: "Kelola informasi akun dan password ElderCare AI.",
};

export default function ProfilePage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Profile />
    </Suspense>
  );
}

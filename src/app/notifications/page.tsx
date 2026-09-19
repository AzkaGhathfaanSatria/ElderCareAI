import type { Metadata } from "next";
import { Suspense } from "react";

import PageLoadingFallback from "../../components/ui/PageLoadingFallback";
import NotificationCenter from "../../features/NotificationCenter";

export const metadata: Metadata = {
  title: "Notifikasi | ElderCare AI",
  description: "Notifikasi peringatan dini anomali perilaku lansia pada ElderCare AI.",
};

export default function NotificationsPage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <NotificationCenter />
    </Suspense>
  );
}

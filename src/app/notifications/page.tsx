import type { Metadata } from "next";

import NotificationCenter from "../../features/NotificationCenter";

export const metadata: Metadata = {
  title: "Notifikasi | ElderCare AI",
  description: "Notifikasi peringatan dini anomali perilaku lansia pada ElderCare AI.",
};

export default function NotificationsPage() {
  return <NotificationCenter />;
}

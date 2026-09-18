import type { Metadata } from "next";

import Settings from "../../features/Settings";

export const metadata: Metadata = {
  title: "Pengaturan | ElderCare AI",
  description: "Kelola preferensi notifikasi dan tampilan ElderCare AI.",
};

export default function SettingsPage() {
  return <Settings />;
}

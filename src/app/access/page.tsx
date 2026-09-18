import type { Metadata } from "next";

import AccessManagement from "../../features/AccessManagement";

export const metadata: Metadata = {
  title: "Pengaturan Izin Akses | ElderCare AI",
  description: "Kelola izin akses tenaga medis terhadap data kesehatan lansia.",
};

export default function AccessPage() {
  return <AccessManagement />;
}

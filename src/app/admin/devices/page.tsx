import type { Metadata } from "next";
import { Suspense } from "react";

import PageLoadingFallback from "../../../components/ui/PageLoadingFallback";
import DeviceManagement from "../../../features/DeviceManagement";

export const metadata: Metadata = {
  title: "Manajemen Perangkat | ElderCare AI",
  description: "Kelola pairing wearable dan sensor IoT untuk setiap lansia.",
};

export default function AdminDevicesPage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <DeviceManagement />
    </Suspense>
  );
}

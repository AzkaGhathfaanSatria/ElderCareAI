import type { Metadata } from "next";

import DeviceManagement from "../../../features/DeviceManagement";

export const metadata: Metadata = {
  title: "Manajemen Perangkat | ElderCare AI",
  description: "Kelola pairing wearable dan sensor IoT untuk setiap lansia.",
};

export default function AdminDevicesPage() {
  return <DeviceManagement />;
}

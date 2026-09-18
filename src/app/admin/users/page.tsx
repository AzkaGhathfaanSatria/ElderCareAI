import type { Metadata } from "next";

import UserManagement from "../../../features/UserManagement";

export const metadata: Metadata = {
  title: "Manajemen Pengguna | ElderCare AI",
  description: "Kelola akun Keluarga/Caregiver, Tenaga Medis, dan Admin.",
};

export default function AdminUsersPage() {
  return <UserManagement />;
}

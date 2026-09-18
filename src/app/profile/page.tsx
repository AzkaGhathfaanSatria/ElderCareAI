import type { Metadata } from "next";

import Profile from "../../features/Profile";

export const metadata: Metadata = {
  title: "Profil Saya | ElderCare AI",
  description: "Kelola informasi akun dan password ElderCare AI.",
};

export default function ProfilePage() {
  return <Profile />;
}

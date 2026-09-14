import type { Metadata } from "next";

import Register from "../../features/Register";

export const metadata: Metadata = {
  title: "Registrasi | ElderCare AI",
  description:
    "Registrasi akun untuk menggunakan sistem monitoring kesehatan lansia ElderCare AI.",
};

export default function RegisterPage() {
  return <Register />;
}

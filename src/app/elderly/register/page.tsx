import type { Metadata } from "next";

import ElderlyRegistration from "../../../features/ElderlyRegistration";

export const metadata: Metadata = {
  title: "Registrasi Lansia | ElderCare AI",
  description:
    "Formulir registrasi data lansia, wearable, dan sensor IoT pada sistem ElderCare AI.",
};

export default function ElderlyRegistrationPage() {
  return <ElderlyRegistration />;
}

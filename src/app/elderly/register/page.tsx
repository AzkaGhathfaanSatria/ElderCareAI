import type { Metadata } from "next";
import { Suspense } from "react";

import PageLoadingFallback from "../../../components/ui/PageLoadingFallback";
import ElderlyRegistration from "../../../features/ElderlyRegistration";

export const metadata: Metadata = {
  title: "Registrasi Lansia | ElderCare AI",
  description:
    "Formulir registrasi data lansia, wearable, dan sensor IoT pada sistem ElderCare AI.",
};

export default function ElderlyRegistrationPage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <ElderlyRegistration />
    </Suspense>
  );
}

import { Suspense } from "react";

import PageLoadingFallback from "../../components/ui/PageLoadingFallback";
import Login from "../../features/Login";

export const metadata = {
  title: "Login | ElderCare AI",
  description: "Masuk ke sistem ElderCare AI untuk melanjutkan pemantauan kesehatan lansia.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Login />
    </Suspense>
  );
}

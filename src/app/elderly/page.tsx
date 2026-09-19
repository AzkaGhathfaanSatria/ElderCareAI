import { Suspense } from "react";

import PageLoadingFallback from "../../components/ui/PageLoadingFallback";
import ElderlyDetail from "../../features/ElderlyDetail";

export const metadata = {
  title: "Data Lansia | ElderCare AI",
  description: "Informasi dan monitoring kesehatan lansia pada sistem ElderCare AI.",
};

export default function ElderlyPage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <ElderlyDetail />
    </Suspense>
  );
}

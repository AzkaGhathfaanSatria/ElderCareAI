import { Suspense } from "react";

import PageLoadingFallback from "../components/ui/PageLoadingFallback";
import Login from "../features/Login";

export default function HomePage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Login />
    </Suspense>
  );
}

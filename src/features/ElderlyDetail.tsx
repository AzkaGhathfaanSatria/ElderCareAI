"use client";

import { useRouter } from "next/navigation";
import AnomalyHistory from "../components/elderly/AnomalyHistory";
import BehaviorBaseline from "../components/elderly/BehaviorBaseline";
import CurrentAlert from "../components/elderly/CurrentAlert";
import DeviceStatus from "../components/elderly/DeviceStatus";
import ElderlyProfile from "../components/elderly/ElderlyProfile";
import HealthOverview from "../components/elderly/HealthOverview";
import MedicalRecommendation from "../components/elderly/MedicalRecommendation";
import TopNav from "../components/layout/TopNav";
import Button from "../components/ui/Button";
import QueryStateScreen from "../components/ui/QueryStateScreen";
import { useElderCareQuery } from "../hooks/useElderCareQuery";
import { useSession } from "../hooks/useSession";
import { useUIStore } from "../store/useUIStore";

function ElderlyDetail() {
  const router = useRouter();

  const selectedPeriod = useUIStore((state) => state.selectedPeriod);

  const setSelectedPeriod = useUIStore((state) => state.setSelectedPeriod);

  const sessionQuery = useSession();
  const role = sessionQuery.data?.role;

  const monitoringQuery = useElderCareQuery();

  if (monitoringQuery.isPending || monitoringQuery.isError || !monitoringQuery.data) {
    return (
      <QueryStateScreen
        query={monitoringQuery}
        pendingMessage="Memuat data lansia..."
        errorTitle="Gagal Memuat Data"
        errorFallbackMessage="Gagal mengambil data lansia."
        emptyMessage="Data lansia belum tersedia."
      />
    );
  }

  const { elderly, health, alert, devices, anomalyHistory } = monitoringQuery.data;

  return (
    <div className="min-h-screen bg-paper">
      <TopNav hasNotification={alert.hasAlert} />

      <main className="min-w-0">
        <header className="flex min-h-16 items-center justify-between gap-4 border-b border-border bg-surface px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm text-muted">Data Lansia</p>

            <h1 className="mt-0.5 font-serif text-lg text-ink">Monitoring Lansia</h1>
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={() => router.push("/elderly/register")}
            aria-label="Tambah data lansia"
          >
            <span className="mr-1.5 text-base">+</span>
            Tambah Data Lansia
          </Button>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push("/dashboard")}
              aria-label="Kembali ke dashboard"
            >
              ← Kembali ke Dashboard
            </Button>
          </div>

          <ElderlyProfile elderly={elderly} />

          <CurrentAlert alert={alert} />

          <HealthOverview health={health} />

          <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <BehaviorBaseline />

            <DeviceStatus devices={devices} />
          </section>

          <AnomalyHistory
            anomalyHistory={anomalyHistory}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />

          {role === "tenaga_medis" && <MedicalRecommendation />}
        </div>

        <footer className="border-t border-border bg-surface px-4 py-5 text-center sm:px-6 lg:px-8">
          <p className="text-xs text-muted">ElderCare AI — Smart Elderly Monitoring System</p>
        </footer>
      </main>
    </div>
  );
}

export default ElderlyDetail;

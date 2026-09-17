"use client";

import { useRouter } from "next/navigation";
import AnomalyHistory from "../components/elderly/AnomalyHistory";
import BehaviorBaseline from "../components/elderly/BehaviorBaseline";
import CurrentAlert from "../components/elderly/CurrentAlert";
import DeviceStatus from "../components/elderly/DeviceStatus";
import ElderlyProfile from "../components/elderly/ElderlyProfile";
import HealthOverview from "../components/elderly/HealthOverview";
import TopNav from "../components/layout/TopNav";
import Button from "../components/ui/Button";
import { useElderCareQuery } from "../hooks/useElderCareQuery";
import { useUIStore } from "../store/useUIStore";

function ElderlyDetail() {
  const router = useRouter();

  const selectedPeriod = useUIStore((state) => state.selectedPeriod);

  const setSelectedPeriod = useUIStore((state) => state.setSelectedPeriod);

  const monitoringQuery = useElderCareQuery();

  if (monitoringQuery.isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper px-4">
        <section
          className="rounded-xl bg-surface px-8 py-6 text-center shadow-sm"
          role="status"
          aria-live="polite"
        >
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent" />

          <p className="text-sm font-medium text-ink-soft">Memuat data lansia...</p>
        </section>
      </main>
    );
  }

  if (monitoringQuery.isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper px-4">
        <section
          className="w-full max-w-md rounded-xl border border-danger/25 bg-surface p-6 text-center shadow-sm"
          role="alert"
          aria-live="assertive"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger/15 font-bold text-danger">
            !
          </div>

          <h1 className="text-lg font-bold text-ink">Gagal Memuat Data</h1>

          <p className="mt-2 text-sm text-muted">
            {monitoringQuery.error?.message ?? "Gagal mengambil data lansia."}
          </p>

          <Button
            variant="primary"
            size="sm"
            className="mt-5"
            onClick={() => {
              void monitoringQuery.refetch();
            }}
          >
            Coba Lagi
          </Button>
        </section>
      </main>
    );
  }

  if (!monitoringQuery.data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper px-4">
        <section
          className="w-full max-w-md rounded-xl border border-border bg-surface p-6 text-center shadow-sm"
          role="status"
        >
          <h1 className="text-lg font-bold text-ink">Data Tidak Tersedia</h1>

          <p className="mt-2 text-sm text-muted">Data lansia belum tersedia.</p>
        </section>
      </main>
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
        </div>

        <footer className="border-t border-border bg-surface px-4 py-5 text-center sm:px-6 lg:px-8">
          <p className="text-xs text-muted">ElderCare AI — Smart Elderly Monitoring System</p>
        </footer>
      </main>
    </div>
  );
}

export default ElderlyDetail;

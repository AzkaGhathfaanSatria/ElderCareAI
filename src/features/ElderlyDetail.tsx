"use client";

import { useRouter } from "next/navigation";
import AnomalyHistory from "../components/elderly/AnomalyHistory";
import BehaviorBaseline from "../components/elderly/BehaviorBaseline";
import CurrentAlert from "../components/elderly/CurrentAlert";
import DeviceStatus from "../components/elderly/DeviceStatus";
import ElderlyProfile from "../components/elderly/ElderlyProfile";
import HealthOverview from "../components/elderly/HealthOverview";
import Sidebar from "../components/layout/Sidebar";
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
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <section
          className="rounded-xl bg-white px-8 py-6 text-center shadow-sm"
          role="status"
          aria-live="polite"
        >
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-sm font-medium text-slate-600">Memuat data lansia...</p>
        </section>
      </main>
    );
  }

  if (monitoringQuery.isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <section
          className="w-full max-w-md rounded-xl border border-red-200 bg-white p-6 text-center shadow-sm"
          role="alert"
          aria-live="assertive"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
            !
          </div>

          <h1 className="text-lg font-bold text-slate-800">Gagal Memuat Data</h1>

          <p className="mt-2 text-sm text-slate-500">
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
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <section
          className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
          role="status"
        >
          <h1 className="text-lg font-bold text-slate-800">Data Tidak Tersedia</h1>

          <p className="mt-2 text-sm text-slate-500">Data lansia belum tersedia.</p>
        </section>
      </main>
    );
  }

  const { elderly, health, alert, devices, anomalyHistory } = monitoringQuery.data;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <header className="flex min-h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm text-slate-500">Data Lansia</p>

              <h1 className="mt-0.5 text-lg font-bold text-slate-800">Monitoring Lansia</h1>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => router.push("/elderly/register")}
                aria-label="Tambah data lansia"
              >
                <span className="mr-1.5 text-base">+</span>
                Tambah Data Lansia
              </Button>

              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-700">Administrator</p>

                <p className="text-xs text-slate-400">admin@eldercare.ai</p>
              </div>

              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600"
                aria-hidden="true"
              >
                A
              </div>
            </div>
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

            <CurrentAlert alert={alert} />
          </div>

          <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center sm:px-6 lg:px-8">
            <p className="text-xs text-slate-400">ElderCare AI — Smart Elderly Monitoring System</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default ElderlyDetail;

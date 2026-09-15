"use client";

import { useRouter } from "next/navigation";
import ActivityChart from "../components/dashboard/ActivityChart";
import AlertSummary from "../components/dashboard/AlertSummary";
import ElderlyMonitoringCard from "../components/dashboard/ElderlyMonitoringCard";
import HealthSummary from "../components/dashboard/HealthSummary";
import Sidebar from "../components/layout/Sidebar";
import Button from "../components/ui/Button";
import { useElderCareQuery } from "../hooks/useElderCareQuery";
import { useUIStore } from "../store/useUIStore";

function Dashboard() {
  const router = useRouter();

  const selectedActivityDay = useUIStore((state) => state.selectedActivityDay);

  const setSelectedActivityDay = useUIStore((state) => state.setSelectedActivityDay);

  const monitoringQuery = useElderCareQuery();

  if (monitoringQuery.isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <section
          className="rounded-xl bg-white px-8 py-6 text-center shadow-sm"
          role="status"
          aria-live="polite"
        >
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-sm font-medium text-slate-600">Memuat dashboard...</p>
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

          <h1 className="text-lg font-bold text-slate-800">Gagal Memuat Dashboard</h1>

          <p className="mt-2 text-sm text-slate-500">
            {monitoringQuery.error?.message ?? "Gagal mengambil data dashboard."}
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

          <p className="mt-2 text-sm text-slate-500">Data dashboard belum tersedia.</p>
        </section>
      </main>
    );
  }

  const { elderly, health, activityHistory, alert } = monitoringQuery.data;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm text-slate-500">Sistem Pemantauan Kesehatan Lansia</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Buka notifikasi"
                className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <span className="text-lg" aria-hidden="true">
                  ♢
                </span>

                {alert.hasAlert && (
                  <span
                    className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"
                    role="status"
                    aria-label="Ada notifikasi baru"
                  />
                )}
              </button>

              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-700">Administrator</p>

                <p className="text-xs text-slate-400">admin@eldercare.ai</p>
              </div>

              <div
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600"
                aria-hidden="true"
              >
                A
              </div>
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8">
            <section className="mb-8">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                Dashboard Monitoring
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Pantau kondisi kesehatan dan aktivitas lansia secara berkala.
              </p>
            </section>

            <HealthSummary health={health} />

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <ActivityChart
                activityHistory={activityHistory}
                selectedActivityDay={selectedActivityDay}
                onActivitySelect={setSelectedActivityDay}
              />

              <AlertSummary alert={alert} onViewDetail={() => router.push("/elderly")} />
            </section>

            <ElderlyMonitoringCard elderly={elderly} onViewDetail={() => router.push("/elderly")} />
          </div>

          <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center sm:px-6 lg:px-8">
            <p className="text-xs text-slate-400">ElderCare AI — Smart Elderly Monitoring System</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

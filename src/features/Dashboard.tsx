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
      <main className="flex min-h-screen items-center justify-center bg-paper px-4">
        <section
          className="rounded-xl bg-surface px-8 py-6 text-center shadow-sm"
          role="status"
          aria-live="polite"
        >
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent" />

          <p className="text-sm font-medium text-ink-soft">Memuat dashboard...</p>
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

          <h1 className="text-lg font-bold text-ink">Gagal Memuat Dashboard</h1>

          <p className="mt-2 text-sm text-muted">
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
      <main className="flex min-h-screen items-center justify-center bg-paper px-4">
        <section
          className="w-full max-w-md rounded-xl border border-border bg-surface p-6 text-center shadow-sm"
          role="status"
        >
          <h1 className="text-lg font-bold text-ink">Data Tidak Tersedia</h1>

          <p className="mt-2 text-sm text-muted">Data dashboard belum tersedia.</p>
        </section>
      </main>
    );
  }

  const { elderly, health, activityHistory, alert } = monitoringQuery.data;

  return (
    <div className="min-h-screen bg-paper">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm text-muted">Sistem Pemantauan Kesehatan Lansia</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Buka notifikasi"
                className="relative rounded-lg p-2 text-muted transition hover:bg-paper hover:text-ink-soft"
              >
                <span className="text-lg" aria-hidden="true">
                  ♢
                </span>

                {alert.hasAlert && (
                  <span
                    className="absolute right-1 top-1 h-2 w-2 rounded-full bg-danger"
                    role="status"
                    aria-label="Ada notifikasi baru"
                  />
                )}
              </button>

              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-ink-soft">Administrator</p>

                <p className="text-xs text-muted">admin@eldercare.ai</p>
              </div>

              <div
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent-dark"
                aria-hidden="true"
              >
                A
              </div>
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8">
            <section className="mb-8">
              <h1 className="font-serif text-2xl text-ink sm:text-3xl">
                Dashboard Monitoring
              </h1>

              <p className="mt-2 text-sm text-muted">
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

          <footer className="border-t border-border bg-surface px-4 py-5 text-center sm:px-6 lg:px-8">
            <p className="text-xs text-muted">ElderCare AI — Smart Elderly Monitoring System</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

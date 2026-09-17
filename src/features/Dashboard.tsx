"use client";

import { useRouter } from "next/navigation";
import ActivityChart from "../components/dashboard/ActivityChart";
import AlertSummary from "../components/dashboard/AlertSummary";
import ElderlyMonitoringCard from "../components/dashboard/ElderlyMonitoringCard";
import HealthSummary from "../components/dashboard/HealthSummary";
import TopNav from "../components/layout/TopNav";
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
      <TopNav hasNotification={alert.hasAlert} />

      <main className="min-w-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <section className="mb-8">
            <h1 className="font-serif text-2xl text-ink sm:text-3xl">Dashboard Monitoring</h1>

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
  );
}

export default Dashboard;

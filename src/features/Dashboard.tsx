"use client";

import { useRouter } from "next/navigation";
import ActivityChart from "../components/dashboard/ActivityChart";
import AlertSummary from "../components/dashboard/AlertSummary";
import ElderlyMonitoringCard from "../components/dashboard/ElderlyMonitoringCard";
import HealthSummary from "../components/dashboard/HealthSummary";
import TopNav from "../components/layout/TopNav";
import PageFooter from "../components/layout/PageFooter";
import QueryStateScreen from "../components/ui/QueryStateScreen";
import { useElderCareQuery } from "../hooks/useElderCareQuery";
import { useUIStore } from "../store/useUIStore";

function Dashboard() {
  const router = useRouter();

  const selectedActivityDay = useUIStore((state) => state.selectedActivityDay);

  const setSelectedActivityDay = useUIStore((state) => state.setSelectedActivityDay);

  const monitoringQuery = useElderCareQuery();

  if (monitoringQuery.isPending || monitoringQuery.isError || !monitoringQuery.data) {
    return (
      <QueryStateScreen
        query={monitoringQuery}
        pendingMessage="Memuat dashboard..."
        errorTitle="Gagal Memuat Dashboard"
        errorFallbackMessage="Gagal mengambil data dashboard."
        emptyMessage="Data dashboard belum tersedia."
      />
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

        <PageFooter />
      </main>
    </div>
  );
}

export default Dashboard;

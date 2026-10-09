"use client";

import { useRouter } from "next/navigation";
import ActivityChart from "../components/dashboard/ActivityChart";
import AlertSummary from "../components/dashboard/AlertSummary";
import ElderlyMonitoringCard from "../components/dashboard/ElderlyMonitoringCard";
import HealthSummary from "../components/dashboard/HealthSummary";
import Footer from "../components/layout/Footer";
import TopNav from "../components/layout/TopNav";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import InlineNotice from "../components/ui/InlineNotice";
import QueryStateScreen from "../components/ui/QueryStateScreen";
import { useElderCareQuery } from "../hooks/useElderCareQuery";
import { useElderRealtime } from "../hooks/useElderRealtime";
import { useUIStore } from "../store/useUIStore";

function Dashboard() {
  const router = useRouter();

  const selectedActivityDay = useUIStore((state) => state.selectedActivityDay);

  const setSelectedActivityDay = useUIStore((state) => state.setSelectedActivityDay);

  const monitoringQuery = useElderCareQuery();
  useElderRealtime(monitoringQuery.data?.elderly.id);

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
  const hasElder = Boolean(elderly.id);

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

          {!hasElder && (
            <InlineNotice variant="warning" className="mb-6">
              Belum ada lansia terdaftar, jadi data pemantauan belum tersedia. Daftarkan lansia dan perangkatnya
              untuk mulai memantau.
            </InlineNotice>
          )}

          <HealthSummary health={health} />

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <ActivityChart
              activityHistory={activityHistory}
              selectedActivityDay={selectedActivityDay}
              onActivitySelect={setSelectedActivityDay}
            />

            <AlertSummary alert={alert} onViewDetail={() => router.push("/elderly")} />
          </section>

          {hasElder ? (
            <ElderlyMonitoringCard elderly={elderly} onViewDetail={() => router.push("/elderly")} />
          ) : (
            <section className="mt-6">
              <Card className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-serif text-lg text-ink">Lansia yang Dipantau</h2>
                  <p className="mt-1 text-sm text-muted">Belum ada lansia yang dipantau.</p>
                </div>
                <Button variant="primary" size="sm" onClick={() => router.push("/elderly/register")}>
                  Tambah Data Lansia
                </Button>
              </Card>
            </section>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default Dashboard;

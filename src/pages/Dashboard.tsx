import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import type { ElderCareData, FetchState } from "../types/elderCare";
import { fetchElderCareData } from "../services/elderCareApi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

function Dashboard() {
  const navigate = useNavigate();

  const [state, setState] = useState<FetchState<ElderCareData>>({
    status: "loading",
  });

  const [selectedActivityDay, setSelectedActivityDay] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      setState({ status: "loading" });

      try {
        const result = await fetchElderCareData();
        setState({ status: "success", data: result });
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Gagal mengambil data monitoring.";

        setState({ status: "error", message });
      }
    };

    void loadData();
  }, []);

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }

    const activityContainer =
      document.querySelector<HTMLElement>("[data-activity-list]");

    if (!activityContainer) {
      return;
    }

    const handleActivityClick = (event: MouseEvent): void => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const activityButton =
        target.closest<HTMLButtonElement>("[data-activity-day]");

      if (!activityButton || !activityContainer.contains(activityButton)) {
        return;
      }

      const day = activityButton.dataset.activityDay;

      if (day) {
        setSelectedActivityDay(day);
      }
    };

    activityContainer.addEventListener("click", handleActivityClick);

    return () => {
      activityContainer.removeEventListener("click", handleActivityClick);
    };
  }, [state.status]);

  if (state.status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div
          className="rounded-xl bg-white px-8 py-6 text-center shadow-sm"
          role="status"
          aria-live="polite"
        >
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-sm font-medium text-slate-600">
            Memuat data monitoring...
          </p>
        </div>
      </div>
    );
  }

  if (state.status === "error") {
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

          <h1 className="text-lg font-bold text-slate-800">
            Gagal Memuat Data
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {state.message}
          </p>

          <Button
            variant="primary"
            size="sm"
            className="mt-5"
            onClick={() => window.location.reload()}
          >
            Coba Lagi
          </Button>
        </section>
      </main>
    );
  }

  const { elderly, health, activityHistory, alert } = state.data;

  const selectedActivity = activityHistory.find(
    (item) => item.day === selectedActivityDay
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm text-slate-500">
                Sistem Pemantauan Kesehatan Lansia
              </p>
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
                    aria-label="Ada notifikasi baru"
                  />
                )}
              </button>

              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-700">
                  Administrator
                </p>

                <p className="text-xs text-slate-400">
                  admin@eldercare.ai
                </p>
              </div>

              <div
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600"
                aria-hidden="true"
              >
                A
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Welcome */}
            <section className="mb-8">
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                Dashboard Monitoring
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Pantau kondisi kesehatan dan aktivitas lansia secara
                berkala.
              </p>
            </section>

            {/* Health Summary */}
            <section
              className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
              aria-label="Ringkasan kesehatan lansia"
            >
              <Card className="p-5">
                <p className="text-sm text-slate-500">
                  Detak Jantung
                </p>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-slate-800">
                      {health.heartRate}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {health.heartRateUnit}
                    </p>
                  </div>

                  <Badge variant="success">
                    Normal
                  </Badge>
                </div>
              </Card>

              <Card className="p-5">
                <p className="text-sm text-slate-500">
                  Aktivitas
                </p>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-slate-800">
                      {health.activity}%
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Hari ini
                    </p>
                  </div>

                  <Badge variant="info">
                    Aktif
                  </Badge>
                </div>
              </Card>

              <Card className="p-5">
                <p className="text-sm text-slate-500">
                  Durasi Tidur
                </p>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-slate-800">
                      {health.sleep}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {health.sleepUnit}
                    </p>
                  </div>

                  <Badge variant="success">
                    Baik
                  </Badge>
                </div>
              </Card>

              <Card className="p-5">
                <p className="text-sm text-slate-500">
                  Status Risiko
                </p>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {health.risk}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Berdasarkan monitoring
                    </p>
                  </div>

                  <Badge variant="success">
                    Aman
                  </Badge>
                </div>
              </Card>
            </section>

            {/* Activity + Alert */}
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              {/* Activity Chart */}
              <Card className="p-6 xl:col-span-2">
                <header className="mb-6">
                  <h2 className="text-lg font-bold text-slate-800">
                    Aktivitas Lansia
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Persentase aktivitas selama 7 hari terakhir
                  </p>
                </header>

                <div
                  data-activity-list
                  className="flex h-64 items-end justify-between gap-2 border-b border-slate-200 px-2"
                  aria-label="Grafik aktivitas selama tujuh hari"
                >
                  {activityHistory.map((item) => (
                    <div
                      key={item.day}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <span className="text-xs font-medium text-slate-500">
                        {item.value}%
                      </span>

                      <button
                        type="button"
                        data-activity-day={item.day}
                        aria-label={`Aktivitas ${item.day} ${item.value}%`}
                        className={`w-full max-w-10 rounded-t-lg bg-blue-500 transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                          selectedActivityDay === item.day
                            ? "ring-2 ring-blue-700"
                            : ""
                        }`}
                        style={{
                          height: `${item.value}%`,
                        }}
                        title={`${item.day}: ${item.value}%`}
                      />

                      <span className="text-xs text-slate-400">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>

                {selectedActivity && (
                  <div
                    className="mt-4 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700"
                    role="status"
                    aria-live="polite"
                  >
                    Aktivitas hari {selectedActivity.day}:{" "}
                    <strong>{selectedActivity.value}%</strong>
                  </div>
                )}
              </Card>

              {/* Alert */}
              <Card className="p-6">
                <header className="mb-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        Peringatan
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Hasil deteksi sistem AI
                      </p>
                    </div>

                    {alert.hasAlert && (
                      <Badge variant="danger">
                        1 Baru
                      </Badge>
                    )}
                  </div>
                </header>

                {alert.hasAlert && (
                  <article className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                    <div className="mb-3 flex items-start gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 font-bold text-orange-600"
                        aria-hidden="true"
                      >
                        !
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">
                          {alert.type}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {alert.description}
                        </p>
                      </div>
                    </div>

                    <p className="mb-4 text-xs text-slate-400">
                      Terdeteksi {alert.detected}
                    </p>

                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => navigate("/elderly")}
                      aria-label="Lihat detail peringatan"
                    >
                      Lihat Detail
                    </Button>
                  </article>
                )}

                {!alert.hasAlert && (
                  <div
                    className="rounded-xl border border-green-200 bg-green-50 p-4"
                    aria-live="polite"
                  >
                    <p className="text-sm font-semibold text-green-700">
                      Tidak ada peringatan
                    </p>
                  </div>
                )}
              </Card>
            </section>

            {/* Elderly Monitoring */}
            <section className="mt-6">
              <Card className="p-6">
                <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Lansia yang Dipantau
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Data lansia yang sedang dalam pemantauan.
                    </p>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate("/elderly")}
                    aria-label="Lihat detail data lansia"
                  >
                    Lihat Data
                  </Button>
                </header>

                <article className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600"
                      aria-hidden="true"
                    >
                      BS
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {elderly.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {elderly.age} tahun
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="success">
                      Wearable {elderly.wearableStatus}
                    </Badge>

                    <Badge variant="info">
                      IoT {elderly.iotStatus}
                    </Badge>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate("/elderly")}
                      aria-label={`Lihat detail ${elderly.name}`}
                    >
                      Detail
                    </Button>
                  </div>
                </article>
              </Card>
            </section>
          </div>

          {/* Footer */}
          <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center sm:px-6 lg:px-8">
            <p className="text-xs text-slate-400">
              ElderCare AI — Smart Elderly Monitoring System
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
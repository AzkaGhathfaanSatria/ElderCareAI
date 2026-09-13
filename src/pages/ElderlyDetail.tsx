import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import type { ElderCareData, FetchState, Period } from "../types/elderCare";
import { fetchElderCareData } from "../services/elderCareApi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Select from "../components/ui/Select";
import Badge from "../components/ui/Badge";

function ElderlyDetail() {
  const navigate = useNavigate();

  const [state, setState] = useState<FetchState<ElderCareData>>({
    status: "loading",
  });

  const [selectedPeriod, setSelectedPeriod] =
    useState<Period>("7 Hari");

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
            : "Gagal mengambil data lansia.";

        setState({ status: "error", message });
      }
    };

    void loadData();
  }, []);

  if (state.status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <section
          className="rounded-xl bg-white px-8 py-6 text-center shadow-sm"
          role="status"
          aria-live="polite"
        >
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-sm font-medium text-slate-600">
            Memuat data lansia...
          </p>
        </section>
      </main>
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

  const {
    elderly,
    health,
    alert,
    devices,
    anomalyHistory,
  } = state.data;

  const periodOptions: readonly Period[] = [
    "7 Hari",
    "30 Hari",
    "3 Bulan",
  ];

  const filteredHistory = anomalyHistory.filter(
    (item) => item.period === selectedPeriod
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
                Data Lansia
              </p>
            </div>

            <div className="flex items-center gap-3">
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

          {/* Main Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Back */}
            <div className="mb-6">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/dashboard")}
                aria-label="Kembali ke dashboard"
              >
                ← Kembali ke Dashboard
              </Button>
            </div>

            {/* Profile */}
            <section className="mb-6">
              <Card className="p-5 sm:p-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600"
                      aria-hidden="true"
                    >
                      BS
                    </div>

                    <div>
                      <h1 className="text-2xl font-bold text-slate-800">
                        {elderly.name}
                      </h1>

                      <p className="mt-1 text-sm text-slate-500">
                        {elderly.age} tahun • Lansia yang sedang
                        dipantau
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge variant="success">
                          Monitoring {elderly.monitoringStatus}
                        </Badge>

                        <Badge variant="info">
                          Wearable {elderly.wearableStatus}
                        </Badge>

                        <Badge variant="info">
                          IoT {elderly.iotStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-xs text-slate-400">
                      ID Lansia
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {elderly.id}
                    </p>

                    <p className="mt-2 text-xs text-green-600">
                      Monitoring aktif
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* Health Summary */}
            <section
              className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
              aria-label="Ringkasan kondisi kesehatan lansia"
            >
              <Card className="p-5">
                <p className="text-sm text-slate-500">
                  Detak Jantung
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-800">
                  {health.heartRate}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {health.heartRateUnit}
                </p>

                <Badge
                  variant="success"
                  className="mt-3"
                >
                  Normal
                </Badge>
              </Card>

              <Card className="p-5">
                <p className="text-sm text-slate-500">
                  Aktivitas
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-800">
                  {health.activity}%
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Aktivitas hari ini
                </p>

                <Badge
                  variant="info"
                  className="mt-3"
                >
                  Aktif
                </Badge>
              </Card>

              <Card className="p-5">
                <p className="text-sm text-slate-500">
                  Durasi Tidur
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-800">
                  {health.sleep}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {health.sleepUnit}
                </p>

                <Badge
                  variant="success"
                  className="mt-3"
                >
                  Baik
                </Badge>
              </Card>

              <Card className="p-5">
                <p className="text-sm text-slate-500">
                  Tingkat Risiko
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-800">
                  {health.risk}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Hasil analisis AI
                </p>

                <Badge
                  variant="success"
                  className="mt-3"
                >
                  Aman
                </Badge>
              </Card>
            </section>

            {/* Baseline + Devices */}
            <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
              {/* Baseline */}
              <Card className="p-6">
                <header className="mb-5">
                  <h2 className="text-lg font-bold text-slate-800">
                    Behavior Baseline
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Pola perilaku normal berdasarkan data historis
                    lansia.
                  </p>
                </header>

                <div className="space-y-3">
                  <article className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-700">
                        Mobilitas
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Pola pergerakan harian
                      </p>
                    </div>

                    <Badge variant="success">
                      Normal
                    </Badge>
                  </article>

                  <article className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-700">
                        Pola Tidur
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Durasi dan waktu tidur
                      </p>
                    </div>

                    <Badge variant="success">
                      Normal
                    </Badge>
                  </article>

                  <article className="flex items-center justify-between rounded-lg bg-orange-50 p-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-700">
                        Aktivitas
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Terdapat perubahan dari baseline
                      </p>
                    </div>

                    <Badge variant="warning">
                      Berubah
                    </Badge>
                  </article>
                </div>
              </Card>

              {/* Devices */}
              <Card className="p-6">
                <header className="mb-5">
                  <h2 className="text-lg font-bold text-slate-800">
                    Status Perangkat
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Perangkat yang mengirimkan data monitoring.
                  </p>
                </header>

                <div className="space-y-3">
                  {devices.map((device) => (
                    <article
                      key={device.name}
                      className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                    >
                      <div>
                        <h3 className="text-sm font-semibold text-slate-700">
                          {device.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          {device.description}
                        </p>
                      </div>

                      <Badge variant="success">
                        {device.status}
                      </Badge>
                    </article>
                  ))}
                </div>
              </Card>
            </section>

            {/* Anomaly History */}
            <section className="mb-6">
              <Card className="p-6">
                <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Riwayat Anomali
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Perubahan perilaku yang terdeteksi oleh sistem.
                    </p>
                  </div>

                  <Select
                    value={selectedPeriod}
                    onValueChange={setSelectedPeriod}
                    options={periodOptions}
                    label="Periode"
                  />
                </header>

                <div className="space-y-3">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                      <article
                        key={`${item.date}-${item.time}`}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="flex gap-3">
                            <div
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 font-bold text-orange-600"
                              aria-hidden="true"
                            >
                              !
                            </div>

                            <div>
                              <h3 className="text-sm font-semibold text-slate-800">
                                {item.type}
                              </h3>

                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                {item.description}
                              </p>

                              <p className="mt-2 text-xs text-slate-400">
                                {item.date} • {item.time} WIB
                              </p>
                            </div>
                          </div>

                          <Badge
                            variant={
                              item.level === "Tinggi"
                                ? "danger"
                                : item.level === "Sedang"
                                  ? "warning"
                                  : "success"
                            }
                          >
                            Risiko {item.level}
                          </Badge>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div
                      className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center"
                      aria-live="polite"
                    >
                      <p className="text-sm font-medium text-slate-600">
                        Tidak ada riwayat anomali pada periode ini.
                      </p>
                    </div>
                  )}
                </div>

                <div
                  className="mt-5 rounded-lg bg-blue-50 p-4"
                  aria-live="polite"
                >
                  <p className="text-sm font-semibold text-blue-700">
                    Analisis AI
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-600">
                    Sistem membandingkan aktivitas terkini dengan
                    baseline perilaku personal untuk mendeteksi
                    perubahan yang tidak biasa.
                  </p>
                </div>
              </Card>
            </section>

            {/* Current Alert */}
            <section>
              <Card className="p-6">
                <header className="mb-5">
                  <h2 className="text-lg font-bold text-slate-800">
                    Peringatan Terkini
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Informasi peringatan berdasarkan hasil monitoring.
                  </p>
                </header>

                {alert.hasAlert ? (
                  <article className="rounded-xl border border-orange-200 bg-orange-50 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 font-bold text-orange-600"
                          aria-hidden="true"
                        >
                          !
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {alert.type}
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {alert.description}
                          </p>

                          <p className="mt-2 text-xs text-slate-400">
                            Terdeteksi {alert.detected}
                          </p>
                        </div>
                      </div>

                      <Badge variant="warning">
                        Risiko {alert.level}
                      </Badge>
                    </div>
                  </article>
                ) : (
                  <div
                    className="rounded-xl border border-green-200 bg-green-50 p-5"
                    aria-live="polite"
                  >
                    <p className="font-semibold text-green-700">
                      Tidak ada peringatan saat ini.
                    </p>
                  </div>
                )}
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

export default ElderlyDetail;
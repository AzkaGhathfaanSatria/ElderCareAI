import type { AnomalyHistoryItem, Period } from "../../types/elderCare";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import Select from "../ui/Select";

interface AnomalyHistoryProps {
  anomalyHistory: AnomalyHistoryItem[];
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

function AnomalyHistory({ anomalyHistory, selectedPeriod, onPeriodChange }: AnomalyHistoryProps) {
  const periodOptions: readonly Period[] = ["7 Hari", "30 Hari", "3 Bulan"];

  const filteredHistory = anomalyHistory.filter((item) => item.period === selectedPeriod);

  return (
    <section className="mb-6">
      <Card className="p-6">
        <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Riwayat Anomali</h2>

            <p className="mt-1 text-sm text-slate-500">
              Perubahan perilaku yang terdeteksi oleh sistem.
            </p>
          </div>

          <Select
            value={selectedPeriod}
            onValueChange={onPeriodChange}
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
                      <h3 className="text-sm font-semibold text-slate-800">{item.type}</h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>

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

        <div className="mt-5 rounded-lg bg-blue-50 p-4" aria-live="polite">
          <p className="text-sm font-semibold text-blue-700">Analisis AI</p>

          <p className="mt-1 text-xs leading-5 text-blue-600">
            Sistem membandingkan aktivitas terkini dengan baseline perilaku personal untuk
            mendeteksi perubahan yang tidak biasa.
          </p>
        </div>
      </Card>
    </section>
  );
}

export default AnomalyHistory;

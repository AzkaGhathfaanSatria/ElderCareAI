import type { AnomalyHistoryItem, Period } from "../../types/elderCare";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import Select from "../ui/Select";

interface AnomalyHistoryProps {
  anomalyHistory: AnomalyHistoryItem[];
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

function dotColor(level: AnomalyHistoryItem["level"]) {
  if (level === "Tinggi") return "bg-danger";
  if (level === "Sedang") return "bg-warn";
  return "bg-safe";
}

function AnomalyHistory({ anomalyHistory, selectedPeriod, onPeriodChange }: AnomalyHistoryProps) {
  const periodOptions: readonly Period[] = ["7 Hari", "30 Hari", "3 Bulan"];

  const filteredHistory = anomalyHistory.filter((item) => item.period === selectedPeriod);

  return (
    <section className="mb-6">
      <Card className="p-6">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-lg text-ink">Riwayat Anomali</h2>

            <p className="mt-1 text-sm text-muted">
              Perubahan perilaku yang terdeteksi oleh sistem, urut dari yang terbaru.
            </p>
          </div>

          <Select
            value={selectedPeriod}
            onValueChange={onPeriodChange}
            options={periodOptions}
            label="Periode"
          />
        </header>

        {filteredHistory.length > 0 ? (
          <ol className="space-y-6 border-l border-border pl-6">
            {filteredHistory.map((item) => (
              <li key={`${item.date}-${item.time}`} className="relative">
                <span
                  className={`absolute top-1.5 -left-[27px] h-2.5 w-2.5 rounded-full border-2 border-surface ${dotColor(item.level)}`}
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs text-muted">
                      {item.date} · {item.time} WIB
                    </p>

                    <h3 className="mt-1 text-sm font-semibold text-ink">{item.type}</h3>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-muted">{item.description}</p>
                  </div>

                  <Badge
                    variant={
                      item.level === "Tinggi"
                        ? "danger"
                        : item.level === "Sedang"
                          ? "warning"
                          : "success"
                    }
                    className="shrink-0"
                  >
                    Risiko {item.level}
                  </Badge>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div
            className="rounded-xl border border-border bg-paper p-6 text-center"
            aria-live="polite"
          >
            <p className="text-sm font-medium text-ink-soft">
              Tidak ada riwayat anomali pada periode ini.
            </p>
          </div>
        )}

        <div className="mt-6 rounded-lg bg-ink/[0.05] p-4" aria-live="polite">
          <p className="text-sm font-semibold text-ink-soft">Analisis AI</p>

          <p className="mt-1 text-xs leading-5 text-muted">
            Sistem membandingkan aktivitas terkini dengan baseline perilaku personal untuk
            mendeteksi perubahan yang tidak biasa.
          </p>
        </div>
      </Card>
    </section>
  );
}

export default AnomalyHistory;

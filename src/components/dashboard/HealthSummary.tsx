import type { Health } from "../../types/elderCare";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

interface HealthSummaryProps {
  health: Health;
}

function HealthSummary({ health }: HealthSummaryProps) {
  return (
    <section
      className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      aria-label="Ringkasan kesehatan lansia"
    >
      <Card className="p-5">
        <p className="text-sm text-muted">Detak Jantung</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-ink">{health.heartRate}</p>

            <p className="mt-1 text-xs text-muted">{health.heartRateUnit}</p>
          </div>

          <Badge variant="success">Normal</Badge>
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-muted">Aktivitas</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-ink">{health.activity}%</p>

            <p className="mt-1 text-xs text-muted">Hari ini</p>
          </div>

          <Badge variant="info">Aktif</Badge>
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-muted">Durasi Tidur</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-ink">{health.sleep}</p>

            <p className="mt-1 text-xs text-muted">{health.sleepUnit}</p>
          </div>

          <Badge variant="success">Baik</Badge>
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-muted">Status Risiko</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-ink">{health.risk}</p>

            <p className="mt-1 text-xs text-muted">Berdasarkan monitoring</p>
          </div>

          <Badge variant="success">Aman</Badge>
        </div>
      </Card>
    </section>
  );
}

export default HealthSummary;

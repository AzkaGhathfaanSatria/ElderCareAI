import type { Health } from "../../types/elderCare";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

interface HealthOverviewProps {
  health: Health;
}

function HealthOverview({ health }: HealthOverviewProps) {
  return (
    <Card
      className="mb-6 grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4"
      aria-label="Ringkasan kondisi kesehatan lansia"
    >
      <div className="p-5">
        <p className="text-sm text-muted">Detak Jantung</p>

        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="font-serif text-3xl text-ink">{health.heartRate}</span>
          <span className="text-xs text-muted">{health.heartRateUnit}</span>
        </div>

        <Badge variant="success" className="mt-3">
          Normal
        </Badge>
      </div>

      <div className="p-5">
        <p className="text-sm text-muted">Aktivitas</p>

        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="font-serif text-3xl text-ink">{health.activity}</span>
          <span className="text-xs text-muted">%, hari ini</span>
        </div>

        <Badge variant="info" className="mt-3">
          Aktif
        </Badge>
      </div>

      <div className="p-5">
        <p className="text-sm text-muted">Durasi Tidur</p>

        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="font-serif text-3xl text-ink">{health.sleep}</span>
          <span className="text-xs text-muted">{health.sleepUnit}</span>
        </div>

        <Badge variant="success" className="mt-3">
          Baik
        </Badge>
      </div>

      <div className="p-5">
        <p className="text-sm text-muted">Tingkat Risiko</p>

        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="font-serif text-3xl text-ink">{health.risk}</span>
        </div>

        <Badge variant="success" className="mt-3">
          Aman
        </Badge>
      </div>
    </Card>
  );
}

export default HealthOverview;

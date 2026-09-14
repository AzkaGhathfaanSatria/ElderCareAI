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
        <p className="text-sm text-slate-500">Detak Jantung</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-slate-800">
              {health.heartRate}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {health.heartRateUnit}
            </p>
          </div>

          <Badge variant="success">Normal</Badge>
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-slate-500">Aktivitas</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-slate-800">
              {health.activity}%
            </p>

            <p className="mt-1 text-xs text-slate-400">Hari ini</p>
          </div>

          <Badge variant="info">Aktif</Badge>
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-slate-500">Durasi Tidur</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-slate-800">
              {health.sleep}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {health.sleepUnit}
            </p>
          </div>

          <Badge variant="success">Baik</Badge>
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-slate-500">Status Risiko</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-slate-800">
              {health.risk}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Berdasarkan monitoring
            </p>
          </div>

          <Badge variant="success">Aman</Badge>
        </div>
      </Card>
    </section>
  );
}

export default HealthSummary;
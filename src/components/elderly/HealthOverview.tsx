import type { Health } from "../../types/elderCare";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

interface HealthOverviewProps {
  health: Health;
}

function HealthOverview({ health }: HealthOverviewProps) {
  return (
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

        <Badge variant="success" className="mt-3">
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

        <Badge variant="info" className="mt-3">
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

        <Badge variant="success" className="mt-3">
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

        <Badge variant="success" className="mt-3">
          Aman
        </Badge>
      </Card>
    </section>
  );
}

export default HealthOverview;
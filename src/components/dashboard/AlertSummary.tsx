import type { AlertData } from "../../types/elderCare";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface AlertSummaryProps {
  alert: AlertData;
  onViewDetail: () => void;
}

function AlertSummary({
  alert,
  onViewDetail,
}: AlertSummaryProps) {
  return (
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

          {alert.hasAlert && <Badge variant="danger">1 Baru</Badge>}
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
            onClick={onViewDetail}
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
  );
}

export default AlertSummary;
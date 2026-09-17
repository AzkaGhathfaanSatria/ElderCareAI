import type { AlertData } from "../../types/elderCare";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface AlertSummaryProps {
  alert: AlertData;
  onViewDetail: () => void;
}

function AlertSummary({ alert, onViewDetail }: AlertSummaryProps) {
  return (
    <Card className="p-6">
      <header className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg text-ink">Peringatan</h2>

            <p className="mt-1 text-sm text-muted">Hasil deteksi sistem AI</p>
          </div>

          {alert.hasAlert && <Badge variant="danger">1 Baru</Badge>}
        </div>
      </header>

      {alert.hasAlert && (
        <article className="rounded-xl border border-warn/30 bg-warn/10 p-4">
          <div className="mb-3 flex items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warn/20 font-bold text-accent-dark"
              aria-hidden="true"
            >
              !
            </div>

            <div>
              <h3 className="text-sm font-semibold text-ink">{alert.type}</h3>

              <p className="mt-1 text-xs leading-5 text-muted">{alert.description}</p>
            </div>
          </div>

          <p className="mb-4 text-xs text-muted">Terdeteksi {alert.detected}</p>

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
        <div className="rounded-xl border border-safe/25 bg-safe/10 p-4" aria-live="polite">
          <p className="text-sm font-semibold text-safe">Tidak ada peringatan</p>
        </div>
      )}
    </Card>
  );
}

export default AlertSummary;

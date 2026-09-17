import type { AlertData } from "../../types/elderCare";
import Badge from "../ui/Badge";

interface CurrentAlertProps {
  alert: AlertData;
}

function CurrentAlert({ alert }: CurrentAlertProps) {
  return (
    <section className="mb-6" aria-label="Peringatan terkini">
      {alert.hasAlert ? (
        <div className="flex flex-col gap-3 rounded-lg border-l-4 border-warn bg-warn/8 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warn/25 text-xs font-bold text-accent-dark"
              aria-hidden="true"
            >
              !
            </span>

            <div>
              <p className="text-sm font-semibold text-ink">{alert.type}</p>

              <p className="mt-1 text-sm leading-6 text-muted">
                {alert.description} — terdeteksi {alert.detected}.
              </p>
            </div>
          </div>

          <Badge variant="warning" className="shrink-0 self-start sm:self-center">
            Risiko {alert.level}
          </Badge>
        </div>
      ) : (
        <div
          className="flex items-center gap-3 rounded-lg border-l-4 border-safe bg-safe/8 p-4"
          aria-live="polite"
        >
          <span className="text-safe" aria-hidden="true">
            ✓
          </span>

          <p className="text-sm font-medium text-safe">Tidak ada peringatan saat ini.</p>
        </div>
      )}
    </section>
  );
}

export default CurrentAlert;

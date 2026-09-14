import type { AlertData } from "../../types/elderCare";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

interface CurrentAlertProps {
  alert: AlertData;
}

function CurrentAlert({ alert }: CurrentAlertProps) {
  return (
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
  );
}

export default CurrentAlert;
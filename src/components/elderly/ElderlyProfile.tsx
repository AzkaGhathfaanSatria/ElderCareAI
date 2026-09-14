import type { Elderly } from "../../types/elderCare";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

interface ElderlyProfileProps {
  elderly: Elderly;
}

function ElderlyProfile({ elderly }: ElderlyProfileProps) {
  return (
    <section className="mb-6" aria-label="Profil lansia">
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600"
              aria-hidden="true"
            >
              BS
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {elderly.name}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {elderly.age} tahun • Lansia yang sedang dipantau
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="success">
                  Monitoring {elderly.monitoringStatus}
                </Badge>

                <Badge variant="info">
                  Wearable {elderly.wearableStatus}
                </Badge>

                <Badge variant="info">
                  IoT {elderly.iotStatus}
                </Badge>
              </div>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs text-slate-400">ID Lansia</p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {elderly.id}
            </p>

            <p className="mt-2 text-xs text-green-600">
              Monitoring aktif
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default ElderlyProfile;
import type { Elderly } from "../../types/elderCare";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface ElderlyMonitoringCardProps {
  elderly: Elderly;
  onViewDetail: () => void;
}

function ElderlyMonitoringCard({ elderly, onViewDetail }: ElderlyMonitoringCardProps) {
  return (
    <section className="mt-6">
      <Card className="p-6">
        <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-lg text-ink">Lansia yang Dipantau</h2>

            <p className="mt-1 text-sm text-muted">Data lansia yang sedang dalam pemantauan.</p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={onViewDetail}
            aria-label="Lihat detail data lansia"
          >
            Lihat Data
          </Button>
        </header>

        <article className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 font-bold text-accent-dark"
              aria-hidden="true"
            >
              BS
            </div>

            <div>
              <h3 className="font-semibold text-ink">{elderly.name}</h3>

              <p className="text-sm text-muted">{elderly.age} tahun</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="success">Wearable {elderly.wearableStatus}</Badge>

            <Badge variant="info">IoT {elderly.iotStatus}</Badge>

            <Button
              variant="primary"
              size="sm"
              onClick={onViewDetail}
              aria-label={`Lihat detail ${elderly.name}`}
            >
              Detail
            </Button>
          </div>
        </article>
      </Card>
    </section>
  );
}

export default ElderlyMonitoringCard;

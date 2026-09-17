import Card from "../ui/Card";

function BehaviorBaseline() {
  return (
    <Card className="p-6">
      <header className="mb-4">
        <h2 className="font-serif text-lg text-ink">Behavior Baseline</h2>

        <p className="mt-1 text-sm text-muted">
          Pola perilaku normal berdasarkan data historis lansia.
        </p>
      </header>

      <div className="divide-y divide-border">
        <div className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
          <div>
            <h3 className="text-sm font-semibold text-ink-soft">Mobilitas</h3>

            <p className="mt-1 text-xs text-muted">Pola pergerakan harian</p>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-safe">
            <span className="h-1.5 w-1.5 rounded-full bg-safe" aria-hidden="true" />
            Normal
          </span>
        </div>

        <div className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
          <div>
            <h3 className="text-sm font-semibold text-ink-soft">Pola Tidur</h3>

            <p className="mt-1 text-xs text-muted">Durasi dan waktu tidur</p>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-safe">
            <span className="h-1.5 w-1.5 rounded-full bg-safe" aria-hidden="true" />
            Normal
          </span>
        </div>

        <div className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
          <div>
            <h3 className="text-sm font-semibold text-ink-soft">Aktivitas</h3>

            <p className="mt-1 text-xs text-muted">Terdapat perubahan dari baseline</p>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-warn" aria-hidden="true" />
            Berubah
          </span>
        </div>
      </div>
    </Card>
  );
}

export default BehaviorBaseline;

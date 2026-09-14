import Card from "../ui/Card";
import Badge from "../ui/Badge";

function BehaviorBaseline() {
  return (
    <Card className="p-6">
      <header className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">
          Behavior Baseline
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Pola perilaku normal berdasarkan data historis lansia.
        </p>
      </header>

      <div className="space-y-3">
        <article className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">
              Mobilitas
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Pola pergerakan harian
            </p>
          </div>

          <Badge variant="success">
            Normal
          </Badge>
        </article>

        <article className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">
              Pola Tidur
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Durasi dan waktu tidur
            </p>
          </div>

          <Badge variant="success">
            Normal
          </Badge>
        </article>

        <article className="flex items-center justify-between rounded-lg bg-orange-50 p-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">
              Aktivitas
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Terdapat perubahan dari baseline
            </p>
          </div>

          <Badge variant="warning">
            Berubah
          </Badge>
        </article>
      </div>
    </Card>
  );
}

export default BehaviorBaseline;
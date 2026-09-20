import Card from "../ui/Card";

interface BaselineRow {
  title: string;
  description: string;
  status: "Normal" | "Berubah";
}

const baselineRows: BaselineRow[] = [
  { title: "Mobilitas", description: "Pola pergerakan harian", status: "Normal" },
  { title: "Pola Tidur", description: "Durasi dan waktu tidur", status: "Normal" },
  {
    title: "Aktivitas",
    description: "Terdapat perubahan dari baseline",
    status: "Berubah",
  },
];

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
        {baselineRows.map((row) => (
          <div
            key={row.title}
            className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
          >
            <div>
              <h3 className="text-sm font-semibold text-ink-soft">{row.title}</h3>
              <p className="mt-1 text-xs text-muted">{row.description}</p>
            </div>

            <span
              className={`inline-flex items-center gap-2 text-sm font-medium ${
                row.status === "Normal" ? "text-safe" : "text-accent-dark"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  row.status === "Normal" ? "bg-safe" : "bg-warn"
                }`}
                aria-hidden="true"
              />
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default BehaviorBaseline;

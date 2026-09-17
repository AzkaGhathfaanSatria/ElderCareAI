import type { ActivityHistoryItem } from "../../types/elderCare";
import Card from "../ui/Card";

interface ActivityChartProps {
  activityHistory: ActivityHistoryItem[];
  selectedActivityDay: string | null;
  onActivitySelect: (day: string) => void;
}

function ActivityChart({
  activityHistory,
  selectedActivityDay,
  onActivitySelect,
}: ActivityChartProps) {
  const selectedActivity = activityHistory.find((item) => item.day === selectedActivityDay);

  return (
    <Card className="p-6 xl:col-span-2">
      <header className="mb-6">
        <h2 className="font-serif text-lg text-ink">Aktivitas Lansia</h2>

        <p className="mt-1 text-sm text-muted">Persentase aktivitas selama 7 hari terakhir</p>
      </header>

      <div
        className="flex h-64 items-end justify-between gap-2 border-b border-border px-2"
        role="img"
        aria-label="Grafik aktivitas selama tujuh hari"
      >
        {activityHistory.map((item) => (
          <div
            key={item.day}
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <span className="text-xs font-medium text-muted">{item.value}%</span>

            <button
              type="button"
              aria-label={`Aktivitas ${item.day} ${item.value}%`}
              className={`w-full max-w-10 rounded-t-lg bg-accent/80 transition hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                selectedActivityDay === item.day ? "ring-2 ring-accent-dark" : ""
              }`}
              style={{
                height: `${item.value}%`,
              }}
              title={`${item.day}: ${item.value}%`}
              onClick={() => onActivitySelect(item.day)}
            />

            <span className="text-xs text-muted">{item.day}</span>
          </div>
        ))}
      </div>

      {selectedActivity && (
        <div
          className="mt-4 rounded-lg bg-accent/8 px-4 py-3 text-sm text-accent-dark"
          role="status"
          aria-live="polite"
        >
          Aktivitas hari {selectedActivity.day}: <strong>{selectedActivity.value}%</strong>
        </div>
      )}
    </Card>
  );
}

export default ActivityChart;

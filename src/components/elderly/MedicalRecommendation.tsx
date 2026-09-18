import Badge from "../ui/Badge";
import Card from "../ui/Card";

interface Recommendation {
  title: string;
  description: string;
  priority: "Tinggi" | "Sedang" | "Rendah";
}

const recommendations: Recommendation[] = [
  {
    title: "Evaluasi Pola Aktivitas",
    description:
      "Terdapat perubahan aktivitas dari baseline normal. Disarankan melakukan pemeriksaan lanjutan untuk memastikan tidak ada gangguan kesehatan yang mendasari.",
    priority: "Sedang",
  },
  {
    title: "Pantau Kualitas Tidur",
    description:
      "Durasi tidur masih dalam rentang baik, namun tetap perlu dipantau secara berkala untuk mendeteksi perubahan pola sejak dini.",
    priority: "Rendah",
  },
];

const priorityVariant: Record<Recommendation["priority"], "danger" | "warning" | "success"> = {
  Tinggi: "danger",
  Sedang: "warning",
  Rendah: "success",
};

function MedicalRecommendation() {
  return (
    <Card className="mb-6 p-6" aria-label="Rekomendasi medis untuk lansia">
      <header className="mb-4">
        <h2 className="font-serif text-lg text-ink">Rekomendasi Medis</h2>

        <p className="mt-1 text-sm text-muted">
          Saran tindak lanjut berdasarkan hasil analisis kondisi lansia.
        </p>
      </header>

      <div className="divide-y divide-border">
        {recommendations.map((item) => (
          <div key={item.title} className="py-3.5 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-ink-soft">{item.title}</h3>

              <Badge variant={priorityVariant[item.priority]}>{item.priority}</Badge>
            </div>

            <p className="mt-1.5 text-sm text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default MedicalRecommendation;

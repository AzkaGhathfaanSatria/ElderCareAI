"use client";

import Footer from "../components/layout/Footer";
import TopNav from "../components/layout/TopNav";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";

const systemStatusRows: Array<{
  title: string;
  description: string;
  status: string;
  variant: "success" | "warning";
}> = [
  {
    title: "API Server",
    description: "Uptime 30 hari terakhir: 99.8%",
    status: "Normal",
    variant: "success",
  },
  {
    title: "Database",
    description: "Latensi rata-rata 42ms",
    status: "Normal",
    variant: "success",
  },
  {
    title: "Model Deteksi Anomali",
    description: "Terakhir dilatih ulang 12 hari lalu",
    status: "Normal",
    variant: "success",
  },
  {
    title: "Gateway Perangkat IoT",
    description: "13 perangkat tidak merespons",
    status: "Perlu Diperiksa",
    variant: "warning",
  },
];

const recentActivity = [
  {
    id: "act-1",
    text: "Akun baru terdaftar sebagai Keluarga/Caregiver",
    who: "Rina Amelia",
    when: "10 menit lalu",
  },
  {
    id: "act-2",
    text: "Perangkat wearable dipasangkan ke lansia",
    who: "WRB-014 → Budi Santoso",
    when: "1 jam lalu",
  },
  {
    id: "act-3",
    text: "Sensor pintu terputus dari sistem",
    who: "SNS-007",
    when: "3 jam lalu",
  },
  {
    id: "act-4",
    text: "Akun baru terdaftar sebagai Tenaga Medis",
    who: "dr. Amelia Putri",
    when: "1 hari lalu",
  },
];

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-paper">
      <TopNav />

      <main className="min-w-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <header className="mb-6">
            <h1 className="font-serif text-2xl text-ink sm:text-3xl">Dashboard Admin</h1>
            <p className="mt-2 text-sm leading-6 text-muted">
              Ringkasan jumlah pengguna, perangkat, dan status sistem secara umum.
            </p>
          </header>

          {/* Ringkasan angka */}
          <Card className="mb-6 grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
            <div className="p-5">
              <p className="text-sm text-muted">Total Pengguna</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-serif text-3xl text-ink">128</span>
              </div>
              <p className="mt-2 text-xs text-muted">96 Keluarga · 30 Tenaga Medis · 2 Admin</p>
            </div>

            <div className="p-5">
              <p className="text-sm text-muted">Lansia Terpantau</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-serif text-3xl text-ink">96</span>
              </div>
              <Badge variant="success" className="mt-3">
                Semua aktif
              </Badge>
            </div>

            <div className="p-5">
              <p className="text-sm text-muted">Perangkat Terhubung</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-serif text-3xl text-ink">183</span>
                <span className="text-xs text-muted">/ 196</span>
              </div>
              <Badge variant="warning" className="mt-3">
                13 terputus
              </Badge>
            </div>

            <div className="p-5">
              <p className="text-sm text-muted">Status Model AI</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-serif text-3xl text-ink">Aktif</span>
              </div>
              <Badge variant="success" className="mt-3">
                Akurasi 94%
              </Badge>
            </div>
          </Card>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {/* Status sistem */}
            <Card className="p-6">
              <header className="mb-4">
                <h2 className="font-serif text-lg text-ink">Status Sistem</h2>
                <p className="mt-1 text-sm text-muted">
                  Kondisi layanan inti yang menjalankan ElderCare AI.
                </p>
              </header>

              <div className="divide-y divide-border">
                {systemStatusRows.map((row) => (
                  <div
                    key={row.title}
                    className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink-soft">{row.title}</p>
                      <p className="mt-0.5 text-xs text-muted">{row.description}</p>
                    </div>
                    <Badge variant={row.variant}>{row.status}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Aktivitas terbaru */}
            <Card className="p-6">
              <header className="mb-4">
                <h2 className="font-serif text-lg text-ink">Aktivitas Terbaru</h2>
                <p className="mt-1 text-sm text-muted">
                  Perubahan terbaru pada akun dan perangkat di seluruh sistem.
                </p>
              </header>

              <ol className="divide-y divide-border">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="py-3.5 first:pt-0 last:pb-0">
                    <p className="text-sm text-ink-soft">{activity.text}</p>
                    <p className="mt-1 text-xs text-muted">
                      {activity.who} · {activity.when}
                    </p>
                  </li>
                ))}
              </ol>
            </Card>
          </section>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default AdminDashboard;

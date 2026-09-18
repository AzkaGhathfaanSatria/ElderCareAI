"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import TopNav from "../components/layout/TopNav";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

interface ToggleRowProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleRow({ title, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-ink-soft">{title}</h3>
        <p className="mt-1 text-xs text-muted">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-accent" : "bg-ink/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function Settings() {
  const router = useRouter();

  const [emailAlert, setEmailAlert] = useState(true);
  const [pushAlert, setPushAlert] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);

  const [highAlertOnly, setHighAlertOnly] = useState(false);
  const [soundAlert, setSoundAlert] = useState(true);

  const [language, setLanguage] = useState("id");
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handleSave = () => {
    // TODO: sambungkan ke endpoint simpan preferensi setelah backend tersedia.
    setSavedMessage("Preferensi disimpan (mode tampilan, belum tersambung ke server).");
  };

  return (
    <div className="min-h-screen bg-paper">
      <TopNav />

      <main className="min-w-0">
        <header className="flex min-h-16 items-center justify-between gap-4 border-b border-border bg-surface px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm text-muted">Akun Saya</p>
            <h1 className="mt-0.5 font-serif text-lg text-ink">Pengaturan</h1>
          </div>

          <Button variant="secondary" size="sm" onClick={() => router.back()}>
            ← Kembali
          </Button>
        </header>

        <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
          {savedMessage && (
            <div
              role="status"
              aria-live="polite"
              className="mb-6 rounded-xl border border-safe/25 bg-safe/8 px-4 py-3 text-sm text-safe"
            >
              {savedMessage}
            </div>
          )}

          {/* Preferensi Notifikasi */}
          <Card className="mb-6 p-6">
            <header className="mb-2">
              <h2 className="font-serif text-lg text-ink">Preferensi Notifikasi</h2>
              <p className="mt-1 text-sm text-muted">
                Atur cara kamu ingin diberi tahu tentang kondisi lansia yang dipantau.
              </p>
            </header>

            <div className="divide-y divide-border">
              <ToggleRow
                title="Notifikasi Email"
                description="Kirim ringkasan dan peringatan penting melalui email."
                checked={emailAlert}
                onChange={setEmailAlert}
              />

              <ToggleRow
                title="Notifikasi Push"
                description="Tampilkan notifikasi langsung di aplikasi/browser."
                checked={pushAlert}
                onChange={setPushAlert}
              />

              <ToggleRow
                title="Ringkasan Mingguan"
                description="Terima laporan ringkasan aktivitas dan kesehatan setiap minggu."
                checked={weeklySummary}
                onChange={setWeeklySummary}
              />
            </div>
          </Card>

          {/* Preferensi Peringatan */}
          <Card className="mb-6 p-6">
            <header className="mb-2">
              <h2 className="font-serif text-lg text-ink">Preferensi Peringatan</h2>
              <p className="mt-1 text-sm text-muted">
                Sesuaikan sensitivitas dan cara peringatan anomali ditampilkan.
              </p>
            </header>

            <div className="divide-y divide-border">
              <ToggleRow
                title="Hanya Peringatan Tingkat Tinggi"
                description="Sembunyikan notifikasi dengan tingkat risiko Rendah dan Sedang."
                checked={highAlertOnly}
                onChange={setHighAlertOnly}
              />

              <ToggleRow
                title="Suara Peringatan"
                description="Mainkan suara saat ada peringatan baru masuk."
                checked={soundAlert}
                onChange={setSoundAlert}
              />
            </div>
          </Card>

          {/* Preferensi Umum */}
          <Card className="mb-6 p-6">
            <header className="mb-4">
              <h2 className="font-serif text-lg text-ink">Umum</h2>
              <p className="mt-1 text-sm text-muted">Pengaturan tampilan dan bahasa aplikasi.</p>
            </header>

            <div>
              <label
                htmlFor="language"
                className="mb-2 block text-sm font-semibold text-ink-soft"
              >
                Bahasa
              </label>
              <select
                id="language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8 sm:w-64"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
          </Card>

          <Button variant="accent" size="md" onClick={handleSave}>
            Simpan Preferensi
          </Button>
        </div>
      </main>
    </div>
  );
}

export default Settings;

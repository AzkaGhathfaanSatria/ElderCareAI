"use client";

import { useState } from "react";

import AccountPageShell from "../components/layout/AccountPageShell";
import Card from "../components/ui/Card";
import { SelectField } from "../components/ui/SelectField";
import Button from "../components/ui/Button";

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
    <AccountPageShell title="Pengaturan" message={savedMessage}>
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

        <SelectField
          id="language"
          label="Bahasa"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          wrapperClassName="sm:w-64"
        >
          <option value="id">Bahasa Indonesia</option>
          <option value="en">English</option>
        </SelectField>
      </Card>

      <Button variant="accent" size="md" onClick={handleSave}>
        Simpan Preferensi
      </Button>
    </AccountPageShell>
  );
}

export default Settings;

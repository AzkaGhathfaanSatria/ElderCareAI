"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useState } from "react";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useElderlyMutation } from "../hooks/useElderlyMutation";
import {
  type ElderlyRegistrationInput,
  ElderlyRegistrationSchema,
} from "../schemas/elderlyRegistrationSchema";

function ElderlyRegistration() {
  const router = useRouter();

  const elderlyMutation = useElderlyMutation();

  const [form, setForm] = useState<ElderlyRegistrationInput>({
    name: "",
    birthDate: "",
    address: "",
    healthNotes: "",
    wearableType: "",
    wearableId: "",
    sensorType: "",
    sensorLocation: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isLoading = elderlyMutation.isPending;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const result = ElderlyRegistrationSchema.safeParse(form);

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Data registrasi lansia tidak valid.");

      return;
    }

    try {
      await elderlyMutation.mutateAsync(result.data);

      setSuccess("Data lansia berhasil didaftarkan. Mengarahkan ke halaman data lansia...");

      window.setTimeout(() => {
        router.push("/elderly");
      }, 1200);
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Gagal menyimpan data lansia. Silakan coba lagi.",
      );
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Decorative Background */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-cyan-100/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => router.push("/elderly")}
            aria-label="Kembali ke data lansia"
          >
            ← Kembali
          </Button>

          <div className="mt-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
                E
              </span>

              <span className="text-sm font-semibold text-blue-600">ElderCare AI</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              Tambah Data Lansia
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Lengkapi informasi lansia serta perangkat wearable dan sensor IoT yang akan digunakan
              untuk pemantauan.
            </p>
          </div>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Error */}
          {error && (
            <div
              className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              role="alert"
              aria-live="polite"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold"
                aria-hidden="true"
              >
                !
              </span>

              <p>{error}</p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div
              className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600"
              role="status"
              aria-live="polite"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold"
                aria-hidden="true"
              >
                ✓
              </span>

              <p>{success}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* ========================= */}
            {/* DATA LANSIA */}
            {/* ========================= */}
            <Card className="overflow-hidden">
              <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                    01
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-800">Data Lansia</h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Informasi dasar lansia yang akan dipantau.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                {/* Nama */}
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                    Nama Lengkap
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap lansia"
                    autoComplete="name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Tanggal lahir */}
                <div>
                  <label
                    htmlFor="birthDate"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Tanggal Lahir
                  </label>

                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={form.birthDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Alamat */}
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Alamat
                  </label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Masukkan alamat lansia"
                    autoComplete="street-address"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Catatan kesehatan */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="healthNotes"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Catatan Kesehatan
                  </label>

                  <textarea
                    id="healthNotes"
                    name="healthNotes"
                    value={form.healthNotes}
                    onChange={handleChange}
                    placeholder="Masukkan riwayat atau catatan kesehatan yang perlu diperhatikan"
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>
            </Card>

            {/* ========================= */}
            {/* WEARABLE */}
            {/* ========================= */}
            <Card className="overflow-hidden">
              <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 font-bold text-cyan-600">
                    02
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-800">Perangkat Wearable</h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Hubungkan perangkat wearable untuk memantau data fisiologis.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                {/* Tipe wearable */}
                <div>
                  <label
                    htmlFor="wearableType"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Tipe Wearable
                  </label>

                  <select
                    id="wearableType"
                    name="wearableType"
                    value={form.wearableType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="">Pilih tipe perangkat</option>

                    <option value="smartwatch">Smartwatch</option>

                    <option value="fitness_band">Fitness Band</option>

                    <option value="health_tracker">Health Tracker</option>
                  </select>
                </div>

                {/* ID wearable */}
                <div>
                  <label
                    htmlFor="wearableId"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    ID Perangkat
                  </label>

                  <input
                    id="wearableId"
                    name="wearableId"
                    type="text"
                    value={form.wearableId}
                    onChange={handleChange}
                    placeholder="Contoh: WRB-001"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>
            </Card>

            {/* ========================= */}
            {/* SENSOR IOT */}
            {/* ========================= */}
            <Card className="overflow-hidden">
              <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-600">
                    03
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-800">Sensor IoT Rumah</h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Tambahkan sensor untuk memantau aktivitas lansia di lingkungan rumah.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                {/* Tipe sensor */}
                <div>
                  <label
                    htmlFor="sensorType"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Tipe Sensor
                  </label>

                  <select
                    id="sensorType"
                    name="sensorType"
                    value={form.sensorType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="">Pilih tipe sensor</option>

                    <option value="gerak">Sensor Gerak</option>

                    <option value="pintu">Sensor Pintu</option>
                  </select>
                </div>

                {/* Lokasi sensor */}
                <div>
                  <label
                    htmlFor="sensorLocation"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Lokasi Pemasangan
                  </label>

                  <input
                    id="sensorLocation"
                    name="sensorLocation"
                    type="text"
                    value={form.sensorLocation}
                    onChange={handleChange}
                    placeholder="Contoh: Kamar tidur"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>
            </Card>

            {/* ========================= */}
            {/* ACTION */}
            {/* ========================= */}
            <Card className="p-5 sm:p-6">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isLoading}
                  onClick={() => router.push("/elderly")}
                >
                  Batal
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="min-w-40 !rounded-xl"
                >
                  {isLoading ? "Menyimpan..." : "Simpan Data Lansia"}
                </Button>
              </div>
            </Card>
          </div>
        </form>

        <footer className="mt-6 text-center">
          <p className="text-xs text-slate-400">ElderCare AI — Smart Elderly Monitoring System</p>
        </footer>
      </div>
    </main>
  );
}

export default ElderlyRegistration;

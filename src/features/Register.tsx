"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useState } from "react";

import Button from "../components/ui/Button";
import { type RegisterInput, RegisterSchema } from "../schemas/registerSchema";

function Register() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "keluarga",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleRoleChange = (role: RegisterInput["role"]) => {
    setForm((current) => ({
      ...current,
      role,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const result = RegisterSchema.safeParse(form);

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Data registrasi tidak valid.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 1000);
      });

      setSuccess("Registrasi berhasil. Mengarahkan ke halaman login...");

      window.setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch {
      setError("Registrasi gagal. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
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

      <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
          {/* Branding Section */}
          <section className="relative hidden overflow-hidden bg-blue-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-[40px] border-white/10"
              aria-hidden="true"
            />

            <div
              className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full border-[50px] border-white/10"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-blue-600 shadow-sm">
                  E
                </div>

                <span className="text-lg font-bold tracking-tight">ElderCare AI</span>
              </div>

              <p className="mb-3 text-sm font-medium text-blue-100">
                Bergabung dengan ElderCare AI
              </p>

              <h1 className="max-w-md text-3xl font-bold leading-tight">
                Mulai pantau kesehatan lansia dengan lebih mudah.
              </h1>

              <p className="mt-5 max-w-md text-sm leading-6 text-blue-100">
                Buat akun untuk mengakses sistem pemantauan lansia, memahami perubahan aktivitas,
                dan mendapatkan peringatan dini.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="relative mt-10 space-y-3">
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg">
                  +
                </div>

                <div>
                  <p className="text-sm font-semibold">Satu akun untuk monitoring</p>

                  <p className="mt-1 text-xs text-blue-100">
                    Akses informasi lansia dari satu tempat.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg">
                  ◉
                </div>

                <div>
                  <p className="text-sm font-semibold">Monitoring terintegrasi</p>

                  <p className="mt-1 text-xs text-blue-100">
                    Data wearable dan sensor IoT dapat dipantau bersama.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg">
                  ♥
                </div>

                <div>
                  <p className="text-sm font-semibold">Mendukung perawatan lansia</p>

                  <p className="mt-1 text-xs text-blue-100">
                    Membantu keluarga dan tenaga medis mengambil tindakan lebih cepat.
                  </p>
                </div>
              </div>
            </div>

            <p className="relative mt-10 text-xs text-blue-200">ElderCare AI © 2026</p>
          </section>

          {/* Register Section */}
          <section className="flex items-center p-6 sm:p-10" aria-labelledby="register-title">
            <div className="w-full">
              {/* Mobile Logo */}
              <div className="mb-7 lg:hidden">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
                    E
                  </div>

                  <div>
                    <p className="font-bold text-slate-800">ElderCare AI</p>

                    <p className="text-xs text-slate-400">Smart Elderly Monitoring System</p>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <header className="mb-7">
                <p className="mb-2 text-sm font-medium text-blue-600">Buat akun baru</p>

                <h2 id="register-title" className="text-2xl font-bold text-slate-800 sm:text-3xl">
                  Daftarkan akun Anda
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Lengkapi informasi berikut untuk mulai menggunakan ElderCare AI.
                </p>
              </header>

              {/* Error */}
              {error && (
                <div
                  className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
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
                  className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600"
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

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                    Nama Lengkap
                  </label>

                  <div className="relative">
                    <span
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    >
                      ●
                    </span>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      autoComplete="name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <span
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    >
                      @
                    </span>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="contoh@email.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <span
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    >
                      •
                    </span>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Minimal 6 karakter"
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Konfirmasi Password
                  </label>

                  <div className="relative">
                    <span
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    >
                      •
                    </span>

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Masukkan ulang password"
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* Role */}
                <fieldset>
                  <legend className="mb-2 block text-sm font-semibold text-slate-700">
                    Pilih Role
                  </legend>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* Family / Caregiver */}
                    <button
                      type="button"
                      onClick={() => handleRoleChange("keluarga")}
                      aria-pressed={form.role === "keluarga"}
                      className={`rounded-xl border p-4 text-left transition ${
                        form.role === "keluarga"
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                          : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${
                            form.role === "keluarga"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          K
                        </div>

                        {form.role === "keluarga" && (
                          <span className="text-sm font-bold text-blue-600">✓</span>
                        )}
                      </div>

                      <p className="text-sm font-semibold text-slate-700">Keluarga/Caregiver</p>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Memantau dan mengelola data lansia.
                      </p>
                    </button>

                    {/* Medical Staff */}
                    <button
                      type="button"
                      onClick={() => handleRoleChange("tenaga_medis")}
                      aria-pressed={form.role === "tenaga_medis"}
                      className={`rounded-xl border p-4 text-left transition ${
                        form.role === "tenaga_medis"
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                          : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${
                            form.role === "tenaga_medis"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          M
                        </div>

                        {form.role === "tenaga_medis" && (
                          <span className="text-sm font-bold text-blue-600">✓</span>
                        )}
                      </div>

                      <p className="text-sm font-semibold text-slate-700">Tenaga Medis</p>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Memantau kondisi dan peringatan lansia.
                      </p>
                    </button>
                  </div>
                </fieldset>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full !rounded-xl !py-3.5"
                  disabled={isLoading}
                >
                  {isLoading ? "Mendaftarkan..." : "Buat Akun"}
                </Button>
              </form>

              {/* Login */}
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500">
                  Sudah memiliki akun?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Masuk sekarang
                  </button>
                </p>
              </div>

              {/* Footer */}
              <p className="mt-7 text-center text-xs text-slate-400">
                Sistem Pemantauan Kesehatan Lansia
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Register;

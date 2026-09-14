"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";

import { LoginSchema, type LoginInput } from "../schemas/authSchema";

type LoginFormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formState, setFormState] = useState<LoginFormState>({
    status: "idle",
  });

  const loading = formState.status === "submitting";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormState({ status: "idle" });

    const formData: LoginInput = {
      email,
      password,
    };

    const validation = LoginSchema.safeParse(formData);

    if (!validation.success) {
      const firstError =
        validation.error.issues[0]?.message ??
        "Data login tidak valid.";

      setFormState({
        status: "error",
        message: firstError,
      });

      return;
    }

    setFormState({ status: "submitting" });

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 1000);
      });

      if (
        validation.data.email === "admin@eldercare.ai" &&
        validation.data.password === "123456"
      ) {
        // Membuat cookie sebagai tanda bahwa pengguna sudah login.
        // Cookie ini akan dibaca oleh middleware.ts.
        document.cookie =
          "eldercare_token=logged_in; path=/; max-age=86400";

        setFormState({ status: "success" });

        router.push("/dashboard");

        return;
      }

      setFormState({
        status: "error",
        message: "Email atau password salah.",
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat proses login.";

      setFormState({
        status: "error",
        message,
      });
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
            {/* Decorative circles */}
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

                <span className="text-lg font-bold tracking-tight">
                  ElderCare AI
                </span>
              </div>

              <p className="mb-3 text-sm font-medium text-blue-100">
                Smart Elderly Monitoring System
              </p>

              <h2 className="max-w-md text-3xl font-bold leading-tight">
                Pemantauan lansia yang lebih tenang, aman, dan terarah.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-blue-100">
                Pantau aktivitas, kondisi kesehatan, dan perubahan perilaku
                lansia melalui satu sistem monitoring yang terintegrasi.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="relative mt-10 space-y-3">
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg">
                  ♥
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Monitoring kesehatan
                  </p>

                  <p className="mt-1 text-xs text-blue-100">
                    Pantau detak jantung, aktivitas, dan pola tidur.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg">
                  ◉
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Deteksi perubahan perilaku
                  </p>

                  <p className="mt-1 text-xs text-blue-100">
                    Identifikasi aktivitas yang berbeda dari pola normal.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg">
                  !
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Peringatan dini
                  </p>

                  <p className="mt-1 text-xs text-blue-100">
                    Membantu keluarga dan tenaga medis merespons lebih cepat.
                  </p>
                </div>
              </div>
            </div>

            <p className="relative mt-10 text-xs text-blue-200">
              ElderCare AI © 2026
            </p>
          </section>

          {/* Login Section */}
          <section
            className="flex items-center p-6 sm:p-10"
            aria-labelledby="login-title"
          >
            <div className="w-full">
              {/* Mobile Logo */}
              <div className="mb-8 lg:hidden">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
                    E
                  </div>

                  <div>
                    <h1 className="font-bold text-slate-800">
                      ElderCare AI
                    </h1>

                    <p className="text-xs text-slate-400">
                      Smart Elderly Monitoring System
                    </p>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <header className="mb-8">
                <p className="mb-2 text-sm font-medium text-blue-600">
                  Selamat datang kembali
                </p>

                <h1
                  id="login-title"
                  className="text-2xl font-bold text-slate-800 sm:text-3xl"
                >
                  Masuk ke akun Anda
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Masuk untuk melanjutkan pemantauan kesehatan lansia.
                </p>
              </header>

              {/* Login Form */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Error */}
                {formState.status === "error" && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold"
                      aria-hidden="true"
                    >
                      !
                    </span>

                    <p>{formState.message}</p>
                  </div>
                )}

                {/* Email */}
                <div className="mb-5">
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
                      value={email}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setEmail(event.target.value)
                      }
                      placeholder="Masukkan email"
                      autoComplete="email"
                      aria-label="Email pengguna"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-6">
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
                      value={password}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Masukkan password"
                      autoComplete="current-password"
                      aria-label="Password pengguna"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Masuk ke sistem ElderCare AI"
                  className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-sm"
                >
                  {loading ? "Memproses..." : "Masuk"}
                </button>
              </form>

              {/* Register */}
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500">
                  Belum memiliki akun?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/register")}
                    className="font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Daftar sekarang
                  </button>
                </p>
              </div>

              {/* Demo Account */}
              <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold text-slate-600">
                  Akun demo
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  admin@eldercare.ai · 123456
                </p>
              </div>

              {/* Footer */}
              <p className="mt-8 text-center text-xs text-slate-400">
                Sistem Pemantauan Kesehatan Lansia
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
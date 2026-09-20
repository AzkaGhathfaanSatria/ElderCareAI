"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { type LoginInput, LoginSchema } from "../schemas/authSchema";
import type { PublicUser } from "../types/auth";
import TextField from "../components/ui/TextField";
import { extractErrorMessage } from "../lib/apiError";

type LoginFormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

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
      const firstError = validation.error.issues[0]?.message ?? "Data login tidak valid.";

      setFormState({
        status: "error",
        message: firstError,
      });

      return;
    }

    setFormState({ status: "submitting" });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message = extractErrorMessage(data, "Email atau password salah.");

        setFormState({ status: "error", message });
        return;
      }

      setFormState({ status: "success" });

      // Langsung isi cache sesi dengan data yang baru login, jangan nunggu
      // refetch otomatis — supaya navbar nggak sempat kelihatan "nyangkut"
      // nampilin identitas/role user sebelumnya (misal abis logout dari
      // akun Keluarga terus login sebagai Admin).
      const user = data as PublicUser;
      queryClient.setQueryData(["session"], user);

      router.push(user.role === "admin" ? "/admin" : "/dashboard");
    } catch {
      setFormState({
        status: "error",
        message: "Tidak dapat terhubung ke server. Coba lagi.",
      });
    }
  };

  return (
    <main className="relative min-h-screen bg-paper">
      {/* Aksen dekoratif — garis titik-titik ala catatan tangan, bukan blob gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[repeating-linear-gradient(90deg,var(--color-accent)_0,var(--color-accent)_10px,transparent_10px,transparent_20px)] opacity-60"
        aria-hidden="true"
      />

      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink font-serif text-lg text-paper">
            E
          </div>
          <div>
            <p className="font-serif text-lg leading-none text-ink">ElderCare AI</p>
            <p className="mt-1 text-xs tracking-wide text-muted">
              Sistem Pemantauan Kesehatan Lansia
            </p>
          </div>
        </div>

        {/* Heading */}
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium text-accent-dark">Selamat datang kembali</p>
          <h1 className="font-serif text-3xl leading-tight text-ink">
            Yang kamu sayangi,
            <br />
            tetap terpantau.
          </h1>
        </header>

        <div className="rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card-lg)]">
          <form onSubmit={handleSubmit} noValidate>
            {formState.status === "error" && (
              <div
                role="alert"
                aria-live="polite"
                className="mb-5 flex items-start gap-3 rounded-xl border border-danger/25 bg-danger/6 px-4 py-3 text-sm text-danger"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-danger/15 text-xs font-bold"
                  aria-hidden="true"
                >
                  !
                </span>
                <p>{formState.message}</p>
              </div>
            )}

            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nama@keluarga.id"
              autoComplete="email"
              aria-label="Email pengguna"
              wrapperClassName="mb-5"
            />

            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Masukkan password"
              autoComplete="current-password"
              aria-label="Password pengguna"
              wrapperClassName="mb-6"
            />

            <button
              type="submit"
              disabled={loading}
              aria-label="Masuk ke sistem ElderCare AI"
              className="w-full rounded-full bg-accent px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted">
              Belum memiliki akun?{" "}
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 transition hover:text-accent-dark"
              >
                Daftar sekarang
              </button>
            </p>
          </div>

          <div className="mt-7 space-y-2 rounded-xl border border-dashed border-border bg-paper px-4 py-3">
            <div className="flex items-start gap-3">
              <span className="text-base" aria-hidden="true">
                🔑
              </span>
              <div>
                <p className="text-xs font-semibold text-ink-soft">Akun demo Keluarga</p>
                <p className="mt-0.5 text-xs text-muted">dian@eldercare.ai · keluarga123</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-base" aria-hidden="true">
                🩺
              </span>
              <div>
                <p className="text-xs font-semibold text-ink-soft">Akun demo Tenaga Medis</p>
                <p className="mt-0.5 text-xs text-muted">amelia@eldercare.ai · medis123</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-base" aria-hidden="true">
                🛡️
              </span>
              <div>
                <p className="text-xs font-semibold text-ink-soft">Akun demo Admin</p>
                <p className="mt-0.5 text-xs text-muted">admin@eldercare.ai · admin123</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          ElderCare AI © 2026 · Dibangun untuk keluarga yang peduli
        </p>
      </div>
    </main>
  );
}

export default LoginPage;

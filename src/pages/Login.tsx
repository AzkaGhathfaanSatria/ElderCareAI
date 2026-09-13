import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";

import { LoginSchema, type LoginInput } from "../schemas/authSchema";

type LoginFormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

function Login() {
  const navigate = useNavigate();

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
        setFormState({ status: "success" });
        navigate("/dashboard");
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
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
        aria-labelledby="login-title"
      >
        {/* Logo & Title */}
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
            E
          </div>

          <h1
            id="login-title"
            className="text-3xl font-bold text-slate-800"
          >
            ElderCare AI
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Smart Elderly Monitoring System
          </p>
        </header>

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Error */}
          {formState.status === "error" && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {formState.message}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

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
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

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
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            aria-label="Masuk ke sistem ElderCare AI"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        {/* Footer */}
        <footer className="mt-6 text-center">
          <p className="text-xs text-slate-400">
            Sistem Pemantauan Kesehatan Lansia
          </p>
        </footer>
      </section>
    </main>
  );
}

export default Login;
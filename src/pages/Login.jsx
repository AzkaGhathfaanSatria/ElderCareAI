import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (
        email === "admin@eldercare.ai" &&
        password === "123456"
      ) {
        navigate("/dashboard");
      } else {
        setError("Email atau password salah.");
        setLoading(false);
      }
    }, 1000);
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
          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
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
              onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
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
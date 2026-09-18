"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TopNav from "../components/layout/TopNav";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useSession } from "../hooks/useSession";

const roleLabel = {
  keluarga: "Keluarga/Caregiver",
  tenaga_medis: "Tenaga Medis",
  admin: "Administrator Sistem",
} as const;

function getInitials(name: string) {
  return name
    .replace(/^(dr\.|Ns\.)\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

function Profile() {
  const router = useRouter();
  const sessionQuery = useSession();
  const user = sessionQuery.data;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSaveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: sambungkan ke endpoint update profil setelah backend tersedia.
    setSavedMessage("Perubahan profil disimpan (mode tampilan, belum tersambung ke server).");
  };

  const handleChangePassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setSavedMessage("Konfirmasi password baru tidak sama.");
      return;
    }

    // TODO: sambungkan ke endpoint ganti password setelah backend tersedia.
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSavedMessage("Password berhasil diperbarui (mode tampilan, belum tersambung ke server).");
  };

  return (
    <div className="min-h-screen bg-paper">
      <TopNav />

      <main className="min-w-0">
        <header className="flex min-h-16 items-center justify-between gap-4 border-b border-border bg-surface px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm text-muted">Akun Saya</p>
            <h1 className="mt-0.5 font-serif text-lg text-ink">Profil</h1>
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

          {/* Kartu identitas */}
          <Card className="mb-6 flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xl font-bold text-accent-dark"
              aria-hidden="true"
            >
              {user ? getInitials(user.name) : "…"}
            </div>

            <div className="min-w-0">
              <h2 className="font-serif text-lg text-ink">{user?.name ?? "Memuat..."}</h2>
              <p className="mt-0.5 text-sm text-muted">{user?.email}</p>

              {user && (
                <Badge variant="info" className="mt-2">
                  {roleLabel[user.role]}
                </Badge>
              )}
            </div>
          </Card>

          {/* Form informasi akun */}
          <Card className="mb-6 p-6">
            <header className="mb-5">
              <h2 className="font-serif text-lg text-ink">Informasi Akun</h2>
              <p className="mt-1 text-sm text-muted">
                Perbarui nama dan email yang terhubung dengan akunmu.
              </p>
            </header>

            <form onSubmit={handleSaveProfile} noValidate>
              <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink-soft">
                  Nama Lengkap
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                  className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition placeholder:text-muted/70 hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink-soft">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition placeholder:text-muted/70 hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8"
                />
              </div>

              <Button type="submit" variant="accent" size="md">
                Simpan Perubahan
              </Button>
            </form>
          </Card>

          {/* Form ganti password */}
          <Card className="p-6">
            <header className="mb-5">
              <h2 className="font-serif text-lg text-ink">Ubah Password</h2>
              <p className="mt-1 text-sm text-muted">
                Gunakan password baru yang kuat dan tidak dipakai di tempat lain.
              </p>
            </header>

            <form onSubmit={handleChangePassword} noValidate>
              <div className="mb-4">
                <label
                  htmlFor="currentPassword"
                  className="mb-2 block text-sm font-semibold text-ink-soft"
                >
                  Password Saat Ini
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setCurrentPassword(event.target.value)
                  }
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition placeholder:text-muted/70 hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8"
                />
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-semibold text-ink-soft"
                  >
                    Password Baru
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setNewPassword(event.target.value)
                    }
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition placeholder:text-muted/70 hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-ink-soft"
                  >
                    Konfirmasi Password Baru
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setConfirmPassword(event.target.value)
                    }
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition placeholder:text-muted/70 hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="md">
                Perbarui Password
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Profile;

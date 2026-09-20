"use client";

import { type FormEvent, useEffect, useState } from "react";

import AccountPageShell from "../components/layout/AccountPageShell";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import TextField from "../components/ui/TextField";
import { useSession } from "../hooks/useSession";
import { getInitials } from "../lib/initials";
import { roleLabel } from "../lib/userDisplay";

function Profile() {
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
    <AccountPageShell title="Profil" message={savedMessage}>
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

        <form onSubmit={handleSaveProfile} noValidate className="space-y-4">
          <TextField
            id="name"
            name="name"
            label="Nama Lengkap"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

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

        <form onSubmit={handleChangePassword} noValidate className="space-y-4">
          <TextField
            id="currentPassword"
            name="currentPassword"
            label="Password Saat Ini"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            autoComplete="current-password"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              id="newPassword"
              name="newPassword"
              label="Password Baru"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              autoComplete="new-password"
            />

            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Konfirmasi Password Baru"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
            />
          </div>

          <Button type="submit" variant="primary" size="md">
            Perbarui Password
          </Button>
        </form>
      </Card>
    </AccountPageShell>
  );
}

export default Profile;

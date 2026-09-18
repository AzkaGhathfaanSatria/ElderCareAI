"use client";

import { type ChangeEvent, type FormEvent, useMemo, useState } from "react";

import TopNav from "../components/layout/TopNav";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Select from "../components/ui/Select";
import { RegisterSchema } from "../schemas/registerSchema";

type ManagedRole = "keluarga" | "tenaga_medis" | "admin";
type RoleFilter = "Semua" | "Keluarga" | "Tenaga Medis" | "Admin";

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: ManagedRole;
  status: "Aktif" | "Nonaktif";
}

const roleDisplay: Record<ManagedRole, string> = {
  keluarga: "Keluarga/Caregiver",
  tenaga_medis: "Tenaga Medis",
  admin: "Admin",
};

const initialUsers: ManagedUser[] = [
  { id: "u1", name: "Dian Kusuma", email: "dian@eldercare.ai", role: "keluarga", status: "Aktif" },
  {
    id: "u2",
    name: "dr. Amelia Putri",
    email: "amelia@eldercare.ai",
    role: "tenaga_medis",
    status: "Aktif",
  },
  {
    id: "u3",
    name: "Bagas Prasetyo",
    email: "admin@eldercare.ai",
    role: "admin",
    status: "Aktif",
  },
  {
    id: "u4",
    name: "Ns. Farhan Ramadhan",
    email: "farhan.ramadhan@homecare.id",
    role: "tenaga_medis",
    status: "Aktif",
  },
  {
    id: "u5",
    name: "Siti Rahma",
    email: "siti.rahma@gmail.com",
    role: "keluarga",
    status: "Nonaktif",
  },
];

const emptyForm = { name: "", email: "", role: "keluarga" as ManagedRole };

function UserManagement() {
  const [users, setUsers] = useState<ManagedUser[]>(initialUsers);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("Semua");
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole =
        roleFilter === "Semua" ||
        (roleFilter === "Keluarga" && user.role === "keluarga") ||
        (roleFilter === "Tenaga Medis" && user.role === "tenaga_medis") ||
        (roleFilter === "Admin" && user.role === "admin");

      const matchesSearch =
        search.trim().length === 0 ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      return matchesRole && matchesSearch;
    });
  }, [users, roleFilter, search]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // Reuse skema registrasi (tanpa password) sekadar buat validasi nama & email.
    const result = RegisterSchema.pick({ name: true, email: true }).safeParse({
      name: form.name,
      email: form.email,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Data tidak valid.");
      return;
    }

    const newUser: ManagedUser = {
      id: `u-${Date.now()}`,
      name: form.name,
      email: form.email,
      role: form.role,
      status: "Aktif",
    };

    setUsers((current) => [newUser, ...current]);
    setForm(emptyForm);
    setIsFormOpen(false);
  };

  const toggleStatus = (id: string) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id ? { ...user, status: user.status === "Aktif" ? "Nonaktif" : "Aktif" } : user,
      ),
    );
  };

  const removeUser = (id: string) => {
    setUsers((current) => current.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-paper">
      <TopNav />

      <main className="min-w-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-serif text-2xl text-ink sm:text-3xl">Manajemen Pengguna</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                Kelola akun Keluarga/Caregiver, Tenaga Medis, dan Admin pada sistem.
              </p>
            </div>

            <Button
              variant="accent"
              size="sm"
              onClick={() => {
                setError("");
                setIsFormOpen((open) => !open);
              }}
            >
              {isFormOpen ? "Batal" : "+ Tambah Pengguna"}
            </Button>
          </header>

          {isFormOpen && (
            <Card className="mb-6 p-5 sm:p-6">
              <h2 className="mb-4 font-serif text-base text-ink">Tambah Pengguna Baru</h2>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {error && (
                  <div
                    className="flex items-start gap-3 rounded-lg border border-danger/25 bg-danger/6 px-4 py-3 text-sm text-danger"
                    role="alert"
                  >
                    <span aria-hidden="true">!</span>
                    <p>{error}</p>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-ink-soft"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Nama pengguna"
                      className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition placeholder:text-muted/70 hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-ink-soft"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="contoh@email.com"
                      className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition placeholder:text-muted/70 hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8"
                    />
                  </div>
                </div>

                <div className="max-w-xs">
                  <p className="mb-2 text-sm font-semibold text-ink-soft">Role</p>
                  <div className="flex gap-1.5 rounded-lg bg-paper p-1">
                    {(["keluarga", "tenaga_medis", "admin"] as ManagedRole[]).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setForm((current) => ({ ...current, role }))}
                        className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition ${
                          form.role === role
                            ? "bg-surface text-ink shadow-[var(--shadow-card)]"
                            : "text-muted hover:text-ink-soft"
                        }`}
                      >
                        {roleDisplay[role]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" variant="accent" size="sm">
                    Simpan Pengguna
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <Card className="p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama atau email..."
                className="w-full max-w-xs rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink-soft outline-none transition placeholder:text-muted/70 hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8"
              />

              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
                options={["Semua", "Keluarga", "Tenaga Medis", "Admin"] as const}
                label="Role"
              />
            </div>

            {filteredUsers.length > 0 ? (
              <ol className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <li
                    key={user.id}
                    className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 font-serif text-sm text-accent-dark"
                        aria-hidden="true"
                      >
                        {user.name
                          .replace(/^(dr\.|Ns\.)\s*/i, "")
                          .split(" ")
                          .slice(0, 2)
                          .map((part) => part.charAt(0))
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-ink-soft">{user.name}</p>
                        <p className="mt-0.5 text-xs text-muted">
                          {roleDisplay[user.role]} · {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:shrink-0">
                      <Badge variant={user.status === "Aktif" ? "success" : "neutral"}>
                        {user.status}
                      </Badge>

                      <Button variant="secondary" size="sm" onClick={() => toggleStatus(user.id)}>
                        {user.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => removeUser(user.id)}
                        className="!text-danger"
                      >
                        Hapus
                      </Button>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="py-6 text-center">
                <p className="text-sm font-medium text-ink-soft">Tidak ada pengguna ditemukan.</p>
              </div>
            )}
          </Card>
        </div>

        <footer className="border-t border-border bg-surface px-4 py-5 text-center sm:px-6 lg:px-8">
          <p className="text-xs text-muted">ElderCare AI — Smart Elderly Monitoring System</p>
        </footer>
      </main>
    </div>
  );
}

export default UserManagement;

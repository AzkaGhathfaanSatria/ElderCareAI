"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useState } from "react";

import Footer from "../components/layout/Footer";
import ManagementHeader from "../components/layout/ManagementHeader";
import TopNav from "../components/layout/TopNav";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import EmptyStateMessage from "../components/ui/EmptyStateMessage";
import TextField from "../components/ui/TextField";
import { useElderCareQuery } from "../hooks/useElderCareQuery";
import { useSession } from "../hooks/useSession";
import { getInitials } from "../lib/initials";
import { type AccessGrantInput, AccessGrantSchema } from "../schemas/accessGrantSchema";

interface AccessGrant extends AccessGrantInput {
  id: string;
  grantedAt: string;
  status: "Aktif" | "Dicabut";
}

const initialGrants: AccessGrant[] = [
  {
    id: "grant-1",
    name: "dr. Amelia Putri",
    email: "amelia.putri@klinikwarasehat.id",
    specialization: "Dokter Umum",
    grantedAt: "12 Agu 2026",
    status: "Aktif",
  },
  {
    id: "grant-2",
    name: "Ns. Farhan Ramadhan",
    email: "farhan.ramadhan@homecare.id",
    specialization: "Perawat Home Care",
    grantedAt: "3 Sep 2026",
    status: "Aktif",
  },
];

const emptyForm: AccessGrantInput = { name: "", email: "", specialization: "" };

function AccessManagement() {
  const router = useRouter();

  const sessionQuery = useSession();

  const monitoringQuery = useElderCareQuery();

  const [grants, setGrants] = useState<AccessGrant[]>(initialGrants);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState<AccessGrantInput>(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const elderlyName = monitoringQuery.data?.elderly.name ?? "lansia yang kamu pantau";

  // Middleware sudah menolak Tenaga Medis di sisi server; guard ini cuma
  // jaring pengaman tambahan di sisi client (defense in depth), dan juga
  // menutupi jeda singkat sebelum data sesi selesai dimuat.
  if (sessionQuery.data && sessionQuery.data.role !== "keluarga") {
    return (
      <div className="min-h-screen bg-paper">
        <TopNav hasNotification={monitoringQuery.data?.alert.hasAlert ?? false} />

        <main className="flex min-h-[calc(100vh-113px)] items-center justify-center p-4">
          <Card className="max-w-md p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger/12 text-lg font-bold text-danger">
              !
            </div>

            <h1 className="font-serif text-lg text-ink">Tidak Punya Akses</h1>

            <p className="mt-2 text-sm leading-6 text-muted">
              Halaman Pengaturan Izin Akses hanya bisa dibuka oleh Keluarga/Caregiver, bukan Tenaga
              Medis.
            </p>

            <Button
              variant="primary"
              size="sm"
              className="mt-5"
              onClick={() => router.push("/dashboard")}
            >
              Kembali ke Dashboard
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const result = AccessGrantSchema.safeParse(form);

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Data tidak valid.");
      return;
    }

    const newGrant: AccessGrant = {
      ...result.data,
      id: `grant-${Date.now()}`,
      grantedAt: "Baru saja",
      status: "Aktif",
    };

    setGrants((current) => [newGrant, ...current]);
    setForm(emptyForm);
    setIsFormOpen(false);
    setSuccess(`Akses untuk ${newGrant.name} berhasil diberikan.`);
  };

  const toggleStatus = (id: string) => {
    setSuccess("");
    setGrants((current) =>
      current.map((grant) =>
        grant.id === id
          ? { ...grant, status: grant.status === "Aktif" ? "Dicabut" : "Aktif" }
          : grant,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-paper">
      <TopNav hasNotification={monitoringQuery.data?.alert.hasAlert ?? false} />

      <main className="min-w-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <ManagementHeader
            title="Pengaturan Izin Akses"
            description={
              <>
                Kelola tenaga medis yang boleh melihat data kesehatan {elderlyName}. Hanya tenaga
                medis dengan akses aktif yang dapat melihat data ini.
              </>
            }
            isFormOpen={isFormOpen}
            onToggleForm={() => {
              setSuccess("");
              setIsFormOpen((open) => !open);
            }}
            openLabel="+ Beri Akses Baru"
          />

          {success && (
            <div
              className="mb-5 flex items-start gap-3 rounded-lg border-l-4 border-safe bg-safe/8 p-4 text-sm text-safe"
              role="status"
              aria-live="polite"
            >
              <span aria-hidden="true">✓</span>
              <p>{success}</p>
            </div>
          )}

          {isFormOpen && (
            <Card className="mb-6 p-5 sm:p-6">
              <h2 className="mb-4 font-serif text-base text-ink">Beri Akses Tenaga Medis</h2>

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
                  <TextField
                    id="name"
                    name="name"
                    label="Nama Tenaga Medis"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Contoh: dr. Sarah Amalia"
                  />

                  <TextField
                    id="specialization"
                    name="specialization"
                    label="Spesialisasi/Peran"
                    type="text"
                    value={form.specialization}
                    onChange={handleChange}
                    placeholder="Contoh: Dokter Geriatri"
                  />

                  <TextField
                    id="email"
                    name="email"
                    label="Email Terdaftar"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="contoh@klinik.id"
                    wrapperClassName="sm:col-span-2"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" variant="accent" size="sm">
                    Simpan Akses
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <Card className="p-6">
            <header className="mb-4">
              <h2 className="font-serif text-lg text-ink">Daftar Tenaga Medis</h2>
              <p className="mt-1 text-sm text-muted">
                {grants.filter((grant) => grant.status === "Aktif").length} dari {grants.length}{" "}
                tenaga medis memiliki akses aktif.
              </p>
            </header>

            {grants.length > 0 ? (
              <ol className="divide-y divide-border">
                {grants.map((grant) => (
                  <li
                    key={grant.id}
                    className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 font-serif text-sm text-accent-dark"
                        aria-hidden="true"
                      >
                        {getInitials(grant.name)}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-ink-soft">{grant.name}</p>
                        <p className="mt-0.5 text-xs text-muted">
                          {grant.specialization} · {grant.email}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">Diberi akses {grant.grantedAt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:shrink-0">
                      <Badge variant={grant.status === "Aktif" ? "success" : "neutral"}>
                        {grant.status}
                      </Badge>

                      <Button
                        variant={grant.status === "Aktif" ? "secondary" : "accent"}
                        size="sm"
                        onClick={() => toggleStatus(grant.id)}
                      >
                        {grant.status === "Aktif" ? "Cabut Akses" : "Aktifkan Kembali"}
                      </Button>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyStateMessage message="Belum ada tenaga medis yang diberi akses." />
            )}
          </Card>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default AccessManagement;

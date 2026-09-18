"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";

import TopNav from "../components/layout/TopNav";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

type DeviceType = "Wearable" | "Sensor Gerak" | "Sensor Pintu";
type DeviceStatus = "Terhubung" | "Terputus";

interface ManagedDevice {
  id: string;
  deviceId: string;
  type: DeviceType;
  assignedTo: string;
  pairedAt: string;
  status: DeviceStatus;
}

const initialDevices: ManagedDevice[] = [
  {
    id: "d1",
    deviceId: "WRB-014",
    type: "Wearable",
    assignedTo: "Budi Santoso",
    pairedAt: "3 Jun 2026",
    status: "Terhubung",
  },
  {
    id: "d2",
    deviceId: "SNS-007",
    type: "Sensor Pintu",
    assignedTo: "Budi Santoso",
    pairedAt: "3 Jun 2026",
    status: "Terputus",
  },
  {
    id: "d3",
    deviceId: "SNS-011",
    type: "Sensor Gerak",
    assignedTo: "Budi Santoso",
    pairedAt: "10 Jul 2026",
    status: "Terhubung",
  },
  {
    id: "d4",
    deviceId: "WRB-022",
    type: "Wearable",
    assignedTo: "Siti Aminah",
    pairedAt: "2 Ags 2026",
    status: "Terhubung",
  },
];

const emptyForm = {
  deviceId: "",
  type: "Wearable" as DeviceType,
  assignedTo: "",
};

function DeviceManagement() {
  const [devices, setDevices] = useState<ManagedDevice[]>(initialDevices);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const connectedCount = devices.filter((device) => device.status === "Terhubung").length;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (form.deviceId.trim().length === 0) {
      setError("ID perangkat wajib diisi.");
      return;
    }

    if (form.assignedTo.trim().length === 0) {
      setError("Perangkat harus dipasangkan ke lansia tertentu.");
      return;
    }

    const newDevice: ManagedDevice = {
      id: `d-${Date.now()}`,
      deviceId: form.deviceId,
      type: form.type,
      assignedTo: form.assignedTo,
      pairedAt: "Baru saja",
      status: "Terhubung",
    };

    setDevices((current) => [newDevice, ...current]);
    setForm(emptyForm);
    setIsFormOpen(false);
  };

  const toggleStatus = (id: string) => {
    setDevices((current) =>
      current.map((device) =>
        device.id === id
          ? {
              ...device,
              status: device.status === "Terhubung" ? "Terputus" : "Terhubung",
            }
          : device,
      ),
    );
  };

  const unpairDevice = (id: string) => {
    setDevices((current) => current.filter((device) => device.id !== id));
  };

  return (
    <div className="min-h-screen bg-paper">
      <TopNav />

      <main className="min-w-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-serif text-2xl text-ink sm:text-3xl">Manajemen Perangkat</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                Kelola pemasangan (pairing) wearable dan sensor IoT ke setiap lansia.
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
              {isFormOpen ? "Batal" : "+ Pasangkan Perangkat"}
            </Button>
          </header>

          {isFormOpen && (
            <Card className="mb-6 p-5 sm:p-6">
              <h2 className="mb-4 font-serif text-base text-ink">Pasangkan Perangkat Baru</h2>

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

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="deviceId"
                      className="mb-2 block text-sm font-semibold text-ink-soft"
                    >
                      ID Perangkat
                    </label>
                    <input
                      id="deviceId"
                      name="deviceId"
                      type="text"
                      value={form.deviceId}
                      onChange={handleChange}
                      placeholder="Contoh: WRB-030"
                      className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition placeholder:text-muted/70 hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="mb-2 block text-sm font-semibold text-ink-soft"
                    >
                      Tipe Perangkat
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8"
                    >
                      <option value="Wearable">Wearable</option>
                      <option value="Sensor Gerak">Sensor Gerak</option>
                      <option value="Sensor Pintu">Sensor Pintu</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="assignedTo"
                      className="mb-2 block text-sm font-semibold text-ink-soft"
                    >
                      Dipasangkan ke Lansia
                    </label>
                    <input
                      id="assignedTo"
                      name="assignedTo"
                      type="text"
                      value={form.assignedTo}
                      onChange={handleChange}
                      placeholder="Nama lansia"
                      className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition placeholder:text-muted/70 hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" variant="accent" size="sm">
                    Simpan Perangkat
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <Card className="p-6">
            <header className="mb-4">
              <h2 className="font-serif text-lg text-ink">Daftar Perangkat</h2>
              <p className="mt-1 text-sm text-muted">
                {connectedCount} dari {devices.length} perangkat sedang terhubung.
              </p>
            </header>

            {devices.length > 0 ? (
              <ol className="divide-y divide-border">
                {devices.map((device) => (
                  <li
                    key={device.id}
                    className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink-soft">
                        {device.deviceId} · {device.type}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        Dipasangkan ke {device.assignedTo} · {device.pairedAt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 sm:shrink-0">
                      <Badge variant={device.status === "Terhubung" ? "success" : "danger"}>
                        {device.status}
                      </Badge>

                      <Button variant="secondary" size="sm" onClick={() => toggleStatus(device.id)}>
                        {device.status === "Terhubung" ? "Putuskan" : "Sambungkan"}
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => unpairDevice(device.id)}
                        className="!text-danger"
                      >
                        Lepas Pairing
                      </Button>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="py-6 text-center">
                <p className="text-sm font-medium text-ink-soft">Belum ada perangkat terdaftar.</p>
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

export default DeviceManagement;

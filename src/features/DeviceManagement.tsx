"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";

import Footer from "../components/layout/Footer";
import ManagementHeader from "../components/layout/ManagementHeader";
import TopNav from "../components/layout/TopNav";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import EmptyStateMessage from "../components/ui/EmptyStateMessage";
import { SelectField } from "../components/ui/SelectField";
import TextField from "../components/ui/TextField";

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
          <ManagementHeader
            title="Manajemen Perangkat"
            description="Kelola pemasangan (pairing) wearable dan sensor IoT ke setiap lansia."
            isFormOpen={isFormOpen}
            onToggleForm={() => {
              setError("");
              setIsFormOpen((open) => !open);
            }}
            openLabel="+ Pasangkan Perangkat"
          />

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
                  <TextField
                    id="deviceId"
                    name="deviceId"
                    label="ID Perangkat"
                    type="text"
                    value={form.deviceId}
                    onChange={handleChange}
                    placeholder="Contoh: WRB-030"
                  />

                  <SelectField
                    id="type"
                    name="type"
                    label="Tipe Perangkat"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option value="Wearable">Wearable</option>
                    <option value="Sensor Gerak">Sensor Gerak</option>
                    <option value="Sensor Pintu">Sensor Pintu</option>
                  </SelectField>

                  <TextField
                    id="assignedTo"
                    name="assignedTo"
                    label="Dipasangkan ke Lansia"
                    type="text"
                    value={form.assignedTo}
                    onChange={handleChange}
                    placeholder="Nama lansia"
                  />
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
              <EmptyStateMessage message="Belum ada perangkat terdaftar." />
            )}
          </Card>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default DeviceManagement;

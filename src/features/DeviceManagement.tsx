"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { getDevices, getElders, createWearable, createCamera, pairDevice } from "../services/backendApi";

type DeviceType = "Wearable" | "Kamera CCTV";

const emptyForm = { deviceId: "", type: "Wearable" as DeviceType, assignedTo: "" };

function DeviceManagement() {
  const queryClient = useQueryClient();
  const devicesQuery = useQuery({ queryKey: ["devices"], queryFn: getDevices });
  const eldersQuery = useQuery({ queryKey: ["elders"], queryFn: getElders });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const devices = devicesQuery.data ?? [];
  const connectedCount = devices.filter((device) => ["terhubung", "connected", "aktif", "online"].includes((device.status ?? "").toLowerCase())).length;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (!form.deviceId.trim()) return setError("ID perangkat wajib diisi.");
    if (!form.assignedTo) return setError("Lansia tujuan wajib dipilih.");
    const elder = eldersQuery.data?.find((item) => item.id === form.assignedTo);
    if (!elder) return setError("Lansia tidak ditemukan.");
    try {
      const created = form.type === "Wearable"
        ? await createWearable({ deviceId: form.deviceId.trim(), id_wearable: form.deviceId.trim(), elderId: elder.id, id_lansia: elder.id })
        : await createCamera({ deviceId: form.deviceId.trim(), id_kamera: form.deviceId.trim(), elderId: elder.id, id_lansia: elder.id });
      const createdId = created.id || form.deviceId.trim();
      await pairDevice(createdId, elder.id);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["devices"] }),
        queryClient.invalidateQueries({ queryKey: ["elder-care"] }),
      ]);
      setForm(emptyForm);
      setIsFormOpen(false);
      setSuccess(`${form.type} berhasil didaftarkan dan dipasangkan ke ${elder.name}.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal mendaftarkan perangkat.");
    }
  };

  return <div className="min-h-screen bg-paper"><TopNav /><main className="min-w-0"><div className="p-4 sm:p-6 lg:p-8">
    <ManagementHeader title="Manajemen Perangkat" description="Kelola wearable dan kamera CCTV sesuai endpoint devices pada backend." isFormOpen={isFormOpen} onToggleForm={() => { setError(""); setSuccess(""); setIsFormOpen((open) => !open); }} openLabel="+ Pasangkan Perangkat" />
    {success && <div className="mb-5 rounded-lg border-l-4 border-safe bg-safe/8 p-4 text-sm text-safe" role="status">{success}</div>}
    {error && <div className="mb-5 rounded-lg border border-danger/25 bg-danger/6 px-4 py-3 text-sm text-danger" role="alert">{error}</div>}
    {isFormOpen && <Card className="mb-6 p-5 sm:p-6"><h2 className="mb-4 font-serif text-base text-ink">Daftarkan & Pasangkan Perangkat</h2><form onSubmit={handleSubmit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-3"><TextField id="deviceId" name="deviceId" label="ID Perangkat" value={form.deviceId} onChange={handleChange} placeholder="Contoh: WRB-030" /><SelectField id="type" name="type" label="Tipe Perangkat" value={form.type} onChange={handleChange}><option value="Wearable">Wearable</option><option value="Kamera CCTV">Kamera CCTV</option></SelectField><SelectField id="assignedTo" name="assignedTo" label="Dipasangkan ke Lansia" value={form.assignedTo} onChange={handleChange}><option value="">Pilih lansia</option>{(eldersQuery.data ?? []).map((elder) => <option key={elder.id} value={elder.id}>{elder.name}</option>)}</SelectField></div><div className="flex justify-end"><Button type="submit" variant="accent" size="sm" disabled={eldersQuery.isPending}>Simpan & Pair</Button></div></form></Card>}
    <Card className="p-6"><header className="mb-4"><h2 className="font-serif text-lg text-ink">Daftar Perangkat</h2><p className="mt-1 text-sm text-muted">{connectedCount} dari {devices.length} perangkat terhubung. Status dan last_seen berasal dari backend.</p></header>{devicesQuery.isPending ? <p className="text-sm text-muted">Memuat perangkat...</p> : devices.length ? <ol className="divide-y divide-border">{devices.map((device) => { const connected=["terhubung","connected","aktif","online"].includes((device.status??"").toLowerCase()); return <li key={device.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-ink-soft">{device.deviceId ?? device.name ?? device.id} · {device.type ?? device.kind ?? "Perangkat"}</p><p className="mt-0.5 text-xs text-muted">{device.elderName ? `Lansia: ${device.elderName}` : "Belum ada nama lansia"}{device.lastSeen ? ` · Terakhir terlihat ${device.lastSeen}` : ""}{typeof device.battery === "number" ? ` · Baterai ${device.battery}%` : ""}</p></div><div className="flex items-center gap-2 sm:shrink-0"><Badge variant={connected?"success":"danger"}>{device.status ?? "Terputus"}</Badge></div></li>})}</ol> : <EmptyStateMessage message="Belum ada perangkat terdaftar." />}</Card>
  </div><Footer /></main></div>;
}
export default DeviceManagement;

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { ElderCareDataSchema } from "../schemas/elderCareSchema";
import type { ElderCareData } from "../types/elderCare";

/**
 * Penyimpanan data monitoring lansia di server (Node.js runtime saja —
 * JANGAN diimpor dari middleware/Edge). Mengikuti pola yang sama dengan
 * userStore.ts: file JSON di folder /data (di-gitignore, auto ter-seed
 * saat pertama kali dibaca).
 *
 * Ini adalah pengganti fetch("/data/elderly.json") langsung dari client;
 * sekarang client HANYA bisa mengakses data ini lewat Route Handler
 * (/api/elderly), sehingga bisa diberi proteksi autentikasi dan validasi
 * skema di sisi server (pola Backend for Frontend / BFF).
 */

const DATA_DIR = path.join(process.cwd(), "data");
const ELDERLY_FILE = path.join(DATA_DIR, "elderly.json");

const SEED_DATA = {
  elderly: {
    id: "ELD001",
    name: "Budi Santoso",
    age: 68,
    monitoringStatus: "Aktif",
    wearableStatus: "Terhubung",
    iotStatus: "Aktif",
  },
  health: {
    heartRate: 95,
    heartRateUnit: "BPM",
    activity: 82,
    activityUnit: "%",
    sleep: 7.2,
    sleepUnit: "Jam",
    risk: "Rendah",
  },
  activityHistory: [
    { day: "Sen", value: 65 },
    { day: "Sel", value: 72 },
    { day: "Rab", value: 58 },
    { day: "Kam", value: 82 },
    { day: "Jum", value: 75 },
    { day: "Sab", value: 88 },
    { day: "Min", value: 82 },
  ],
  alert: {
    hasAlert: true,
    type: "Perubahan Pola Aktivitas",
    description:
      "Sistem mendeteksi perubahan aktivitas yang berbeda dari baseline perilaku lansia.",
    detected: "15 menit yang lalu",
    level: "Sedang",
  },
  devices: [
    {
      name: "Smart Wearable",
      description: "Data detak jantung dan aktivitas",
      status: "Terhubung",
    },
    {
      name: "Sensor IoT Rumah",
      description: "Data aktivitas lingkungan",
      status: "Aktif",
    },
  ],
  anomalyHistory: [
    {
      date: "10 September 2026",
      time: "20:15",
      type: "Perubahan Aktivitas",
      description: "Aktivitas fisik lebih rendah dari baseline perilaku.",
      level: "Sedang",
      period: "7 Hari",
    },
    {
      date: "8 September 2026",
      time: "18:42",
      type: "Pola Tidur",
      description: "Durasi tidur sedikit berbeda dari pola normal.",
      level: "Rendah",
      period: "7 Hari",
    },
    {
      date: "5 September 2026",
      time: "09:20",
      type: "Mobilitas",
      description: "Pergerakan pagi hari lebih rendah dibandingkan baseline.",
      level: "Rendah",
      period: "7 Hari",
    },
    {
      date: "20 Agustus 2026",
      time: "08:15",
      type: "Aktivitas",
      description: "Aktivitas pagi lebih rendah dibandingkan pola normal.",
      level: "Rendah",
      period: "30 Hari",
    },
    {
      date: "2 Juli 2026",
      time: "21:10",
      type: "Pola Tidur",
      description: "Waktu tidur berbeda dari baseline perilaku.",
      level: "Rendah",
      period: "3 Bulan",
    },
  ],
};

async function ensureSeeded(): Promise<ElderCareData> {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    const raw = await readFile(ELDERLY_FILE, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    const result = ElderCareDataSchema.safeParse(parsed);

    if (!result.success) {
      throw new Error("Data elderly.json tersimpan tidak valid.");
    }

    return result.data;
  } catch {
    const result = ElderCareDataSchema.safeParse(SEED_DATA);

    if (!result.success) {
      throw new Error("Seed data monitoring lansia tidak valid.");
    }

    await writeFile(ELDERLY_FILE, JSON.stringify(result.data, null, 2), "utf-8");
    return result.data;
  }
}

export async function getElderCareData(): Promise<ElderCareData> {
  return ensureSeeded();
}

export async function updateElderlyName(name: string): Promise<ElderCareData> {
  const current = await ensureSeeded();

  const updated: ElderCareData = {
    ...current,
    elderly: { ...current.elderly, name },
  };

  await writeFile(ELDERLY_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}

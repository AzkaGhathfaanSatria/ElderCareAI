import type { ElderlyId } from "../types/elderCare";

import { z } from "zod";

const ElderlyIdSchema = z
  .string()
  .min(1, "ID lansia wajib diisi.")
  .transform((value) => value as ElderlyId);

const MonitoringStatusSchema = z.enum(["Aktif", "Tidak Aktif"]);
const WearableStatusSchema = z.enum(["Terhubung", "Terputus"]);
const IoTStatusSchema = z.enum(["Aktif", "Tidak Aktif"]);
const AlertLevelSchema = z.enum(["Rendah", "Sedang", "Tinggi"]);
const PeriodSchema = z.enum(["7 Hari", "30 Hari", "3 Bulan"]);

const ElderlySchema = z.object({
  id: ElderlyIdSchema,
  name: z.string().min(1),
  age: z.number().int().nonnegative(),
  monitoringStatus: MonitoringStatusSchema,
  wearableStatus: WearableStatusSchema,
  iotStatus: IoTStatusSchema,
});

const HealthSchema = z.object({
  heartRate: z.number(),
  heartRateUnit: z.string().min(1),
  activity: z.number().min(0).max(100),
  activityUnit: z.string().min(1),
  sleep: z.number().nonnegative(),
  sleepUnit: z.string().min(1),
  risk: AlertLevelSchema,
});

const ActivityHistoryItemSchema = z.object({
  day: z.string().min(1),
  value: z.number().min(0).max(100),
});

const AlertSchema = z.object({
  hasAlert: z.boolean(),
  type: z.string(),
  description: z.string(),
  detected: z.string(),
  level: AlertLevelSchema,
});

const DeviceSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  status: z.string(),
});

const AnomalyHistoryItemSchema = z.object({
  date: z.string().min(1),
  time: z.string().min(1),
  type: z.string().min(1),
  description: z.string(),
  level: AlertLevelSchema,
  period: PeriodSchema,
});

export const ElderCareDataSchema = z.object({
  elderly: ElderlySchema,
  health: HealthSchema,
  activityHistory: z.array(ActivityHistoryItemSchema),
  alert: AlertSchema,
  devices: z.array(DeviceSchema),
  anomalyHistory: z.array(AnomalyHistoryItemSchema),
});

export type ElderCareDataFromSchema = z.infer<typeof ElderCareDataSchema>;

import type { Metadata } from "next";
import { Suspense } from "react";
import { readFile } from "node:fs/promises";
import path from "node:path";

import Dashboard from "../../features/Dashboard";
import { ElderCareDataSchema } from "../../schemas/elderCareSchema";
import type { ElderCareData } from "../../types/elderCare";

export const metadata: Metadata = {
  title: "Dashboard Monitoring | ElderCare AI",
  description:
    "Dashboard monitoring kesehatan dan aktivitas lansia ElderCare AI.",
};

async function fetchElderCareDataServer(): Promise<ElderCareData> {
  // Simulasi proses pengambilan data dari server/API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "elderly.json"
  );

  const fileContent = await readFile(filePath, "utf-8");

  const rawData: unknown = JSON.parse(fileContent);

  const result = ElderCareDataSchema.safeParse(rawData);

  if (!result.success) {
    throw new Error("Format data monitoring tidak valid.");
  }

  return result.data;
}

async function DashboardContent() {
  const data = await fetchElderCareDataServer();

  return <Dashboard data={data} />;
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
        </div>

        <div className="h-96 animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
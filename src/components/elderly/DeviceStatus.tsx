import type { Device } from "../../types/elderCare";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

interface DeviceStatusProps {
  devices: Device[];
}

function DeviceStatus({ devices }: DeviceStatusProps) {
  return (
    <Card className="p-6">
      <header className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">
          Status Perangkat
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Perangkat yang mengirimkan data monitoring.
        </p>
      </header>

      <div className="space-y-3">
        {devices.map((device) => (
          <article
            key={device.name}
            className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
          >
            <div>
              <h3 className="text-sm font-semibold text-slate-700">
                {device.name}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                {device.description}
              </p>
            </div>

            <Badge variant="success">
              {device.status}
            </Badge>
          </article>
        ))}
      </div>
    </Card>
  );
}

export default DeviceStatus;
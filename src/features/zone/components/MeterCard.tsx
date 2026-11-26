
import type { ZoneMeter } from "../types/zoneMeterTypes";

// This component receives one meter object from MyMeters
interface MeterCardProps {
  meter: ZoneMeter;
}

export const MeterCard = ({ meter }: MeterCardProps) => {
  // Check whether this meter is active
  const isActive = meter.status.toLowerCase() === "active";

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">

      {/* Meter ID and status */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{meter.id}</h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {meter.status}
        </span>
      </div>

      {/* Meter information */}
      <div className="mt-4 space-y-2 text-sm">
        <p>
          <span className="text-gray-500">Owner: </span>
          {meter.ownerName}
        </p>

        <p>
          <span className="text-gray-500">Address: </span>
          {meter.address}
        </p>

        <p>
          <span className="text-gray-500">Tariff: </span>
          {meter.tariffCategory}
        </p>

        <p>
          <span className="text-gray-500">Last Reading: </span>
          {meter.lastReading}
        </p>
      </div>
    </div>
  );
};

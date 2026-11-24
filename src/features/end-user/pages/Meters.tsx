
import { useEffect, useState } from "react";
import { useUser } from "../../../shared/context/UserContext";
import { getUserMeters } from "../services/meterService";
import type { Meter } from "../types/meterTypes";

export const Meters = () => {
  const { user } = useUser();

  const [meters, setMeters] = useState<Meter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  // Get user ID and zone ID from UserContext
  const userId = user?.id;
  const zoneId = user?.zoneId;

  // Fetch meters when the page loads
  useEffect(() => {
    const fetchMeters = async () => {
      if (!userId || !zoneId) {
        setError("User ID or Zone ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Call backend API
        const data = await getUserMeters(userId, zoneId);

        // Store returned meters
        setMeters(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to fetch meters."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMeters();
  }, [userId, zoneId, reload]);

  // Calculate meter summary
  const activeMeters = meters.filter(
    (meter) => meter.status?.toLowerCase() === "active"
  ).length;

  const inactiveMeters = meters.length - activeMeters;

  return (
    <div className="space-y-6">

      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          My Meters
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          View and manage your registered electricity meters.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Total Meters</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-2">
            {meters.length}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Active Meters</p>
          <h3 className="text-3xl font-bold text-green-600 mt-2">
            {activeMeters}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Inactive Meters</p>
          <h3 className="text-3xl font-bold text-red-600 mt-2">
            {inactiveMeters}
          </h3>
        </div>

      </div>

      {/* Meter table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">

        <div className="p-5 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">
            Registered Meters
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Your electricity meter details.
          </p>
        </div>

        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Loading your meters...
          </div>
        ) : error ? (
          <div className="p-10 text-center">
            <p className="text-red-600 mb-4">{error}</p>

            <button
              onClick={() => setReload((previous) => previous + 1)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : meters.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No meters found for your account.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-sm text-left">

              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-5 py-4">Meter ID</th>
                  <th className="px-5 py-4">Zone</th>
                  <th className="px-5 py-4">Address</th>
                  <th className="px-5 py-4">Tariff</th>
                  <th className="px-5 py-4">Last Reading</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Primary</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {meters.map((meter) => (
                  <tr
                    key={meter.id}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {meter.id}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {meter.zoneName}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {meter.address}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {meter.tariffCategory}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {meter.lastReading ?? "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          meter.status?.toLowerCase() === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {meter.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {meter.isPrimary ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>

          </div>
        )}
      </div>

    </div>
  );
};

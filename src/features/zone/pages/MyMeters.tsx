
import { useEffect, useState } from "react";

import { useUser } from "../../../shared/context/UserContext";

import { getZoneMeters } from "../services/zoneMeterService";

import type { ZoneMeter } from "../types/zoneMeterTypes";

// Import our reusable components
import { MeterCard } from "../components/MeterCard";
import { MeterSummaryCard } from "../components/MeterSummaryCard";

export const MyMeters = () => {
  // Get logged-in Zone Admin details
  const { user } = useUser();

  // Store meters received from the API
  const [meters, setMeters] = useState<ZoneMeter[]>([]);

  // Manage loading and error messages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch meters when the page loads
  useEffect(() => {
    const fetchMeters = async () => {
      // Check whether the user has a zoneId
      if (!user?.zoneId) {
        setError("Zone ID is not available for this user.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Get all meters belonging to this zone
        const data = await getZoneMeters(user.zoneId);

        // Store the API response
        setMeters(data);
      } catch (err) {
        console.error("Error fetching meters:", err);
        setError("Unable to load meters. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeters();
  }, [user?.zoneId]);

  // Calculate total number of meters
  const totalMeters = meters.length;

  // Calculate active meters
  const activeMeters = meters.filter(
    (meter) => meter.status.toLowerCase() === "active"
  ).length;

  // Calculate inactive meters
  const inactiveMeters = meters.filter(
    (meter) => meter.status.toLowerCase() === "inactive"
  ).length;

  // Show loading message
  if (loading) {
    return <div className="p-6">Loading meters...</div>;
  }

  // Show error message
  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold">My Meters</h1>

        <p className="text-gray-500">
          View all meters in your zone.
        </p>
      </div>

      {/* Summary cards using reusable component */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MeterSummaryCard
          title="Total Meters"
          value={totalMeters}
          color="text-gray-900"
        />

        <MeterSummaryCard
          title="Active Meters"
          value={activeMeters}
          color="text-green-600"
        />

        <MeterSummaryCard
          title="Inactive Meters"
          value={inactiveMeters}
          color="text-red-600"
        />
      </div>

      {/* All meter cards */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">
          All Meters
        </h2>

        {meters.length === 0 ? (
          <p className="text-gray-500">
            No meters found in this zone.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {meters.map((meter) => (
              // Reusable component displays one meter
              <MeterCard key={meter.id} meter={meter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


import { useEffect, useState } from "react";

import { useUser } from "../../../shared/context/UserContext";

import { getZoneDashboard } from "../services/zoneDashboardService";

import type { ZoneDashboardData } from "../types/zoneDashboardTypes";

import { ZoneStatCard } from "../components/ZoneStatCard";
import { MeterHealthGauge } from "../components/MeterHealthGauge";
import { RevenueDonutChart } from "../components/RevenueDonutChart";
import { ConsumptionTrendChart } from "../components/ConsumptionTrendChart";
import { AlertSeverityChart } from "../components/AlertSeverityChart";

export const ZoneDashboard = () => {
  // Get logged-in user details
  console.log("hey   i am there ")
  const { user } = useUser();

  // Dashboard API data
  const [dashboard, setDashboard] =
    useState<ZoneDashboardData | null>(null);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dashboard data when zoneId is available
  useEffect(() => {
    const fetchDashboard = async () => {
      if (!user?.zoneId) {
        setError("Zone ID is not available for this user.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getZoneDashboard(user.zoneId);

        setDashboard(data);
      } catch (err) {
        console.error("Failed to load zone dashboard:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user?.zoneId]);

  // Loading screen
  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading Zone Dashboard...
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-medium">
          {error}
        </p>
      </div>
    );
  }

  // Check whether data was received
  if (!dashboard) {
    return (
      <div className="p-6 text-gray-500">
        No dashboard data available.
      </div>
    );
  }

  // Format Indian currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="space-y-6">

      {/* Dashboard heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Zone Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          {dashboard.zoneName} Zone Overview
        </p>

        <p className="text-sm text-gray-400 mt-1">
          Welcome, {dashboard.adminName}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <ZoneStatCard
          title="Total Customers"
          value={dashboard.totalCustomers}
          subtitle="Customers in your zone"
          icon="👥"
        />

        <ZoneStatCard
          title="Total Consumption"
          value={`${dashboard.totalPowerConsumptionKwh.toLocaleString("en-IN")} kWh`}
          subtitle="Power consumed"
          icon="⚡"
        />

        <ZoneStatCard
          title="Total Revenue"
          value={formatCurrency(
            dashboard.financials.totalBilledRevenue
          )}
          subtitle="Total billed amount"
          icon="💰"
        />

        <ZoneStatCard
          title="Pending Bills"
          value={formatCurrency(
            dashboard.financials.pendingBillsAmount
          )}
          subtitle={`${dashboard.financials.pendingBillsCount} bills pending`}
          icon="🧾"
        />

      </div>

      {/* Meter health and revenue charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <MeterHealthGauge
          percentage={dashboard.meterHealth.healthPercentage}
          activeMeters={dashboard.meterHealth.activeMeters}
          totalMeters={dashboard.meterHealth.totalMeters}
        />

        <RevenueDonutChart
          collectedRevenue={
            dashboard.financials.totalCollectedRevenue
          }
          pendingRevenue={
            dashboard.financials.pendingBillsAmount
          }
          totalRevenue={
            dashboard.financials.totalBilledRevenue
          }
        />

      </div>

      {/* Consumption trend */}
      <ConsumptionTrendChart
        labels={dashboard.consumptionTrend.labels}
        current={dashboard.consumptionTrend.current}
        previous={dashboard.consumptionTrend.previous}
      />

      {/* Alert severity chart */}
      <AlertSeverityChart
        critical={dashboard.alertsSummary.criticalAlertsCount}
        warning={dashboard.alertsSummary.warningAlertsCount}
        info={dashboard.alertsSummary.infoAlertsCount}
      />

    </div>
  );
};

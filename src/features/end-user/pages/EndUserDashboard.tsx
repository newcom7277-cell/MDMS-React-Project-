
import { useEffect, useState } from "react";
import { useUser } from "../../../shared/context/UserContext";
import { getEndUserDashboard } from "../services/dashboardService";
import type { DashboardData } from "../types/dashboardTypes";

// Format amount as Indian currency
const formatAmount = (amount: number) =>
  amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

// Format date in a readable way
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// Convert billing month "2026-10" into "October 2026"
const formatMonth = (month: string) => {
  const [year, monthNumber] = month.split("-");
  return new Date(Number(year), Number(monthNumber) - 1).toLocaleDateString(
    "en-IN",
    {
      month: "long",
      year: "numeric",
    }
  );
};

export const EndUserDashboard = () => {
  const { user } = useUser();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dashboard data for the logged-in user
  const fetchDashboard = async () => {
    if (!user?.id) {
      setError("User information is not available.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getEndUserDashboard(user.id);
      setDashboard(data);
    } catch {
      setError("Unable to load dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [user?.id]);

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error screen
  if (error || !dashboard) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
        <p className="mb-4 text-red-600">
          {error || "Dashboard data not found."}
        </p>

        <button
          onClick={fetchDashboard}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const graph = dashboard.consumptionGraph;

  // Keep chart dimensions consistent and scale values based on API data
  const chartWidth = 800;
  const chartHeight = 260;
  const chartPadding = 40;

  const allValues = [...graph.current, ...graph.previous];
  const minValue = Math.floor(Math.min(...allValues) - 1);
  const maxValue = Math.ceil(Math.max(...allValues) + 1);

  const getX = (index: number) =>
    chartPadding +
    (index / Math.max(graph.labels.length - 1, 1)) *
      (chartWidth - chartPadding * 2);

  const getY = (value: number) =>
    chartHeight -
    chartPadding -
    ((value - minValue) / (maxValue - minValue)) *
      (chartHeight - chartPadding * 2);

  // Create SVG path for each month's consumption
  const createPath = (values: number[]) =>
    values
      .map(
        (value, index) =>
          `${index === 0 ? "M" : "L"} ${getX(index)} ${getY(value)}`
      )
      .join(" ");

  const currentPath = createPath(graph.current);
  const previousPath = createPath(graph.previous);

  // Show only a few date labels to keep the chart readable
  const dateLabelIndexes = graph.labels
    .map((_, index) => index)
    .filter(
      (index) =>
        index % 5 === 0 || index === graph.labels.length - 1
    );

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Dashboard heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, {dashboard.userName}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          {dashboard.primaryMeter.status}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Total Meters
            </p>
            <span className="rounded-xl bg-blue-50 p-3 text-xl">
              ⚡
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold text-slate-800">
            {dashboard.totalMeters}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Electricity connections
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Current Bill
            </p>
            <span className="rounded-xl bg-indigo-50 p-3 text-xl">
              ₹
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold text-slate-800">
            {formatAmount(dashboard.currentMonthBill.amount)}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {formatMonth(dashboard.currentMonthBill.billingMonth)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Outstanding Balance
            </p>
            <span className="rounded-xl bg-amber-50 p-3 text-xl">
              ₹
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold text-slate-800">
            {formatAmount(dashboard.outstandingBalance)}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Pending payment amount
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Consumption
            </p>
            <span className="rounded-xl bg-cyan-50 p-3 text-xl">
              📊
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold text-slate-800">
            {graph.total.toFixed(1)}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            kWh this month
          </p>
        </div>
      </div>

      {/* Consumption chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Electricity Consumption
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Daily usage compared with the previous month
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-600" />
              Current month
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-slate-400" />
              Previous month
            </div>
          </div>
        </div>

        {/* Chart summary */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-blue-50 p-3">
            <p className="text-xs text-slate-500">Daily Average</p>
            <p className="mt-1 text-lg font-bold text-blue-700">
              {graph.average.toFixed(2)} kWh
            </p>
          </div>

          <div className="rounded-xl bg-amber-50 p-3">
            <p className="text-xs text-slate-500">Peak Usage</p>
            <p className="mt-1 text-lg font-bold text-amber-700">
              {graph.max.toFixed(1)} kWh
            </p>
          </div>

          <div className="rounded-xl bg-cyan-50 p-3">
            <p className="text-xs text-slate-500">Lowest Usage</p>
            <p className="mt-1 text-lg font-bold text-cyan-700">
              {graph.min.toFixed(1)} kWh
            </p>
          </div>
        </div>

        {/* SVG chart */}
        <div className="mt-6 w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="h-auto min-w-[600px] w-full"
            role="img"
            aria-label="Daily electricity consumption comparison"
          >
            {/* Horizontal grid lines */}
            {[0, 1, 2, 3, 4].map((step) => {
              const value =
                minValue + ((maxValue - minValue) / 4) * step;
              const y = getY(value);

              return (
                <g key={step}>
                  <line
                    x1={chartPadding}
                    y1={y}
                    x2={chartWidth - chartPadding}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                  />

                  <text
                    x={chartPadding - 10}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="12"
                    fill="#64748b"
                  >
                    {value.toFixed(0)}
                  </text>
                </g>
              );
            })}

            {/* Previous month line */}
            <path
              d={previousPath}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Current month line */}
            <path
              d={currentPath}
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Current month points with hover values */}
            {graph.current.map((value, index) => (
              <circle
                key={`current-${index}`}
                cx={getX(index)}
                cy={getY(value)}
                r="4"
                fill="#2563eb"
                stroke="white"
                strokeWidth="2"
              >
                <title>
                  {graph.labels[index]}: {value} kWh
                </title>
              </circle>
            ))}

            {/* Previous month points with hover values */}
            {graph.previous.map((value, index) => (
              <circle
                key={`previous-${index}`}
                cx={getX(index)}
                cy={getY(value)}
                r="4"
                fill="#94a3b8"
                stroke="white"
                strokeWidth="2"
              >
                <title>
                  {graph.labels[index]}: {value} kWh
                </title>
              </circle>
            ))}

            {/* Date labels */}
            {dateLabelIndexes.map((index) => (
              <text
                key={index}
                x={getX(index)}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize="12"
                fill="#64748b"
              >
                {graph.labels[index]}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* Primary meter and last payment */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Primary Meter
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your main electricity connection
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Meter ID
              </span>

              <span className="font-semibold text-slate-800">
                {dashboard.primaryMeter.id}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Tariff Category
              </span>

              <span className="font-semibold text-slate-800">
                {dashboard.primaryMeter.tariffCategory}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Last Reading
              </span>

              <span className="font-semibold text-slate-800">
                {dashboard.primaryMeter.lastReading.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Updated {formatDate(dashboard.primaryMeter.lastReadingAt)}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Last Payment
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your most recent payment information
          </p>

          {dashboard.lastPayment ? (
            <div className="mt-5 rounded-xl bg-green-50 p-4">
              <p className="text-sm text-slate-500">Amount Paid</p>

              <p className="mt-1 text-2xl font-bold text-green-700">
                {formatAmount(dashboard.lastPayment.amount)}
              </p>

              <div className="mt-4 flex justify-between text-sm">
                <span className="text-slate-500">Payment Method</span>
                <span className="font-medium text-slate-800">
                  {dashboard.lastPayment.method}
                </span>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-slate-500">Payment Date</span>
                <span className="font-medium text-slate-800">
                  {formatDate(dashboard.lastPayment.paidOn)}
                </span>
              </div>
            </div>
          ) : (
            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No payment information available.
            </p>
          )}
        </div>
      </div>

      {/* Recent bills */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-800">
            Recent Bills
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest electricity bills
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">Bill ID</th>
                <th className="px-6 py-4">Month</th>
                <th className="px-6 py-4">Units</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {dashboard.recentBills.map((bill) => (
                <tr
                  key={bill.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {bill.id}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {formatMonth(bill.billingMonth)}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {bill.totalUnits} kWh
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {formatDate(bill.dueDate)}
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {formatAmount(bill.amount)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        bill.status.toLowerCase() === "paid"
                          ? "bg-green-100 text-green-700"
                          : bill.status.toLowerCase() === "overdue"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {bill.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent alerts */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold text-slate-800">
          Recent Alerts
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Updates about your electricity meters
        </p>

        <div className="mt-5 space-y-3">
          {dashboard.recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-800">
                  {alert.type}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {alert.message}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {formatDate(alert.createdAt)}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  alert.severity.toLowerCase() === "critical"
                    ? "bg-red-100 text-red-700"
                    : alert.severity.toLowerCase() === "warning"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

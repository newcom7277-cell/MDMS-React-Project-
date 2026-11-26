
interface AlertSeverityChartProps {
  critical: number;
  warning: number;
  info: number;
}

export const AlertSeverityChart = ({
  critical,
  warning,
  info,
}: AlertSeverityChartProps) => {
  // Find the largest alert count for scaling
  const maxValue = Math.max(critical, warning, info, 1);

  // Alert category details
  const alertTypes = [
    {
      title: "Critical",
      value: critical,
      color: "bg-red-500",
      textColor: "text-red-600",
    },
    {
      title: "Warning",
      value: warning,
      color: "bg-amber-500",
      textColor: "text-amber-600",
    },
    {
      title: "Info",
      value: info,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">
        Alert Severity
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Alerts grouped by severity
      </p>

      <div className="mt-6 space-y-6">
        {alertTypes.map((alert) => {
          // Calculate bar width
          const barWidth =
            (alert.value / maxValue) * 100;

          return (
            <div key={alert.title}>
              {/* Alert name and count */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {alert.title}
                </span>

                <span
                  className={`text-sm font-bold ${alert.textColor}`}
                >
                  {alert.value}
                </span>
              </div>

              {/* Bar background */}
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                {/* Actual alert bar */}
                <div
                  className={`h-full rounded-full ${alert.color}`}
                  style={{
                    width: `${barWidth}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Total alerts */}
      <div className="border-t border-gray-200 mt-6 pt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          Total Alerts
        </span>

        <span className="text-lg font-bold text-gray-800">
          {critical + warning + info}
        </span>
      </div>
    </div>
  );
};

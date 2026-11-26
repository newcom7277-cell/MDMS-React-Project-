interface RevenueDonutChartProps {
  collectedRevenue: number;
  pendingRevenue: number;
  totalRevenue: number;
}

export const RevenueDonutChart = ({
  collectedRevenue,
  pendingRevenue,
  totalRevenue,
}: RevenueDonutChartProps) => {
  // Calculate collected revenue percentage
  const collectedPercentage =
    totalRevenue > 0
      ? (collectedRevenue / totalRevenue) * 100
      : 0;

  // Format amount as Indian currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">
        Revenue Collection
      </h3>

      <div className="flex flex-col items-center mt-5">
        {/* Donut chart */}
        <div
          className="relative w-40 h-40 rounded-full"
          style={{
            background: `conic-gradient(
              #16a34a 0% ${collectedPercentage}%,
              #f59e0b ${collectedPercentage}% 100%
            )`,
          }}
        >
          {/* Center of donut */}
          <div className="absolute inset-5 bg-white rounded-full flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">
              {collectedPercentage.toFixed(1)}%
            </span>

            <span className="text-xs text-gray-500">
              Collected
            </span>
          </div>
        </div>

        {/* Revenue details */}
        <div className="w-full mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-600" />
              <span className="text-sm text-gray-600">
                Collected
              </span>
            </div>

            <span className="text-sm font-semibold text-gray-800">
              {formatCurrency(collectedRevenue)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-gray-600">
                Pending
              </span>
            </div>

            <span className="text-sm font-semibold text-gray-800">
              {formatCurrency(pendingRevenue)}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Total Billed
            </span>

            <span className="text-sm font-bold text-gray-800">
              {formatCurrency(totalRevenue)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ConsumptionTrendChartProps {
  labels: string[];
  current: number[];
  previous: number[];
}

export const ConsumptionTrendChart = ({
  labels,
  current,
  previous,
}: ConsumptionTrendChartProps) => {
  // Find the largest value to scale the bars
  const allValues = [...current, ...previous];

  const maxValue = Math.max(...allValues, 1);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Chart heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Consumption Trend
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Daily electricity consumption comparison
          </p>
        </div>

        {/* Chart legend */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-blue-600" />
            Current
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-gray-300" />
            Previous
          </div>
        </div>
      </div>

      {/* Chart area */}
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="h-64 flex items-end gap-1 border-b border-gray-200">
            {labels.map((label, index) => {
              const currentValue = current[index] ?? 0;
              const previousValue = previous[index] ?? 0;

              const currentHeight =
                (currentValue / maxValue) * 100;

              const previousHeight =
                (previousValue / maxValue) * 100;

              return (
                <div
                  key={`${label}-${index}`}
                  className="flex-1 h-full flex flex-col justify-end items-center"
                >
                  {/* Current and previous bars */}
                  <div className="flex items-end justify-center gap-1 w-full h-full">
                    <div
                      title={`Current: ${currentValue} kWh`}
                      className="w-1/2 max-w-3 rounded-t-sm bg-blue-600"
                      style={{
                        height: `${currentHeight}%`,
                      }}
                    />

                    <div
                      title={`Previous: ${previousValue} kWh`}
                      className="w-1/2 max-w-3 rounded-t-sm bg-gray-300"
                      style={{
                        height: `${previousHeight}%`,
                      }}
                    />
                  </div>

                  {/* Date label */}
                  <span className="text-[10px] text-gray-500 mt-2 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Consumption is measured in kWh.
      </p>
    </div>
  );
};

interface MeterHealthGaugeProps {
  percentage: number;
  activeMeters: number;
  totalMeters: number;
}

export const MeterHealthGauge = ({
  percentage,
  activeMeters,
  totalMeters,
}: MeterHealthGaugeProps) => {
  // Keep percentage between 0 and 100
  const safePercentage = Math.min(
    100,
    Math.max(0, percentage)
  );

  // SVG circle calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  // Calculate how much of the circle should be filled
  const strokeDashoffset =
    circumference -
    (safePercentage / 100) * circumference;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">
        Meter Health
      </h3>

      <div className="flex flex-col items-center mt-5">
        {/* Circular gauge */}
        <div className="relative w-40 h-40">
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
            />

            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#16a34a"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>

          {/* Percentage in the center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">
              {safePercentage}%
            </span>

            <span className="text-sm text-gray-500">
              Healthy
            </span>
          </div>
        </div>

        {/* Meter count */}
        <p className="text-sm text-gray-600 mt-4">
          {activeMeters} of {totalMeters} meters active
        </p>
      </div>
    </div>
  );
};
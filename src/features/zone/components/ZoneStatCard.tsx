interface ZoneStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
}

export const ZoneStatCard = ({
  title,
  value,
  subtitle,
  icon,
}: ZoneStatCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Card title and icon */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <span className="text-2xl">
          {icon}
        </span>
      </div>

      {/* Main value */}
      <h2 className="text-2xl font-bold text-gray-800 mt-3">
        {value}
      </h2>

      {/* Optional subtitle */}
      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};
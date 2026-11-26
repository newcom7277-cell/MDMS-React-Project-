
interface MeterSummaryCardProps {
  title: string;
  value: number;
  color: string;
}

export const MeterSummaryCard = ({
  title,
  value,
  color,
}: MeterSummaryCardProps) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      {/* Summary card title */}
      <p className="text-sm text-gray-500">{title}</p>

      {/* Summary count */}
      <h2 className={`mt-2 text-3xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
};

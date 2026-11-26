import type { ZoneCustomer } from "../types/zoneCustomerTypes";

interface ZoneCustomerCardProps {
  customer: ZoneCustomer;
}

export const ZoneCustomerCard = ({
  customer,
}: ZoneCustomerCardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      {/* Customer name and status */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {customer.name}
          </h3>

          <p className="text-sm text-slate-500">
            Customer ID: {customer.id}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            customer.status?.toLowerCase() === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {customer.status}
        </span>
      </div>

      {/* Customer information */}
      <div className="space-y-2 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-700">Email:</span>{" "}
          {customer.email || "N/A"}
        </p>

        <p>
          <span className="font-medium text-slate-700">Phone:</span>{" "}
          {customer.phone || "N/A"}
        </p>

        <p>
          <span className="font-medium text-slate-700">Address:</span>{" "}
          {customer.address || "N/A"}
        </p>

        <p>
          <span className="font-medium text-slate-700">Zone:</span>{" "}
          {customer.zoneName || customer.zoneId}
        </p>
      </div>

      {/* Customer summary */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
        <div>
          <p className="text-xs text-slate-500">Meters</p>
          <p className="text-lg font-semibold text-slate-800">
            {customer.meterCount ?? 0}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">Joined On</p>
          <p className="text-sm font-medium text-slate-700">
            {customer.joinedOn
              ? new Date(customer.joinedOn).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useUser } from "../../../shared/context/UserContext";
import type { Bill } from "../types/billTypes";
import { getUserBills } from "../services/billService";
export const MyBills = () => {
  const { user } = useUser();

  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  const userId = user?.id;

  // Fetch bills whenever the logged-in user changes
  useEffect(() => {
    const fetchBills = async () => {
      if (!userId) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getUserBills(userId);

        // Newest billing month first
        const sortedBills = [...data].sort((a, b) =>
          b.billingMonth.localeCompare(a.billingMonth)
        );

        setBills(sortedBills);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to fetch bills."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [userId, reload]);

  // Calculate summary values
  const paidBills = bills.filter(
    (bill) => bill.status.toLowerCase() === "paid"
  ).length;

  const unpaidBills = bills.filter(
    (bill) => bill.status.toLowerCase() !== "paid"
  );

  const pendingAmount = unpaidBills.reduce(
    (total, bill) => total + bill.amount,
    0
  );

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatMonth = (month: string) => {
    const [year, monthNumber] = month.split("-");
    return new Date(Number(year), Number(monthNumber) - 1)
      .toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      });
  };

  const formatAmount = (amount: number) =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

  return (
    <div className="space-y-6">

      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          My Bills
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          View your monthly electricity bills and payment status.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Total Bills</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-2">
            {bills.length}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Paid Bills</p>
          <h3 className="text-3xl font-bold text-green-600 mt-2">
            {paidBills}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Unpaid Bills</p>
          <h3 className="text-3xl font-bold text-orange-600 mt-2">
            {unpaidBills.length}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Unpaid Amount</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-2">
            {formatAmount(pendingAmount)}
          </h3>
        </div>

      </div>

      {/* Bills table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

        <div className="p-5 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">
            Billing History
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Your previous and current electricity bills.
          </p>
        </div>

        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Loading your bills...
          </div>
        ) : error ? (
          <div className="p-10 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => setReload((previous) => previous + 1)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : bills.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No bills found for your account.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">

              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-5 py-4">Bill ID</th>
                  <th className="px-5 py-4">Billing Month</th>
                  <th className="px-5 py-4">Meter ID</th>
                  <th className="px-5 py-4">Units</th>
                  <th className="px-5 py-4">Due Date</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {bills.map((bill) => (
                  <tr
                    key={bill.id}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {bill.id}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {formatMonth(bill.billingMonth)}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {bill.meterId}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {bill.totalUnits} kWh
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {formatDate(bill.dueDate)}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-800">
                      {formatAmount(bill.amount)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          bill.status.toLowerCase() === "paid"
                            ? "bg-green-100 text-green-700"
                            : bill.status.toLowerCase() === "overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
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
        )}
      </div>
    </div>
  );
};

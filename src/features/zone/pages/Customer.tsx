import { useEffect, useState } from "react";

import { useUser } from "../../../shared/context/UserContext";

import { getZoneCustomers } from "../services/zoneCustomerService";

import type { ZoneCustomer } from "../types/zoneCustomerTypes";

import { ZoneCustomerCard } from "../components/ZoneCustomerCard";

const Customer = () => {
  // Get logged-in user's information from UserContext
  const { user } = useUser();

  // Store customers received from backend
  const [customers, setCustomers] = useState<ZoneCustomer[]>([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error message
  const [error, setError] = useState("");

  // Get zoneId from logged-in user
  const zoneId = user?.zoneId;

  useEffect(() => {
    // If zoneId is not available, stop loading
    if (!zoneId) {
      setError("Zone ID not found for this user.");
      setLoading(false);
      return;
    }

    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError("");

        // Call backend API with zoneId
        const data = await getZoneCustomers(zoneId);

        // Store API response in state
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching zone customers:", err);
        setError("Failed to load customers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [zoneId]);

  // Loading UI
  if (loading) {
    return (
      <div className="p-6 text-center text-slate-500">
        Loading customers...
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Zone Customers
        </h1>

        <p className="text-slate-500 mt-1">
          Customers registered in your zone: {zoneId}
        </p>
      </div>

      {/* Customer count */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-slate-500">
          Total Customers
        </p>

        <p className="text-2xl font-bold text-slate-800">
          {customers.length}
        </p>
      </div>

      {/* Customer cards */}
      {customers.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
          <p className="text-slate-500">
            No customers found in this zone.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {customers.map((customer) => (
            <ZoneCustomerCard
              key={customer.id}
              customer={customer}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Customer;
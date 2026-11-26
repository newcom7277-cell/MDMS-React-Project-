
import http from "../../auth/services/http";
import type { ZoneCustomer } from "../types/zoneCustomerTypes";
// Get all customers belonging to a particular zone
export const getZoneCustomers = async (
  zoneId: string
): Promise<ZoneCustomer[]> => {
  // Send zoneId to the backend API
  const response = await http.get<ZoneCustomer[]>(
    `/Zones/${zoneId}/customers`
  );

  // Return customer data
  return response.data;
};

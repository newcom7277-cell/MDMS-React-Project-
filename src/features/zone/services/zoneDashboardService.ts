
import http from "../../auth/services/http";

import type { ZoneDashboardData } from "../types/zoneDashboardTypes";

// Get dashboard information for a particular zone
export const getZoneDashboard = async (
  zoneId: string
): Promise<ZoneDashboardData> => {
  // Call the backend API
  const response = await http.get<ZoneDashboardData>(
    `/Dashboard/zone/${zoneId}`
  );

  // Return the dashboard data
  return response.data;
};

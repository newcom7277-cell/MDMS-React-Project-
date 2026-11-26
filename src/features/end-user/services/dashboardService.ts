
import http from "../../auth/services/http";
import type { DashboardData } from "../types/dashboardTypes";

// Fetch dashboard data for the logged-in End User
export const getEndUserDashboard = async (
  userId: string
): Promise<DashboardData> => {
  const response = await http.get<DashboardData>(
    `/Dashboard/end-user/${userId}`
  );

  return response.data;
};

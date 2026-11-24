
import http from "../../auth/services/http";
import type { Bill } from "../types/billTypes";

// Fetch all bills belonging to a particular user
export const getUserBills = async (
  userId: string
): Promise<Bill[]> => {
  const response = await http.get<Bill[]>("/Bills", {
    params: {
      userId: userId,
    },
  });
  const config = {
  params: { userId },
};
  console.log("Full URL:", http.getUri({ url: "/Bills", ...config }));
  console.log("bills dta ",response.data);

  return response.data;
};

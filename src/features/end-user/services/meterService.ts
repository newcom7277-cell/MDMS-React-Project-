
import http from "../../auth/services/http";
import type { Meter } from "../types/meterTypes";

// Fetch meters belonging to the logged-in user
export const getUserMeters = async (
  userId: string,
  zoneId: string
): Promise<Meter[]> => {
  const response = await http.get<Meter[]>("/Meters", {
    params: {
      userId: userId,
      zoneId: zoneId,
    },
  });

  return response.data;
};

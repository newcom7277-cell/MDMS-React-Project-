// Import the shared Axios instance
import http from "../../auth/services/http";

// Import the meter type we created in Step 1
import type { ZoneMeter } from "../types/zoneMeterTypes";

// This function gets all meters belonging to a particular zone
export const getZoneMeters = async (
  zoneId: string
): Promise<ZoneMeter[]> => {
  // Call the backend API
  const response = await http.get<ZoneMeter[]>("/Meters", {
    params: {
      zoneId: zoneId, // Get meters from this zone
      sortBy: "installed_desc", // Latest installed meters first
    },
  });

  // Return the meter data received from the API
  return response.data;
};
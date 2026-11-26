
import http from "../../auth/services/http";
import type { UserProfile } from "../../enterprise/types/profileTypes";

// Fetch profile details for the logged-in user
export const getUserProfile = async (
  userId: string
): Promise<UserProfile> => {
  const response = await http.get<UserProfile>(`/Users/${userId}`);

  return response.data;
};

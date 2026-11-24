
import http from "./http";
import type { LoginRequest, LoginResponse } from "../types/authTypes";

// Login API function
export const loginUser = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await http.post<LoginResponse>(
    "/auth/login",
    data
  );
  console.log(response.data);
  return response.data;
};

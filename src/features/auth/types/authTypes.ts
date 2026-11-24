
export interface LoginRequest {
  email: string;
  role: string;
}

export interface LoginResponse {
  id: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;

  zoneId?: string;
  zoneName?: string;

  meterCount: number;
  notificationPrefs: string;
  joinedOn: string;

  avatarUrl?: string;
}

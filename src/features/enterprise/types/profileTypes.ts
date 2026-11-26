
export interface UserProfile {
  // Basic user information
  id: string;
  role: "end_user";
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;

  // Electricity connection information
  zoneId: string;
  zoneName: string;
  meterCount: number;

  // Account information
  joinedOn: string;
  avatarUrl?: string;

  // API returns notification preferences as a JSON string
  notificationPrefs: string;

  // Zone information
  zone: {
    id: string;
    name: string;
    location: string;
    pincode: string;
    description: string;
    adminId: string;
    adminName: string;
    status: string;
    totalMeters: number;
    createdAt: string;
  };
}

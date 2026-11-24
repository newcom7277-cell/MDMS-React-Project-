
import http from "../../../services/http";

// Get user's meters
export const getMeters = async () => {
  const response = await http.get("/Meters");
  return response.data;
};

// Get user's consumption data
export const getConsumption = async () => {
  const response = await http.get("/ConsumptionSeries");
  return response.data;
};

// Get user's bills
export const getBills = async () => {
  const response = await http.get("/Bills");
  return response.data;
};

// Get user's payment history
export const getPayments = async () => {
  const response = await http.get("/Payments");
  return response.data;
};

// Get user's alerts
export const getAlerts = async () => {
  const response = await http.get("/Alerts");
  return response.data;
};

// Get user's notifications
export const getNotifications = async () => {
  const response = await http.get("/Notifications");
  return response.data;
};

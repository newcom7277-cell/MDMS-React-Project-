
export interface DashboardData {
  userId: string;
  userName: string;
  zoneId: string;
  zoneName: string;
  totalMeters: number;

  // Primary electricity meter
  primaryMeter: {
    id: string;
    tariffCategory: string;
    lastReading: number;
    lastReadingAt: string;
    status: string;
  };

  // Current month's bill
  currentMonthBill: {
    billId: string;
    billingMonth: string;
    consumptionUnits: number;
    amount: number;
    dueDate: string;
    status: string;
  };

  // Total unpaid amount
  outstandingBalance: number;

  // Most recent payment
  lastPayment: {
    paymentId: string;
    amount: number;
    method: string;
    paidOn: string;
  } | null;

  // Data for the consumption chart
  consumptionGraph: {
    total: number;
    average: number;
    max: number;
    min: number;
    labels: string[];
    current: number[];
    previous: number[];
  };

  // Recent electricity bills
  recentBills: {
    id: string;
    billingMonth: string;
    totalUnits: number;
    amount: number;
    dueDate: string;
    status: string;
    paidOn?: string;
  }[];

  // Recent alerts
  recentAlerts: {
    id: string;
    type: string;
    severity: string;
    status: string;
    message: string;
    createdAt: string;
  }[];
}

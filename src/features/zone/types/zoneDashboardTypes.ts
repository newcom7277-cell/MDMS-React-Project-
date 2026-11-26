
export interface ZoneDashboardData {
  zoneId: string;
  zoneName: string;
  adminName: string;

  meterHealth: {
    totalMeters: number;
    activeMeters: number;
    inactiveMeters: number;
    healthPercentage: number;
  };

  totalCustomers: number;

  totalPowerConsumptionKwh: number;

  averageConsumptionPerCustomerKwh: number;

  financials: {
    totalBilledRevenue: number;
    totalCollectedRevenue: number;
    pendingBillsCount: number;
    pendingBillsAmount: number;
  };

  alertsSummary: {
    totalAlerts: number;
    criticalAlertsCount: number;
    warningAlertsCount: number;
    infoAlertsCount: number;

    recentAlerts: {
      id: string;
      type: string;
      severity: string;
      status: string;
      message: string;
      createdAt: string;
    }[];
  };

  consumptionTrend: {
    total: number;
    average: number;
    max: number;
    min: number;

    labels: string[];

    current: number[];
    previous: number[];
  };
}

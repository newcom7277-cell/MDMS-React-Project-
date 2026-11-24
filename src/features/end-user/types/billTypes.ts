
export interface Bill {
  id: string;
  userId: string;
  meterId: string;
  zoneId: string;
  billingMonth: string;
  generatedOn: string;
  dueDate: string;
  previousReading: number;
  currentReading: number;
  totalUnits: number;
  energyCharge: number;
  fixedCharge: number;
  taxAmount: number;
  amount: number;
  status: string;
  paidOn: string | null;

  // Related meter information returned by the API
  meter: {
    id: string;
    address: string;
    tariffCategory: string;
  };

  // Related zone information returned by the API
  zone: {
    id: string;
    name: string;
  };
}

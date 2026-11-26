
export interface ZoneMeter {
  id: string;
  ownerId: string;
  ownerName: string;

  zoneId: string;
  zoneName: string;

  tariffId: string;
  tariffCategory: string;

  address: string;

  status: string;
  isPrimary: boolean;

  lastReading: number;
  lastReadingAt: string;

  installedOn: string;

  // Additional information returned by your API
  owner?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
  };

  tariff?: {
    id: string;
    category: string;
    fixedCharge: number;
    taxPercent: number;
  };
}

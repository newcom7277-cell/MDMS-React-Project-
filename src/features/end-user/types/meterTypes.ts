
export interface Meter {
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
}

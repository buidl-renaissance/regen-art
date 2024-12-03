export type Shareholder = {
  id: number;
  name: string;
  sharesOwned: number;
}

export type Property = {
  id: number;
  name: string;
  address: string;
  type: string;
  units: number;
  totalShares: number;
  availableShares: number;
  pricePerShare: number;
  shareholders: Shareholder[];
}


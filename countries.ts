export interface Country {
  name: string;
  code: string;
  coordinates: { lat: number; lng: number };
}

export const countries: Country[] = [
  { name: 'United States', code: 'US', coordinates: { lat: 37.09, lng: -95.71 } },
  { name: 'Canada', code: 'CA', coordinates: { lat: 56.13, lng: -106.35 } },
  { name: 'Mexico', code: 'MX', coordinates: { lat: 23.63, lng: -102.55 } },
  { name: 'Brazil', code: 'BR', coordinates: { lat: -14.24, lng: -51.93 } },
  { name: 'Argentina', code: 'AR', coordinates: { lat: -38.42, lng: -63.62 } },
  { name: 'United Kingdom', code: 'GB', coordinates: { lat: 55.38, lng: -3.44 } },
  { name: 'France', code: 'FR', coordinates: { lat: 46.23, lng: 2.21 } },
  { name: 'Germany', code: 'DE', coordinates: { lat: 51.17, lng: 10.45 } },
  { name: 'Italy', code: 'IT', coordinates: { lat: 41.87, lng: 12.57 } },
  { name: 'Spain', code: 'ES', coordinates: { lat: 40.46, lng: -3.75 } },
  { name: 'Russia', code: 'RU', coordinates: { lat: 61.52, lng: 105.32 } },
  { name: 'China', code: 'CN', coordinates: { lat: 35.86, lng: 104.20 } },
  { name: 'Japan', code: 'JP', coordinates: { lat: 36.20, lng: 138.25 } },
  { name: 'India', code: 'IN', coordinates: { lat: 20.59, lng: 78.96 } },
  { name: 'Australia', code: 'AU', coordinates: { lat: -25.27, lng: 133.78 } },
  { name: 'Egypt', code: 'EG', coordinates: { lat: 26.82, lng: 30.80 } },
  { name: 'South Africa', code: 'ZA', coordinates: { lat: -30.56, lng: 22.94 } },
  { name: 'Thailand', code: 'TH', coordinates: { lat: 15.87, lng: 100.99 } },
  { name: 'Indonesia', code: 'ID', coordinates: { lat: -0.79, lng: 113.92 } },
  { name: 'Turkey', code: 'TR', coordinates: { lat: 38.96, lng: 35.24 } },
  { name: 'Greece', code: 'GR', coordinates: { lat: 39.07, lng: 21.82 } },
  { name: 'Portugal', code: 'PT', coordinates: { lat: 39.40, lng: -8.22 } },
  { name: 'Netherlands', code: 'NL', coordinates: { lat: 52.13, lng: 5.29 } },
  { name: 'Switzerland', code: 'CH', coordinates: { lat: 46.82, lng: 8.23 } },
  { name: 'Sweden', code: 'SE', coordinates: { lat: 60.13, lng: 18.64 } },
];

export const indianStates = [
  { name: 'Maharashtra', coordinates: { lat: 19.75, lng: 75.71 } },
  { name: 'Karnataka', coordinates: { lat: 15.32, lng: 75.71 } },
  { name: 'Tamil Nadu', coordinates: { lat: 11.13, lng: 78.66 } },
  { name: 'Kerala', coordinates: { lat: 10.85, lng: 76.27 } },
  { name: 'Goa', coordinates: { lat: 15.30, lng: 74.12 } },
  { name: 'Rajasthan', coordinates: { lat: 27.02, lng: 74.22 } },
  { name: 'Gujarat', coordinates: { lat: 22.26, lng: 71.19 } },
  { name: 'Delhi', coordinates: { lat: 28.70, lng: 77.10 } },
  { name: 'Uttar Pradesh', coordinates: { lat: 26.85, lng: 80.95 } },
  { name: 'West Bengal', coordinates: { lat: 22.99, lng: 87.85 } },
  { name: 'Punjab', coordinates: { lat: 31.15, lng: 75.34 } },
  { name: 'Himachal Pradesh', coordinates: { lat: 31.10, lng: 77.17 } },
  { name: 'Uttarakhand', coordinates: { lat: 30.07, lng: 79.01 } },
  { name: 'Jammu and Kashmir', coordinates: { lat: 33.78, lng: 76.58 } },
  { name: 'Ladakh', coordinates: { lat: 34.15, lng: 77.58 } },
];

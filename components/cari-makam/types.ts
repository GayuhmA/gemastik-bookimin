export interface CemeteryItem {
  id: string;
  name: string;
  location: string;
  area: string;
  city: string;
  image: string;
  category: "Muslim" | "Kristen / Katolik" | "Universal";
  types: ("Single Reguler" | "Family (2-4 Liang)" | "VIP / Gazebo")[];
  price: number;
  priceFormatted: string;
  unitText: string;
  availability: number;
  facilities: string[];
  description: string;
  isRecommended?: boolean;
  readyToday: boolean;
}

export interface FilterState {
  searchQuery: string;
  selectedCity: string;
  category: string; // "Semua" | "Muslim" | "Kristen / Katolik" | "Universal"
  cemeteryTypes: string[];
  priceRange: [number, number];
  facilities: string[];
  readyTodayOnly: boolean;
  sortBy: "price_asc" | "price_desc" | "availability" | "popular";
}


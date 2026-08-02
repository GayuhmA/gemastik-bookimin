export type BookingType = "sekarang" | "persiapan";

export type Makam = {
  id: string;
  name: string;
  location: string;
  availability: string;
  totalSlots: number;
  availableSlots: number;
  type: string;
  price: number;
  isRecommendation?: boolean;
  imageUrl: string;
  description: string;
};

export const makamData: Makam[] = [
  {
    id: "1",
    name: "Al-Azhar Memorial Garden",
    location: "Yogyakarta, Sleman",
    availability: "100 Liang",
    totalSlots: 192,
    availableSlots: 184,
    type: "Regular & Family",
    price: 15000000,
    isRecommendation: true,
    imageUrl:
      "https://images.unsplash.com/photo-1542314831-c6a4d14effd0?auto=format&fit=crop&q=80",
    description:
      "Area pemakaman tertata dengan akses mudah, lingkungan tenang, dan pilihan petak untuk kebutuhan keluarga.",
  },
  {
    id: "2",
    name: "TPU Maguwoharjo",
    location: "Yogyakarta, Sleman",
    availability: "45 Liang",
    totalSlots: 160,
    availableSlots: 45,
    type: "Regular",
    price: 4500000,
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80",
    description:
      "TPU lokal dengan harga terjangkau dan lokasi strategis untuk area Sleman dan sekitarnya.",
  },
  {
    id: "3",
    name: "TPU Bantul Indah",
    location: "Yogyakarta, Bantul",
    availability: "20 Liang",
    totalSlots: 120,
    availableSlots: 20,
    type: "Family VIP",
    price: 12000000,
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80",
    description:
      "Pilihan petak keluarga dengan area lebih privat dan fasilitas pendukung untuk prosesi pemakaman.",
  },
  {
    id: "4",
    name: "Pemakaman Kota Baru",
    location: "Kota Yogyakarta",
    availability: "Sedikit",
    totalSlots: 100,
    availableSlots: 12,
    type: "Regular",
    price: 8000000,
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80",
    description:
      "Pemakaman di area kota dengan akses cepat dan ketersediaan terbatas untuk kebutuhan mendesak.",
  },
];

export const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

export const getMakamById = (id: string) =>
  makamData.find((makam) => makam.id === id) ?? makamData[0];

export const parseBookingType = (value?: string): BookingType =>
  value === "persiapan" || value === "false" ? "persiapan" : "sekarang";

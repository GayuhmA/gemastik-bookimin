export const adminDashboardStats = {
  totalMakam: 42,
  ambulance: 42,
  florist: 42,
  jasaKepengurusan: 42,
};

export const adminChartData = [
  { name: "0", makam: 700, addon: 730 },
  { name: "1", makam: 800, addon: 870 },
  { name: "2", makam: 850, addon: 840 },
  { name: "3", makam: 530, addon: 550 },
  { name: "4", makam: 920, addon: 950 },
  { name: "5", makam: 750, addon: 120 },
  { name: "6", makam: 0, addon: 380 },
  { name: "7", makam: 120, addon: 360 },
  { name: "8", makam: 420, addon: 380 },
  { name: "9", makam: 560, addon: 360 },
];

export const adminRecentTransactions = [
  {
    orderId: "#BKM-99121",
    mitra: "Mitra Makam Al-Azhar",
    layanan: "Makam",
    pemesan: "Budi Santoso",
    status: "Selesai",
  },
  {
    orderId: "#BKM-99221",
    mitra: "Mitra Ambulans Siaga",
    layanan: "Ambulans",
    pemesan: "Budi Santoso",
    status: "Selesai",
  },
  {
    orderId: "#BKM-99321",
    mitra: "Mitra Florist Indah",
    layanan: "Florist",
    pemesan: "Budi Santoso",
    status: "Selesai",
  },
  {
    orderId: "#BKM-99421",
    mitra: "Mitra Florist Indah",
    layanan: "Florist",
    pemesan: "Budi Santoso",
    status: "Selesai",
  },
];

export const adminMitraList = [
  {
    id: "m1",
    name: "Al-Azhar Memorial Garden",
    type: "Makam",
    email: "admin@alazhar.com",
    status: "Aktif",
  },
  {
    id: "m2",
    name: "Ambulans Siaga 24/7",
    type: "Ambulans",
    email: "siaga@ambulans.id",
    status: "Aktif",
  },
  {
    id: "m3",
    name: "Bunga Duka Lestari",
    type: "Florist",
    email: "hello@bungalestari.com",
    status: "Nonaktif",
  },
];

export const adminMitraDetail = {
  id: "m1",
  name: "Al-Azhar Memorial Garden",
  type: "Makam",
  joinDate: "12 Jul 2026",
  ownerName: "Budi Al-Azhar",
  phone: "123456789101112",
  location: "Yogyakarta, Sleman",
  capacity: "120 Liang / Petak",
  managedBlocks: "Blok A (Reguler), Blok B (VIP)",
  documents: [
    { name: "KTP_Pemilik.png" },
    { name: "SIUP_Perusahaan.png" },
    { name: "Sertifikat_Lahan.png" }
  ]
};

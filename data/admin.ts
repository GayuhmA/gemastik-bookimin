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
    orderId: "BKM-99121",
    tanggal: "12 Ags 2026, 10:30 WIB",
    mitra: "Mitra Makam Al-Azhar",
    layanan: "Makam",
    pemesan: "Budi Santoso",
    totalHarga: 25000000,
    statusPembayaran: "Paid",
    status: "Selesai",
    jenisPemesanan: "Untuk Persiapan",
  },
  {
    orderId: "BKM-99221",
    tanggal: "12 Ags 2026, 11:00 WIB",
    mitra: "Mitra Ambulans Siaga",
    layanan: "Ambulans",
    pemesan: "Siti Aminah",
    totalHarga: 1500000,
    statusPembayaran: "Pending",
    status: "Menunggu Pembayaran",
    jenisPemesanan: "Untuk Sekarang",
  },
  {
    orderId: "BKM-99321",
    tanggal: "11 Ags 2026, 15:45 WIB",
    mitra: "Mitra Florist Indah",
    layanan: "Florist",
    pemesan: "Andi Wijaya",
    totalHarga: 750000,
    statusPembayaran: "Paid",
    status: "Diproses",
    jenisPemesanan: "Untuk Sekarang",
  },
  {
    orderId: "BKM-99421",
    tanggal: "10 Ags 2026, 09:15 WIB",
    mitra: "Al-Azhar Memorial Garden",
    layanan: "Makam",
    pemesan: "Dewi Lestari",
    totalHarga: 32000000,
    statusPembayaran: "Failed",
    status: "Dibatalkan",
    jenisPemesanan: "Untuk Persiapan",
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

export const adminIklanStats = {
  menungguPersetujuan: 2,
  iklanAktif: 4,
  totalPendapatan: 1000000,
};

export const adminIklanList = [
  {
    id: "ADS-001",
    mitra: "Al-Azhar Memorial",
    tipe: "SEO Ranking",
    durasi: "30 Hari",
    keterangan: "Pencarian Sleman",
    tarif: 500000,
    status: "Menunggu Persetujuan",
  },
  {
    id: "ADS-002",
    mitra: "Ambulans Siaga 24/7",
    tipe: "Popup Banner",
    durasi: "7 Hari",
    keterangan: "Beranda App",
    tarif: 250000,
    status: "Menunggu Pembayaran",
  },
  {
    id: "ADS-003",
    mitra: "Bunga Duka Lestari",
    tipe: "Popup Banner",
    durasi: "14 Hari",
    keterangan: "Kategori Florist",
    tarif: 400000,
    status: "Aktif",
  },
  {
    id: "ADS-004",
    mitra: "Jasa Urus Mandiri",
    tipe: "SEO Ranking",
    durasi: "30 Hari",
    keterangan: "Pencarian Global",
    tarif: 500000,
    status: "Selesai",
  },
  {
    id: "ADS-005",
    mitra: "San Diego Hills",
    tipe: "Popup Banner",
    durasi: "7 Hari",
    keterangan: "Beranda App",
    tarif: 250000,
    status: "Ditolak",
  },
];

export const adminPenarikanDanaList = [
  {
    id: "WD-1001",
    tanggal: "13 Ags 2026, 09:00 WIB",
    mitra: "Al-Azhar Memorial Garden",
    bank: "BCA",
    noRekening: "1234567890",
    atasNama: "PT Al-Azhar Memorial",
    nominal: 50000000,
    status: "Pending",
  },
  {
    id: "WD-1002",
    tanggal: "12 Ags 2026, 14:30 WIB",
    mitra: "Ambulans Siaga 24/7",
    bank: "Mandiri",
    noRekening: "0987654321",
    atasNama: "Budi Siaga",
    nominal: 3500000,
    status: "Approved",
  },
  {
    id: "WD-1003",
    tanggal: "10 Ags 2026, 11:15 WIB",
    mitra: "Bunga Duka Lestari",
    bank: "BNI",
    noRekening: "1122334455",
    atasNama: "Siti Florist",
    nominal: 1200000,
    status: "Rejected",
    alasanReject: "Nama rekening tidak sesuai dengan KTP pemilik",
  },
];

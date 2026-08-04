export const mitraDashboardStats = {
  pesananMasuk: 2,
  pesananDiproses: 4,
  saldoTersedia: 1000000,
};

export const mitraRecentOrders = [
  {
    orderId: "ORD-99121",
    layanan: "Lahan Makam Single",
    petakInfo: "Blok A (Petak: A-012)",
    kustomer: "Andi Saputra",
    kustomerPhone: "0812-9988-7766",
    waktuMasuk: "Hari ini, 10:24 WIB",
    status: "Menunggu Konfirmasi",
    detailFormulir: {
      namaJenazah: "Bpk. Ahmad Sujatmiko",
      agama: "Islam",
      tglWafat: "15 Agustus 2026",
      hubunganPemesan: "Anak Kandung",
      keteranganKhusus: "Pesanan Mendesak (At-Need).",
      addons: ["Ambulance Jenazah", "Jasa Pengurusan Administrasi"],
    },
  },
  {
    orderId: "ORD-99122",
    layanan: "Lahan Makam Family",
    petakInfo: "Blok Family (Petak: F-003)",
    kustomer: "Dwi Maharani",
    kustomerPhone: "0856-1122-3344",
    waktuMasuk: "Hari ini, 09:12 WIB",
    status: "Menunggu Konfirmasi",
    detailFormulir: {
      namaJenazah: "Ibu Siti Rohmah",
      agama: "Islam",
      tglWafat: "Belum (Pre-Need)",
      hubunganPemesan: "Suami",
      keteranganKhusus: "Persiapan lahan makam keluarga.",
      addons: ["Jasa Pengurusan Administrasi"],
    },
  },
  {
    orderId: "ORD-99118",
    layanan: "Lahan Makam Single",
    petakInfo: "Blok B (Petak: B-088)",
    kustomer: "Hendra Cipta",
    kustomerPhone: "0811-2233-4455",
    waktuMasuk: "Kemarin, 15:30 WIB",
    status: "Diproses",
    detailFormulir: {
      namaJenazah: "Sdr. Budi Santoso",
      agama: "Kristen",
      tglWafat: "14 Agustus 2026",
      hubunganPemesan: "Saudara",
      keteranganKhusus: "Mohon siapkan tenda tambahan.",
      addons: ["Tenda & Kursi", "Karangan Bunga"],
    },
  },
];

export const mitraLayanan = [
  {
    petakId: "PTK-001",
    nama: "Blok A (Petak: A-012)",
    kategori: "Single",
    harga: 15000000,
    status: "tersedia",
    foto: ["https://placehold.co/400x300?text=Blok+A"],
    deskripsi: "Lahan makam standar untuk 1 jenazah. Lokasi strategis dekat jalan utama.",
  },
  {
    petakId: "PTK-002",
    nama: "Blok Family (Petak: F-003)",
    kategori: "Family",
    harga: 45000000,
    status: "tersedia",
    foto: ["https://placehold.co/400x300?text=Blok+Family"],
    deskripsi: "Kapasitas hingga 4 jenazah dalam satu petak eksklusif. Area khusus keluarga.",
  },
  {
    petakId: "PTK-003",
    nama: "Blok B (Petak: B-088)",
    kategori: "Single",
    harga: 12500000,
    status: "terisi",
    foto: ["https://placehold.co/400x300?text=Blok+B"],
    deskripsi: "Lahan makam standar untuk 1 jenazah. Lingkungan asri.",
  },
  {
    petakId: "PTK-004",
    nama: "Blok VVIP (Petak: V-001)",
    kategori: "VVIP",
    harga: 85000000,
    status: "tersedia",
    foto: ["https://placehold.co/400x300?text=Blok+VVIP"],
    deskripsi: "Lahan makam premium dengan privasi ekstra dan fasilitas perawatan prioritas.",
  },
];

export const mitraIklan = [
  {
    iklanId: "ADS-001",
    mitraId: "MITRA-001",
    tipe: "SEO",
    durasi: 30, // days
    hargaUsd: 60, // 30 days * $2
    status: "aktif",
    targetMakam: "Al Azhar Memorial Garden",
    createdAt: "10 Agustus 2026",
    alasanReject: "",
  },
  {
    iklanId: "ADS-002",
    mitraId: "MITRA-001",
    tipe: "Popup",
    durasi: 7,
    hargaUsd: 21, // 7 days * $3
    status: "menunggu_bayar",
    targetMakam: "Al Azhar Memorial Garden",
    createdAt: "22 Agustus 2026",
    alasanReject: "",
  },
  {
    iklanId: "ADS-003",
    mitraId: "MITRA-001",
    tipe: "SEO",
    durasi: 14,
    hargaUsd: 28,
    status: "pending",
    targetMakam: "Al Azhar Memorial Garden",
    createdAt: "25 Agustus 2026",
    alasanReject: "",
  },
  {
    iklanId: "ADS-004",
    mitraId: "MITRA-001",
    tipe: "Popup",
    durasi: 7,
    hargaUsd: 21,
    status: "rejected",
    targetMakam: "Al Azhar Memorial Garden",
    createdAt: "01 Agustus 2026",
    alasanReject: "Materi iklan tidak sesuai pedoman platform. Harap unggah ulang.",
  }
];

export const mitraKeuangan = {
  balance: 245000000, // 245 Juta IDR
  savedBank: {
    bank: "BCA",
    noRekening: "8765432109",
    atasNama: "PT Al Azhar Memorial",
  }
};

export const mitraWithdrawals = [
  {
    withdrawalId: "WD-001",
    mitraId: "MITRA-001",
    nominal: 50000000,
    rekening: { bank: "BCA", noRekening: "8765432109", atasNama: "PT Al Azhar Memorial" },
    status: "pending",
    createdAt: "04 Agustus 2026",
    alasanReject: "",
  },
  {
    withdrawalId: "WD-002",
    mitraId: "MITRA-001",
    nominal: 150000000,
    rekening: { bank: "BCA", noRekening: "8765432109", atasNama: "PT Al Azhar Memorial" },
    status: "approved",
    createdAt: "20 Juli 2026",
    alasanReject: "",
  },
  {
    withdrawalId: "WD-003",
    mitraId: "MITRA-001",
    nominal: 25000000,
    rekening: { bank: "BCA", noRekening: "8765432109", atasNama: "PT Al Azhar Memorial" },
    status: "rejected",
    createdAt: "10 Juli 2026",
    alasanReject: "Nomor rekening tidak valid atau telah ditutup.",
  }
];

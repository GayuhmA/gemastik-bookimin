import Link from "next/link";
import { ArrowLeft, User, Phone, MapPin, Receipt, Clock, FileText, CheckCircle2 } from "lucide-react";

export default async function TransaksiDetailPage({ params }: { params: Promise<{ transaksiId: string }> }) {
  const resolvedParams = await params;
  const { transaksiId } = resolvedParams;

  // Mock data untuk detail
  const detail = {
    orderId: transaksiId,
    tanggal: "12 Ags 2026, 10:30 WIB",
    status: "Diproses",
    statusPembayaran: "Paid",
    jenisPemesanan: "Untuk Persiapan",
    pemesan: {
      nama: "Budi Santoso",
      nik: "3404012345678901",
      kontak: "081234567890",
      alamat: "Jl. Kaliurang Km 9, Sleman, Yogyakarta",
    },
    jenazah: {
      nama: "Siti Aminah",
      tglLahir: "15 Mei 1950",
      tglWafat: "-", // karena untuk persiapan
    },
    ahliWaris: {
      nama: "Andi Wijaya",
      kontak: "089876543210",
      hubungan: "Anak Kandung",
    },
    makam: {
      mitraId: "m1",
      namaMitra: "Al-Azhar Memorial Garden",
      tpu: "TPU Al-Azhar VIP",
      kategoriPetak: "Single VIP",
      hargaDasar: 25000000,
    },
    addons: [
      {
        kategori: "Ambulans",
        namaMitra: "Ambulans Siaga 24/7",
        item: "Ambulans VIP (Alphard)",
        harga: 1500000,
      },
      {
        kategori: "Karangan Bunga",
        namaMitra: "Bunga Duka Lestari",
        item: "Standing Flower Premium",
        harga: 750000,
      }
    ],
  };

  const totalAddons = detail.addons.reduce((acc, curr) => acc + curr.harga, 0);
  const totalKeseluruhan = detail.makam.hargaDasar + totalAddons;

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "selesai": return "bg-green-100 text-green-700";
      case "menunggu pembayaran": return "bg-yellow-100 text-yellow-700";
      case "diproses": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/transaksi"
          className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">Detail Pesanan #{detail.orderId}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(detail.status)}`}>
              {detail.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Dibuat pada {detail.tanggal} • {detail.jenisPemesanan}</p>
        </div>
      </div>

      {/* Split Card Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Kolom Kiri (70%) */}
        <div className="w-full lg:w-2/3 space-y-6">
          
          {/* Card 1: Data Pemesan & Jenazah */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User size={20} className="text-primary" />
              Informasi Pihak Terkait
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 border-b pb-2 mb-3">Data Pemesan</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-500 text-xs">Nama Lengkap</div>
                    <div className="font-medium text-gray-800">{detail.pemesan.nama}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">NIK</div>
                    <div className="font-medium text-gray-800">{detail.pemesan.nik}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Kontak</div>
                    <div className="font-medium text-gray-800 flex items-center gap-1.5">
                      <Phone size={14} className="text-gray-400" /> {detail.pemesan.kontak}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Alamat</div>
                    <div className="font-medium text-gray-800">{detail.pemesan.alamat}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 border-b pb-2 mb-3">Data Jenazah (Calon)</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-gray-500 text-xs">Nama</div>
                      <div className="font-medium text-gray-800">{detail.jenazah.nama}</div>
                    </div>
                    <div className="flex gap-6">
                      <div>
                        <div className="text-gray-500 text-xs">Tgl Lahir</div>
                        <div className="font-medium text-gray-800">{detail.jenazah.tglLahir}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Tgl Wafat</div>
                        <div className="font-medium text-gray-800">{detail.jenazah.tglWafat}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {detail.jenisPemesanan === "Untuk Persiapan" && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 border-b pb-2 mb-3">Kontak Ahli Waris</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-gray-500 text-xs">Nama & Hubungan</div>
                        <div className="font-medium text-gray-800">{detail.ahliWaris.nama} ({detail.ahliWaris.hubungan})</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Kontak</div>
                        <div className="font-medium text-gray-800 flex items-center gap-1.5">
                          <Phone size={14} className="text-gray-400" /> {detail.ahliWaris.kontak}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Detail Makam */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-primary" />
              Detail Pemakaman
            </h2>
            <div className="flex flex-col sm:flex-row justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Mitra Penyedia Makam</div>
                <div className="font-semibold text-gray-800 text-base">{detail.makam.namaMitra}</div>
                <div className="text-sm text-gray-600">Lahan: {detail.makam.tpu} — <span className="font-medium text-primary">{detail.makam.kategoriPetak}</span></div>
              </div>
              <div className="mt-4 sm:mt-0 text-left sm:text-right">
                <div className="text-sm text-gray-500">Harga Lahan</div>
                <div className="font-bold text-gray-800 text-lg mt-1">{formatRupiah(detail.makam.hargaDasar)}</div>
              </div>
            </div>
          </div>

          {/* Card 3: Layanan Tambahan (Add-ons) */}
          {detail.addons.length > 0 && (
            <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-primary" />
                Layanan Tambahan (Add-ons)
              </h2>
              <div className="space-y-3">
                {detail.addons.map((addon, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between p-4 border border-gray-100 rounded-lg hover:border-primary/30 transition-colors">
                    <div>
                      <div className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">{addon.kategori}</div>
                      <div className="font-medium text-gray-800">{addon.item}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Mitra: {addon.namaMitra}</div>
                    </div>
                    <div className="mt-2 sm:mt-0 text-left sm:text-right self-start sm:self-center">
                      <div className="font-semibold text-gray-700">{formatRupiah(addon.harga)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Kolom Kanan (30%) */}
        <div className="w-full lg:w-1/3 space-y-6">
          
          {/* Card 4: Rincian Pembayaran */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Receipt size={20} className="text-primary" />
              Rincian Harga
            </h2>
            
            <div className="space-y-3 text-sm mb-4 pb-4 border-b border-dashed border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Harga Dasar Lahan</span>
                <span className="font-medium text-gray-800">{formatRupiah(detail.makam.hargaDasar)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Layanan Tambahan</span>
                <span className="font-medium text-gray-800">{formatRupiah(totalAddons)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-gray-800">Total Keseluruhan</span>
              <span className="text-xl font-bold text-primary">{formatRupiah(totalKeseluruhan)}</span>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-3">
              <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
              <div>
                <div className="text-xs text-emerald-700 font-medium uppercase tracking-wider">Status Pembayaran</div>
                <div className="font-bold text-emerald-800">LUNAS (Midtrans)</div>
              </div>
            </div>
          </div>

          {/* Card 5: Riwayat Status */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              Riwayat Pesanan
            </h2>
            
            <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute -left-[11px]">
                  <CheckCircle2 size={12} />
                </div>
                <div className="w-full">
                  <div className="flex flex-col">
                    <div className="font-bold text-slate-900 text-sm">Pesanan Diproses</div>
                    <time className="text-xs font-medium text-primary mb-1">12 Ags 2026, 10:45 WIB</time>
                    <div className="text-slate-500 text-xs">Mitra menerima pesanan dan sedang memproses permintaan.</div>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-emerald-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute -left-[11px]">
                  <CheckCircle2 size={12} />
                </div>
                <div className="w-full">
                  <div className="flex flex-col">
                    <div className="font-bold text-slate-900 text-sm">Pembayaran Berhasil</div>
                    <time className="text-xs font-medium text-emerald-600 mb-1">12 Ags 2026, 10:35 WIB</time>
                    <div className="text-slate-500 text-xs">Pembayaran Lunas via Midtrans.</div>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-slate-300 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute -left-[11px]">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="w-full">
                  <div className="flex flex-col">
                    <div className="font-bold text-slate-900 text-sm">Pesanan Dibuat</div>
                    <time className="text-xs font-medium text-slate-500 mb-1">12 Ags 2026, 10:30 WIB</time>
                    <div className="text-slate-500 text-xs">Menunggu pembayaran dari customer.</div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

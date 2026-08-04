"use client";

import { X, UploadCloud, Map } from "lucide-react";
import { useState } from "react";

interface TambahLayananModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TambahLayananModal({ isOpen, onClose }: TambahLayananModalProps) {
  const [activeTab, setActiveTab] = useState("massal"); // 'satuan' | 'massal'

  // Form states for 'Massal'
  const [formData, setFormData] = useState({
    namaBlok: "",
    kategori: "Single",
    prefix: "",
    rangeStart: "1",
    rangeEnd: "50",
    harga: "",
    deskripsi: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotalPetak = () => {
    const start = parseInt(formData.rangeStart) || 0;
    const end = parseInt(formData.rangeEnd) || 0;
    if (end >= start) {
      return end - start + 1;
    }
    return 0;
  };

  const handleGenerateClick = () => {
    const total = calculateTotalPetak();
    console.log(`Meng-generate ${total} petak untuk blok ${formData.namaBlok}...`);
    // Implement API call here later
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20">
          <h2 className="text-lg font-bold text-gray-900">Tambah Layanan (Lahan/Petak)</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-gray-200 px-6 pt-2 bg-gray-50/50">
          <button
            onClick={() => setActiveTab("satuan")}
            className={`pb-3 px-4 text-[13px] font-bold border-b-2 transition-colors ${
              activeTab === "satuan"
                ? "border-[#0D9488] text-[#0D9488]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Tambah Satuan (Single)
          </button>
          <button
            onClick={() => setActiveTab("massal")}
            className={`pb-3 px-4 text-[13px] font-bold border-b-2 transition-colors ${
              activeTab === "massal"
                ? "border-[#0D9488] text-[#0D9488]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Tambah Massal (Generate Blok)
          </button>
        </div>

        <div className="p-6">
          {activeTab === "satuan" ? (
            <div className="py-12 flex flex-col items-center justify-center text-gray-400">
              <Map size={48} className="mb-4 opacity-50" />
              <p className="text-[14px]">Formulir tambah satuan sedang disiapkan.</p>
              <p className="text-[12px] mt-1">Silakan gunakan fitur Tambah Massal.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Row 1: Nama Blok & Kategori */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Nama Blok (Grup)</label>
                  <input
                    type="text"
                    name="namaBlok"
                    value={formData.namaBlok}
                    onChange={handleChange}
                    placeholder="Misal: Blok VIP Mawar"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Kategori Petak</label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] bg-white"
                  >
                    <option value="Single">Single (1.5 x 2.5m)</option>
                    <option value="Family">Family (3.0 x 3.0m)</option>
                    <option value="VVIP">VVIP / Private Estate</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Penamaan Petak (Prefix + Rentang) */}
              <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-4">
                <label className="block text-[12px] font-bold text-teal-900 mb-3">Aturan Penamaan Petak (Otomatis)</label>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Prefix</label>
                    <input
                      type="text"
                      name="prefix"
                      value={formData.prefix}
                      onChange={handleChange}
                      placeholder="Misal: MWR-"
                      className="w-full px-3 py-2 border border-teal-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] bg-white"
                    />
                  </div>
                  <div className="w-[100px]">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Mulai Nomor</label>
                    <input
                      type="number"
                      name="rangeStart"
                      value={formData.rangeStart}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-teal-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] bg-white"
                    />
                  </div>
                  <div className="w-[100px]">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Sampai Nomor</label>
                    <input
                      type="number"
                      name="rangeEnd"
                      value={formData.rangeEnd}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-teal-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] bg-white"
                    />
                  </div>
                </div>
                {formData.prefix && (
                  <div className="mt-3 text-[11px] text-teal-700 bg-teal-100/50 px-3 py-2 rounded-md">
                    Sistem akan membuat <strong>{calculateTotalPetak()} petak</strong> dengan nama mulai dari <strong className="font-mono">{formData.prefix}{formData.rangeStart}</strong> hingga <strong className="font-mono">{formData.prefix}{formData.rangeEnd}</strong>.
                  </div>
                )}
              </div>

              {/* Row 3: Harga Dasar */}
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Harga Dasar per Petak (Rp)</label>
                <input
                  type="number"
                  name="harga"
                  value={formData.harga}
                  onChange={handleChange}
                  placeholder="Misal: 15000000"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
                <p className="text-[11px] text-gray-500 mt-1.5">Harga ini akan diterapkan ke semua petak yang di-generate. Anda dapat mengedit harga petak khusus (misal: di posisi hook) nanti dari halaman Layanan.</p>
              </div>

              {/* Row 4: Deskripsi */}
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Deskripsi / Info Tambahan</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Jelaskan spesifikasi atau keunggulan petak ini..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {activeTab === "massal" && (
          <div className="border-t border-gray-100 p-6 bg-gray-50 flex items-center justify-between rounded-b-2xl">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 bg-gray-100 rounded-lg text-[13px] font-bold transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleGenerateClick}
              disabled={calculateTotalPetak() <= 0}
              className="px-6 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] disabled:bg-teal-300 disabled:cursor-not-allowed text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm"
            >
              Generate {calculateTotalPetak() > 0 ? calculateTotalPetak() : ""} Petak
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

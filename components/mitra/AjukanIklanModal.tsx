"use client";

import { X, Search, MonitorPlay } from "lucide-react";
import { useState, useMemo } from "react";

interface AjukanIklanModalProps {
  isOpen: boolean;
  onClose: () => void;
  usdToIdrRate: number;
}

export default function AjukanIklanModal({ isOpen, onClose, usdToIdrRate }: AjukanIklanModalProps) {
  const [formData, setFormData] = useState({
    tipe: "SEO",
    durasi: "7",
  });

  const makamName = "Al Azhar Memorial Garden"; // Static for MVP, usually fetched from context

  // Static pricing in USD
  const PRICING_USD = {
    SEO: 2, // $2 per day
    Popup: 3, // $3 per day
  };

  const calculateCost = useMemo(() => {
    const dailyRateUsd = PRICING_USD[formData.tipe as keyof typeof PRICING_USD];
    const duration = parseInt(formData.durasi) || 0;
    const totalUsd = dailyRateUsd * duration;
    const totalIdr = totalUsd * usdToIdrRate;

    return { totalUsd, totalIdr };
  }, [formData.tipe, formData.durasi, usdToIdrRate]);

  if (!isOpen) return null;

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatIdr = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20">
          <h2 className="text-lg font-bold text-gray-900">Ajukan Iklan Baru</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Target Promosi */}
          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Target Promosi (Makam)</label>
            <div className="w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-lg text-[13px] text-gray-700 font-medium flex items-center gap-2 cursor-not-allowed opacity-80">
              <span className="w-2 h-2 rounded-full bg-[#0D9488]"></span>
              {makamName}
            </div>
            <p className="text-[11px] text-gray-500 mt-1.5">Iklan akan diarahkan langsung ke halaman profil makam Anda secara keseluruhan.</p>
          </div>

          {/* Tipe Iklan */}
          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-3">Pilih Tipe Iklan</label>
            <div className="grid grid-cols-2 gap-3">
              {/* Option 1: SEO */}
              <div 
                onClick={() => handleChange("tipe", "SEO")}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  formData.tipe === "SEO" 
                    ? "border-[#0D9488] bg-teal-50/30" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded-lg ${formData.tipe === "SEO" ? "bg-[#0D9488] text-white" : "bg-gray-100 text-gray-500"}`}>
                    <Search size={20} />
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    formData.tipe === "SEO" ? "border-[#0D9488]" : "border-gray-300"
                  }`}>
                    {formData.tipe === "SEO" && <div className="w-2 h-2 rounded-full bg-[#0D9488]"></div>}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-[14px]">SEO Booster</h3>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">Peringkat teratas di halaman pencarian Cari Makam.</p>
                <div className="mt-3 font-bold text-[#0D9488] text-[13px]">${PRICING_USD.SEO} <span className="font-medium text-[10px] text-gray-500">/ hari</span></div>
              </div>

              {/* Option 2: Popup */}
              <div 
                onClick={() => handleChange("tipe", "Popup")}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  formData.tipe === "Popup" 
                    ? "border-[#0D9488] bg-teal-50/30" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded-lg ${formData.tipe === "Popup" ? "bg-[#0D9488] text-white" : "bg-gray-100 text-gray-500"}`}>
                    <MonitorPlay size={20} />
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    formData.tipe === "Popup" ? "border-[#0D9488]" : "border-gray-300"
                  }`}>
                    {formData.tipe === "Popup" && <div className="w-2 h-2 rounded-full bg-[#0D9488]"></div>}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-[14px]">Popup Banner</h3>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">Tampil sekilas saat pelanggan pertama kali membuka web.</p>
                <div className="mt-3 font-bold text-[#0D9488] text-[13px]">${PRICING_USD.Popup} <span className="font-medium text-[10px] text-gray-500">/ hari</span></div>
              </div>
            </div>
          </div>

          {/* Durasi */}
          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Durasi Penayangan</label>
            <select
              value={formData.durasi}
              onChange={(e) => handleChange("durasi", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] bg-white cursor-pointer"
            >
              <option value="7">Paket 7 Hari</option>
              <option value="14">Paket 14 Hari</option>
              <option value="30">Paket 30 Hari</option>
            </select>
          </div>

          {/* Estimasi Biaya */}
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[12px] text-gray-500">Durasi Terpilih</span>
              <span className="text-[13px] font-bold text-gray-900">{formData.durasi} Hari</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[12px] text-gray-500">Rate Asing (USD)</span>
              <span className="text-[13px] font-bold text-gray-900">${calculateCost.totalUsd.toFixed(2)}</span>
            </div>
            
            <div className="pt-3 border-t border-gray-200 border-dashed flex justify-between items-center">
              <div>
                <div className="text-[12px] font-bold text-gray-700">Total Estimasi (IDR)</div>
                <div className="text-[10px] text-gray-400 mt-0.5">Realtime Exchange Rate</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-[#0D9488]">{formatIdr(calculateCost.totalIdr)}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-100 p-6 bg-gray-50 flex items-center justify-between rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 bg-gray-100 rounded-lg text-[13px] font-bold transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => {
              console.log("Submit Iklan:", formData);
              onClose();
            }}
            className="px-6 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm"
          >
            Ajukan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

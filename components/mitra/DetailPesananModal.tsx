"use client";

import { X, UserCircle2, Phone, FileText, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

interface DetailPesananModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export default function DetailPesananModal({ isOpen, onClose, order }: DetailPesananModalProps) {
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Reset state when modal is closed or order changes
  useEffect(() => {
    setIsRejecting(false);
    setRejectReason("");
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "menunggu konfirmasi":
        return "bg-yellow-100 text-yellow-700";
      case "diproses":
        return "bg-blue-100 text-blue-700";
      case "selesai":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleRejectClick = () => {
    if (!isRejecting) {
      setIsRejecting(true);
    } else {
      // Submit reject
      console.log("Pesanan ditolak dengan alasan:", rejectReason);
      onClose();
    }
  };

  const handleAcceptClick = () => {
    console.log("Pesanan diterima:", order.orderId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-gray-900">
            {order.status.toLowerCase() === "diproses" ? "Informasi Pesanan" : "Detail Pesanan Masuk"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="p-6">
          {/* Top Section: ID & Status */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-[12px] text-gray-500 font-medium mb-1">Order ID</div>
              <div className="text-xl font-bold text-gray-900">#{order.orderId}</div>
            </div>
            <div className="text-right">
              <div className="text-[12px] text-gray-500 font-medium mb-1">Status</div>
              <span className={`px-3 py-1 text-[11px] font-bold rounded-full ${getStatusBadge(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Customer Card */}
          <div className="bg-[#F8FAFC] border border-slate-100 rounded-xl p-4 flex items-center gap-4 mb-6">
            <UserCircle2 size={40} className="text-slate-400" />
            <div>
              <div className="font-bold text-gray-900 text-[14px]">{order.kustomer}</div>
              <div className="text-[12px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                <Phone size={12} /> {order.kustomerPhone}
              </div>
            </div>
          </div>

          {/* Service Detail */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-[11px] text-gray-500 font-medium mb-1">Layanan Dipesan</div>
              <div className="font-bold text-gray-900 text-[13px]">{order.layanan}</div>
            </div>
            <div>
              <div className="text-[11px] text-gray-500 font-medium mb-1">Spesifik / Detail</div>
              <div className="font-bold text-gray-900 text-[13px]">{order.petakInfo}</div>
            </div>
          </div>

          {/* Data Kustomer Form */}
          {order.detailFormulir && (
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
              <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <FileText size={16} className="text-blue-500" />
                <h3 className="text-[13px] font-bold text-gray-900">Formulir Data Kustomer</h3>
              </div>
              <div className="p-4 grid grid-cols-2 gap-y-5 gap-x-4">
                <div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-wider uppercase mb-1">Nama Jenazah</div>
                  <div className="text-[13px] font-medium text-gray-900">{order.detailFormulir.namaJenazah}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-wider uppercase mb-1">Tgl Wafat</div>
                  <div className="text-[13px] font-medium text-gray-900">{order.detailFormulir.tglWafat}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-wider uppercase mb-1">Agama</div>
                  <div className="text-[13px] font-medium text-gray-900">{order.detailFormulir.agama}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-wider uppercase mb-1">Hubungan Pemesan</div>
                  <div className="text-[13px] font-medium text-gray-900">{order.detailFormulir.hubunganPemesan}</div>
                </div>
                
                <div className="col-span-2">
                  <div className="text-[10px] text-gray-500 font-bold tracking-wider uppercase mb-1">Keterangan Khusus</div>
                  <div className="text-[13px] font-medium text-gray-900">{order.detailFormulir.keteranganKhusus}</div>
                </div>

                {order.detailFormulir.addons && order.detailFormulir.addons.length > 0 && (
                  <div className="col-span-2 mt-2">
                    <div className="text-[11px] text-gray-500 mb-2">Layanan Tambahan (Add-ons):</div>
                    <div className="flex flex-wrap gap-2">
                      {order.detailFormulir.addons.map((addon: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[11px] font-medium">
                          {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reject Reason Input (Conditionally rendered for Menunggu Konfirmasi) */}
          {order.status.toLowerCase() === "menunggu konfirmasi" && isRejecting && (
            <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
              <label className="block text-[12px] font-bold text-red-900 mb-2">
                Alasan Penolakan <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Tulis alasan singkat pesanan ditolak..."
                className="w-full px-3 py-2 border border-red-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white resize-none"
                rows={3}
              />
            </div>
          )}

          {/* Actions */}
          {order.status.toLowerCase() === "menunggu konfirmasi" && (
            <div className="flex gap-4">
              <button
                onClick={handleRejectClick}
                className={`flex-1 py-3 rounded-lg text-[13px] font-bold transition-colors ${
                  isRejecting
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-sm"
                    : "bg-red-50 hover:bg-red-100 text-red-600"
                }`}
              >
                {isRejecting ? "Kirim Penolakan" : "Tolak Pesanan"}
              </button>
              
              {!isRejecting && (
                <button
                  onClick={handleAcceptClick}
                  className="flex-[2] flex items-center justify-center gap-2 bg-[#059669] hover:bg-emerald-700 text-white py-3 rounded-lg text-[13px] font-bold transition-colors shadow-sm"
                >
                  <CheckCircle2 size={18} />
                  Terima Pesanan
                </button>
              )}
              
              {isRejecting && (
                <button
                  onClick={() => setIsRejecting(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg text-[13px] font-bold transition-colors"
                >
                  Batal
                </button>
              )}
            </div>
          )}

          {order.status.toLowerCase() === "diproses" && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-[13px] text-gray-500 text-center max-w-sm">
                Pastikan pesanan/layanan telah benar-benar dieksekusi sebelum menandainya selesai.
              </p>
              <button
                onClick={() => {
                  console.log("Pesanan diselesaikan:", order.orderId);
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#059669] hover:bg-emerald-700 text-white py-3 rounded-lg text-[13px] font-bold transition-colors shadow-sm"
              >
                <CheckCircle2 size={18} />
                Tandai Selesai
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

"use client";

import { adminIklanList, adminIklanStats } from "@/data/admin";
import { Search, Info, Megaphone, DollarSign, X, Check, Image as ImageIcon, TrendingUp } from "lucide-react";
import { useState } from "react";
import ConfirmActionModal from "@/components/admin/ConfirmActionModal";

export default function AdminIklanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [iklanList, setIklanList] = useState(adminIklanList);
  
  // Modal states
  const [actionModal, setActionModal] = useState<{
    isOpen: boolean;
    iklanId: string;
    actionType: "approve" | "reject" | null;
  }>({
    isOpen: false,
    iklanId: "",
    actionType: null,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Menunggu Persetujuan":
        return <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-100 text-amber-700">Menunggu Persetujuan</span>;
      case "Menunggu Pembayaran":
        return <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-100 text-blue-700">Menunggu Pembayaran</span>;
      case "Aktif":
        return <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-700">Aktif</span>;
      case "Selesai":
        return <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700">Selesai</span>;
      case "Ditolak":
        return <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-rose-100 text-rose-700">Ditolak</span>;
      default:
        return <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredList = iklanList.filter((item) =>
    item.mitra.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openConfirmModal = (iklanId: string, actionType: "approve" | "reject") => {
    setActionModal({ isOpen: true, iklanId, actionType });
  };

  const handleConfirmAction = () => {
    if (!actionModal.iklanId || !actionModal.actionType) return;

    setIklanList((prev) =>
      prev.map((item) => {
        if (item.id === actionModal.iklanId) {
          return {
            ...item,
            status: actionModal.actionType === "approve" ? "Menunggu Pembayaran" : "Ditolak",
          };
        }
        return item;
      })
    );
  };

  const targetIklan = iklanList.find(i => i.id === actionModal.iklanId);

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">Kelola Iklan</h1>
          <p className="text-gray-500 text-[14px]">Manajemen dan persetujuan ruang promosi (Popup Banner & SEO) untuk mitra.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 shrink-0">
              <Info size={24} />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-500 mb-1">Menunggu Persetujuan</p>
              <h3 className="text-[28px] font-bold text-gray-900 leading-none">{adminIklanStats.menungguPersetujuan}</h3>
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shrink-0">
              <Megaphone size={24} />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-500 mb-1">Iklan Aktif</p>
              <h3 className="text-[28px] font-bold text-gray-900 leading-none">{adminIklanStats.iklanAktif}</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 shrink-0">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-500 mb-1">Total Pendapatan Iklan</p>
              <h3 className="text-[22px] font-bold text-gray-900 leading-none">{formatRupiah(adminIklanStats.totalPendapatan)}</h3>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-end">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Cari nama mitra..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-gray-100 text-left">
                  <th className="px-6 py-4 text-[12px] font-semibold text-gray-600 whitespace-nowrap">ID Pengajuan</th>
                  <th className="px-6 py-4 text-[12px] font-semibold text-gray-600 whitespace-nowrap">Mitra Pemohon</th>
                  <th className="px-6 py-4 text-[12px] font-semibold text-gray-600 whitespace-nowrap">Tipe Iklan & Durasi</th>
                  <th className="px-6 py-4 text-[12px] font-semibold text-gray-600 whitespace-nowrap">Tarif Iklan</th>
                  <th className="px-6 py-4 text-[12px] font-semibold text-gray-600 whitespace-nowrap">Status Iklan</th>
                  <th className="px-6 py-4 text-[12px] font-semibold text-gray-600 whitespace-nowrap text-right">Aksi Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredList.map((iklan) => (
                  <tr key={iklan.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-[13px] font-medium text-gray-900 whitespace-nowrap">
                      {iklan.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[14px] font-medium text-gray-900 block">{iklan.mitra}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 mb-1">
                        {iklan.tipe === "SEO Ranking" ? (
                          <TrendingUp size={14} className="text-purple-500" />
                        ) : (
                          <ImageIcon size={14} className="text-blue-500" />
                        )}
                        <span className="text-[13px] font-semibold text-gray-800">{iklan.tipe}</span>
                      </div>
                      <span className="text-[12px] text-gray-500">{iklan.durasi} • {iklan.keterangan}</span>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-semibold text-gray-900 whitespace-nowrap">
                      {formatRupiah(iklan.tarif)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(iklan.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {iklan.status === "Menunggu Persetujuan" && (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => openConfirmModal(iklan.id, "reject")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 text-[12px] font-medium transition-colors"
                          >
                            <X size={14} /> Tolak
                          </button>
                          <button 
                            onClick={() => openConfirmModal(iklan.id, "approve")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-[12px] font-medium transition-colors shadow-sm"
                          >
                            <Check size={14} /> Setujui
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                
                {filteredList.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-[14px]">
                      Tidak ada pengajuan iklan yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmActionModal
        isOpen={actionModal.isOpen}
        onClose={() => setActionModal({ ...actionModal, isOpen: false })}
        onConfirm={handleConfirmAction}
        title={actionModal.actionType === "approve" ? "Setujui Iklan" : "Tolak Iklan"}
        message={
          actionModal.actionType === "approve"
            ? `Apakah Anda yakin ingin menyetujui pengajuan iklan dari ${targetIklan?.mitra}? Tagihan pembayaran akan diterbitkan.`
            : `Apakah Anda yakin ingin menolak pengajuan iklan dari ${targetIklan?.mitra}?`
        }
        confirmText={actionModal.actionType === "approve" ? "Setujui" : "Tolak"}
        confirmStyle={actionModal.actionType === "approve" ? "success" : "danger"}
      />
    </main>
  );
}

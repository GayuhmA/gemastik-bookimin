"use client";

import { adminPenarikanDanaList } from "@/data/admin";
import TransaksiTabs from "@/components/admin/TransaksiTabs";
import ConfirmActionModal from "@/components/admin/ConfirmActionModal";
import { useState } from "react";
import { Check, X } from "lucide-react";

export default function PenarikanDanaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    confirmText: "",
    confirmStyle: "primary" as "primary" | "danger" | "success",
    actionType: "", // "approve" or "reject"
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleActionClick = (action: "approve" | "reject", itemData: any) => {
    if (action === "approve") {
      setModalConfig({
        title: "Setujui Penarikan?",
        message: `Anda akan menyetujui penarikan dana sebesar ${formatRupiah(itemData.nominal)} untuk mitra ${itemData.mitra}. Saldo mitra akan otomatis dikurangi.`,
        confirmText: "Setujui",
        confirmStyle: "success",
        actionType: "approve",
      });
    } else {
      setModalConfig({
        title: "Tolak Penarikan?",
        message: `Anda akan menolak permintaan penarikan dana dari mitra ${itemData.mitra}. Pastikan Anda memberikan alasan penolakan.`,
        confirmText: "Tolak Penarikan",
        confirmStyle: "danger",
        actionType: "reject",
      });
    }
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    // Implement API call logic here (for now we mock it)
    console.log(`Action ${modalConfig.actionType} executed`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Transaksi</h1>
        <p className="text-gray-500 text-sm mt-1">Pantau seluruh pesanan dan status pembayarannya.</p>
      </div>

      <TransaksiTabs />

      {/* Action & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
          <option value="">Semua Status</option>
          <option value="pending">Menunggu Persetujuan</option>
          <option value="approved">Disetujui</option>
          <option value="rejected">Ditolak</option>
        </select>
      </div>

      {/* Table Data */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">ID Penarikan</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Tanggal</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Mitra</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Info Rekening</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Nominal</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {adminPenarikanDanaList.map((wd, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">#{wd.id}</td>
                  <td className="px-6 py-4 text-gray-600">{wd.tanggal}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{wd.mitra}</td>
                  <td className="px-6 py-4">
                    <div className="text-gray-800">{wd.bank} - {wd.noRekening}</div>
                    <div className="text-xs text-gray-500 mt-0.5">a.n {wd.atasNama}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {formatRupiah(wd.nominal)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${getStatusBadge(wd.status)}`}>
                      {wd.status}
                    </span>
                    {wd.status === "Rejected" && wd.alasanReject && (
                      <div className="text-[10px] text-red-500 mt-1 max-w-[150px] truncate" title={wd.alasanReject}>
                        {wd.alasanReject}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {wd.status === "Pending" ? (
                        <>
                          <button 
                            onClick={() => handleActionClick("approve", wd)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                            title="Setujui"
                          >
                            <Check size={18} />
                          </button>
                          <button 
                            onClick={() => handleActionClick("reject", wd)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                            title="Tolak"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmStyle={modalConfig.confirmStyle}
      />
    </div>
  );
}

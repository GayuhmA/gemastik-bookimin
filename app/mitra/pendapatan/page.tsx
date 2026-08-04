"use client";

import { mitraKeuangan, mitraWithdrawals, mitraRecentOrders } from "@/data/mitra";
import { Search, Wallet, ArrowDownRight, ArrowUpRight, Calendar } from "lucide-react";
import { useState } from "react";
import TarikDanaModal from "@/components/mitra/TarikDanaModal";

export default function MitraPendapatanPage() {
  const [activeTab, setActiveTab] = useState("Riwayat Pemasukan");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Local state to simulate balance deduction
  const [currentBalance, setCurrentBalance] = useState(mitraKeuangan.balance);
  const [localWithdrawals, setLocalWithdrawals] = useState(mitraWithdrawals);

  const tabs = ["Riwayat Pemasukan", "Riwayat Penarikan Dana"];

  const formatIdr = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Pemasukan: Hanya pesanan yang sudah selesai
  const pemasukanList = mitraRecentOrders.filter((order) => order.status.toLowerCase() === "selesai");

  // Handlers
  const handleWithdrawalSuccess = (nominal: number, bankData: any) => {
    // 1. Deduct balance immediately
    setCurrentBalance((prev) => prev - nominal);
    
    // 2. Add to history
    const newWd = {
      withdrawalId: `WD-NEW-${Math.floor(Math.random() * 1000)}`,
      mitraId: "MITRA-001",
      nominal: nominal,
      rekening: bankData,
      status: "pending",
      createdAt: "Baru saja",
      alasanReject: "",
    };
    setLocalWithdrawals([newWd, ...localWithdrawals]);
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Keuangan & Pendapatan</h1>
        <p className="text-gray-500 text-[14px] mt-1">Kelola saldo dan pantau riwayat transaksi Anda.</p>
      </div>

      {/* Balance Dashboard Card */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-8 text-white mb-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Wallet size={120} />
        </div>
        
        <div className="relative z-10">
          <p className="text-gray-400 text-[14px] font-medium mb-2">Saldo Aktif Tersedia</p>
          <div className="text-4xl sm:text-5xl font-black mb-8 tracking-tight">
            {formatIdr(currentBalance)}
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-8 py-3 rounded-lg text-[14px] font-bold transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <ArrowUpRight size={18} />
            Tarik Dana
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSearchQuery("");
            }}
            className={`py-3 px-6 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "border-[#0D9488] text-[#0D9488]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden p-4">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder={activeTab === "Riwayat Pemasukan" ? "Cari ID Pesanan..." : "Cari ID Penarikan..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg text-[13px] text-gray-600 bg-gray-50 cursor-not-allowed">
            <Calendar size={16} />
            <span>Filter Tanggal</span>
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
            
            {activeTab === "Riwayat Pemasukan" && (
              <>
                <thead className="border-b border-gray-100 bg-gray-50/50">
                  <tr>
                    <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">ID Pesanan</th>
                    <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Waktu Selesai</th>
                    <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Keterangan (Petak)</th>
                    <th className="px-4 py-4 font-semibold text-gray-500 text-[12px] text-right">Nominal Pemasukan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pemasukanList.filter(o => o.orderId.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                    pemasukanList.filter(o => o.orderId.toLowerCase().includes(searchQuery.toLowerCase())).map((order) => (
                      <tr key={order.orderId} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-5 font-bold text-[#0F172A] text-[13px]">#{order.orderId}</td>
                        <td className="px-4 py-5 text-gray-500 text-[12px]">{order.waktuMasuk}</td>
                        <td className="px-4 py-5">
                          <div className="font-medium text-[#0F172A] text-[13px]">{order.layanan}</div>
                          <div className="text-[11px] text-gray-500 mt-1">{order.petakInfo}</div>
                        </td>
                        <td className="px-4 py-5 text-right">
                          <div className="inline-flex items-center gap-1.5 text-green-600 font-bold text-[14px]">
                            <ArrowDownRight size={16} />
                            + {formatIdr(15000000)} {/* Mocked static price for MVP */}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-12 text-center text-gray-500 text-[13px]">
                        Tidak ada riwayat pemasukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}

            {activeTab === "Riwayat Penarikan Dana" && (
              <>
                <thead className="border-b border-gray-100 bg-gray-50/50">
                  <tr>
                    <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">ID Penarikan</th>
                    <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Tanggal</th>
                    <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Rekening Tujuan</th>
                    <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Nominal</th>
                    <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {localWithdrawals.filter(w => w.withdrawalId.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                    localWithdrawals.filter(w => w.withdrawalId.toLowerCase().includes(searchQuery.toLowerCase())).map((wd) => (
                      <tr key={wd.withdrawalId} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-5 font-bold text-[#0F172A] text-[13px]">#{wd.withdrawalId}</td>
                        <td className="px-4 py-5 text-gray-500 text-[12px]">{wd.createdAt}</td>
                        <td className="px-4 py-5">
                          <div className="font-bold text-[#0F172A] text-[13px]">{wd.rekening.bank} - {wd.rekening.noRekening}</div>
                          <div className="text-[11px] text-gray-500 mt-1">a.n {wd.rekening.atasNama}</div>
                        </td>
                        <td className="px-4 py-5">
                          <div className="font-bold text-gray-900 text-[13px]">
                            {formatIdr(wd.nominal)}
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <span className={`px-2.5 py-1 border text-[11px] font-bold rounded-full ${
                            wd.status === "approved" ? "bg-green-100 text-green-700 border-green-200" :
                            wd.status === "pending" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                            "bg-red-100 text-red-700 border-red-200"
                          }`}>
                            {wd.status.charAt(0).toUpperCase() + wd.status.slice(1)}
                          </span>
                          {wd.status === "rejected" && wd.alasanReject && (
                            <div className="text-[10px] text-red-500 mt-1.5 max-w-[200px] whitespace-normal leading-relaxed">
                              {wd.alasanReject}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-gray-500 text-[13px]">
                        Tidak ada riwayat penarikan dana.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}

          </table>
        </div>
      </div>

      {/* Modal Tarik Dana */}
      <TarikDanaModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentBalance={currentBalance}
        savedBank={mitraKeuangan.savedBank}
        onSuccess={handleWithdrawalSuccess}
      />
    </div>
  );
}

"use client";

import { mitraIklan } from "@/data/mitra";
import { Search, Plus, Megaphone, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import AjukanIklanModal from "@/components/mitra/AjukanIklanModal";

export default function MitraIklanPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const formatIdr = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const tabs = ["Semua", "Aktif", "Menunggu Bayar", "Pending", "Selesai", "Ditolak"];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "aktif":
        return "bg-green-100 text-green-700 border-green-200";
      case "menunggu_bayar":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "pending":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "selesai":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatStatusText = (status: string) => {
    if (status === "menunggu_bayar") return "Menunggu Bayar";
    if (status === "rejected") return "Ditolak";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredIklan = mitraIklan.filter((item) => {
    const matchesTab = activeTab === "Semua" || 
      (activeTab.toLowerCase() === "ditolak" && item.status === "rejected") ||
      (activeTab.toLowerCase() === "menunggu bayar" && item.status === "menunggu_bayar") ||
      item.status.toLowerCase() === activeTab.toLowerCase();
      
    const matchesSearch = item.iklanId.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tipe.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Calculate stats
  const totalAktif = mitraIklan.filter(i => i.status === "aktif").length;
  const totalMenungguBayar = mitraIklan.filter(i => i.status === "menunggu_bayar").length;
  const totalPending = mitraIklan.filter(i => i.status === "pending").length;

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Iklan</h1>
          <p className="text-gray-500 text-[14px] mt-1">Kelola dan ajukan promosi untuk visibilitas makam Anda.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm"
        >
          <Plus size={18} />
          Ajukan Iklan
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <Megaphone size={24} />
          </div>
          <div>
            <p className="text-[13px] text-gray-500 font-medium">Iklan Aktif</p>
            <p className="text-2xl font-bold text-gray-900">{totalAktif}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-[13px] text-gray-500 font-medium">Menunggu Bayar</p>
            <p className="text-2xl font-bold text-gray-900">{totalMenungguBayar}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-[13px] text-gray-500 font-medium">Menunggu Persetujuan</p>
            <p className="text-2xl font-bold text-gray-900">{totalPending}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
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
        
        {/* Search Bar */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Cari ID Iklan atau Tipe..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-colors"
            />
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
            <thead className="border-b border-gray-100 bg-gray-50/50">
              <tr>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">ID Iklan</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Tipe & Durasi</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Target Promosi</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Estimasi Biaya</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Status</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredIklan.length > 0 ? (
                filteredIklan.map((item) => (
                  <tr key={item.iklanId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-5 font-bold text-[#0F172A] text-[13px]">#{item.iklanId}</td>
                    
                    <td className="px-4 py-5">
                      <div className="font-bold text-[#0F172A] text-[13px]">Iklan {item.tipe}</div>
                      <div className="text-[11px] text-gray-500 mt-1">{item.durasi} Hari</div>
                    </td>
                    
                    <td className="px-4 py-5">
                      <div className="font-medium text-[#0F172A] text-[13px] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0D9488]"></span>
                        {item.targetMakam}
                      </div>
                    </td>
                    
                    <td className="px-4 py-5">
                      <div className="font-bold text-[#0F172A] text-[13px]">
                        {formatIdr(item.harga)}
                      </div>
                    </td>
                    
                    <td className="px-4 py-5">
                      <span className={`px-2.5 py-1 border text-[11px] font-bold rounded-full ${getStatusBadge(item.status)}`}>
                        {formatStatusText(item.status)}
                      </span>
                      {item.status === "rejected" && item.alasanReject && (
                        <div className="text-[10px] text-red-500 mt-1.5 max-w-[150px] whitespace-normal">
                          {item.alasanReject}
                        </div>
                      )}
                    </td>
                    
                    <td className="px-4 py-5 text-right">
                      {item.status === "menunggu_bayar" ? (
                        <button className="inline-block px-4 py-1.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-[11px] font-bold rounded-md transition-colors shadow-sm">
                          Bayar Sekarang
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500 text-[13px]">
                    Tidak ada iklan yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal Ajukan Iklan */}
      <AjukanIklanModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

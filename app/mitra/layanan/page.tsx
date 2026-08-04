"use client";

import { mitraLayanan } from "@/data/mitra";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import TambahLayananModal from "@/components/mitra/TambahLayananModal";

export default function MitraLayananPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const tabs = ["Semua", "Tersedia", "Terisi"];

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const filteredLayanan = mitraLayanan.filter((item) => {
    const matchesTab = activeTab === "Semua" || item.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.kategori.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Layanan Anda</h1>
          <p className="text-gray-500 text-[14px] mt-1">Kelola inventaris lahan, armada, atau katalog produk toko Anda.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm"
        >
          <Plus size={18} />
          Tambah Layanan
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-6 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "border-green-500 text-green-600"
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
              placeholder="Cari nama atau kategori layanan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
            <thead className="border-b border-gray-100 bg-gray-50/50">
              <tr>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Info Layanan (Petak)</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Kategori</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Harga</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Status</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLayanan.length > 0 ? (
                filteredLayanan.map((item) => (
                  <tr key={item.petakId} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-4 py-4 max-w-[250px]">
                      <div className="font-bold text-[#0F172A] text-[13px] truncate">{item.nama}</div>
                      <div className="text-[11px] text-gray-500 mt-1 truncate" title={item.deskripsi}>
                        {item.deskripsi}
                      </div>
                    </td>
                    
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-bold rounded-md">
                        {item.kategori}
                      </span>
                    </td>
                    
                    <td className="px-4 py-4">
                      <div className="font-bold text-emerald-600 text-[13px]">
                        {formatRupiah(item.harga)}
                      </div>
                    </td>
                    
                    <td className="px-4 py-4">
                      {item.status.toLowerCase() === "tersedia" ? (
                        <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 text-[11px] font-bold rounded-full flex items-center inline-flex gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Tersedia
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 border border-gray-200 text-[11px] font-bold rounded-full flex items-center inline-flex gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                          Terisi
                        </span>
                      )}
                    </td>
                    
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit Layanan">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hapus Layanan">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-500 text-[13px]">
                    Layanan tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal Tambah Layanan */}
      <TambahLayananModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

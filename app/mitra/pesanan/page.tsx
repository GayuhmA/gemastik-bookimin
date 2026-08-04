"use client";

import { mitraRecentOrders } from "@/data/mitra";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DetailPesananModal from "@/components/mitra/DetailPesananModal";

export default function MitraPesananPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ["Semua", "Menunggu Konfirmasi", "Diproses", "Selesai", "Ditolak"];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "menunggu konfirmasi":
        return "bg-yellow-100 text-yellow-700";
      case "diproses":
        return "bg-blue-100 text-blue-700";
      case "selesai":
        return "bg-green-100 text-green-700";
      case "ditolak":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Pesanan</h1>
        <p className="text-gray-500 text-[14px] mt-1">Daftar pesanan dari pelanggan</p>
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
              placeholder="Cari ID atau Kustomer..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
            />
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
            <thead className="border-b border-gray-100">
              <tr>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">ID Pesanan</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Layanan & Detail</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Kustomer</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Waktu Pesan</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px]">Status</th>
                <th className="px-4 py-4 font-semibold text-gray-500 text-[12px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mitraRecentOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-5 font-bold text-[#0F172A] text-[13px]">#{order.orderId}</td>
                  
                  <td className="px-4 py-5">
                    <div className="font-bold text-[#0F172A] text-[13px]">{order.layanan}</div>
                    <div className="text-[11px] text-gray-500 mt-1">{order.petakInfo}</div>
                  </td>
                  
                  <td className="px-4 py-5">
                    <div className="font-bold text-[#0F172A] text-[13px]">{order.kustomer}</div>
                    <div className="text-[11px] text-gray-500 mt-1">{order.kustomerPhone}</div>
                  </td>
                  
                  <td className="px-4 py-5 text-gray-500 text-[12px]">{order.waktuMasuk}</td>
                  
                  <td className="px-4 py-5">
                    <span className={`px-3 py-1 text-[11px] font-bold rounded-full ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  
                  <td className="px-4 py-5 text-right">
                    {order.status.toLowerCase() === "menunggu konfirmasi" ? (
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        className="inline-block px-5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-[12px] font-medium rounded-full transition-colors shadow-sm"
                      >
                        Respons
                      </button>
                    ) : order.status.toLowerCase() === "diproses" ? (
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        className="inline-block px-5 py-2 bg-[#059669] hover:bg-emerald-700 text-white text-[12px] font-medium rounded-full transition-colors shadow-sm"
                      >
                        Selesaikan
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal Detail Pesanan */}
      <DetailPesananModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTimeout(() => setSelectedOrder(null), 200); // clear after animation
        }}
        order={selectedOrder}
      />
    </div>
  );
}

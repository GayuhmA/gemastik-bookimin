"use client";

import { mitraDashboardStats, mitraRecentOrders } from "@/data/mitra";
import { Bell, Activity, DollarSign, Eye } from "lucide-react";
import Link from "next/link";

export default function MitraDashboardPage() {
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

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

  return (
    <div className="p-8 pb-20 px-36">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Mitra</h1>
        <p className="text-gray-500 text-[14px] mt-1">Selamat datang, pantau pesanan dan performa toko Anda disini.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Card 1: Pesanan Masuk */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
            <Bell size={24} className="text-yellow-500" />
          </div>
          <div>
            <div className="text-gray-500 text-[13px] font-medium mb-1">Pesanan Masuk</div>
            <div className="text-3xl font-bold text-gray-900">{mitraDashboardStats.pesananMasuk}</div>
          </div>
        </div>

        {/* Card 2: Pesanan Diproses */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <Activity size={24} className="text-green-500" />
          </div>
          <div>
            <div className="text-gray-500 text-[13px] font-medium mb-1">Pesanan Diproses</div>
            <div className="text-3xl font-bold text-gray-900">{mitraDashboardStats.pesananDiproses}</div>
          </div>
        </div>

        {/* Card 3: Saldo Tersedia */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
            <DollarSign size={24} className="text-[#6366F1]" />
          </div>
          <div>
            <div className="text-gray-500 text-[13px] font-medium mb-1">Saldo Tersedia</div>
            <div className="text-2xl font-bold text-gray-900">{formatRupiah(mitraDashboardStats.saldoTersedia)}</div>
          </div>
        </div>

      </div>

      {/* Recent Orders Section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-gray-900">Pesanan Masuk Terbaru</h2>
        <Link href="/mitra/pesanan" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          Lihat semua
        </Link>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
            <thead className="bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 font-semibold text-gray-500 text-[13px]">ID Pesanan</th>
                <th className="px-6 py-5 font-semibold text-gray-500 text-[13px]">Layanan Dipesan</th>
                <th className="px-6 py-5 font-semibold text-gray-500 text-[13px]">Kustomer</th>
                <th className="px-6 py-5 font-semibold text-gray-500 text-[13px]">Waktu Masuk</th>
                <th className="px-6 py-5 font-semibold text-gray-500 text-[13px]">Status</th>
                <th className="px-6 py-5 font-semibold text-gray-500 text-[13px] text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mitraRecentOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 font-bold text-blue-500 text-[13px]">#{order.orderId}</td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-gray-800 text-[13px]">{order.layanan}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{order.petakInfo}</div>
                  </td>
                  <td className="px-6 py-5 font-medium text-gray-700 text-[13px]">{order.kustomer}</td>
                  <td className="px-6 py-5 text-gray-500 text-[13px]">{order.waktuMasuk}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 text-[11px] font-bold rounded-full ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    {order.status.toLowerCase() === "menunggu konfirmasi" ? (
                      <Link
                        href={`/mitra/pesanan/${order.orderId}`}
                        className="inline-block px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-medium rounded-full transition-colors"
                      >
                        Respons
                      </Link>
                    ) : (
                      <Link
                        href={`/mitra/pesanan/${order.orderId}`}
                        className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-700 transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye size={18} />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

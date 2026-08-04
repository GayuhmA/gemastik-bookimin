"use client";

import { adminRecentTransactions } from "@/data/admin";
import TransaksiTabs from "@/components/admin/TransaksiTabs";
import { Download, Search, Eye } from "lucide-react";
import Link from "next/link";

export default function TransaksiPage() {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "selesai":
        return "bg-green-100 text-green-700";
      case "menunggu pembayaran":
        return "bg-yellow-100 text-yellow-700";
      case "diproses":
        return "bg-blue-100 text-blue-700";
      case "dibatalkan":
      case "ditolak":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Transaksi</h1>
        <p className="text-gray-500 text-sm mt-1">Pantau seluruh pesanan dan status pembayarannya.</p>
      </div>

      <TransaksiTabs />

      {/* Action & Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari Order ID / Pemesan..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
            <option value="">Semua Mitra</option>
            <option value="m1">Al-Azhar Memorial Garden</option>
            <option value="m2">Ambulans Siaga</option>
          </select>
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
            <option value="">Semua Status</option>
            <option value="menunggu_pembayaran">Menunggu Pembayaran</option>
            <option value="diproses">Diproses</option>
            <option value="selesai">Selesai</option>
          </select>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/5 rounded-lg text-sm font-medium transition-colors shrink-0">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Table Data */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">Order ID</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Tanggal</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Nama Pemesan</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Mitra & Layanan</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Total Harga</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Pembayaran</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {adminRecentTransactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">#{tx.orderId}</td>
                  <td className="px-6 py-4 text-gray-600">{tx.tanggal}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{tx.pemesan}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{tx.jenisPemesanan}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-800">{tx.mitra}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Layanan: {tx.layanan}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {formatRupiah(tx.totalHarga || 0)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${getPaymentBadge(tx.statusPembayaran || "")}`}>
                      {tx.statusPembayaran}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${getStatusBadge(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link 
                      href={`/admin/transaksi/${tx.orderId}`}
                      className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Lihat Detail"
                    >
                      <Eye size={18} />
                    </Link>
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

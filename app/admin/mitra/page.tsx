"use client";

import { useState } from "react";
import { adminMitraList } from "@/data/admin";
import { Search, ChevronDown, Eye, SquarePen, Plus } from "lucide-react";
import Link from "next/link";
import AddMitraModal from "@/components/admin/AddMitraModal";
import EditMitraModal from "@/components/admin/EditMitraModal";

export default function AdminMitraPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editMitraId, setEditMitraId] = useState<string | null>(null);

  const getTipeBadge = (tipe: string) => {
    switch (tipe.toLowerCase()) {
      case "makam":
        return "bg-slate-100 text-slate-600";
      case "ambulans":
        return "bg-emerald-100 text-emerald-600";
      case "florist":
        return "bg-pink-100 text-pink-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    if (status.toLowerCase() === "aktif") {
      return "bg-emerald-100 text-emerald-600";
    }
    return "bg-rose-100 text-rose-600";
  };

  const filteredMitra = adminMitraList.filter((mitra) => {
    const matchesSearch = mitra.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "Semua Status" || mitra.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[22px] font-bold text-gray-900 mb-1">Kelola Mitra</h1>
            <p className="text-gray-500 text-[14px]">Kelola dan pantau semua mitra dalam sistem</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-5 py-2.5 rounded-md text-[13px] font-medium transition-colors shadow-sm"
          >
            Tambah <Plus size={16} />
          </button>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari nama mitra"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="relative shrink-0">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-40 appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-md text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Semua Status">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={14} className="text-gray-500" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] text-gray-600 whitespace-nowrap">
              <thead className="bg-white border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">Nama Mitra</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Tipe</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Email Login</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-center">Status Akun</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMitra.length > 0 ? (
                  filteredMitra.map((mitra) => (
                    <tr key={mitra.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">{mitra.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-md ${getTipeBadge(mitra.type)}`}>
                          {mitra.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{mitra.email}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${getStatusBadge(mitra.status)}`}>
                          {mitra.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <Link href={`/admin/mitra/${mitra.id}`} className="text-gray-400 hover:text-gray-700 transition-colors">
                            <Eye size={18} />
                          </Link>
                          <button 
                            onClick={() => setEditMitraId(mitra.id)}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <SquarePen size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Mitra tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddMitraModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <EditMitraModal
        isOpen={!!editMitraId}
        onClose={() => setEditMitraId(null)}
        mitraId={editMitraId || ""}
      />
    </main>
  );
}

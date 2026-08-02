"use client";

import { adminMitraDetail } from "@/data/admin";
import { Briefcase, User, MapPin, FileText, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EditMitraModal from "@/components/admin/EditMitraModal";

export default function MitraDetailPage({ params }: { params: { id: string } }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Unwrap params conceptually if needed in Next 15, but we just use mock data anyway.
  const mitra = adminMitraDetail;

  const handleNonaktifkan = () => {
    if (window.confirm(`Apakah Anda yakin ingin menonaktifkan mitra ${mitra.name}?`)) {
      alert("Mitra berhasil dinonaktifkan (Simulasi MVP)!");
    }
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb / Back Link */}
        <Link 
          href="/admin/mitra" 
          className="inline-flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Kembali ke Daftar Mitra
        </Link>

        <h1 className="text-[24px] font-bold text-gray-900 mb-8">Detail Mitra</h1>

        {/* Header Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#EEF2FF] rounded-full flex items-center justify-center text-blue-600 shrink-0">
              <Briefcase size={24} />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-gray-900">{mitra.name}</h2>
              <div className="flex items-center gap-2 text-[13px] text-gray-500 mt-1">
                <Calendar size={14} />
                <span>Terdaftar sejak {mitra.joinDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-5 py-2.5 rounded-md text-[13px] font-medium transition-colors shadow-sm"
            >
              Edit Mitra
            </button>
            <button 
              onClick={handleNonaktifkan}
              className="bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 px-5 py-2.5 rounded-md text-[13px] font-medium transition-colors"
            >
              Nonaktifkan
            </button>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Detail Mitra */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-[16px] font-bold text-gray-900 mb-6">Detail Mitra</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 mb-2">Nama Pemilik</p>
                  <div className="flex items-center gap-2 text-[14px] font-medium text-gray-900">
                    <User size={16} className="text-gray-400" />
                    {mitra.ownerName}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 mb-2">Nomor Handphone</p>
                  <div className="text-[14px] font-medium text-gray-900">
                    {mitra.phone}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[11px] font-semibold text-gray-500 mb-2">Lokasi Mitra</p>
                  <div className="flex items-center gap-2 text-[14px] font-medium text-gray-900">
                    <MapPin size={16} className="text-gray-400" />
                    {mitra.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Layanan Spesifik */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-[16px] font-bold text-gray-900 mb-6">Detail Layanan Spesifik</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-[11px] font-semibold text-gray-500 mb-2">Total Kapasitas Lahan</p>
                  <p className="text-[14px] font-medium text-gray-900">{mitra.capacity}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-[11px] font-semibold text-gray-500 mb-2">Blok yang Dikelola</p>
                  <p className="text-[14px] font-medium text-gray-900">{mitra.managedBlocks}</p>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column (Dokumen Legalitas) */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-[16px] font-bold text-gray-900 mb-6">Dokumen Legalitas</h3>
              <div className="space-y-4">
                {mitra.documents.map((doc, idx) => (
                  <div 
                    key={idx}
                    className="flex flex-col items-center justify-center p-6 bg-[#F8FAFC] border border-blue-100 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                      <FileText size={24} className="text-blue-500" />
                    </div>
                    <span className="text-[13px] font-medium text-gray-700">{doc.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <EditMitraModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        mitraId={mitra.id}
      />
    </main>
  );
}

"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { adminMitraDetail } from "@/data/admin";

interface EditMitraModalProps {
  isOpen: boolean;
  onClose: () => void;
  mitraId: string;
}

export default function EditMitraModal({ isOpen, onClose, mitraId }: EditMitraModalProps) {
  // In a real app, you'd fetch the specific mitra by mitraId.
  // For MVP, we'll just use the mock data.
  const [namaUsaha, setNamaUsaha] = useState(adminMitraDetail.name);
  const [penanggungJawab, setPenanggungJawab] = useState(adminMitraDetail.ownerName);
  const [kontak, setKontak] = useState(adminMitraDetail.phone);
  const [lokasi, setLokasi] = useState(adminMitraDetail.location);
  const [kapasitas, setKapasitas] = useState(adminMitraDetail.capacity);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setNamaUsaha(adminMitraDetail.name);
      setPenanggungJawab(adminMitraDetail.ownerName);
      setKontak(adminMitraDetail.phone);
      setLokasi(adminMitraDetail.location);
      setKapasitas(adminMitraDetail.capacity);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    alert("Perubahan profil mitra berhasil disimpan (Simulasi MVP)!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X size={20} strokeWidth={2} />
        </button>

        <div className="p-8">
          <h2 className="text-[18px] font-bold text-gray-900 mb-6">Edit Profil Usaha / Mitra</h2>

          <div className="mb-5">
            <label className="block text-[13px] font-semibold text-gray-700 mb-2">Nama Usaha / Makam</label>
            <input
              type="text"
              value={namaUsaha}
              onChange={(e) => setNamaUsaha(e.target.value)}
              placeholder="Masukkan nama usaha mitra..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">Nama Penanggung Jawab</label>
              <input
                type="text"
                value={penanggungJawab}
                onChange={(e) => setPenanggungJawab(e.target.value)}
                placeholder="Nama lengkap penanggung jawab"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">Nomor Kontak</label>
              <input
                type="tel"
                value={kontak}
                onChange={(e) => setKontak(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">
              Informasi Spesifik: Lahan Makam
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">Lokasi</label>
                <input
                  type="text"
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  placeholder="Alamat lengkap lokasi makam"
                  className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">Kapasitas Lahan</label>
                <input
                  type="text"
                  value={kapasitas}
                  onChange={(e) => setKapasitas(e.target.value)}
                  placeholder="Contoh: 500 petak"
                  className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-3.5 rounded-lg text-[14px] transition-colors shadow-md"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface AddMitraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type KategoriMitra = "Makam" | "Ambulans" | "Florist" | "Kepengurusan";

export default function AddMitraModal({ isOpen, onClose }: AddMitraModalProps) {
  const [kategori, setKategori] = useState<KategoriMitra>("Makam");

  if (!isOpen) return null;

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
          <h2 className="text-[18px] font-bold text-gray-900 mb-6">Informasi Login Akun</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-3">
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">Email Login</label>
              <input
                type="email"
                placeholder="contoh@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">Password Sementara</label>
              <input
                type="text"
                placeholder="Minimal 8 karakter"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mb-8 leading-relaxed">
            Kredensial ini akan digunakan mitra untuk mengakses dasbor pengelolaan mereka. Mitra dapat mengubah password ini nanti
          </p>

          <h2 className="text-[18px] font-bold text-gray-900 mb-5">Profil Usaha / Mitra</h2>

          <div className="mb-6">
            <label className="block text-[13px] font-semibold text-gray-700 mb-3">Pilih Kategori Mitra</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["Makam", "Ambulans", "Florist", "Kepengurusan"] as KategoriMitra[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setKategori(cat)}
                  className={`py-2 px-2 text-[13px] font-medium rounded-lg border transition-colors ${
                    kategori === cat
                      ? "bg-slate-50 border-[#0F172A] text-[#0F172A] ring-1 ring-[#0F172A]"
                      : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-[13px] font-semibold text-gray-700 mb-2">Nama Usaha / Makam</label>
            <input
              type="text"
              placeholder="Masukkan nama usaha mitra..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">Nama Penanggung Jawab</label>
              <input
                type="text"
                placeholder="Nama lengkap penanggung jawab"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">Nomor Kontak</label>
              <input
                type="tel"
                placeholder="Contoh: 081234567890"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Dynamic Section Based on Category */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">
              Informasi Spesifik: {kategori === "Makam" ? "Lahan Makam" : kategori}
            </h3>

            {kategori === "Makam" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">Lokasi</label>
                  <input
                    type="text"
                    placeholder="Alamat lengkap lokasi makam"
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">Kapasitas Lahan</label>
                  <input
                    type="text"
                    placeholder="Contoh: 500"
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {kategori === "Ambulans" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">Area Operasional</label>
                  <input
                    type="text"
                    placeholder="Contoh: DIY & Jawa Tengah"
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">Jumlah Armada Awal</label>
                  <input
                    type="number"
                    placeholder="Contoh: 5"
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {kategori === "Florist" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">Alamat Toko Bunga</label>
                  <input
                    type="text"
                    placeholder="Alamat lengkap toko fisik"
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {kategori === "Kepengurusan" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">Area Layanan Utama</label>
                  <input
                    type="text"
                    placeholder="Contoh: Jabodetabek"
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          <button className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-3.5 rounded-lg text-[14px] transition-colors shadow-md">
            Tambah Akun
          </button>
        </div>
      </div>
    </div>
  );
}

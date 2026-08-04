"use client";

import { X, Building2, User, CreditCard, AlertCircle, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";

interface TarikDanaModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  savedBank: {
    bank: string;
    noRekening: string;
    atasNama: string;
  };
  onSuccess: (nominal: number, bankData: any) => void;
}

export default function TarikDanaModal({ isOpen, onClose, currentBalance, savedBank, onSuccess }: TarikDanaModalProps) {
  const [nominalStr, setNominalStr] = useState("");
  const [isEditingBank, setIsEditingBank] = useState(false);
  
  const [bankData, setBankData] = useState({
    bank: "",
    noRekening: "",
    atasNama: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setNominalStr("");
      setErrorMsg("");
      setIsEditingBank(false);
      setBankData({ ...savedBank });
    }
  }, [isOpen, savedBank]);

  if (!isOpen) return null;

  const nominal = parseInt(nominalStr.replace(/\D/g, "")) || 0;

  const formatIdr = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setNominalStr(rawValue);
    setErrorMsg("");
  };

  const handleSubmit = () => {
    if (nominal < 50000) {
      setErrorMsg("Minimal penarikan adalah Rp 50.000");
      return;
    }
    if (nominal > currentBalance) {
      setErrorMsg("Saldo Anda tidak mencukupi untuk nominal ini.");
      return;
    }
    if (isEditingBank && (!bankData.bank || !bankData.noRekening || !bankData.atasNama)) {
      setErrorMsg("Harap lengkapi informasi rekening tujuan.");
      return;
    }

    onSuccess(nominal, bankData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20">
          <h2 className="text-lg font-bold text-gray-900">Tarik Dana</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Saldo Info */}
          <div className="bg-[#0F172A] rounded-xl p-4 text-white flex justify-between items-center shadow-sm">
            <div>
              <div className="text-[12px] text-gray-400 font-medium mb-1">Saldo Aktif Tersedia</div>
              <div className="text-xl font-bold">{formatIdr(currentBalance)}</div>
            </div>
            <div className="text-right">
              <button 
                onClick={() => setNominalStr(currentBalance.toString())}
                className="text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md transition-colors"
              >
                Tarik Semua
              </button>
            </div>
          </div>

          {/* Nominal Input */}
          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Nominal Penarikan</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rp</div>
              <input
                type="text"
                value={nominal > 0 ? new Intl.NumberFormat("id-ID").format(nominal) : ""}
                onChange={handleNominalChange}
                placeholder="0"
                className={`w-full pl-12 pr-4 py-3 border ${errorMsg ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]/20'} rounded-lg text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 transition-colors`}
              />
            </div>
            {errorMsg && (
              <div className="flex items-center gap-1.5 text-red-500 text-[11px] font-medium mt-2">
                <AlertCircle size={14} />
                {errorMsg}
              </div>
            )}
          </div>

          {/* Bank Account Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[12px] font-bold text-gray-700">Rekening Tujuan</label>
              {!isEditingBank && (
                <button 
                  onClick={() => setIsEditingBank(true)}
                  className="text-[11px] font-bold text-[#0D9488] hover:text-[#0F766E] flex items-center gap-1"
                >
                  <Edit2 size={12} />
                  Ubah Rekening
                </button>
              )}
            </div>

            {!isEditingBank ? (
              // Display Saved Bank
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-[14px]">{bankData.bank}</div>
                  <div className="text-gray-500 text-[13px] mt-0.5">{bankData.noRekening}</div>
                  <div className="text-gray-500 text-[12px] mt-1 font-medium">a.n {bankData.atasNama}</div>
                </div>
              </div>
            ) : (
              // Edit Bank Form
              <div className="space-y-4 border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Nama Bank</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      value={bankData.bank}
                      onChange={(e) => setBankData({...bankData, bank: e.target.value})}
                      placeholder="Misal: BCA, Mandiri"
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Nomor Rekening</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      value={bankData.noRekening}
                      onChange={(e) => setBankData({...bankData, noRekening: e.target.value.replace(/\D/g, "")})}
                      placeholder="Nomor rekening valid"
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Atas Nama</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      value={bankData.atasNama}
                      onChange={(e) => setBankData({...bankData, atasNama: e.target.value})}
                      placeholder="Nama pemilik rekening"
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                    />
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button 
                    onClick={() => setIsEditingBank(false)}
                    className="text-[12px] font-bold text-[#0D9488] hover:bg-teal-50 px-3 py-1.5 rounded-md transition-colors"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Rincian */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[12px] text-gray-500">Biaya Admin (Transfer)</span>
              <span className="text-[12px] font-medium text-gray-900">Rp 0</span>
            </div>
            <div className="flex justify-between items-center font-bold">
              <span className="text-[13px] text-gray-900">Total Diterima</span>
              <span className="text-[15px] text-[#0D9488]">{formatIdr(nominal)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-100 p-6 bg-gray-50 flex items-center justify-between rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 bg-gray-100 rounded-lg text-[13px] font-bold transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={nominal <= 0}
            className="px-6 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] disabled:bg-teal-300 disabled:cursor-not-allowed text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm"
          >
            Konfirmasi Tarik Dana
          </button>
        </div>
      </div>
    </div>
  );
}

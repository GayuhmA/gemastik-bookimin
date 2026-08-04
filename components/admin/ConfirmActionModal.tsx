"use client";

import { X } from "lucide-react";

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmStyle?: "danger" | "success" | "primary";
}

export default function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Konfirmasi",
  confirmStyle = "primary",
}: ConfirmActionModalProps) {
  if (!isOpen) return null;

  const getButtonStyle = () => {
    switch (confirmStyle) {
      case "danger":
        return "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500/20";
      case "success":
        return "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500/20";
      case "primary":
      default:
        return "bg-[#0F172A] hover:bg-[#1E293B] text-white focus:ring-slate-500/20";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X size={20} strokeWidth={2} />
        </button>

        <div className="p-6 pt-8 text-center">
          <h2 className="text-[18px] font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-[13px] text-gray-500 mb-8">{message}</p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-[13px] font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-4 py-2.5 rounded-lg text-[13px] font-medium focus:outline-none focus:ring-4 transition-colors ${getButtonStyle()}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

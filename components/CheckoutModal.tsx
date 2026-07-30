"use client";

import { BookingType, formatRupiah } from "@/data/makam";
import { CheckCircle2, X } from "lucide-react";
import { useMemo, useState } from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  makam: {
    id: string;
    name: string;
    type: string;
    price: number;
  };
  selectedSlot: string | null;
  selectedDate: string;
  initialBookingType?: BookingType;
}

type Step = 1 | 2 | 3 | 4;

type FormData = {
  namaJenazah: string;
  nik: string;
  tanggalLahir: string;
  tanggalWafat: string;
  namaPemesan: string;
  kontak: string;
  alamat: string;
  fotoKtp: string;
  ahliWarisNama: string;
  ahliWarisHp: string;
};

const addons = [
  { id: "ambulance", label: "🚑 Ambulance Jenazah", price: 800000 },
  { id: "perlengkapan_jenazah", label: "⚰️ Perlengkapan Jenazah", price: 1500000 },
  { id: "karangan_bunga", label: "💐 Karangan Bunga Duka Cita", price: 500000 },
  { id: "administrasi_makam", label: "📄 Jasa Pengurusan Administrasi", price: 300000 },
];

const emptyForm: FormData = {
  namaJenazah: "",
  nik: "",
  tanggalLahir: "",
  tanggalWafat: "",
  namaPemesan: "",
  kontak: "",
  alamat: "",
  fotoKtp: "",
  ahliWarisNama: "",
  ahliWarisHp: "",
};

export default function CheckoutModal({
  isOpen,
  onClose,
  makam,
  selectedSlot,
  selectedDate,
  initialBookingType = "sekarang",
}: CheckoutModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [type, setType] = useState<BookingType>(initialBookingType);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [error, setError] = useState("");

  const selectedAddonItems = useMemo(
    () => addons.filter((addon) => selectedAddons.includes(addon.id)),
    [selectedAddons]
  );

  const addonsTotal = selectedAddonItems.reduce((total, addon) => total + addon.price, 0);
  const grandTotal = makam.price + addonsTotal;

  if (!isOpen) return null;

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetModal = () => {
    setStep(1);
    setType(initialBookingType);
    setSelectedAddons([]);
    setFormData(emptyForm);
    setError("");
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const validateIdentityStep = () => {
    const requiredFields: Array<keyof FormData> = ["namaJenazah", "namaPemesan", "kontak", "alamat"];

    if (type === "sekarang") {
      requiredFields.push("tanggalWafat");
    } else {
      requiredFields.push("nik", "tanggalLahir", "fotoKtp", "ahliWarisNama", "ahliWarisHp");
    }

    const isInvalid = requiredFields.some((field) => !formData[field].trim());

    if (isInvalid) {
      setError("Lengkapi semua data wajib sebelum lanjut.");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateIdentityStep()) return;
    if (step === 3) {
      setStep(4);
      return;
    }
    setError("");
    setStep((current) => (current + 1) as Step);
  };

  const stepLabels = ["Data", "Add-ons", "Ringkasan"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl relative my-auto overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Checkout Pemesanan</h2>
            <p className="text-xs text-gray-500 mt-1">{makam.name} • Petak {selectedSlot ?? "-"}</p>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Tutup checkout">
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {step !== 4 && (
          <div className="px-6 pt-5">
            <div className="grid grid-cols-3 gap-2">
              {stepLabels.map((label, index) => {
                const itemStep = index + 1;
                const isActive = itemStep === step;
                const isDone = itemStep < step;
                return (
                  <div key={label} className={`rounded-full px-3 py-2 text-xs font-semibold text-center ${isActive || isDone ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}>
                    {itemStep}. {label}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Pilih tipe pemesanan</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { value: "sekarang" as const, title: "Untuk sekarang", desc: "Kebutuhan mendesak, jenazah akan segera dimakamkan." },
                    { value: "persiapan" as const, title: "Untuk persiapan", desc: "Reservasi lahan untuk kebutuhan di masa depan." },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setType(option.value)}
                      className={`p-4 rounded-lg border text-left transition-all ${type === option.value ? "border-primary shadow-sm ring-1 ring-primary" : "border-gray-300 hover:border-gray-400"}`}
                    >
                      <div className="font-semibold text-sm text-gray-900 mb-1">{option.title}</div>
                      <div className="text-xs text-gray-500 leading-snug">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Lengkapi data</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={type === "sekarang" ? "Nama Jenazah" : "Nama (Calon) Jenazah"} value={formData.namaJenazah} onChange={(value) => updateField("namaJenazah", value)} />
                  <Field label="Nama Pemesan" value={formData.namaPemesan} onChange={(value) => updateField("namaPemesan", value)} />
                  {type === "sekarang" ? (
                    <Field label="Tanggal Wafat" type="date" value={formData.tanggalWafat} onChange={(value) => updateField("tanggalWafat", value)} />
                  ) : (
                    <Field label="NIK" value={formData.nik} onChange={(value) => updateField("nik", value)} />
                  )}
                  <Field label="Tanggal Lahir" type="date" value={formData.tanggalLahir} onChange={(value) => updateField("tanggalLahir", value)} optional={type === "sekarang"} />
                  <Field label="Nomor Kontak (HP)" type="tel" value={formData.kontak} onChange={(value) => updateField("kontak", value)} />
                  <Field label="Alamat" value={formData.alamat} onChange={(value) => updateField("alamat", value)} />
                </div>

                {type === "persiapan" && (
                  <div className="space-y-5 mt-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-600">Foto KTP</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => updateField("fotoKtp", event.target.files?.[0]?.name ?? "")}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white"
                      />
                      {formData.fotoKtp && <p className="text-xs text-gray-500">Terpilih: {formData.fotoKtp}</p>}
                    </div>

                    <div className="pt-2">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Kontak Ahli Waris</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Nama Ahli Waris" value={formData.ahliWarisNama} onChange={(value) => updateField("ahliWarisNama", value)} />
                        <Field label="No HP Ahli Waris" type="tel" value={formData.ahliWarisHp} onChange={(value) => updateField("ahliWarisHp", value)} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Layanan Tambahan</h3>
                <p className="text-sm text-gray-500">Opsional. Pilih layanan yang ingin ditambahkan ke pesanan.</p>
              </div>
              <div className="space-y-3">
                {addons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <button key={addon.id} type="button" onClick={() => toggleAddon(addon.id)} className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 bg-white transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${isSelected ? "bg-gray-800 border-gray-800" : "border-gray-300 group-hover:border-gray-400"}`}>
                          {isSelected && <CheckCircle2 size={12} className="text-white" />}
                        </div>
                        <span className="text-sm font-medium text-gray-800 text-left">{addon.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{formatRupiah(addon.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Ringkasan Pesanan</h3>
                <p className="text-sm text-gray-500">Pastikan data sudah sesuai sebelum lanjut ke pembayaran.</p>
              </div>
              <SummaryRow label="Makam" value={makam.name} />
              <SummaryRow label="Tipe Makam" value={makam.type} />
              <SummaryRow label="Petak" value={selectedSlot ?? "-"} />
              <SummaryRow label="Tanggal Pilihan" value={selectedDate || "Belum dipilih"} />
              <SummaryRow label="Jenis Pemesanan" value={type === "sekarang" ? "Untuk sekarang" : "Untuk persiapan"} />
              <SummaryRow label="Pemesan" value={`${formData.namaPemesan} • ${formData.kontak}`} />
              <hr className="border-gray-100" />
              <SummaryRow label="Biaya Lahan" value={formatRupiah(makam.price)} strong />
              {selectedAddonItems.length > 0 ? (
                selectedAddonItems.map((addon) => <SummaryRow key={addon.id} label={addon.label} value={formatRupiah(addon.price)} />)
              ) : (
                <SummaryRow label="Add-ons" value="Tidak memilih add-ons" />
              )}
              <div className="flex items-center justify-between rounded-lg bg-gray-900 px-4 py-3 text-white">
                <span className="text-sm font-semibold">Total Bayar</span>
                <span className="text-lg font-bold">{formatRupiah(grandTotal)}</span>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="py-8 text-center">
              <CheckCircle2 size={54} className="mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pesanan Siap Diproses</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Untuk MVP FE, ini adalah simulasi akhir checkout. Pada integrasi backend, tahap ini akan diarahkan ke pembayaran dan halaman konfirmasi pesanan.
              </p>
              <button onClick={handleClose} className="mt-6 bg-primary hover:bg-gray-800 text-white font-medium py-2.5 px-6 rounded-md text-sm transition-colors">
                Selesai
              </button>
            </div>
          )}

          {error && <p className="mt-5 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>}
        </div>

        {step !== 4 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            {step === 1 ? (
              <div />
            ) : (
              <button onClick={() => setStep((current) => (current - 1) as Step)} className="text-gray-500 hover:text-gray-800 font-medium text-sm px-2 py-2 transition-colors">
                Kembali
              </button>
            )}

            <button onClick={handleNext} className="bg-primary hover:bg-gray-800 text-white font-medium py-2.5 px-6 rounded-md text-sm transition-colors shadow-sm ml-auto">
              {step === 1 ? "Lanjut Add-ons" : step === 2 ? "Lihat Ringkasan" : "Lanjut Pembayaran"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  optional?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-600">
        {label} {optional && <span className="font-normal text-gray-400">(Opsional)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-primary text-gray-700"
      />
    </div>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={`text-right ${strong ? "font-bold text-gray-900" : "font-medium text-gray-800"}`}>{value}</span>
    </div>
  );
}

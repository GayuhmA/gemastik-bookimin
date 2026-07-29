"use client";

import { useMemo, useState } from "react";
import { formatRupiah, getMakamById } from "@/data/makam";
import { Calendar } from "lucide-react";
import CheckoutModal from "@/components/CheckoutModal";

interface MakamDetailClientProps {
  makamId: string;
}

const blocks = ["A", "B", "C", "D"];

export default function MakamDetailClient({ makamId }: MakamDetailClientProps) {
  const makam = getMakamById(makamId);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const unavailableSlots = useMemo(() => {
    if (!selectedDate) {
      return ["A-1-2", "A-3-4", "B-2-2", "B-5-5", "C-1-1", "D-4-6", "A-5-6", "B-1-8"];
    }

    const hash = selectedDate.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const slots: string[] = [];

    for (let i = 0; i < 15; i++) {
      const block = blocks[(hash + i) % blocks.length];
      const row = ((hash + i) % 6) + 1;
      const col = ((hash + i * 2) % 8) + 1;
      slots.push(`${block}-${row}-${col}`);
    }

    return slots;
  }, [selectedDate]);

  const getSlotStatus = (block: string, row: number, col: number) => {
    const id = `${block}-${row}-${col}`;
    if (unavailableSlots.includes(id)) return "terisi";
    if (selectedSlot === id) return "selected";
    return "tersedia";
  };

  const handleSlotClick = (id: string) => {
    if (unavailableSlots.includes(id)) return;
    setSelectedSlot(id === selectedSlot ? null : id);
  };

  return (
    <main className="w-full bg-[#f8f9fa] min-h-screen pb-20">
      <div
        className="w-full h-62.5 md:h-75 bg-gray-300"
        style={{
          backgroundImage: `url('${makam.imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{makam.name}</h1>
            <p className="text-gray-600 mb-2">{makam.location}</p>
            <p className="text-gray-600">Tersedia {makam.availableSlots} dari {makam.totalSlots} liang</p>
          </div>
          <div className="relative" title={selectedDate ? `Tanggal Terpilih: ${selectedDate}` : "Pilih Tanggal"}>
            <button className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 text-gray-700 transition-colors shrink-0">
              <Calendar size={20} />
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot(null);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          <aside className="w-full xl:w-60 shrink-0">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-4">
              <h3 className="font-bold text-[15px] text-gray-900 mb-4">Keterangan Peta</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#E5E7EB] rounded-sm shrink-0" />
                  <span className="text-sm text-gray-800 font-medium">Tersedia</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#9CA3AF] rounded-sm shrink-0" />
                  <span className="text-sm text-gray-800 font-medium">Tidak Tersedia</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#3B82F6] rounded-sm shrink-0" />
                  <span className="text-sm text-gray-800 font-medium">Pilihan Anda</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{makam.description}</p>
          </aside>

          <div className="flex-1 w-full flex justify-center items-start pt-2">
            <div className="w-full max-w-135 grid grid-cols-2 gap-x-6 gap-y-8">
              {blocks.map((block) => (
                <div key={block} className="grid grid-cols-8 gap-1 sm:gap-1.5">
                  {Array.from({ length: 48 }).map((_, index) => {
                    const row = Math.floor(index / 8) + 1;
                    const col = (index % 8) + 1;
                    const id = `${block}-${row}-${col}`;
                    const status = getSlotStatus(block, row, col);

                    return (
                      <button
                        key={id}
                        onClick={() => handleSlotClick(id)}
                        disabled={status === "terisi"}
                        className={`w-full aspect-square rounded-sm transition-all ${
                          status === "selected"
                            ? "bg-[#3B82F6] hover:bg-blue-600 shadow-sm transform scale-110 z-10 relative"
                            : status === "terisi"
                            ? "bg-[#9CA3AF] cursor-not-allowed opacity-60"
                            : "bg-[#E5E7EB] hover:bg-[#D1D5DB] cursor-pointer"
                        }`}
                        aria-label={`Slot ${id}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <aside className="w-full xl:w-75 shrink-0 sticky top-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-bold text-[16px] text-gray-900 mb-5">Ringkasan Pilihan</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-500">Tipe Makam</span>
                  <span className="text-gray-900 font-medium text-right">{makam.type}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-500">Lokasi Petak</span>
                  <span className="text-gray-900 font-medium text-right">{selectedSlot ?? "-"}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-500">Tanggal</span>
                  <span className="text-gray-900 font-medium text-right">{selectedDate || "Belum dipilih"}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-500">Total Biaya Lahan</span>
                  <span className="text-gray-900 font-bold text-[15px] text-right">
                    {selectedSlot ? formatRupiah(makam.price) : "-"}
                  </span>
                </div>
              </div>

              <button
                disabled={!selectedSlot}
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-3 rounded-md text-sm font-medium transition-colors ${
                  selectedSlot
                    ? "bg-primary hover:bg-gray-800 text-white shadow-md"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Pesan Sekarang
              </button>
            </div>
          </aside>
        </div>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        makam={{ id: makam.id, name: makam.name, type: makam.type, price: makam.price }}
        selectedSlot={selectedSlot}
        selectedDate={selectedDate}
      />
    </main>
  );
}

"use client";

import { RotateCcw } from "lucide-react";

interface FilterSidebarProps {
  category: string;
  onCategoryChange: (cat: string) => void;
  cemeteryTypes: string[];
  onToggleType: (t: string) => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  facilities: string[];
  onToggleFacility: (f: string) => void;
  readyTodayOnly: boolean;
  onToggleReadyToday: () => void;
  onReset: () => void;
}

const CATEGORIES = [
  { label: "Semua", value: "Semua" },
  { label: "Muslim", value: "Muslim" },
  { label: "Kristen / Katolik", value: "Kristen / Katolik" },
  { label: "Universal / San Diego Hills style", value: "Universal" },
];

const CEMETERY_TYPES = [
  "Single Reguler",
  "Family (2-4 Liang)",
  "VIP / Gazebo",
];

const FACILITIES_LIST = [
  "Akses Mobil Jenazah",
  "Jalan Setapak Kursi Roda",
  "Musholla",
  "Area Parkir Luas",
];

export default function FilterSidebar({
  category,
  onCategoryChange,
  cemeteryTypes,
  onToggleType,
  maxPrice,
  onPriceChange,
  facilities,
  onToggleFacility,
  readyTodayOnly,
  onToggleReadyToday,
  onReset,
}: FilterSidebarProps) {
  return (
    <aside className="w-full lg:w-70 shrink-0 lg:sticky lg:top-24 z-10 self-start">
      {/* Main Filter Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
          <h2 className="font-bold text-sm text-primary-dark tracking-tight">
            Filter Pencarian
          </h2>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cta hover:text-accent-cta-dark transition-colors cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Reset Filter</span>
          </button>
        </div>

        {/* Section 1: Kategori Keyakinan / Agama */}
        <div className="pb-4 border-b border-slate-100">
          <h3 className="text-xs font-bold text-primary-dark uppercase tracking-wider mb-2.5">
            Kategori Keyakinan / Agama
          </h3>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const checked = category === cat.value;
              return (
                <label
                  key={cat.label}
                  className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer select-none group"
                >
                  <input
                    type="radio"
                    name="cemetery-category"
                    checked={checked}
                    onChange={() => onCategoryChange(cat.value)}
                    className="w-4 h-4 text-accent-cta accent-teal-600 rounded cursor-pointer"
                  />
                  <span className={`group-hover:text-primary-dark ${checked ? "font-bold text-primary-dark" : ""}`}>
                    {cat.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Section 2: Tipe Makam */}
        <div className="py-4 border-b border-slate-100">
          <h3 className="text-xs font-bold text-primary-dark uppercase tracking-wider mb-2.5">
            Tipe Makam
          </h3>
          <div className="space-y-2">
            {CEMETERY_TYPES.map((type) => {
              const checked = cemeteryTypes.includes(type);
              return (
                <label
                  key={type}
                  className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleType(type)}
                    className="w-4 h-4 text-accent-cta accent-teal-600 rounded cursor-pointer"
                  />
                  <span className={`group-hover:text-primary-dark ${checked ? "font-bold text-primary-dark" : ""}`}>
                    {type}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Section 3: Rentang Biaya (IDR) */}
        <div className="py-4 border-b border-slate-100">
          <h3 className="text-xs font-bold text-primary-dark uppercase tracking-wider mb-2.5">
            Rentang Biaya (IDR)
          </h3>
          {/* Range Slider */}
          <div className="space-y-2.5">
            <input
              type="range"
              min={3000000}
              max={50000000}
              step={1000000}
              value={maxPrice}
              onChange={(e) => onPriceChange(3000000, Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-center">
                <span className="text-[10px] text-slate-400 block leading-tight">Mulai dari</span>
                <span className="text-xs font-bold text-primary-dark">Rp 3 Jt</span>
              </div>
              <span className="text-slate-400 text-xs">—</span>
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-center">
                <span className="text-[10px] text-slate-400 block leading-tight">Maksimal</span>
                <span className="text-xs font-bold text-primary-dark">
                  {maxPrice >= 50000000 ? "Rp 50 Jt+" : `Rp ${(maxPrice / 1000000).toFixed(0)} Jt`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Fasilitas Wajib */}
        <div className="py-4 border-b border-slate-100">
          <h3 className="text-xs font-bold text-primary-dark uppercase tracking-wider mb-2.5">
            Fasilitas Wajib
          </h3>
          <div className="space-y-2">
            {FACILITIES_LIST.map((facility) => {
              const checked = facilities.includes(facility);
              return (
                <label
                  key={facility}
                  className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleFacility(facility)}
                    className="w-4 h-4 text-accent-cta accent-teal-600 rounded cursor-pointer"
                  />
                  <span className={`group-hover:text-primary-dark ${checked ? "font-bold text-primary-dark" : ""}`}>
                    {facility}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Section 5: Ketersediaan Toggle */}
        <div className="pt-4">
          <h3 className="text-xs font-bold text-primary-dark uppercase tracking-wider mb-2">
            Ketersediaan
          </h3>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-600 font-medium leading-relaxed">
              Hanya tampilkan yang siap gali hari ini
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={readyTodayOnly}
              onClick={onToggleReadyToday}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                readyTodayOnly ? "bg-accent-cta" : "bg-slate-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  readyTodayOnly ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}


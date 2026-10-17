"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  Search,
  MapPin,
  ChevronDown,
  Check,
} from "lucide-react";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  onSearchSubmit: () => void;
}

const CITIES = [
  "Sleman, Yogyakarta",
  "Bantul, Yogyakarta",
  "Kota Yogyakarta",
  "Gunungkidul, Yogyakarta",
  "Semarang, Jawa Tengah",
];

const POPULAR_TAGS = [
  { label: "Sleman", value: "Sleman, Yogyakarta" },
  { label: "Bantul", value: "Bantul, Yogyakarta" },
  { label: "Kota Yogyakarta", value: "Kota Yogyakarta" },
  { label: "Gunungkidul", value: "Gunungkidul, Yogyakarta" },
];

export default function SearchHeader({
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  onSearchSubmit,
}: SearchHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section className="bg-white border-b border-slate-200/80 pt-6 pb-8 lg:pt-8 lg:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-5">
          <Link href="/" className="hover:text-primary-dark transition-colors">
            Beranda
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="font-semibold text-primary-dark">Cari Makam</span>
        </nav>

        {/* Title, Subtitle & Reassurance Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-7">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-dark tracking-tight leading-tight">
              Temukan tempat terbaik, dengan tenang.
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed font-normal">
              Jelajahi lahan pemakaman resmi. Bandingkan fasilitas, ketersediaan, dan biaya secara transparan.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 border border-teal-200/80 rounded-full text-xs font-semibold text-accent-cta shrink-0 self-start lg:self-auto">
            <ShieldCheck size={15} className="text-accent-cta" />
            <span>Mitra resmi, harga terverifikasi</span>
          </div>
        </div>

        {/* Unified Search Box Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearchSubmit();
          }}
          className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200/90 p-2 sm:p-2.5 flex flex-col md:flex-row items-center gap-2 relative z-30"
        >
          {/* Keyword Search Input */}
          <div className="flex-1 w-full flex items-center gap-3 px-3 py-2">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama TPU atau wilayah..."
              className="w-full bg-transparent text-sm text-primary placeholder-slate-400 outline-none font-medium"
            />
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-200" />

          {/* Region Dropdown Selector */}
          <div className="relative w-full md:w-auto md:min-w-[220px]">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <MapPin size={17} className="text-accent-cta shrink-0" />
                <span className="text-sm font-semibold text-primary-dark truncate">
                  {selectedCity}
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-accent-cta" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-slate-200 py-1 max-h-48 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      onCityChange(city);
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-xs sm:text-[13px] flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      selectedCity === city
                        ? "bg-teal-50 text-accent-cta font-bold"
                        : "text-slate-700 font-medium"
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && (
                      <Check size={14} className="text-accent-cta shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Submit Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-accent-cta hover:bg-accent-cta-dark text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Search size={16} />
            <span>Cari Makam</span>
          </button>
        </form>

        {/* Quick Popular Location Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
          <span className="text-slate-500 font-medium mr-1">Lokasi populer:</span>
          {POPULAR_TAGS.map((tag) => {
            const isActive = selectedCity.includes(tag.label);
            return (
              <button
                key={tag.label}
                type="button"
                onClick={() => onCityChange(tag.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-teal-50 border border-teal-300 text-accent-cta shadow-2xs"
                    : "bg-slate-100/80 hover:bg-slate-100 text-slate-700 border border-slate-200/80"
                }`}
              >
                {isActive && <Check size={13} className="text-accent-cta" />}
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}


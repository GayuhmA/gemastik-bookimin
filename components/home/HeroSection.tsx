"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  MapPin,
  Calendar,
  Landmark,
  Search,
  Clock,
  ShieldCheck,
  ChevronDown,
  Check,
  Layers,
} from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

const LOCATION_OPTIONS: DropdownOption[] = [
  { value: "Sleman, Yogyakarta", label: "Sleman, D.I. Yogyakarta" },
  { value: "Bantul, Yogyakarta", label: "Bantul, D.I. Yogyakarta" },
  { value: "Kota Yogyakarta", label: "Kota Yogyakarta" },
  { value: "Gunungkidul, Yogyakarta", label: "Gunungkidul, D.I. Yogyakarta" },
  { value: "Kulon Progo, Yogyakarta", label: "Kulon Progo, D.I. Yogyakarta" },
];

const URGENT_DATE_OPTIONS: DropdownOption[] = [
  { value: "Hari Ini (Segera)", label: "Hari Ini (Segera)" },
  { value: "Besok Pagi", label: "Besok Pagi (08.00 - 11.00)" },
  { value: "Besok Siang / Sore", label: "Besok Siang / Sore" },
  { value: "2 - 3 Hari ke Depan", label: "2 - 3 Hari ke Depan" },
];

const PRENEED_DATE_OPTIONS: DropdownOption[] = [
  { value: "Kavling Pasangan (2 Liang)", label: "Kavling Pasangan (2 Liang)" },
  { value: "Kavling Keluarga (4-8 Liang)", label: "Kavling Keluarga (4-8 Liang)" },
  { value: "Single Kavling Pre-Need", label: "Single Kavling Pre-Need" },
  { value: "Kavling Investasi Masa Depan", label: "Kavling Investasi Masa Depan" },
];

const URGENT_TYPE_OPTIONS: DropdownOption[] = [
  { value: "Semua Tipe", label: "Semua Tipe Keyakinan" },
  { value: "Muslim Reguler", label: "Khusus Muslim" },
  { value: "Kristen / Katolik", label: "Kristen / Katolik" },
  { value: "Taman Memorial Universal", label: "Universal / Memorial Park" },
];

const PRENEED_TYPE_OPTIONS: DropdownOption[] = [
  { value: "Semua Kategori", label: "Semua Kategori Kavling" },
  { value: "Taman Memorial Eksklusif", label: "Taman Memorial Eksklusif" },
  { value: "Khusus Muslim Terpadu", label: "Khusus Muslim Terpadu" },
  { value: "Universal Multi-Agama", label: "Universal Multi-Agama" },
];

export default function HeroSection() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<"urgent" | "preneed">("urgent");
  const [openDropdown, setOpenDropdown] = useState<"location" | "date" | "type" | null>(null);

  // Form State
  const [location, setLocation] = useState<DropdownOption>(LOCATION_OPTIONS[0]);
  const [bookingDate, setBookingDate] = useState<DropdownOption>(URGENT_DATE_OPTIONS[0]);
  const [cemeteryType, setCemeteryType] = useState<DropdownOption>(URGENT_TYPE_OPTIONS[0]);

  // Adjust defaults when tab switches
  const handleTabChange = (tab: "urgent" | "preneed") => {
    setActiveTab(tab);
    setOpenDropdown(null);
    if (tab === "urgent") {
      setBookingDate(URGENT_DATE_OPTIONS[0]);
      setCemeteryType(URGENT_TYPE_OPTIONS[0]);
    } else {
      setBookingDate(PRENEED_DATE_OPTIONS[0]);
      setCemeteryType(PRENEED_TYPE_OPTIONS[0]);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      lokasi: location.value,
      tipe: activeTab,
      waktu: bookingDate.value,
      kategori: cemeteryType.value,
    }).toString();
    router.push(`/cari-makam?${query}`);
  };

  const currentDateOptions = activeTab === "urgent" ? URGENT_DATE_OPTIONS : PRENEED_DATE_OPTIONS;
  const currentTypeOptions = activeTab === "urgent" ? URGENT_TYPE_OPTIONS : PRENEED_TYPE_OPTIONS;

  return (
    <section className="relative z-20 pt-16 pb-16 lg:pt-24 lg:pb-24 bg-linear-to-b from-background via-background to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Grid: Text & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-12 lg:mb-16">
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-dark tracking-tight leading-[1.18]">
              Pesan <span className="text-primary-dark">Lahan Makam</span> &{" "}
              <span className="text-primary-dark">Layanan Duka</span> dengan{" "}
              <span className="text-accent-cta">Tenang</span> dan{" "}
              <span className="text-accent-cta">Pasti</span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Membantu keluarga di saat paling rapuh dengan kepastian liang makam, harga resmi transparan, dan layanan kedukaan lengkap tanpa perantara.
            </p>

            {/* Trust Bullet Points */}
            <div className="flex flex-wrap items-center gap-6 pt-1 text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-accent-cta" />
                <span>Harga resmi, tanpa calo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-accent-cta" />
                <span>Pendamping keluarga 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Column (Hero Visual) */}
          <div className="lg:col-span-5 relative w-full aspect-4/3 sm:aspect-16/11 lg:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100">
            <Image
              src="/images/hero-garden.jpg"
              alt="Lanskap Pemakaman Asri dan Tenang Bookimin"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-black/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Floating Search & Planning Card */}
        <div
          ref={formRef}
          className="relative z-30 w-full bg-white rounded-2xl shadow-[0_16px_48px_-12px_rgba(15,23,42,0.08)] border border-slate-200/90 overflow-visible"
        >
          {/* Dual Planning Mode Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 rounded-t-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => handleTabChange("urgent")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-bold transition-all border-b-2 ${
                activeTab === "urgent"
                  ? "bg-white border-accent-cta text-accent-cta shadow-xs"
                  : "border-transparent text-slate-500 hover:text-primary-dark"
              }`}
            >
              <Clock size={16} className={activeTab === "urgent" ? "text-accent-cta" : "text-slate-400"} />
              <span>Butuh Segera (Hari Ini)</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("preneed")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-bold transition-all border-b-2 ${
                activeTab === "preneed"
                  ? "bg-white border-accent-cta text-accent-cta shadow-xs"
                  : "border-transparent text-slate-500 hover:text-primary-dark"
              }`}
            >
              <ShieldCheck size={16} className={activeTab === "preneed" ? "text-accent-cta" : "text-slate-400"} />
              <span>Persiapan Masa Depan (Pre-Need)</span>
            </button>
          </div>

          {/* Search Inputs Form */}
          <form onSubmit={handleSearch} className="p-5 sm:p-6 lg:p-7">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Field 1: Kota / TPU */}
              <div className="md:col-span-4 relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
                  className={`w-full bg-slate-50/80 hover:bg-slate-50 border rounded-xl px-4 py-3 flex items-center justify-between gap-3 transition-all text-left cursor-pointer ${
                    openDropdown === "location"
                      ? "border-accent-cta ring-2 ring-accent-cta/15 bg-white"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-accent-cta shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">
                        Pilih Kota / TPU
                      </span>
                      <span className="block text-sm font-bold text-primary-dark truncate mt-0.5 leading-snug">
                        {location.label}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      openDropdown === "location" ? "rotate-180 text-accent-cta" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu (Scrollable, Clean, Not Cut Off) */}
                {openDropdown === "location" && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-2xl border border-slate-200/90 py-1 max-h-44 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
                    {LOCATION_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setLocation(opt);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs sm:text-[13px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                          location.value === opt.value
                            ? "bg-teal-50/70 text-accent-cta font-bold"
                            : "text-slate-700 font-medium"
                        }`}
                      >
                        <span className="truncate">{opt.label}</span>
                        {location.value === opt.value && <Check size={14} className="text-accent-cta shrink-0 ml-2" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Field 2: Rencana Tanggal / Kavling */}
              <div className="md:col-span-3 relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "date" ? null : "date")}
                  className={`w-full bg-slate-50/80 hover:bg-slate-50 border rounded-xl px-4 py-3 flex items-center justify-between gap-3 transition-all text-left cursor-pointer ${
                    openDropdown === "date"
                      ? "border-accent-cta ring-2 ring-accent-cta/15 bg-white"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-accent-cta shrink-0">
                      {activeTab === "urgent" ? <Calendar size={18} /> : <Layers size={18} />}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">
                        {activeTab === "urgent" ? "Rencana Pemakaman" : "Alokasi Kavling"}
                      </span>
                      <span className="block text-sm font-bold text-primary-dark truncate mt-0.5 leading-snug">
                        {bookingDate.label}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      openDropdown === "date" ? "rotate-180 text-accent-cta" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu (Scrollable, Clean, Not Cut Off) */}
                {openDropdown === "date" && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-2xl border border-slate-200/90 py-1 max-h-44 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
                    {currentDateOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setBookingDate(opt);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs sm:text-[13px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                          bookingDate.value === opt.value
                            ? "bg-teal-50/70 text-accent-cta font-bold"
                            : "text-slate-700 font-medium"
                        }`}
                      >
                        <span className="truncate">{opt.label}</span>
                        {bookingDate.value === opt.value && <Check size={14} className="text-accent-cta shrink-0 ml-2" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Field 3: Kategori Makam / Tipe Memorial */}
              <div className="md:col-span-3 relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "type" ? null : "type")}
                  className={`w-full bg-slate-50/80 hover:bg-slate-50 border rounded-xl px-4 py-3 flex items-center justify-between gap-3 transition-all text-left cursor-pointer ${
                    openDropdown === "type"
                      ? "border-accent-cta ring-2 ring-accent-cta/15 bg-white"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-accent-cta shrink-0">
                      <Landmark size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">
                        {activeTab === "urgent" ? "Kategori Lahan" : "Tipe Taman Makam"}
                      </span>
                      <span className="block text-sm font-bold text-primary-dark truncate mt-0.5 leading-snug">
                        {cemeteryType.label}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      openDropdown === "type" ? "rotate-180 text-accent-cta" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu (Scrollable, Clean, Not Cut Off) */}
                {openDropdown === "type" && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-2xl border border-slate-200/90 py-1 max-h-44 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
                    {currentTypeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setCemeteryType(opt);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs sm:text-[13px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                          cemeteryType.value === opt.value
                            ? "bg-teal-50/70 text-accent-cta font-bold"
                            : "text-slate-700 font-medium"
                        }`}
                      >
                        <span className="truncate">{opt.label}</span>
                        {cemeteryType.value === opt.value && <Check size={14} className="text-accent-cta shrink-0 ml-2" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit CTA Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full h-14 bg-accent-cta hover:bg-accent-cta-dark text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search size={18} />
                  <span>{activeTab === "urgent" ? "Cari Lahan" : "Cari Kavling"}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

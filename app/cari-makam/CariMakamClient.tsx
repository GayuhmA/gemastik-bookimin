"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { X, ChevronDown, Check } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import FloatingAIChat from "@/components/home/FloatingAIChat";

import SearchHeader from "@/components/cari-makam/SearchHeader";
import FilterSidebar from "@/components/cari-makam/FilterSidebar";
import CemeteryCard from "@/components/cari-makam/CemeteryCard";
import Pagination from "@/components/cari-makam/Pagination";
import { MOCK_CEMETERIES } from "@/components/cari-makam/mockData";

const SORT_OPTIONS = [
  { label: "Harga Terendah", value: "price_asc" },
  { label: "Harga Tertinggi", value: "price_desc" },
  { label: "Ketersediaan Terbanyak", value: "availability" },
  { label: "Terpopuler", value: "popular" },
];

export default function CariMakamClient() {
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get("lokasi") || "Sleman, Yogyakarta";

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(initialLocation);
  const [category, setCategory] = useState("Semua");
  const [cemeteryTypes, setCemeteryTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [readyTodayOnly, setReadyTodayOnly] = useState(false);
  const [sortBy, setSortBy] = useState("price_asc");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Toggle Type in Filter
  const handleToggleType = (type: string) => {
    setCemeteryTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Toggle Facility in Filter
  const handleToggleFacility = (facility: string) => {
    setFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setCategory("Semua");
    setCemeteryTypes([]);
    setMaxPrice(50000000);
    setFacilities([]);
    setReadyTodayOnly(false);
    setCurrentPage(1);
  };

  // Filtered & Sorted Cemeteries
  const filteredCemeteries = useMemo(() => {
    return MOCK_CEMETERIES.filter((item) => {
      // Search query filter (name or location)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesArea = item.area.toLowerCase().includes(query);
        if (!matchesName && !matchesLoc && !matchesArea) return false;
      }

      // City filter
      if (selectedCity && !selectedCity.includes("Semua")) {
        const cityKeyword = selectedCity.split(",")[0].trim().toLowerCase();
        if (!item.location.toLowerCase().includes(cityKeyword) && !item.city.toLowerCase().includes(cityKeyword)) {
          return false;
        }
      }

      // Category filter
      if (category !== "Semua") {
        if (category === "Universal") {
          if (item.category !== "Universal") return false;
        } else if (item.category !== category) {
          return false;
        }
      }

      // Cemetery types filter
      if (cemeteryTypes.length > 0) {
        const hasType = cemeteryTypes.some((t) => item.types.includes(t as any));
        if (!hasType) return false;
      }

      // Price filter
      if (item.price > maxPrice) {
        return false;
      }

      // Ready today filter
      if (readyTodayOnly && !item.readyToday) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Mitra yang beriklan / Rekomendasi selalu diprioritaskan di paling atas (promoted ad placement)
      if (a.isRecommended && !b.isRecommended) return -1;
      if (!a.isRecommended && b.isRecommended) return 1;

      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "availability") return b.availability - a.availability;
      return 0;
    });
  }, [
    searchQuery,
    selectedCity,
    category,
    cemeteryTypes,
    maxPrice,
    readyTodayOnly,
    sortBy,
  ]);

  const itemsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(filteredCemeteries.length / itemsPerPage));
  const displayedCemeteries = filteredCemeteries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-primary antialiased selection:bg-teal-100 selection:text-teal-900">
      <Navbar />

      <main className="flex-1 flex flex-col w-full">
        {/* Search Header Banner */}
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCity={selectedCity}
          onCityChange={(city) => {
            setSelectedCity(city);
            setCurrentPage(1);
          }}
          onSearchSubmit={() => setCurrentPage(1)}
        />

        {/* Content Area: Filter Sidebar + Results List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Filter Sidebar */}
            <FilterSidebar
              category={category}
              onCategoryChange={(cat) => {
                setCategory(cat);
                setCurrentPage(1);
              }}
              cemeteryTypes={cemeteryTypes}
              onToggleType={(t) => {
                handleToggleType(t);
                setCurrentPage(1);
              }}
              minPrice={3000000}
              maxPrice={maxPrice}
              onPriceChange={(_, max) => {
                setMaxPrice(max);
                setCurrentPage(1);
              }}
              facilities={facilities}
              onToggleFacility={(f) => {
                handleToggleFacility(f);
                setCurrentPage(1);
              }}
              readyTodayOnly={readyTodayOnly}
              onToggleReadyToday={() => {
                setReadyTodayOnly((prev) => !prev);
                setCurrentPage(1);
              }}
              onReset={handleResetFilters}
            />

            {/* Right Main Discovery Column */}
            <div className="flex-1 w-full min-w-0">
              {/* Results Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-primary-dark tracking-tight">
                    Menampilkan {filteredCemeteries.length} Lahan Pemakaman Resmi di {selectedCity.split(",")[0]}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {/* Active City Filter Pill */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border border-teal-200 rounded-lg text-xs font-semibold text-accent-cta">
                      <span>{selectedCity.split(",")[0]}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedCity("Semua Kota")}
                        aria-label="Hapus filter kota"
                        className="hover:text-accent-cta-dark cursor-pointer"
                      >
                        <X size={13} />
                      </button>
                    </span>

                    <span className="text-xs text-slate-500 font-normal">
                      Menampilkan {displayedCemeteries.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–
                      {Math.min(currentPage * itemsPerPage, filteredCemeteries.length)} dari{" "}
                      {filteredCemeteries.length} lokasi
                    </span>
                  </div>
                </div>

                {/* Sort Dropdown Selector */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                  <span className="text-xs text-slate-500 font-medium">Urutkan:</span>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-primary-dark hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
                    >
                      <span>
                        {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`text-slate-400 transition-transform ${
                          sortDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {sortDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1.5 z-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1 min-w-47.5 animate-in fade-in slide-in-from-top-1 duration-150">
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setSortBy(opt.value);
                              setSortDropdownOpen(false);
                            }}
                            className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                              sortBy === opt.value
                                ? "bg-teal-50 text-accent-cta font-bold"
                                : "text-slate-700 font-medium"
                            }`}
                          >
                            <span>{opt.label}</span>
                            {sortBy === opt.value && (
                              <Check size={14} className="text-accent-cta" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Cemetery Cards Stack */}
              {displayedCemeteries.length > 0 ? (
                <div className="space-y-5">
                  {displayedCemeteries.map((item) => (
                    <CemeteryCard
                      key={item.id}
                      item={item}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center my-6 space-y-3">
                  <p className="text-base font-bold text-primary-dark">
                    Tidak ada lahan pemakaman yang sesuai dengan filter Anda.
                  </p>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Coba sesuaikan kata kunci pencarian, ubah rentang biaya, atau reset filter untuk melihat semua rekomendasi.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-accent-cta hover:bg-accent-cta-dark text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    <span>Reset Semua Filter</span>
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredCemeteries.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Floating AI Consultation Widget */}
      <FloatingAIChat />
    </div>
  );
}


"use client";

import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import { ChevronDown, Check } from "lucide-react";

interface ResultType {
  id: string;
  name: string;
  location: string;
  availability: string;
  type: string;
  price: string;
  isRecommendation?: boolean;
}

interface SearchResultsProps {
  initialQuery: string;
  results: ResultType[];
}

export default function SearchResults({ initialQuery, results }: SearchResultsProps) {
  const [lokasi, setLokasi] = useState<string>("");
  const [tipeLahan, setTipeLahan] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("Termurah");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLokasiOpen, setIsLokasiOpen] = useState(false);

  const lokasiOptions = [
    { value: "", label: "Semua Lokasi" },
    { value: "Sleman", label: "Sleman" },
    { value: "Bantul", label: "Bantul" },
    { value: "Kota Yogyakarta", label: "Kota Yogyakarta" },
    { value: "Gunungkidul", label: "Gunungkidul" },
  ];

  const toggleTipeLahan = (tipe: string) => {
    setTipeLahan((prev) =>
      prev.includes(tipe) ? prev.filter((item) => item !== tipe) : [...prev, tipe]
    );
  };

  const filteredAndSortedResults = useMemo(() => {
    let finalResults = [...results];

    if (lokasi) {
      finalResults = finalResults.filter((result) =>
        result.location.toLowerCase().includes(lokasi.toLowerCase())
      );
    }

    if (tipeLahan.length > 0) {
      finalResults = finalResults.filter((result) => {
        const itemType = result.type.toLowerCase();
        return tipeLahan.some((tipe) => itemType.includes(tipe.toLowerCase()));
      });
    }

    finalResults.sort((a, b) => {
      if (a.isRecommendation && !b.isRecommendation) return -1;
      if (!a.isRecommendation && b.isRecommendation) return 1;

      const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));

      return sortBy === "Termurah" ? priceA - priceB : priceB - priceA;
    });

    return finalResults;
  }, [results, lokasi, tipeLahan, sortBy]);

  return (
    <main className="flex-1 flex flex-col w-full bg-[#f8f9fa] min-h-screen">
      <div className="w-full pt-8 pb-4">
        <div className="max-w-4xl mx-auto px-4">
          <SearchBar
            initialQuery={initialQuery}
            className="shadow-none border border-gray-200 bg-white"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 py-4 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-65 shrink-0">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-bold text-base text-gray-900 mb-5">Filter</h3>

            <div className="mb-6 relative">
              <p className="text-sm text-gray-700 mb-2">Lokasi</p>
              <button
                onClick={() => setIsLokasiOpen(!isLokasiOpen)}
                className="w-full bg-[#F3F4F6] h-10 rounded border-none px-3 text-sm text-gray-800 flex items-center justify-between outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <span>{lokasi ? lokasiOptions.find((option) => option.value === lokasi)?.label : "Semua Lokasi"}</span>
                <ChevronDown size={16} className={`text-gray-500 transition-transform ${isLokasiOpen ? "rotate-180" : ""}`} />
              </button>

              {isLokasiOpen && (
                <div className="absolute top-17 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1 overflow-hidden">
                  {lokasiOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setLokasi(option.value);
                        setIsLokasiOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                        lokasi === option.value ? "bg-blue-50/50 text-primary font-medium" : "text-gray-700"
                      }`}
                    >
                      {option.label}
                      {lokasi === option.value && <Check size={14} className="text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-3">Tipe Lahan</p>
              <div className="space-y-3">
                {[
                  { value: "Single", label: "Single" },
                  { value: "Family", label: "Family" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => toggleTipeLahan(option.value)}
                  >
                    <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-colors ${tipeLahan.includes(option.value) ? "bg-primary" : "bg-gray-200"}`}>
                      {tipeLahan.includes(option.value) && <Check size={10} className="text-white" />}
                    </div>
                    <span className="text-sm text-gray-800">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 relative">
            <div>
              <h2 className="text-[22px] font-semibold text-gray-900 mb-0.5 leading-none">Hasil Pencarian</h2>
              <p className="text-gray-600 text-[13px] leading-tight mt-2">Ditemukan {filteredAndSortedResults.length} tempat pemakaman</p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0 text-sm pb-0.5 relative">
              <span className="text-gray-700 font-medium">Urutkan:</span>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1 text-gray-900 cursor-pointer text-[13px] focus:outline-none"
              >
                {sortBy}
                <ChevronDown size={14} className={`text-gray-600 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
              </button>

              {isSortOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1">
                  {[
                    { value: "Termurah", label: "Termurah" },
                    { value: "Termahal", label: "Termahal" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            {filteredAndSortedResults.length > 0 ? (
              filteredAndSortedResults.map((result) => (
                <SearchResultCard key={result.id} {...result} />
              ))
            ) : (
              <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 font-medium">Tidak ada hasil yang cocok dengan filter Anda.</p>
                <button
                  onClick={() => {
                    setLokasi("");
                    setTipeLahan([]);
                  }}
                  className="mt-4 text-primary font-medium hover:underline text-sm"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

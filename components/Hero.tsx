"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cari-makam?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-[calc(100svh-100px)] flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
              Pesan Makam dan Layanan Duka Tanpa Rumit
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Temukan lokasi makam, bandingkan ketersediaan petak, lalu lanjutkan pemesanan sesuai kebutuhan Anda saat checkout.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-xl shadow-sm border border-gray-100 max-w-xl transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary/20"
          >
            <div className="flex-1 flex items-center gap-2.5 px-3 w-full">
              <Search className="text-gray-400 shrink-0" size={18} />
              <input
                type="text"
                placeholder="Cari lokasi makam..."
                className="w-full bg-transparent border-none outline-none text-sm text-primary placeholder:text-gray-400 py-2 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto flex justify-center items-center gap-2 px-5 py-2.5 bg-accent-cta hover:bg-accent-cta-dark text-white text-sm rounded-lg font-medium transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Cari Makam
            </button>
          </form>
        </div>

        <div className="relative h-90 md:h-125 w-full animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
          <div className="absolute inset-0 bg-gray-200 rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="/images/makam-hero.jpeg"
              alt="Hero Image Bookimin"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-tr from-black/10 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

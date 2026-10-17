import Image from "next/image";
import Link from "next/link";
import { MapPin, Sparkles, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function CemeteryRecommendationsSection() {
  const cemeteries = [
    {
      id: "1",
      name: "Al-Azhar Memorial Garden",
      category: "Muslim Reguler",
      availability: "Tersedia 45 Liang",
      location: "Sleman, D.I. Yogyakarta",
      price: "Rp 15.000.000",
      image: "/images/cemetery-alazhar.jpg",
      tags: ["Musholla", "Akses Jalan Aspal", "Kursi Roda Friendly"],
      isRecommended: true,
    },
    {
      id: "2",
      name: "Taman Kenangan Sentosa",
      category: "Universal • Taman Memorial",
      availability: "Tersedia 28 Liang",
      location: "Bantul, D.I. Yogyakarta",
      price: "Rp 18.500.000",
      image: "/images/cemetery-san-diego.jpg",
      tags: ["Taman Asri", "Area Parkir", "Akses Kursi Roda"],
      isRecommended: false,
    },
    {
      id: "3",
      name: "Bukit Damai Memorial Park",
      category: "Kristen • Taman Keluarga",
      availability: "Tersedia 32 Liang",
      location: "Semarang, Jawa Tengah",
      price: "Rp 22.000.000",
      image: "/images/cemetery-bukit-damai.jpg",
      tags: ["Kapel", "Keamanan 24 Jam", "Taman Keluarga"],
      isRecommended: false,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block text-accent-cta text-xs font-bold tracking-widest uppercase rounded-full mb-3">
              Pilihan Tempat Peristirahatan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark tracking-tight leading-tight">
              Rekomendasi Lahan Pemakaman
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed font-normal">
              Tempat yang terawat, legalitas yang jelas, dan harga yang dapat Anda percaya.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Rekomendasi sebelumnya"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-accent-cta hover:text-accent-cta transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Rekomendasi berikutnya"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-accent-cta hover:text-accent-cta transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* 3 Cemetery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cemeteries.map((cemetery) => (
            <div
              key={cemetery.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              {/* Card Image Thumbnail */}
              <div className="relative w-full aspect-16/10 overflow-hidden bg-slate-100">
                <Image
                  src={cemetery.image}
                  alt={cemetery.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Top Badge: Availability */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#10B981] text-white text-xs font-bold rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {cemetery.availability}
                  </span>
                </div>
                {/* Rekomendasi Badge (Mitra Beriklan / Sponsored Placement) */}
                {cemetery.isRecommended && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent-cta text-white text-[11px] font-bold rounded-full shadow-2xs">
                      <span>Rekomendasi</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-accent-cta tracking-wider uppercase block mb-1.5">
                    {cemetery.category}
                  </span>
                  <h3 className="text-xl font-bold text-primary-dark mb-2 leading-snug group-hover:text-accent-cta transition-colors">
                    {cemetery.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 font-medium">
                    <MapPin size={15} className="text-slate-400 shrink-0" />
                    <span className="truncate">{cemetery.location}</span>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cemetery.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Price & CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">Mulai dari</span>
                    <span className="text-lg font-black text-primary-dark">{cemetery.price}</span>
                  </div>
                  <Link
                    href={`/makam/${cemetery.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-full text-xs font-bold text-slate-700 hover:border-accent-cta hover:text-accent-cta hover:bg-teal-50/50 transition-colors"
                  >
                    <span>Lihat Denah Petak</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Cemeteries Button */}
        <div className="mt-12 text-center">
          <Link
            href="/cari-makam"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent-cta hover:text-accent-cta-dark hover:underline transition-all"
          >
            <span>Lihat semua lokasi pemakaman</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}


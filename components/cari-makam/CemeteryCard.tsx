import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Sparkles,
  ArrowRight,
  Car,
  Accessibility,
  Building,
  Tent,
} from "lucide-react";
import { CemeteryItem } from "./types";

interface CemeteryCardProps {
  item: CemeteryItem;
}

export default function CemeteryCard({ item }: CemeteryCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col md:flex-row group">
      {/* 1. Cinematic Photo */}
      <div className="relative w-full md:w-72.5 lg:w-[320px] aspect-16/10 md:aspect-auto md:min-h-55 shrink-0 bg-slate-100 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, 320px"
        />

        {/* Rekomendasi Badge (Mitra Beriklan / Sponsored Placement) */}
        {item.isRecommended && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent-cta text-white rounded-full text-[11px] font-bold shadow-2xs">
              <span>Rekomendasi</span>
            </span>
          </div>
        )}
      </div>

      {/* 2. Information Column */}
      <div className="flex-1 p-5 lg:p-6 flex flex-col justify-between">
        <div>
          {/* Category & Availability Badges */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-accent-cta uppercase tracking-wider">
              {item.category}
            </span>
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Tersedia {item.availability} Liang</span>
            </span>
          </div>

          {/* Name */}
          <h3 className="text-lg lg:text-xl font-bold text-primary-dark tracking-tight group-hover:text-accent-cta transition-colors mb-1.5">
            {item.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-3">
            <MapPin size={13} className="text-slate-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-2 mb-4">
            {item.description}
          </p>

          {/* Amenities / Facilities Pills */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 font-medium">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-lg">
              <Tent size={12} className="text-slate-400" />
              <span>Tenda</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-lg">
              <Accessibility size={12} className="text-slate-400" />
              <span>Kursi Roda</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-lg">
              <Building size={12} className="text-slate-400" />
              <span>Musholla</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-lg">
              <Car size={12} className="text-slate-400" />
              <span>Area Parkir</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Price & Action Column */}
      <div className="w-full md:w-55 lg:w-57.5 p-5 lg:p-6 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-between shrink-0">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Mulai dari
          </span>
          <span className="text-2xl font-black text-primary-dark tracking-tight block mt-1">
            {item.priceFormatted}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">
            {item.unitText}
          </span>
        </div>

        <div className="pt-5">
          <Link
            href={`/makam/${item.id}`}
            className="w-full py-3 px-4 bg-accent-cta hover:bg-accent-cta-dark text-white text-xs font-bold rounded-xl transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 group-hover:scale-[1.01]"
          >
            <span>Pilih & Lihat Denah</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}

import { MapPin, Mosque, Tent, School, ChevronRight } from "lucide-react";

interface MakamCardProps {
  id?: string;
  name: string;
  location: string;
  availability: string;
  type: string;
  price: string;
}

export default function MakamCard({ name, location, availability, type, price }: MakamCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex gap-4 w-90 shrink-0 snap-start hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer group">
      {/* Image Area */}
      <div className="w-27.5 h-32.5 rounded-xl bg-gray-100 shrink-0 flex items-center justify-center overflow-hidden">
        <span className="text-gray-400 text-xs font-medium">Image</span>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 min-w-0 py-0.5 justify-between">
        {/* Title & Location */}
        <div>
          <h3 className="font-bold text-primary text-[15px] leading-snug truncate mb-1">
            {name}
          </h3>
          <div className="flex items-center text-accent text-[11px] mb-3">
            <MapPin size={12} className="mr-1 shrink-0 opacity-70" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-2 mb-3">
          <div>
            <p className="text-[10px] text-gray-400 mb-0.5 font-medium">Tersedia</p>
            <p className="text-[12px] font-bold text-primary truncate">{availability}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 mb-0.5 font-medium">Tipe</p>
            <p className="text-[12px] font-bold text-primary truncate">{type}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] text-gray-400 mb-1 font-medium">Fasilitas</p>
            <div className="flex items-center gap-2 text-primary/70">
              <Mosque size={14} />
              <Tent size={14} />
              <School size={14} />
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-[10px] text-gray-400 mb-0.5 font-medium">Mulai Dari</p>
            <p className="font-bold text-primary text-[14px]">{price}</p>
          </div>
          <div className="text-primary group-hover:translate-x-1 transition-transform">
            <ChevronRight size={18} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
}

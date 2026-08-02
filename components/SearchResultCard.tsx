import { MapPin, Tent, Trees, Coffee } from "lucide-react";
import Link from "next/link";

interface SearchResultCardProps {
  isRecommendation?: boolean;
  name: string;
  location: string;
  price: string;
  availability: string;
  type: string;
  id?: string;
}

export default function SearchResultCard({
  isRecommendation = false,
  name,
  location,
  price,
  availability,
  type,
  id = "1",
}: SearchResultCardProps) {
  return (
    <div
      className={`bg-white rounded-sm overflow-hidden flex flex-col md:flex-row mb-6 ${
        isRecommendation ? "border-2 border-[#5A6C7D]" : "border border-[#CBD5E1]"
      }`}
    >
      <div className="relative w-full md:w-[320px] shrink-0 h-55 md:h-auto min-h-55">
        {isRecommendation && (
          <div className="absolute top-0 left-0 bg-[#5A6C7D] text-white text-[11px] font-medium px-3 py-1 z-10 rounded-br">
            Rekomendasi
          </div>
        )}
        <div className="w-full h-full bg-gray-200" />
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
            <h3 className="text-[18px] font-semibold text-gray-900">{name}</h3>
            <div className="text-left md:text-right">
              <p className="text-[11px] text-gray-500 mb-0.5">Mulai dari</p>
              <p className="text-[20px] font-bold text-gray-900">{price}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[13px] text-gray-600 mb-3 -mt-1">
            <MapPin size={14} className="text-gray-700" />
            <span>{location}</span>
          </div>

          <hr className="border-gray-800 mb-3" />

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-[11px] text-gray-500 mb-0.5">Tersedia</p>
              <p className="font-medium text-gray-900 text-[13px]">{availability}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 mb-0.5">Tipe</p>
              <p className="font-medium text-gray-900 text-[13px]">{type}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 mb-0.5">Fasilitas</p>
              <div className="flex items-center gap-1.5 text-gray-800">
                <Tent size={16} />
                <Trees size={16} />
                <Coffee size={16} />
              </div>
            </div>
          </div>
        </div>

        <Link
          href={`/makam/${id}`}
          className="w-full bg-[#283546] hover:bg-[#1A252F] text-white py-2.25 rounded-sm text-center text-[13px] font-medium transition-colors inline-block"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

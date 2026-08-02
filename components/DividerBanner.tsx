import { ShieldCheck, Clock, Headset } from "lucide-react";

export default function DividerBanner() {
  const stats = [
    { icon: ShieldCheck, label: "Terverifikasi", desc: "Mitra terpercaya" },
    { icon: Clock, label: "Proses Cepat", desc: "Layanan 24 jam" },
    { icon: Headset, label: "Dukungan Penuh", desc: "Pendampingan ahli" },
  ];

  return (
    <div className="w-full bg-primary py-10 mt-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-around gap-8 sm:gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <stat.icon size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-sm">{stat.label}</p>
              <p className="text-xs text-gray-300">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

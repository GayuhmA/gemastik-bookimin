import { Search, PackageCheck, Users } from "lucide-react";

export default function BookingJourneySection() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Cari & Pilih Petak Real-Time",
      description: "Lihat denah liang yang kosong secara transparan dan akurat tanpa perantara.",
    },
    {
      step: "02",
      icon: PackageCheck,
      title: "Lengkapi Kebutuhan Duka",
      description: "Ambulans 24 jam, perlengkapan jenazah, karangan bunga, hingga tenda prosesi.",
    },
    {
      step: "03",
      icon: Users,
      title: "Pendampingan Tuntas",
      description: "Petugas TPU dan mitra siaga di lokasi mendampingi keluarga hingga pemakaman selesai.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="inline-block text-accent-cta text-xs font-bold tracking-widest uppercase rounded-full mb-3">
            Hadir Untuk Memudahkan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark tracking-tight leading-tight">
            Alur Pemesanan yang Mudah
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed font-normal">
            Tiga langkah sederhana, agar keluarga dapat berfokus pada perpisahan yang berarti.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-7 lg:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-accent-cta group-hover:bg-accent-cta group-hover:text-white transition-colors duration-300">
                      <Icon size={24} />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-300 group-hover:text-teal-200 transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-primary-dark mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


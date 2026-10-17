import Link from "next/link";
import { Ambulance, Sparkles, Flower2, FileText, ArrowRight } from "lucide-react";

export default function BereavementCareSection() {
  const services = [
    {
      id: "ambulance",
      badge: "SIAGA 24 JAM",
      title: "Ambulans Siaga Medis",
      desc: "Penjemputan yang sigap dan aman, dengan kru terlatih yang mendampingi perjalanan keluarga.",
      icon: Ambulance,
      href: "/cari-makam?filter=ambulance",
    },
    {
      id: "pemulasaran",
      badge: "DITANGANI TENAGA AHLI",
      title: "Paket Pemulasaran & Kafan",
      desc: "Perawatan jenazah dengan penuh hormat, sesuai keyakinan dan kebutuhan keluarga.",
      icon: Sparkles,
      href: "/cari-makam?filter=pemulasaran",
    },
    {
      id: "florist",
      badge: "PENGIRIMAN TERJADWAL",
      title: "Karangan Bunga Belasungkawa",
      desc: "Sampaikan doa dan penghormatan terakhir melalui rangkaian bunga yang bermakna.",
      icon: Flower2,
      href: "/cari-makam?filter=florist",
    },
    {
      id: "dokumen",
      badge: "PENDAMPINGAN DOKUMEN",
      title: "Pengurusan Akta Kematian RT/RW/RS",
      desc: "Bantuan dokumen dan administrasi, agar keluarga tidak harus mengurusnya sendiri.",
      icon: FileText,
      href: "/cari-makam?filter=administrasi",
    },
  ];

  return (
    <section id="layanan-duka" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="inline-block text-accent-cta text-xs font-bold tracking-widest uppercase rounded-full mb-3">
            Setiap Kebutuhan, Kami Dampingi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark tracking-tight leading-tight">
            Layanan Duka dalam Satu Pintu
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed font-normal">
            Dari penjemputan hingga administrasi, satu pendamping membantu mengoordinasikan semuanya.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-accent-cta mb-6 group-hover:bg-accent-cta group-hover:text-white transition-colors duration-300">
                    <Icon size={24} />
                  </div>
                  <span className="text-[11px] font-bold text-accent-cta tracking-wider uppercase block mb-2">
                    {item.badge}
                  </span>
                  <h3 className="text-lg font-bold text-primary-dark mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {item.desc}
                  </p>
                </div>

                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-cta hover:text-accent-cta-dark group-hover:translate-x-1 transition-all pt-2 border-t border-slate-100"
                >
                  <span>Detail layanan</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


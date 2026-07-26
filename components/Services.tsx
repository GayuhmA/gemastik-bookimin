import { Ambulance, ClipboardCheck, Box, Flower2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Pemesanan Ambulans",
      description: "Armada siaga 24 jam untuk pengantaran dalam dan luar kota dengan standar medis",
      icon: Ambulance,
    },
    {
      title: "Paket Pengurusan",
      description: "Layanan terpadu administrasi dan seremonial yang dikelola oleh tenaga profesional",
      icon: ClipboardCheck,
    },
    {
      title: "Perlengkapan Jenazah",
      description: "Penyediaan peti, kain kafan, dan utilitas upacara dengan kualitas material terbaik",
      icon: Box,
    },
    {
      title: "Karangan Bunga",
      description: "Rangkaian bunga duka cita elegan sebagai bentuk simpati dan penghormatan terakhir",
      icon: Flower2,
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 md:py-28">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 px-4 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
          Layanan Kami
        </h2>
        <p className="text-gray-600 text-base leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        </p>
      </div>

      {/* Grid Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-white p-7 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent-cta group-hover:text-white transition-colors text-accent">
              <service.icon size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">
              {service.title}
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm flex-1">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

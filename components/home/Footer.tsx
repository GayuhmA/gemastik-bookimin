import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MessageCircle, ShieldCheck } from "lucide-react";

export default function Footer() {
  const exploreLinks = [
    { label: "Beranda", href: "/" },
    { label: "Cari Makam", href: "/cari-makam" },
    { label: "Layanan Duka", href: "#layanan-duka" },
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Mitra Resmi", href: "/mitra" },
  ];

  const legalLinks = [
    { label: "Pusat Bantuan", href: "#" },
    { label: "Panduan Pemesanan", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Kebijakan Pembatalan", href: "#" },
  ];

  return (
    <footer className="bg-[#0B132B] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo/logo.svg"
                  alt="Bookimin Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Bookimin
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-normal">
              Menghadirkan kepastian dan ketenangan dalam setiap perpisahan. Layanan pemakaman digital yang manusiawi dan terpercaya.
            </p>
          </div>

          {/* Col 2: Jelajahi Bookimin (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Jelajahi Bookimin
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Informasi & Legal (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Informasi & Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Layanan Darurat 24 Jam (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Layanan Darurat 24 Jam
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <a
                  href="tel:08001266546"
                  className="font-bold text-white hover:text-accent-cta transition-colors flex items-center gap-2 text-base"
                >
                  <Phone size={16} className="text-accent-cta" />
                  <span>0800-1-BOOKIMIN</span>
                </a>
                <p className="text-[11px] text-slate-500 mt-0.5">Bebas pulsa • Siaga setiap hari</p>
              </div>

              <div>
                <a
                  href="https://wa.me/6281299887766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <MessageCircle size={15} className="text-accent-cta" />
                  <span>WhatsApp Siaga (0812-9988-7766)</span>
                </a>
              </div>

              <div>
                <a
                  href="mailto:halo@bookimin.id"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail size={15} className="text-slate-400" />
                  <span>halo@bookimin.id</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Bookimin. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck size={14} className="text-accent-cta" />
            <span>Data keluarga Anda aman & terlindungi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


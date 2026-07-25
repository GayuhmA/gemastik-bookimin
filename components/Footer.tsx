import Link from "next/link";
import { Flower2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Flower2 size={24} strokeWidth={1.5} />
              <span className="font-bold text-lg tracking-tight">Bookimin</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Platform pemesanan lahan makam dan layanan duka terpercaya di Indonesia.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Navigasi</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/tentang" className="text-sm hover:text-white transition-colors">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="/cari-makam" className="text-sm hover:text-white transition-colors">
                  Cari Makam
                </Link>
              </li>
              <li>
                <Link href="/mitra" className="text-sm hover:text-white transition-colors">
                  Mitra
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Kontak</h4>
            <ul className="space-y-2.5 text-sm">
              <li>info@bookimin.id</li>
              <li>+62 812 3456 7890</li>
              <li className="text-gray-400">Yogyakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-gray-500">
          © 2026 Bookimin. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PhoneCall, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Cari Makam", href: "/cari-makam" },
    { label: "Layanan Duka", href: "/#layanan-duka" },
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Mitra Resmi", href: "/mitra" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 transition-transform group-hover:scale-105">
              <Image
                src="/logo/logo.svg"
                alt="Bookimin Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-extrabold text-2xl text-primary-dark tracking-tight">
              Bookimin
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[14px] transition-colors relative py-1 ${
                    isActive
                      ? "font-bold text-accent-cta"
                      : "font-medium text-slate-600 hover:text-accent-cta"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-cta rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:08001266546"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-accent-cta transition-colors"
            >
              <PhoneCall size={16} className="text-accent-cta" />
              <span>Hubungi Bantuan (24 Jam)</span>
            </a>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-accent-cta hover:bg-accent-cta-dark text-white text-sm font-bold rounded-lg transition-all shadow-sm hover:shadow"
            >
              Masuk / Daftar
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-teal-50 text-accent-cta font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href="tel:08001266546"
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-700 bg-slate-50 rounded-lg"
            >
              <PhoneCall size={16} className="text-accent-cta" />
              <span>Hubungi Bantuan (24 Jam)</span>
            </a>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center py-2.5 bg-accent-cta text-white text-sm font-bold rounded-lg"
            >
              Masuk / Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


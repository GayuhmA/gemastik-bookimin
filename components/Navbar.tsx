"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="transition-transform group-hover:scale-105 relative w-9 h-8">
                <Image 
                  src="/logo/logo.svg" 
                  alt="Bookimin Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-bold text-2xl text-primary-dark tracking-tight">
                Bookimin
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/tentang" className="text-sm font-medium text-primary hover:text-accent transition-colors relative group">
              Tentang
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/cari-makam" className="text-sm font-medium text-primary hover:text-accent transition-colors relative group">
              Cari Makam
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/mitra" className="text-sm font-medium text-primary hover:text-accent transition-colors relative group">
              Mitra
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className="px-6 py-2.5 text-sm font-medium text-primary bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/register" 
              className="px-6 py-2.5 text-sm font-medium text-white bg-accent-cta hover:bg-accent-cta-dark hover:scale-105 active:scale-95 rounded-lg transition-all shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-primary p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 origin-top transform transition-all duration-200 ease-out ${
          isMobileMenuOpen 
            ? "opacity-100 scale-y-100 pointer-events-auto visible" 
            : "opacity-0 scale-y-95 pointer-events-none invisible"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 flex flex-col">
          <Link 
            href="/tentang" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-primary hover:bg-gray-50 rounded-md"
          >
            Tentang
          </Link>
          <Link 
            href="/cari-makam" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-primary hover:bg-gray-50 rounded-md"
          >
            Cari Makam
          </Link>
          <Link 
            href="/mitra" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-primary hover:bg-gray-50 rounded-md"
          >
            Mitra
          </Link>
          <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3 px-3">
            <Link 
              href="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center px-6 py-2.5 text-sm font-medium text-primary bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/register" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center px-6 py-2.5 text-sm font-medium text-white bg-accent-cta hover:bg-accent-cta-dark rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

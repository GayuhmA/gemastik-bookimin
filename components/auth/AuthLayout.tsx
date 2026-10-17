import React from "react";
import Image from "next/image";
import Link from "next/link";
import AuthVisualSide from "./AuthVisualSide";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-full flex flex-col lg:flex-row bg-white selection:bg-teal-100 selection:text-teal-900">
      {/* 1. Left Visual Hero Section (Fixed to 100vh on Desktop) */}
      <AuthVisualSide />

      {/* 2. Right Form Column (Self-contained scrollable if viewport is compact) */}
      <section className="w-full lg:w-1/2 h-full min-h-screen lg:min-h-0 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-105 mx-auto my-auto py-6">
          {/* Brand Logo Header */}
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 transition-transform group-hover:scale-105 shrink-0">
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

          {children}
        </div>
      </section>
    </div>
  );
}


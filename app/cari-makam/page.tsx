import { Suspense } from "react";
import type { Metadata } from "next";
import CariMakamClient from "./CariMakamClient";

export const metadata: Metadata = {
  title: "Cari Makam — Direktori Lahan Pemakaman Resmi & Terverifikasi | Bookimin",
  description:
    "Cari dan bandingkan lahan pemakaman resmi di Sleman, Bantul, Yogyakarta, dan sekitarnya. Informasi ketersediaan real-time, harga transparan tanpa perantara.",
};

export default function CariMakamPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-accent-cta animate-ping" />
            <span>Memuat direktori pemakaman...</span>
          </div>
        </div>
      }
    >
      <CariMakamClient />
    </Suspense>
  );
}


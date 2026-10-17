import Image from "next/image";
import { Check } from "lucide-react";

export default function AuthVisualSide() {
  return (
    <section className="hidden lg:flex lg:w-1/2 relative bg-slate-900 h-full overflow-hidden select-none shrink-0">
      {/* Cinematic Cemetery Garden Photo */}
      <Image
        src="/images/hero-garden.jpg"
        alt="Taman Pemakaman Asri Bookimin"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Ambient Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/45 to-slate-950/35" />

      {/* Hero Narrative Overlay Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 xl:p-16 text-white">
        {/* Top Tagline */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1.5px] bg-slate-300/80" />
          <span className="text-xs font-semibold tracking-widest text-slate-200 uppercase">
            TENANG DI SETIAP LANGKAH
          </span>
        </div>

        {/* Bottom Quote & Trust Badges */}
        <div className="space-y-6 max-w-xl pb-6">
          {/* Elegant Quotation Mark */}
          <div className="text-white/80">
            <svg
              className="w-8 h-8 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Quote Headline */}
          <h2 className="text-2xl xl:text-[32px] font-bold text-white leading-snug tracking-tight">
            Memberikan penghormatan terbaik bagi orang terkasih dengan ketenangan, kemudahan, dan rasa pasti.
          </h2>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
              <Check size={13} className="text-emerald-400 stroke-[2.5]" />
              <span>Terpercaya di 15+ Kota</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
              <Check size={13} className="text-emerald-400 stroke-[2.5]" />
              <span>100% Transparan Tanpa Calo</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


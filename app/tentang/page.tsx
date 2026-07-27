import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Clock, ShieldCheck, Heart } from "lucide-react";

export default function TentangPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 w-full bg-white">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col gap-8">
              <div className="space-y-5">
                <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
                  Tentang Bookimin
                </h1>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Bookimin adalah platform digital yang memudahkan masyarakat menemukan, membandingkan, dan memesan lahan makam secara cepat, transparan, dan terintegrasi. Selain itu, Bookimin menyediakan layanan florist, ambulans, serta informasi administrasi dalam satu aplikasi. Kami hadir untuk membantu keluarga mengurus kebutuhan pemakaman dengan lebih mudah, efisien, dan penuh ketenangan
                  </p>
                </div>
              </div>

              {/* Layanan */}
              <div className="pt-6 border-t border-gray-100">
                <h2 className="text-xl font-semibold text-primary mb-6">Layanan dalam Satu Pintu</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <Search size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Pencarian Makam</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Booking lahan untuk saat ini atau persiapan di masa depan.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                      <Heart size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Layanan Kedukaan</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Penyedia ambulans, perlengkapan jenazah, dan administrasi.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Proses Cepat</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Konfirmasi instan dan pemrosesan yang efisien tanpa calo.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Mitra Terverifikasi</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Bekerja sama dengan mitra yang resmi dan terpercaya.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Image Placeholder matching Hero.tsx */}
            <div className="relative h-100 md:h-150 w-full lg:order-last order-first">
              <div className="absolute inset-0 bg-gray-200 rounded-3xl overflow-hidden shadow-xl">
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <span className="text-lg font-medium">Tentang Image Placeholder</span>
                  <span className="text-sm mt-1">(800 x 1000)</span>
                </div>
                <div className="absolute inset-0 bg-linear-to-tr from-black/5 to-transparent"></div>
              </div>
            </div>

          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Kata sandi harus minimal 8 karakter.");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate registration delay
      await new Promise((resolve) => setTimeout(resolve, 900));
      // Successful registration -> route to login
      router.push("/login");
    } catch {
      setError("Terjadi kendala saat pendaftaran. Silakan coba kembali.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 700);
  };

  return (
    <AuthLayout>
      {/* Heading & Subtitle */}
      <div className="mt-6 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark tracking-tight">
          Buat Akun Bookimin
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2 font-normal">
          Satu akun untuk merencanakan dan mengelola kebutuhan keluarga dengan lebih tenang.
        </p>
      </div>

      {/* Social Sign Up (Google) */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200/90 hover:border-slate-300 rounded-xl bg-white hover:bg-slate-50/70 text-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-2xs cursor-pointer group disabled:opacity-60"
      >
        <svg
          className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.43 7.33 24 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.57 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
          />
        </svg>
        <span>Daftar dengan Google</span>
      </button>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200/80" />
        </div>
        <div className="relative px-3 bg-white text-[11px] text-slate-400 font-medium">
          atau daftar dengan email
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Nama Lengkap */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold text-slate-700 mb-1"
          >
            Nama Lengkap
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User size={16} />
            </div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap Anda"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-sm text-primary-dark placeholder:text-slate-400 focus:outline-none focus:border-accent-cta focus:ring-2 focus:ring-accent-cta/15 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-slate-700 mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail size={16} />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-sm text-primary-dark placeholder:text-slate-400 focus:outline-none focus:border-accent-cta focus:ring-2 focus:ring-accent-cta/15 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Nomor WhatsApp */}
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-semibold text-slate-700 mb-1"
          >
            Nomor WhatsApp
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone size={16} />
            </div>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Contoh: 08xx-xxxx-xxxx"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-sm text-primary-dark placeholder:text-slate-400 focus:outline-none focus:border-accent-cta focus:ring-2 focus:ring-accent-cta/15 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Kata Sandi */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-slate-700 mb-1"
          >
            Kata Sandi
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock size={16} />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Buat kata sandi Anda"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-11 py-2.5 bg-white border border-slate-200/90 rounded-xl text-sm text-primary-dark placeholder:text-slate-400 focus:outline-none focus:border-accent-cta focus:ring-2 focus:ring-accent-cta/15 transition-all shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Minimal 8 karakter, gunakan huruf dan angka.
          </span>
        </div>

        {/* Terms & Conditions Agreement */}
        <div className="text-[11px] text-slate-500 leading-relaxed pt-1">
          Dengan mendaftar, Anda menyetujui{" "}
          <Link
            href="/syarat-ketentuan"
            className="font-semibold text-accent-cta hover:text-accent-cta-dark hover:underline"
          >
            Syarat & Ketentuan
          </Link>{" "}
          serta{" "}
          <Link
            href="/kebijakan-privasi"
            className="font-semibold text-accent-cta hover:text-accent-cta-dark hover:underline"
          >
            Kebijakan Privasi Bookimin.
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 sm:py-3.5 px-4 bg-accent-cta hover:bg-accent-cta-dark text-white font-bold rounded-xl text-sm transition-all shadow-xs hover:shadow active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Mendaftarkan akun...</span>
              </>
            ) : (
              <span>Buat Akun Bookimin</span>
            )}
          </button>
        </div>
      </form>

      {/* Login Navigation Link */}
      <p className="text-xs text-slate-500 text-center mt-5">
        Sudah memiliki akun?{" "}
        <Link
          href="/login"
          className="font-bold text-accent-cta hover:text-accent-cta-dark hover:underline transition-colors"
        >
          Masuk Sekarang
        </Link>
      </p>
    </AuthLayout>
  );
}

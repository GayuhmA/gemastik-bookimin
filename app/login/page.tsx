"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API

      // Fake Accounts Logic
      if (email === "admin@gmail.com" && password === "admin") {
        console.log("Logged in as Admin");
        alert("Berhasil login sebagai Admin");
        router.push("/admin/dashboard");
      } else if (email === "merchant1@gmail.com" && password === "merchant") {
        console.log("Logged in as Merchant 1");
        alert("Berhasil login sebagai Merchant 1");
        // router.push("/dashboard-merchant");
      } else if (email === "merchant2@gmail.com" && password === "merchant") {
        console.log("Logged in as Merchant 2");
        alert("Berhasil login sebagai Merchant 2");
        // router.push("/dashboard-merchant");
      } else {
        setError("Email atau password salah.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoClick = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError("");
  };

  return (
    <div className="min-h-screen flex relative bg-linear-to-br from-[#e8edf4] via-[#c5d0dd] to-[#9aafbf] selection:bg-blue-200">
      {/* Left Side - Text Content */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        {/* Decorative background blurs for depth */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-135 px-8 lg:px-12 relative z-10">
          <h2 className="text-[40px] font-extrabold text-primary leading-tight mb-5 tracking-tight">
            Pesan Makam Lebih <span className="text-blue-600">Mudah & Terpercaya</span>
          </h2>
          <p className="text-slate-600 text-[16px] leading-relaxed">
            Bookimin hadir untuk membantu Anda mencari, membandingkan, dan memesan lahan peristirahatan terbaik dengan cepat dan aman.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-125 bg-white/95 backdrop-blur-xl rounded-[28px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] p-8 sm:p-12 border border-white/60">
          {/* Header */}
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sign in</h1>
            <p className="text-slate-500 text-[14px] mt-2">Enter your details to access your account.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[13px] font-bold text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={`w-full h-12 px-4 rounded-xl border ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'} bg-white/50 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-4 transition-all duration-200`}
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-[13px] font-bold text-slate-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-all"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 px-4 pr-11 rounded-xl border border-slate-200 bg-white/50 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoading}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 text-[15px] shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-6">
            <div className="flex-1 border-t border-slate-200" />
            <span className="px-4 text-[13px] text-slate-400 font-medium bg-transparent">Or continue with</span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isLoading}
              className="flex items-center justify-center gap-2.5 h-12 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm"
            >
              {/* Google Icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
              </svg>
              <span className="text-[13px] font-semibold text-slate-700">Google</span>
            </button>

            <button
              type="button"
              disabled={isLoading}
              className="flex items-center justify-center gap-2.5 h-12 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm"
            >
              {/* Apple Icon */}
              <svg width="15" height="18" viewBox="0 0 14 18" xmlns="http://www.w3.org/2000/svg" fill="#0f172a" className="group-hover:scale-105 transition-transform">
                <path d="M13.17 6.2c-.08.06-1.55.89-1.55 2.73 0 2.13 1.87 2.89 1.93 2.91-.01.05-.3 1.03-1 2.04-.6.88-1.22 1.76-2.17 1.76s-1.19-.55-2.29-.55c-1.07 0-1.45.57-2.32.57-.87 0-1.49-.82-2.19-1.82C2.52 12.3 1.77 10.14 1.77 8.1c0-3.29 2.14-5.03 4.24-5.03 1.12 0 2.05.73 2.75.73.67 0 1.71-.78 2.98-.78.48 0 2.21.04 3.35 1.68l.08-.5ZM9.88 2c.48-.57.82-1.36.82-2.15 0-.11-.01-.22-.03-.3-.78.03-1.7.52-2.26 1.15-.44.49-.85 1.28-.85 2.09 0 .12.02.24.03.28.05.01.14.02.22.02.7 0 1.57-.47 2.07-1.09Z"/>
              </svg>
              <span className="text-[13px] font-semibold text-slate-700">Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-[14px] text-slate-500 mt-8">
            Didn&apos;t have an account yet?{" "}
            <Link href="/register" className="text-blue-600 font-bold hover:text-blue-700 hover:underline underline-offset-4 transition-all">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ShoppingCart, Package, Wallet, Megaphone, UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MitraSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/mitra/dashboard", icon: LayoutGrid },
    { name: "Pesanan", href: "/mitra/pesanan", icon: ShoppingCart, badge: 3 },
    { name: "Layanan", href: "/mitra/layanan", icon: Package },
    { name: "Keuangan", href: "/mitra/pendapatan", icon: Wallet },
    { name: "Menu Iklan", href: "/mitra/iklan", icon: Megaphone },
  ];

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-[#F1F5F9] border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0 font-sans">
      <div className="p-8 pb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#E2E8F0] rounded-sm"></div>
        <div>
          <div className="font-bold text-[18px] text-[#0F172A] leading-tight">Bookimin</div>
          <div className="text-[12px] text-slate-500 font-medium">Mitra</div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-lg text-[14px] font-medium transition-colors ${
                isActive
                  ? "bg-slate-200/60 text-[#0F172A]"
                  : "text-slate-500 hover:bg-slate-200/40 hover:text-[#0F172A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? "text-[#0F172A]" : "text-slate-400"} />
                {item.name}
              </div>
              {item.badge && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto space-y-4">
        {/* Profile Card */}
        <div className="border border-slate-300 bg-[#E2E8F0]/30 rounded-lg p-3 flex items-center gap-3">
          <UserCircle2 size={32} className="text-[#0F172A]" />
          <div>
            <div className="text-[13px] font-bold text-[#0F172A]">Al Azhar Memorial</div>
            <div className="text-[10px] text-slate-500 font-medium">Mitra Makam</div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white py-2.5 rounded-md text-[13px] font-medium transition-colors"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}

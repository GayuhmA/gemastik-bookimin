"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Users, FileText, Megaphone, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
    { name: "Mitra", href: "/admin/mitra", icon: Users },
    { name: "Transaksi", href: "/admin/transaksi", icon: FileText },
    { name: "Kelola Iklan", href: "/admin/iklan", icon: Megaphone },
  ];

  const handleLogout = () => {
    // Basic redirect for MVP
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-[#F1F5F9] border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-300 rounded-sm"></div>
        <span className="font-bold text-[18px] text-primary">Bookimin</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-200/60 text-primary"
                  : "text-slate-500 hover:bg-slate-200/40 hover:text-primary"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-primary-dark hover:bg-primary text-white py-3 rounded-md text-sm font-medium transition-colors"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}

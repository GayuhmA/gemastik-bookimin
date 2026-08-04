"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TransaksiTabs() {
  const pathname = usePathname();
  
  const tabs = [
    { name: "Daftar Transaksi", href: "/admin/transaksi" },
    { name: "Penarikan Dana", href: "/admin/transaksi/penarikan" },
  ];

  return (
    <div className="flex space-x-1 border-b border-gray-200 mb-6">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}

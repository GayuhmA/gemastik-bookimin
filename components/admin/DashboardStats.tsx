import { adminDashboardStats } from "@/data/admin";
import { Briefcase, Truck, Flower2, LineChart } from "lucide-react";

export default function DashboardStats() {
  const stats = [
    { label: "Total Makam", value: adminDashboardStats.totalMakam, icon: Briefcase },
    { label: "Ambulance", value: adminDashboardStats.ambulance, icon: Truck },
    { label: "Florist", value: adminDashboardStats.florist, icon: Flower2 },
    { label: "Jasa Kepengurusan", value: adminDashboardStats.jasaKepengurusan, icon: LineChart },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <Icon size={18} className="text-gray-700" />
              <span className="text-[13px] font-semibold text-gray-800">{stat.label}</span>
            </div>
            <div className="text-right">
              <span className="text-[32px] font-bold text-gray-900">{stat.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

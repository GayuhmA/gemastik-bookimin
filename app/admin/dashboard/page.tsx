import DashboardStats from "@/components/admin/DashboardStats";
import DashboardChart from "@/components/admin/DashboardChart";
import DashboardTable from "@/components/admin/DashboardTable";

export default function AdminDashboardPage() {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[22px] font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <DashboardStats />
        
        <div className="mt-10">
          <h2 className="text-[18px] font-semibold text-gray-900 mb-4">Grafik Transaksi Bulan Ini</h2>
          <DashboardChart />
        </div>
        
        <div className="mt-10">
          <h2 className="text-[18px] font-semibold text-gray-900 mb-4">Daftar Transaksi Terbaru</h2>
          <DashboardTable />
        </div>
      </div>
    </main>
  );
}

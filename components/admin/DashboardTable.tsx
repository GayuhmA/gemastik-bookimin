import { adminRecentTransactions } from "@/data/admin";

export default function DashboardTable() {
  const getLayananBadge = (layanan: string) => {
    switch (layanan.toLowerCase()) {
      case "makam":
        return "bg-slate-100 text-slate-600";
      case "ambulans":
        return "bg-emerald-100 text-emerald-600";
      case "florist":
        return "bg-pink-100 text-pink-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    if (status.toLowerCase() === "selesai") {
      return "bg-green-100 text-green-600";
    }
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden mt-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
          <thead className="bg-white border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">Order ID</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Mitra Tujuan</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Tipe Layanan</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Nama Pemesan</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {adminRecentTransactions.map((tx, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-blue-500">{tx.orderId}</td>
                <td className="px-6 py-4 text-gray-700">{tx.mitra}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-md ${getLayananBadge(tx.layanan)}`}>
                    {tx.layanan}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{tx.pemesan}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${getStatusBadge(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

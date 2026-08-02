import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA] w-full font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

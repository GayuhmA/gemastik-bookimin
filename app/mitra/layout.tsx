import MitraSidebar from "@/components/mitra/MitraSidebar";

export default function MitraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA] w-full font-sans">
      <MitraSidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

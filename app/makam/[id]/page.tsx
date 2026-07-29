import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MakamDetailClient from "./MakamDetailClient";

export default async function MakamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Navbar />
      <MakamDetailClient makamId={id} />
      <Footer />
    </>
  );
}

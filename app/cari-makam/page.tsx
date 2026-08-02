import Navbar from "@/components/Navbar";
import SearchBarOverlay from "@/components/SearchBarOverlay";
import MakamCarousel from "@/components/MakamCarousel";
import Footer from "@/components/Footer";
import SearchResults from "@/components/SearchResults";
import { formatRupiah, makamData } from "@/data/makam";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CariMakamPage(props: Props) {
  const searchParams = await props.searchParams;
  const query = typeof searchParams?.q === "string" ? searchParams.q : undefined;
  const results = makamData.map((makam) => ({
    ...makam,
    price: formatRupiah(makam.price),
  }));
  const carouselItems = [...results, ...results];

  return (
    <>
      <Navbar />

      {query ? (
        <SearchResults initialQuery={query} results={results} />
      ) : (
        <main className="flex-1 flex flex-col w-full pb-16">
          <div className="w-full h-50 md:h-70 bg-[#9CA3AF] relative">
            <SearchBarOverlay />
          </div>

          <div className="max-w-7xl mx-auto w-full pt-20">
            <MakamCarousel title="Rekomendasi" items={carouselItems} />
            <MakamCarousel title="Terdekat" items={[...results].reverse().concat(results)} />
          </div>
        </main>
      )}

      <Footer />
    </>
  );
}

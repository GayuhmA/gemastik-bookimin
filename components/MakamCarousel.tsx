"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import MakamCard from "./MakamCard";

type MakamCarouselItem = {
  id?: string;
  name: string;
  location: string;
  availability: string;
  type: string;
  price: string;
};

interface MakamCarouselProps {
  title: string;
  items: MakamCarouselItem[];
}

export default function MakamCarousel({ title, items }: MakamCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Toleransi 2px untuk pembulatan zoom browser
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollBy = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-12 relative group px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-primary mb-6">{title}</h2>
      
      <div className="relative">
        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-8"
        >
          {items.map((item, index) => (
            <MakamCard key={index} {...item} />
          ))}
          {/* Spacer agar card terakhir tidak menempel rapat di tepi saat mentok */}
          <div className="w-1 md:w-8 shrink-0"></div>
        </div>

        {/* Scroll Left Button */}
        <button 
          onClick={() => scrollBy('left')}
          className={`absolute left-0 sm:left-2 lg:-left-4 top-1/2 -translate-y-1/2 -mt-3 w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hidden md:flex z-20 hover:scale-105 active:scale-95 ${
            canScrollLeft ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Scroll Right Button */}
        <button 
          onClick={() => scrollBy('right')}
          className={`absolute right-0 sm:right-2 lg:-right-4 top-1/2 -translate-y-1/2 -mt-3 w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hidden md:flex z-20 hover:scale-105 active:scale-95 ${
            canScrollRight ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
}

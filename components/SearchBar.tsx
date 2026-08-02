"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  initialQuery?: string;
  className?: string;
}

export default function SearchBar({ initialQuery = "", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    router.push(trimmedQuery ? `/cari-makam?q=${encodeURIComponent(trimmedQuery)}` : "/cari-makam");
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 flex items-center p-2 focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary/20 transition-all ${className}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari nama TPU atau lokasi..."
        className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-primary placeholder:text-gray-400 font-medium w-full"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors"
      >
        <span>Cari</span>
        <Search size={18} />
      </button>
    </form>
  );
}

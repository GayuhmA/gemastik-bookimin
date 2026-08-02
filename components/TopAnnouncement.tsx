"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function TopAnnouncement() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary-dark text-white px-4 py-2 flex items-center justify-between text-xs sm:text-sm">
      <div className="flex-1 text-center truncate">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-gray-400 hover:text-white transition-colors shrink-0 ml-4"
        aria-label="Tutup pengumuman"
      >
        <X size={16} />
      </button>
    </div>
  );
}

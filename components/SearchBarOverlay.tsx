"use client";

import SearchBar from "./SearchBar";

export default function SearchBarOverlay() {
  return (
    <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 w-full max-w-4xl mx-auto px-4 z-10">
      <SearchBar className="shadow-lg py-1 px-1" />
    </div>
  );
}

'use client';

import { useState } from 'react';

interface Genre {
  id: number;
  name: string;
  slug: string;
}

interface ProductFiltersProps {
  genres: Genre[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (price: string) => void;
  onMaxPriceChange: (price: string) => void;
  onApplyFilters: () => void;
}

export default function ProductFilters({
  genres,
  selectedGenre,
  onGenreChange,
  sortBy,
  onSortChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onApplyFilters
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between mb-4 text-gray-700 font-semibold"
      >
        <span>Filtry i sortowanie</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filters Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-6`}>
        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Kategoria
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
          >
            <option value="">Wszystkie kategorie</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.slug}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Sortuj według
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
          >
            <option value="newest">Najnowsze</option>
            <option value="price-asc">Cena: od najniższej</option>
            <option value="price-desc">Cena: od najwyższej</option>
            <option value="name-asc">Nazwa: A-Z</option>
            <option value="name-desc">Nazwa: Z-A</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Zakres cen (zł)
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
              min="0"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
              min="0"
            />
          </div>
        </div>

        {/* Apply Filters Button */}
        <button
          onClick={onApplyFilters}
          className="w-full bg-[#8CA9FF] hover:bg-[#AAC4F5] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105"
        >
          Zastosuj filtry
        </button>
      </div>
    </div>
  );
}

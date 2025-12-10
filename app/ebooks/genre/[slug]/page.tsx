'use client';

import Link from 'next/link';
import { useState, useEffect, use, useCallback } from 'react';
import { getProducts } from '@/services/api';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

interface Product {
  id: number;
  title?: string;
  name?: string;
  author?: string;
  price: string | number;
  image?: string;
  cover?: string;
  image_url?: string;
  genre?: string;
  format?: string;
  description?: string;
  product_type?: string;
  is_ebook?: boolean;
  is_physical?: boolean;
}

const genreNames: { [key: string]: string } = {
  'romans': 'Romans',
  'kryminal': 'Kryminał',
  'thriller': 'Thriller',
  'fantasy': 'Fantasy',
  'science-fiction': 'Science Fiction',
  'literatura-mlodziezowa': 'Literatura młodzieżowa',
  'horror': 'Horror',
};

const genreApiMapping: { [key: string]: string } = {
  'romans': 'romance',
  'kryminal': 'mystery',
  'thriller': 'thriller',
  'fantasy': 'fantasy',
  'science-fiction': 'science-fiction',
  'literatura-mlodziezowa': 'young-adult',
  'horror': 'horror',
};

export default function EbooksGenrePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const genreName = genreNames[resolvedParams.slug] || resolvedParams.slug;

  const handleFilterChange = useCallback((filtered: Product[]) => {
    let results = filtered;
    
    // Apply search on top of filters
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(p => 
        p.title?.toLowerCase().includes(query) ||
        p.name?.toLowerCase().includes(query) ||
        p.author?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(results);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchEbooks() {
      try {
        const products = await getProducts();
        const apiGenre = genreApiMapping[resolvedParams.slug];
        
        // Filtruj e-booki i według gatunku
        const filtered = products.filter((p: Product) => {
          const isEbook = p.format === 'ebook' || p.format === 'both';
          const matchesGenre = p.genre?.toLowerCase() === apiGenre?.toLowerCase();
          return isEbook && matchesGenre;
        });
        
        setAllProducts(filtered);
        setFilteredProducts(filtered);
        
        // Load wishlist
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistIds(new Set(wishlist.map((item: { id: string }) => item.id)));
      } catch (error) {
        console.error('Error fetching ebooks:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEbooks();
  }, [resolvedParams.slug]);

  // Re-filter when search query changes
  useEffect(() => {
    handleFilterChange(allProducts);
  }, [searchQuery, allProducts, handleFilterChange]);

  const toggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const productId = product.id.toString();
    const exists = wishlist.some((item: { id: string }) => item.id === productId);
    
    let newWishlist;
    if (exists) {
      newWishlist = wishlist.filter((item: { id: string }) => item.id !== productId);
    } else {
      newWishlist = [...wishlist, {
        id: productId,
        name: product.title || product.name,
        price: product.price,
        image: product.image_url || product.image || product.cover
      }];
    }
    
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setWishlistIds(new Set(newWishlist.map((item: { id: string }) => item.id)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-6">
          <Link href="/ebooks" className="text-[#8CA9FF] hover:text-[#AAC4F5] transition-colors">
            ← Powrót do e-booków
          </Link>
        </nav>

        <h1 className="text-4xl font-bold mb-8">
          <span className="text-[#8CA9FF]">{genreName}</span>
          <span className="text-gray-800"> - E-booki</span>
        </h1>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Ładowanie e-booków...</p>
          </div>
        ) : (
          <div className="flex gap-8">
            {/* Filters removed - using search bar instead */}
            
            <main className="flex-1">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Szukaj w kategorii po tytule, autorze..."
                    className="w-full px-6 py-3 pr-12 rounded-xl shadow-lg border-2 border-[#E5EEFF] focus:border-[#8CA9FF] focus:outline-none focus:ring-2 focus:ring-[#8CA9FF]/20 text-gray-900 bg-white transition-all"
                  />
                  <svg 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8CA9FF]"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-600">
                  Znaleziono: <span className="font-bold text-[#8CA9FF]">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'e-book' : 'e-booków'}
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="block h-full"
                >
                  <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative flex flex-col h-full">
                    {/* Wishlist button */}
                    <button
                      onClick={(e) => toggleWishlist(e, product)}
                      className="absolute top-2 right-2 z-10 text-2xl hover:scale-125 transition-transform"
                      title={wishlistIds.has(product.id.toString()) ? "Usuń z listy życzeń" : "Dodaj do listy życzeń"}
                    >
                      {wishlistIds.has(product.id.toString()) ? "❤️" : "🤍"}
                    </button>
                    
                    <div className="aspect-3/4 rounded-xl mb-3 flex items-center justify-center overflow-hidden bg-[#8CA9FF]">
                      {(product.image_url || product.image || product.cover) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image_url || product.image || product.cover}
                          alt={product.title || product.name || 'Ebook'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold">#{product.id}</span>
                      )}
                    </div>
                    <div className="flex flex-col grow">
                      <h2 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-[#8CA9FF] transition-colors min-h-10">
                        {product.title || product.name}
                      </h2>
                      <p className="text-sm text-gray-600 mb-2 min-h-5">
                        {product.author || '\u00A0'}
                      </p>
                      <p className="text-sm font-bold text-[#8CA9FF] mt-auto">
                        {typeof product.price === 'number' 
                          ? `${product.price.toFixed(2)} zł` 
                          : `${product.price} zł`}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <p className="text-gray-500">Brak dostępnych e-booków spełniających wybrane kryteria</p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 px-6 py-2 bg-[#8CA9FF] text-white rounded-lg hover:bg-[#AAC4F5] transition-colors"
                    >
                      Wyczyść wyszukiwanie
                    </button>
                  )}
                </div>
              )}
            </main>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

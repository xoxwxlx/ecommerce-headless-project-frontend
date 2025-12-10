'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { API_URL } from '@/services/api';

interface Product {
  id: number;
  title: string;
  price: string;
  author?: {
    first_name: string;
    last_name: string;
  };
  cover_image?: string;
  format?: string;
  isbn?: string;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load wishlist from localStorage
    const wishlist = localStorage.getItem('wishlist');
    if (wishlist) {
      setWishlistIds(new Set(JSON.parse(wishlist)));
    }
  }, []);

  useEffect(() => {
    if (query) {
      searchProducts(query);
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  const searchProducts = async (searchQuery: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products/?search=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (productId: number) => {
    const newWishlist = new Set(wishlistIds);
    const idString = productId.toString();
    
    if (newWishlist.has(idString)) {
      newWishlist.delete(idString);
    } else {
      newWishlist.add(idString);
    }
    
    setWishlistIds(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify([...newWishlist]));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Wyniki wyszukiwania
          </h1>
          {query && (
            <p className="text-xl text-gray-600">
              Szukasz: <span className="font-semibold text-[#8CA9FF]">{query}</span>
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500 text-xl">Wyszukiwanie...</div>
          </div>
        ) : !query ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">Wpisz frazę w pasku wyszukiwania</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl mb-4">
              Nie znaleziono produktów dla frazy: <span className="font-semibold">{query}</span>
            </p>
            <Link
              href="/products"
              className="inline-block bg-[#8CA9FF] hover:bg-[#AAC4F5] text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:scale-105"
            >
              Przeglądaj wszystkie produkty
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Znaleziono {products.length} {products.length === 1 ? 'produkt' : 'produktów'}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="relative w-full pt-[140%] bg-linear-to-br from-[#8CA9FF] to-[#AAC4F5]">
                      {product.cover_image ? (
                        <Image
                          src={product.cover_image}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-4 flex-1 flex flex-col">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#8CA9FF] transition-colors">
                        {product.title}
                      </h3>
                    </Link>

                    {product.author && (
                      <p className="text-sm text-gray-600 mb-2">
                        {product.author.first_name} {product.author.last_name}
                      </p>
                    )}

                    {product.format && (
                      <span className="inline-block px-3 py-1 bg-[#FFF2C6] text-gray-700 text-xs font-semibold rounded-full mb-3">
                        {product.format === 'ebook' ? 'E-book' : product.format === 'paperback' ? 'Książka' : product.format}
                      </span>
                    )}

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-[#8CA9FF]">
                          {product.price} zł
                        </span>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          aria-label="Dodaj do listy życzeń"
                        >
                          <svg
                            className="w-6 h-6"
                            fill={wishlistIds.has(product.id.toString()) ? '#EF4444' : 'none'}
                            stroke={wishlistIds.has(product.id.toString()) ? '#EF4444' : 'currentColor'}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>

                      <Link
                        href={`/products/${product.id}`}
                        className="block w-full bg-[#8CA9FF] hover:bg-[#AAC4F5] text-white font-semibold py-2.5 px-4 rounded-xl text-center transition-all duration-200 hover:scale-105"
                      >
                        Zobacz szczegóły
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="text-gray-500 text-xl">Ładowanie...</div>
        </div>
        <Footer />
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}

'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { getProducts } from '@/services/api';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

interface Product {
  id: number;
  title: string;
  name?: string;
  author?: string;
  price: string | number;
  image?: string;
  cover?: string;
  image_url?: string;
  genre?: string;
  format?: string;
}

export default function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const authorName = decodeURIComponent(resolvedParams.id);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'books' | 'ebooks'>('all');
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchAuthorProducts() {
      try {
        const allProducts = await getProducts();
        
        // Filtruj produkty według autora
        const authorProducts = allProducts.filter((p: Product) => 
          p.author?.toLowerCase() === authorName.toLowerCase()
        );
        
        setProducts(authorProducts);
        
        // Load wishlist
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistIds(new Set(wishlist.map((item: { id: string }) => item.id)));
      } catch (error) {
        console.error('Error fetching author products:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAuthorProducts();
  }, [authorName]);

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

  const getFilteredProducts = () => {
    if (filter === 'all') return products;
    if (filter === 'books') {
      return products.filter(p => p.format === 'physical' || p.format === 'both' || p.format === 'paperback');
    }
    if (filter === 'ebooks') {
      return products.filter(p => p.format === 'ebook' || p.format === 'both');
    }
    return products;
  };

  const filteredProducts = getFilteredProducts();
  const booksCount = products.filter(p => p.format === 'physical' || p.format === 'both' || p.format === 'paperback').length;
  const ebooksCount = products.filter(p => p.format === 'ebook' || p.format === 'both').length;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link href="/products" className="text-[#8CA9FF] hover:text-[#AAC4F5] transition-colors">
            ← Powrót do produktów
          </Link>
        </nav>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Ładowanie...</p>
          </div>
        ) : (
          <>
            {/* Author Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Author Image Placeholder */}
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#AAC4F5] flex items-center justify-center shrink-0">
                  <span className="text-4xl md:text-6xl text-white font-bold">
                    {authorName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                {/* Author Info */}
                <div className="grow">
                  <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                    {authorName}
                  </h1>
                  <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                    Autor {products.length} {products.length === 1 ? 'publikacji' : 'publikacji'} dostępnych w naszej ofercie.
                    {booksCount > 0 && ` Książki: ${booksCount}.`}
                    {ebooksCount > 0 && ` E-booki: ${ebooksCount}.`}
                  </p>
                  <div className="flex gap-2 text-sm text-gray-500">
                    {products.length > 0 && (
                      <>
                        <span>📚 {products.length} {products.length === 1 ? 'tytuł' : products.length < 5 ? 'tytuły' : 'tytułów'}</span>
                        {Array.from(new Set(products.map(p => p.genre))).length > 0 && (
                          <span className="ml-4">
                            🏷️ {Array.from(new Set(products.map(p => p.genre))).filter(Boolean).join(', ')}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            {products.length > 0 && (booksCount > 0 && ebooksCount > 0) && (
              <div className="flex gap-4 mb-6 flex-wrap">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    filter === 'all'
                      ? 'bg-[#8CA9FF] text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-[#FFF8DE]'
                  }`}
                >
                  Wszystkie ({products.length})
                </button>
                {booksCount > 0 && (
                  <button
                    onClick={() => setFilter('books')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      filter === 'books'
                        ? 'bg-[#8CA9FF] text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-[#FFF8DE]'
                    }`}
                  >
                    Książki ({booksCount})
                  </button>
                )}
                {ebooksCount > 0 && (
                  <button
                    onClick={() => setFilter('ebooks')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      filter === 'ebooks'
                        ? 'bg-[#8CA9FF] text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-[#FFF8DE]'
                    }`}
                  >
                    E-booki ({ebooksCount})
                  </button>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
                      
                      <div className="aspect-3/4 rounded-xl mb-3 flex items-center justify-center overflow-hidden bg-[#AAC4F5]">
                        {(product.image_url || product.image || product.cover) ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.image_url || product.image || product.cover}
                            alt={product.title || product.name || 'Product'}
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
                          {product.genre || '\u00A0'}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <p className="text-sm font-bold text-[#8CA9FF]">
                            {typeof product.price === 'number' 
                              ? `${product.price.toFixed(2)} zł` 
                              : `${product.price} zł`}
                          </p>
                          {product.format && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {product.format === 'paperback' ? '📖' : product.format === 'ebook' ? '💻' : '📚'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <p className="text-gray-500 text-lg">
                  {filter === 'all' 
                    ? 'Autor nie ma jeszcze dostępnych produktów.' 
                    : `Brak produktów w kategorii "${filter === 'books' ? 'Książki' : 'E-booki'}".`}
                </p>
                {filter !== 'all' && products.length > 0 && (
                  <button
                    onClick={() => setFilter('all')}
                    className="mt-4 text-[#8CA9FF] hover:text-[#AAC4F5] font-medium"
                  >
                    Pokaż wszystkie produkty
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

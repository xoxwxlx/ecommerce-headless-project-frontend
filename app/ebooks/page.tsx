'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
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

export default function EbooksPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchEbooks() {
      try {
        const products = await getProducts();
        
        // Filtruj tylko e-booki (format: 'ebook' lub 'both')
        const ebooks = products.filter((p: Product) => 
          p.format === 'ebook' || p.format === 'both'
        );
        
        setFilteredProducts(ebooks);
        
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
  }, []);

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
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">E-booki</h1>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Ładowanie e-booków...</p>
          </div>
        ) : (
          <div className="flex gap-8">
            {/* Filters removed - using search bar instead */}
            
            <main className="flex-1">
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
                  className="group"
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
                  <p className="text-gray-500">Brak e-booków spełniających wybrane kryteria</p>
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

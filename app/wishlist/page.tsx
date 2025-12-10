'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  image?: string;
  author?: string;
  format?: 'physical' | 'ebook';
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window !== 'undefined') {
      const wishlistData = localStorage.getItem('wishlist');
      return wishlistData ? JSON.parse(wishlistData) : [];
    }
    return [];
  });
  const [isLoading] = useState(false);

  const removeFromWishlist = (id: number, format: 'physical' | 'ebook' | undefined) => {
    const updatedWishlist = wishlist.filter(item => !(item.id === id && item.format === format));
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const addToCart = (item: WishlistItem) => {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('cart');
      const cart = cartData ? JSON.parse(cartData) : [];
      
      const existingItem = cart.find((cartItem: WishlistItem) => 
        cartItem.id === item.id && cartItem.format === item.format
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Show success message
      alert('Produkt został dodany do koszyka!');
    }
  };

  const moveToCart = (item: WishlistItem) => {
    addToCart(item);
    removeFromWishlist(item.id, item.format);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE] flex items-center justify-center">
        <p className="text-gray-500">Ładowanie listy życzeń...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Lista życzeń
            </h1>
            <p className="text-gray-600">
              {wishlist.length > 0 
                ? `Masz ${wishlist.length} ${wishlist.length === 1 ? 'produkt' : wishlist.length < 5 ? 'produkty' : 'produktów'} na liście życzeń`
                : 'Twoja lista życzeń jest pusta'
              }
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <svg className="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Brak produktów na liście życzeń</h2>
              <p className="text-gray-600 mb-8">Dodaj produkty, które Cię interesują, aby łatwo je znaleźć później!</p>
              <Link
                href="/products"
                className="inline-block bg-[#8CA9FF] hover:bg-[#AAC4F5] text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-md"
              >
                Przejdź do sklepu
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div key={`${item.id}-${item.format}`} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64 bg-gray-100">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}
                    <button
                      onClick={() => removeFromWishlist(item.id, item.format)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                      title="Usuń z listy życzeń"
                    >
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    {item.format && (
                      <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        item.format === 'ebook' 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-blue-500 text-white'
                      }`}>
                        {item.format === 'ebook' ? 'E-book' : 'Książka'}
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    {item.author && (
                      <p className="text-sm text-gray-600 mb-3">{item.author}</p>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-[#8CA9FF]">
                        {item.price} zł
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => moveToCart(item)}
                        className="w-full bg-[#8CA9FF] hover:bg-[#AAC4F5] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-md flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Dodaj do koszyka
                      </button>
                      <Link
                        href={`/products/${item.id}`}
                        className="w-full border-2 border-[#8CA9FF] text-[#8CA9FF] hover:bg-[#8CA9FF] hover:text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        Zobacz szczegóły
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {wishlist.length > 0 && (
            <div className="mt-8 text-center">
              <Link
                href="/products"
                className="inline-block text-[#8CA9FF] hover:text-[#AAC4F5] font-semibold transition-colors"
              >
                 Kontynuuj zakupy
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

interface cartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
  format?: 'physical' | 'ebook';
}

export default function CartPage() {
  const [cart, setCart] = useState<cartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('cart');
      return cartData ? JSON.parse(cartData) : [];
    }
    return [];
  });
  const [isLoading] = useState(false);

  const updateQuantity = (id: number, format: 'physical' | 'ebook' | undefined, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item =>
      item.id === id && item.format === format ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: number, format: 'physical' | 'ebook' | undefined) => {
    const updatedCart = cart.filter(item => !(item.id === id && item.format === format));
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE] flex items-center justify-center">
        <p className="text-gray-500">Ładowanie Koszyka...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
        <div className="container mx-auto px-4 py-8">
          <nav className="mb-6">
            <Link href="/" className="text-[#8ca4ff] hover:text-[#AAC4F5] transition-colors">
              ← Powróć do strony głównej
            </Link>
          </nav>

          <h1 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            Koszyk
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </h1>
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <p className="text-gray-500 mb-6 text-lg">Twój Koszyk jest pusty</p>
            <Link
              href="/products"
              className="inline-block bg-[#8ca4ff] hover:bg-[#AAC4F5] text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-md"
            >
              Przejdź do sklepu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-6">
          <Link href="/" className="text-[#8ca4ff] hover:text-[#AAC4F5] transition-colors">
            ← Powróć do strony głównej
          </Link>
        </nav>

        <h1 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
          Koszyk
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* całrt Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${item.format || 'default'}-${index}`}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-32 bg-[#AAC4F5] rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-xs">#{item.id}</span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                    
                    {/* Format Badge */}
                    {item.format && (
                      <div className="mb-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          item.format === 'ebook' 
                            ? 'bg-[#AAC4F5] text-white' 
                            : 'bg-[#8cał9FF] text-white'
                        }`}>
                          {item.format === 'ebook' ? (
                            <span className="flex items-center gap-1.5">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                              </svg>
                              E-book
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                              </svg>
                              książka
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                    
                    <p className="text-xl font-bold text-[#8ca4ff] mb-4">{item.price} zł</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-gray-600 text-sm">Ilość:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.format, item.quantity - 1)}
                          className="bg-[#FFF2C6] hover:bg-[#AAC4F5] hover:text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-colors"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.format, item.quantity + 1)}
                          className="bg-[#FFF2C6] hover:bg-[#AAC4F5] hover:text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id, item.format)}
                      className="text-red-600 hover:text-red-800 font-semibold text-sm transition-colors"
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Podsumowanie</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Produktów ({cart.length})</span>
                  <span>{calculateTotal()} zł</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Razem</span>
                  <span className="text-[#8ca4ff]">{calculateTotal()} zł</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-[#8ca4ff] hover:bg-[#AAC4F5] text-white font-semibold py-3 px-6 rounded-full text-center transition-all duration-200 hover:scale-105 shadow-md mb-4"
              >
                Przejdź do płatności
              </Link>

              <Link
                href="/products"
                className="block w-full text-center text-[#8ca4ff] hover:text-[#AAC4F5] font-semibold py-3 transition-colors"
              >
                Kontynuuj zakupy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

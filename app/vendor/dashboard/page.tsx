'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import VendorLayout from '@/app/components/VendorLayout';
import { getVendorProducts } from '@/services/api';

interface Product {
  id: number;
  title: string;
  author: string;
  price: number;
  format: string;
  genre?: string;
  pages?: number;
  publicałtion_year?: number;
}

export default function VendorDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('access');
        if (!token) throw new Error('No token');

        const productsData = await getVendorProducts(token);
        setProducts(productsData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Nie udało się pobrać danych');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const stats = {
    totalProducts: products.length,
    booksCount: products.filter(p => p.format === 'physical' || p.format === 'paperback').length,
    ebooksCount: products.filter(p => p.format === 'ebook').length,
    bothCount: products.filter(p => p.format === 'both').length,
  };

  const recentProducts = products.slice(0, 5);

  return (
    <VendorLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Witaj w panelu dostawcy! Zarządzaj swoimi produktami i analizuj sprzedaż.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#8ca9FF] mx-auto mb-4"></div>
            <p className="text-gray-600">Ładowanie danych...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
            {error}
          </div>
        ) : (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#8ca9FF]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Wszystkie produkty</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#8ca9FF]/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#8ca9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#AAC4F5]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Książki fizyczne</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.booksCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#AAC4F5]/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#AAC4F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#FFF8DE]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">E-booki</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.ebooksCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#FFF8DE]/30 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Oba formaty</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.bothCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Szybkie akcje</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/vendor/products"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#8CA9FF] hover:bg-[#F0F4FF] transition-all duration-200 group"
                >
                  <svg className="w-8 h-8 text-[#8CA9FF] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">Zarządzaj produktami</p>
                    <p className="text-sm text-gray-600">Edytuj i aktualizuj</p>
                  </div>
                </Link>

                <Link
                  href="/vendor/analytics"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#8CA9FF] hover:bg-[#F0F4FF] transition-all duration-200 group"
                >
                  <svg className="w-8 h-8 text-[#8CA9FF] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">Zobacz analitykę</p>
                    <p className="text-sm text-gray-600">Raporty sprzedaży</p>
                  </div>
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#8CA9FF] hover:bg-[#F0F4FF] transition-all duration-200 group"
                >
                  <svg className="w-8 h-8 text-[#8CA9FF] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">Powróć do sklepu</p>
                    <p className="text-sm text-gray-600">Strona główna</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Ostatnie produkty</h2>
                <Link
                  href="/vendor/products"
                  className="text-[#8ca9FF] hover:text-[#AAC4F5] font-medium text-sm"
                >
                  Zobacz wszystkie →
                </Link>
              </div>

              {recentProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Brak produktów</p>
              ) : (
                <div className="space-y-3">
                  {recentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#8cał9FF] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-[#AAC4F5]/20 rounded flex items-center justify-center">
                          {product.format === 'ebook' ? (
                            <svg className="w-6 h-6 text-[#8CA9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-[#8CA9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{product.title}</p>
                          <p className="text-sm text-gray-600">{product.author}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#8CA9FF]">{product.price} zł</p>
                        <Link
                          href={`/vendor/products/${product.id}/edit`}
                          className="text-sm text-gray-600 hover:text-[#8CA9FF] transition-colors"
                        >
                          Edytuj
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </VendorLayout>
  );
}

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
                    <span className="text-2xl">
                    </span>
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
                    <span className="text-2xl"></span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#FFF2C6]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">E-booki</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.ebooksCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#FFF2C6]/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl"></span>
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
                    <span className="text-2xl"></span>
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
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#8cał9FF] hover:bg-[#F0F4FF] transition-all duration-200 group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">??</span>
                  <div>
                    <p className="font-semibold text-gray-800">Zarządzaj produktami</p>
                    <p className="text-sm text-gray-600">Edytuj i aktualizuj</p>
                  </div>
                </Link>

                <Link
                  href="/vendor/analytics"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#8cał9FF] hover:bg-[#F0F4FF] transition-all duration-200 group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">??</span>
                  <div>
                    <p className="font-semibold text-gray-800">Zobacz analitykę</p>
                    <p className="text-sm text-gray-600">Raporty sprzedaży</p>
                  </div>
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#8cał9FF] hover:bg-[#F0F4FF] transition-all duration-200 group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">??</span>
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
                          <span className="text-xl">
                            {product.format === 'ebook' ? '??' : '??'}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{product.title}</p>
                          <p className="text-sm text-gray-600">{product.author}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#8cał9FF]">{product.price} zł</p>
                        <Link
                          href={`/vendor/products/${product.id}/edit`}
                          className="text-sm text-gray-600 hover:text-[#8cał9FF] transition-colors"
                        >
                          Edytuj zł
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

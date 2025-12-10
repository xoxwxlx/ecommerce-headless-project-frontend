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
  description?: string;
  pages?: number;
  publication_year?: number;
  image?: string;
  cover?: string;
  image_url?: string;
}

export default function VendorProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFormat, setFilterFormat] = useState('all');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = localStorage.getItem('access');
        if (!token) throw new Error('No token');

        const data = await getVendorProducts(token);
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Nie uda³o siê pobraæ produktów');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = filterFormat === 'all' || product.format === filterFormat;
    return matchesSearch && matchesFormat;
  });

  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Produkty ??
            </h1>
            <p className="text-gray-600">
              Zarz¹dzaj swoimi produktami i aktualizuj informacje
            </p>
          </div>
          <div className="text-lg font-semibold text-[#8CA9FF]">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produkt' : 'produktów'}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Szukaj produktu
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tytu³ lub autor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Format Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtruj wed³ug formatu
              </label>
              <select
                value={filterFormat}
                onChange={(e) => setFilterFormat(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
              >
                <option value="all">Wszystkie formaty</option>
                <option value="physical">Ksi¹¿ka fizyczna</option>
                <option value="paperback">Ksi¹¿ka</option>
                <option value="ebook">E-book</option>
                <option value="both">Oba formaty</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#8CA9FF] mx-auto mb-4"></div>
            <p className="text-gray-600">£adowanie produktów...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
            {error}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">??</div>
            <p className="text-gray-600 text-lg mb-2">Brak produktów do wyœwietlenia</p>
            <p className="text-gray-500 text-sm">
              {searchQuery || filterFormat !== 'all' 
                ? 'Spróbuj zmieniæ filtry wyszukiwania' 
                : 'Nie masz jeszcze ¿adnych produktów'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F0F4FF]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Produkt</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Autor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cena</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Format</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Strony</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rok</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Akcje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-[#F0F4FF]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-16 bg-[#AAC4F5]/20 rounded flex items-center justify-center shrink-0">
                            {product.image_url || product.image || product.cover ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={product.image_url || product.image || product.cover}
                                alt={product.title}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <span className="text-xl">??</span>
                            )}
                          </div>
                          <div className="max-w-xs">
                            <p className="font-semibold text-gray-800 truncate">{product.title}</p>
                            {product.genre && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-[#FFF2C6] text-gray-700 text-xs rounded-full">
                                {product.genre}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{product.author}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-[#8CA9FF]">{product.price} z³</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          product.format === 'ebook' 
                            ? 'bg-[#AAC4F5] text-white' 
                            : product.format === 'both'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-[#8CA9FF] text-white'
                        }`}>
                          {product.format === 'ebook' ? '?? E-book' : 
                           product.format === 'both' ? '? Oba' : '?? Ksi¹¿ka'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {product.pages || '-'}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {product.publication_year || '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/vendor/products/${product.id}/edit`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#8CA9FF] hover:bg-[#AAC4F5] text-white font-medium rounded-lg transition-colors"
                        >
                          ?? Edytuj
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <div key={product.id} className="p-4">
                  <div className="flex gap-4 mb-3">
                    <div className="w-16 h-20 bg-[#AAC4F5]/20 rounded flex items-center justify-center shrink-0">
                      {product.image_url || product.image || product.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image_url || product.image || product.cover}
                          alt={product.title}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-2xl">??</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{product.title}</h3>
                      <p className="text-sm text-gray-600">{product.author}</p>
                      <p className="text-lg font-bold text-[#8CA9FF] mt-1">{product.price} z³</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      product.format === 'ebook' 
                        ? 'bg-[#AAC4F5] text-white' 
                        : product.format === 'both'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-[#8CA9FF] text-white'
                    }`}>
                      {product.format === 'ebook' ? '?? E-book' : 
                       product.format === 'both' ? '? Oba' : '?? Ksi¹¿ka'}
                    </span>
                    {product.genre && (
                      <span className="inline-block px-3 py-1 bg-[#FFF2C6] text-gray-700 text-xs rounded-full">
                        {product.genre}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                    <span>Strony: {product.pages || '-'}</span>
                    <span>Rok: {product.publication_year || '-'}</span>
                  </div>

                  <Link
                    href={`/vendor/products/${product.id}/edit`}
                    className="block w-full text-center px-4 py-2 bg-[#8CA9FF] hover:bg-[#AAC4F5] text-white font-medium rounded-lg transition-colors"
                  >
                    ?? Edytuj produkt
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </VendorLayout>
  );
}

'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '@/services/api';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

interface Product {
  id: number;
  title?: string;
  name?: string;
  author?: string;
  publisher?: string;
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
  popularity?: number;
  created_at?: string;
}

export default function EbooksPage() {
  const [allEbooks, setAllEbooks] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  // Filters
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [genre, setGenre] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  // Sorting
  const [sort, setSort] = useState('');

  useEffect(() => {
    async function fetchEbooks() {
      try {
        const products = await getProducts();
        // Only ebooks
        const ebooks = products.filter((p: Product) => 
          p.format === 'ebook' || p.format === 'both'
        );
        setAllEbooks(ebooks);
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

  // Dynamic filter options from allEbooks
  const authorOptions = useMemo(() => Array.from(new Set(allEbooks.map(p => p.author).filter(Boolean))), [allEbooks]);
  const publisherOptions = useMemo(() => Array.from(new Set(allEbooks.map(p => p.publisher).filter(Boolean))), [allEbooks]);
  const genreOptions = useMemo(() => Array.from(new Set(allEbooks.map(p => p.genre).filter(Boolean))), [allEbooks]);
  const priceRange = useMemo(() => {
    const prices = allEbooks.map(p => Number(p.price)).filter(n => !isNaN(n));
    return prices.length ? { min: Math.min(...prices), max: Math.max(...prices) } : { min: 0, max: 0 };
  }, [allEbooks]);

  // Filtering
  useEffect(() => {
    let filtered = allEbooks;
    if (author) filtered = filtered.filter(p => p.author === author);
    if (publisher) filtered = filtered.filter(p => p.publisher === publisher);
    if (genre) filtered = filtered.filter(p => p.genre === genre);
    if (minPrice) filtered = filtered.filter(p => Number(p.price) >= Number(minPrice));
    if (maxPrice) filtered = filtered.filter(p => Number(p.price) <= Number(maxPrice));
    // Sorting
    if (sort) {
      filtered = [...filtered];
      switch (sort) {
        case 'alphabetical':
          filtered.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''));
          break;
        case 'popularity':
          filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
          break;
        case 'price-asc':
          filtered.sort((a, b) => Number(a.price) - Number(b.price));
          break;
        case 'price-desc':
          filtered.sort((a, b) => Number(b.price) - Number(a.price));
          break;
        case 'date-newest':
          filtered.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
          break;
        case 'date-oldest':
          filtered.sort((a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime());
          break;
      }
    }
    setFilteredProducts(filtered);
  }, [author, publisher, genre, minPrice, maxPrice, sort, allEbooks]);

  const resetFilters = () => {
    setAuthor('');
    setPublisher('');
    setGenre('');
    setMinPrice('');
    setMaxPrice('');
    setSort('');
  };

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
            {/* Filter panel */}
            <aside className="hidden md:block w-64 bg-white rounded-2xl shadow-lg p-6 h-fit self-start">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Filtry</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Autor</label>
                  <select value={author} onChange={e => setAuthor(e.target.value)} className="w-full border rounded px-3 py-2 text-gray-900">
                    <option value="">Wszyscy</option>
                    {authorOptions.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Wydawnictwo</label>
                  <select value={publisher} onChange={e => setPublisher(e.target.value)} className="w-full border rounded px-3 py-2 text-gray-900">
                    <option value="">Wszystkie</option>
                    {publisherOptions.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Gatunek</label>
                  <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full border rounded px-3 py-2 text-gray-900">
                    <option value="">Wszystkie</option>
                    {genreOptions.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Cena</label>
                  <div className="flex gap-2 items-center">
                    <input type="number" min={priceRange.min} max={priceRange.max} value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder={`od ${priceRange.min}`} className="w-20 border rounded px-2 py-1 text-gray-900" />
                    <span className="text-gray-900">-</span>
                    <input type="number" min={priceRange.min} max={priceRange.max} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder={`do ${priceRange.max}`} className="w-20 border rounded px-2 py-1 text-gray-900" />
                  </div>
                </div>
                <button onClick={resetFilters} className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded px-3 py-2 text-sm font-medium">Wyczyść filtry</button>
              </div>
            </aside>
            <main className="flex-1">
              {/* Sorting */}
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="mb-2 sm:mb-0">
                  <p className="text-gray-600">
                    Znaleziono: <span className="font-bold text-[#8CA9FF]">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'e-book' : 'e-booków'}
                  </p>
                </div>
                <div>
                  <label className="mr-2 text-sm text-gray-900 font-medium">Sortuj:</label>
                  <select value={sort} onChange={e => setSort(e.target.value)} className="border rounded px-3 py-2 text-gray-900">
                    <option value="">Domyślnie</option>
                    <option value="alphabetical">Alfabetycznie (A-Z)</option>
                    <option value="popularity">Popularność</option>
                    <option value="price-asc">Cena rosnąco</option>
                    <option value="price-desc">Cena malejąco</option>
                    <option value="date-newest">Najnowsze</option>
                    <option value="date-oldest">Najstarsze</option>
                  </select>
                </div>
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

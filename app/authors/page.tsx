'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getProducts } from '@/services/api';

interface Author {
  id: string;
  name: string;
  books_count: number;
}

interface Product {
  id: number;
  author?: string;
  [key: string]: unknown;
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const products: Product[] = await getProducts();
      
      // Extract unique authors from products
      const authorsMap = new Map<string, Author>();
      
      products.forEach(product => {
        if (product.author) {
          const authorName = product.author;
          if (authorsMap.has(authorName)) {
            const author = authorsMap.get(authorName)!;
            author.books_count++;
          } else {
            authorsMap.set(authorName, {
              id: authorName,
              name: authorName,
              books_count: 1
            });
          }
        }
      });
      
      setAuthors(Array.from(authorsMap.values()));
    } catch (error) {
      console.error('Error fetching authors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedAuthors = authors
    .filter(author => {
      const fullName = author.name.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Group authors by first letter
  const groupedAuthors = filteredAndSortedAuthors.reduce((acc, author) => {
    const firstLetter = author.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(author);
    return acc;
  }, {} as Record<string, Author[]>);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
          Autorzy
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Poznaj naszych autorów
        </p>

        {/* Search and Sort */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Szukaj autora
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Wpisz imię lub nazwisko..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
            />
          </div>
        </div>

        {/* Authors List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500 text-xl">Ładowanie autorów...</div>
          </div>
        ) : filteredAndSortedAuthors.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl mb-4">Nie znaleziono autorów</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#8CA9FF] hover:text-[#AAC4F5] font-semibold"
              >
                Wyczyść wyszukiwanie
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {Object.keys(groupedAuthors).sort().map((letter) => (
              <div key={letter} className="border-b border-gray-200 last:border-b-0">
                <div className="bg-[#FFF8DE] px-6 py-3">
                  <h2 className="text-2xl font-bold text-gray-800">{letter}</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {groupedAuthors[letter].map((author) => (
                    <Link
                      key={author.id}
                      href={`/author/${encodeURIComponent(author.name)}`}
                      className="block px-6 py-4 hover:bg-[#F0F4FF] transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#8CA9FF] transition-colors">
                            {author.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {author.books_count} {author.books_count === 1 ? 'książka' : author.books_count < 5 ? 'książki' : 'książek'}
                          </p>
                        </div>
                        <svg 
                          className="w-5 h-5 text-gray-400 group-hover:text-[#8CA9FF] transition-colors" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
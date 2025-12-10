'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { API_URL } from '@/services/api';

interface Author {
  id: number;
  first_name: string;
  last_name: string;
  biography?: string;
  photo?: string;
  birth_date?: string;
  nationality?: string;
  books_count?: number;
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/authors/`);
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedAuthors = authors
    .filter(author => {
      const fullName = `${author.first_name} ${author.last_name}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
      const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
      
      switch (sortBy) {
        case 'name-asc':
          return nameA.localeCompare(nameB);
        case 'name-desc':
          return nameB.localeCompare(nameA);
        case 'books-desc':
          return (b.books_count || 0) - (a.books_count || 0);
        default:
          return 0;
      }
    });

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sortuj według
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
              >
                <option value="name-asc">Nazwisko: A-Z</option>
                <option value="name-desc">Nazwisko: Z-A</option>
                <option value="books-desc">Liczba książek</option>
              </select>
            </div>
          </div>
        </div>

        {/* Authors Grid */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedAuthors.map((author) => (
              <Link
                key={author.id}
                href={`/author/${author.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                  {/* Author Photo */}
                  <div className="relative w-full pt-[100%] bg-linear-to-br from-[#8CA9FF] to-[#AAC4F5]">
                    {author.photo ? (
                      <Image
                        src={author.photo}
                        alt={`${author.first_name} ${author.last_name}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Author Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#8CA9FF] transition-colors">
                      {author.first_name} {author.last_name}
                    </h3>
                    
                    {author.nationality && (
                      <p className="text-sm text-gray-600 mb-2">
                        {author.nationality}
                      </p>
                    )}

                    {author.biography && (
                      <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                        {author.biography}
                      </p>
                    )}

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      {author.books_count !== undefined && (
                        <p className="text-sm text-gray-600">
                          <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                          </svg>
                          {author.books_count} {author.books_count === 1 ? 'książka' : 'książek'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

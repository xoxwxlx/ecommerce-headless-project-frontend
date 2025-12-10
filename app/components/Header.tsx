'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Strona główna', href: '/' },
  { label: 'Książki', href: '/books' },
  { label: 'E-booki', href: '/ebooks' },
  { label: 'Autorzy', href: '/authors' },
  { label: 'O nas', href: '/about' },
  { label: 'Kontakt', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('access');
    }
    return false;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header className="bg-linear-to-r from-[#8CA9FF] to-[#AAC4F5] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#8CA9FF]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <span className="text-2xl font-bold">Księgarnia</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[#FFF8DE] transition-colors font-medium">
                {item.label}
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj książek..."
              className="px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white w-64"
            />
            <button type="submit" className="bg-white text-[#8CA9FF] px-4 py-2 rounded-full hover:bg-[#FFF8DE] transition-colors font-medium">
              Szukaj
            </button>
          </form>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="hover:text-[#FFF8DE] transition-colors" title="Koszyk">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>

            <Link href="/wishlist" className="hover:text-[#FFF8DE] transition-colors" title="Lista życzeń">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/account" className="bg-white text-[#8CA9FF] px-4 py-2 rounded-full hover:bg-[#FFF8DE] transition-colors font-medium">
                  Konto
                </Link>
                <button onClick={handleLogout} className="bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors font-medium">
                  Wyloguj
                </button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:block bg-white text-[#8CA9FF] px-4 py-2 rounded-full hover:bg-[#FFF8DE] transition-colors font-medium">
                Zaloguj się
              </Link>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden" aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            <form onSubmit={handleSearch} className="md:hidden mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Szukaj książek..."
                  className="flex-1 px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button type="submit" className="bg-white text-[#8CA9FF] px-4 py-2 rounded-full hover:bg-[#FFF8DE] transition-colors font-medium">
                  Szukaj
                </button>
              </div>
            </form>

            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-[#FFF8DE] transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
              
              {isLoggedIn ? (
                <>
                  <Link href="/account" className="bg-white text-[#8CA9FF] px-4 py-2 rounded-full hover:bg-[#FFF8DE] transition-colors font-medium text-center mt-2" onClick={() => setIsMenuOpen(false)}>
                    Konto
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors font-medium">
                    Wyloguj
                  </button>
                </>
              ) : (
                <Link href="/login" className="bg-white text-[#8CA9FF] px-4 py-2 rounded-full hover:bg-[#FFF8DE] transition-colors font-medium text-center mt-2" onClick={() => setIsMenuOpen(false)}>
                  Zaloguj się
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

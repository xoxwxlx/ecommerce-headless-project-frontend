'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Książki', href: '/books' },
  { label: 'E-booki', href: '/ebooks' },
];

export default function Header() {
  const router = useRouter();
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
    <header className="bg-[#FFF2C6] text-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left section - Navigation */}
          {/* Left section - Navigation */}
          <nav className="hidden lg:flex items-center gap-6 shrink-0">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[#8CA9FF] transition-colors font-medium text-lg whitespace-nowrap">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Center section - Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0 mx-auto lg:mx-0">
            <Image src="/verse_logo_v1.png" alt="Logo" width={220} height={220} className="h-28 w-auto max-w-[220px]" priority />
          </Link>

          {/* Right section - Search & User actions */}
          <div className="flex items-center gap-4 shrink-0">
            <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj książek..."
                className="px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] border border-gray-300"
              />
              <button type="submit" className="bg-[#8CA9FF] text-white p-2.5 rounded-full hover:bg-[#AAC4F5] transition-colors" title="Szukaj">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <Link href="/cart" className="hover:text-[#8CA9FF] transition-colors" title="Koszyk">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>

            <Link href="/wishlist" className="hover:text-[#8CA9FF] transition-colors" title="Lista życzeń">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/account" className="bg-[#8CA9FF] text-white px-5 py-2.5 rounded-full hover:bg-[#AAC4F5] transition-colors font-medium">
                  Konto
                </Link>
                <button onClick={handleLogout} className="bg-gray-700 text-white px-5 py-2.5 rounded-full hover:bg-gray-600 transition-colors font-medium">
                  Wyloguj
                </button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:block bg-[#8CA9FF] text-white px-5 py-2.5 rounded-full hover:bg-[#AAC4F5] transition-colors font-medium">
                Zaloguj się
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/services/api';

export default function Footer() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdminRole() {
      try {
        const token = localStorage.getItem('access');
        if (token) {
          const userData = await getUserProfile(token);
          setIsAdmin(userData.role === 'admin');
        }
      } catch {
        // User not logged in or error fetching profile - not an admin
        setIsAdmin(false);
      }
    }

    checkAdminRole();
  }, []);

  return (
    <footer className="bg-[#FFF2C6] text-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">

          <div>
            <h4 className="text-lg font-semibold mb-4">Sklep</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/books" className="text-gray-600 hover:text-[#8CA9FF] transition-colors">
                  Książki
                </Link>
              </li>
              <li>
                <Link href="/ebooks" className="text-gray-600 hover:text-[#8CA9FF] transition-colors">
                  E-booki
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-gray-600 hover:text-[#8CA9FF] transition-colors">
                  Autorzy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Pomoc</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-[#8CA9FF] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-600 hover:text-[#8CA9FF] transition-colors">
                  Dostawa
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-[#8CA9FF] transition-colors">
                  Zwroty
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#8CA9FF] transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Informacje</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#8CA9FF] transition-colors">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-[#8CA9FF] transition-colors">
                  Regulamin
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-[#8CA9FF] transition-colors">
                  Polityka prywatności
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Dla dostawców</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/vendor/register" className="text-gray-600 hover:text-[#8CA9FF] transition-colors">
                  Rejestracja dostawcy
                </Link>
              </li>
              <li>
                <Link href="/vendor/dashboard" className="text-gray-600 hover:text-[#8CA9FF] transition-colors">
                  Panel dostawcy
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <a 
                    href="http://127.0.0.1:8000/admin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#8CA9FF] transition-colors"
                  >
                    Panel administracyjny
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Verse. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}

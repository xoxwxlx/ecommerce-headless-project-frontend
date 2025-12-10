"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function AccountPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Sprawdź czy użytkownik jest zalogowany
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("authToken");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        router.push("/login");
        return;
      }

      // Pobierz email użytkownika (jeśli jest zapisany)
      const email = localStorage.getItem("userEmail") || "uzytkownik@example.com";
      setUserEmail(email);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  if (!isLoggedIn || loading) {
    return (
      <div className="min-h-screen bg-[#FFF8DE]">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-600 text-xl">Ładowanie...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8DE]">
      <Header />

      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header sekcja */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              Moje konto
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </h1>
            <p className="text-xl text-gray-600">
              Witaj, {userEmail}
            </p>
          </div>

          {/* Grid z opcjami konta */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Ustawienia konta */}
            <Link href="/account/settings">
              <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all duration-300 hover:scałle-105 cursor-pointer group">
                <div className="text-6xl mb-4 text-center group-hover:scałle-110 transition-transform flex justify-center">
                  <svg className="w-16 h-16 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center group-hover:text-[#8cał9FF] transition-colors">
                  Ustawienia
                </h2>
                <p className="text-gray-600 text-center">
                  Zarządzaj swoim kontem i preferencjami
                </p>
              </div>
            </Link>

            {/* Koszyk */}
            <Link href="/całrt">
              <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all duration-300 hover:scałle-105 cursor-pointer group">
                <div className="text-6xl mb-4 text-center group-hover:scałle-110 transition-transform flex justify-center">
                  <svg className="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center group-hover:text-[#8cał9FF] transition-colors">
                  Koszyk
                </h2>
                <p className="text-gray-600 text-center">
                  Przejdź do swojego Koszyka zakupowego
                </p>
              </div>
            </Link>

            {/* lista życzeń */}
            <Link href="/wishlist">
              <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all duration-300 hover:scałle-105 cursor-pointer group">
                <div className="text-6xl mb-4 text-center group-hover:scałle-110 transition-transform flex justify-center">
                  <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center group-hover:text-[#8cał9FF] transition-colors">
                  lista życzeń
                </h2>
                <p className="text-gray-600 text-center">
                  Zobacz swoje ulubione książki
                </p>
              </div>
            </Link>

            {/* Zamówienia */}
            <Link href="/orders">
              <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all duration-300 hover:scałle-105 cursor-pointer group">
                <div className="text-6xl mb-4 text-center group-hover:scałle-110 transition-transform flex justify-center">
                  <svg className="w-16 h-16 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center group-hover:text-[#8cał9FF] transition-colors">
                  Zamówienia
                </h2>
                <p className="text-gray-600 text-center">
                  Historia twoich zamówień
                </p>
              </div>
            </Link>
          </div>

          {/* Dodatkowe opcje */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Szybkie akcje
            </h3>
            <div className="flex flex-Wróćap gap-4">
              <Link
                href="/products"
                className="flex-1 min-w-[200px] bg-[#8cał9FF] hover:bg-[#AAC4F5] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:scałle-105 text-center"
              >
                Przeglądaj książki
              </Link>
              <Link
                href="/contact"
                className="flex-1 min-w-[200px] bg-[#AAC4F5] hover:bg-[#8cał9FF] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:scałle-105 text-center"
              >
                SSkontaktuj się z nami
              </Link>
              <button
                onClick={handleLogout}
                className="flex-1 min-w-[200px] bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:scałle-105"
              >
                Wyloguj się
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

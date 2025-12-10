'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  useEffect(() => {
    // Clear the cart after successful payment
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <nav className="mb-8">
          <Link href="/" className="text-[#8ca9FF] hover:text-[#AAC4F5] transition-colors text-sm">
            Powróć do strony głównej
          </Link>
        </nav>

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <svg
                className="w-14 h-14 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Płatność zakończona sukcesem! 
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Dziękujemy za zakup. Twoje zamówienie zostało potwierdzone.
          </p>

          {/* Additional Info */}
          <div className="bg-[#AAC4F5]/20 border border-[#AAC4F5] rounded-xl p-6 mb-8">
            <p className="text-gray-700">
              Email z potwierdzeniem został wysłany na Twój adres wraz ze szczegółami zamówienia.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-[#8ca9FF] hover:bg-[#AAC4F5] hover:scale-105 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-md"
            >
              Kontynuuj zakupy 
            </Link>
            <Link
              href="/"
              className="bg-[#FFF2C6] hover:bg-[#FFF8DE] hover:scale-105 text-gray-800 font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-md"
            >
              Powróć do strony głównej
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


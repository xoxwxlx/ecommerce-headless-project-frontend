'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Zwroty i reklamacje</h1>
            <p className="text-gray-600 text-lg">Informacje o zwrotach, wymianie i reklamacjach produktów</p>
          </div>

          {/* 14-dniowy okres zwrotu */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">14-dniowy okres zwrotu</h2>
            <p className="text-gray-700 mb-4">
              Zgodnie z obowiązującymi przepisami, masz prawo odstąpić od umowy zakupu w ciągu 14 dni kalendarzowych 
              od dnia otrzymania przesyłki, bez podawania przyczyny i bez ponoszenia kosztów (z wyjątkiem kosztów 
              odesłania produktu).
            </p>
            <div className="bg-[#FFF8DE] p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Ważne:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Książki muszą być w stanie nienaruszonym (w folii)</li>
                <li>Książki cyfrowe/e-booki nie podlegają zwrotom po pobraniu</li>
                <li>Koszt zwrotu pokrywa klient</li>
              </ul>
            </div>
          </section>

          {/* Jak dokonać zwrotu */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Jak dokonać zwrotu?</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-[#8CA9FF] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Zgłoś chęć zwrotu</h3>
                  <p className="text-gray-700">
                    Wyślij do nas wiadomość e-mail na adres <span className="text-[#8CA9FF] font-medium">zwroty@verse.pl</span> z 
                    numerem zamówienia i informacją o zwrocie.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#8CA9FF] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Zapakuj produkt</h3>
                  <p className="text-gray-700">
                    Zapakuj produkt w oryginalnym opakowaniu wraz z dokumentem zakupu.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#8CA9FF] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Odeślij paczkę</h3>
                  <p className="text-gray-700">
                    Wyślij paczkę na nasz adres:<br />
                    <span className="font-medium">Verse Sp. z o.o.<br />ul. Książkowa 123<br />00-001 Warszawa</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#8CA9FF] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Otrzymaj zwrot pieniędzy</h3>
                  <p className="text-gray-700">
                    Po otrzymaniu i sprawdzeniu przesyłki, zwrócimy Ci pieniądze w ciągu 14 dni roboczych.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Wymiana produktu */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Wymiana produktu</h2>
            <p className="text-gray-700 mb-4">
              Jeśli otrzymałeś uszkodzony lub niewłaściwy produkt, skontaktuj się z nami natychmiast. 
              Wymiana zostanie przeprowadzona bez dodatkowych kosztów.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-[#FFF8DE] p-4 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">E-mail:</span><br />
                  <a href="mailto:reklamacje@verse.pl" className="text-[#8CA9FF] hover:underline">
                    reklamacje@verse.pl
                  </a>
                </p>
              </div>
              <div className="flex-1 bg-[#FFF8DE] p-4 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Telefon:</span><br />
                  <a href="tel:+48123456789" className="text-[#8CA9FF] hover:underline">
                    +48 123 456 789
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Reklamacje */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Procedura reklamacyjna</h2>
            <p className="text-gray-700 mb-4">
              Wszystkie produkty objęte są 24-miesięczną gwarancją. Jeśli produkt jest wadliwy, masz prawo 
              złożyć reklamację:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Opisz usterkę i dołącz zdjęcia (jeśli możliwe)</li>
              <li>Dołącz kopię dowodu zakupu</li>
              <li>Wyślij reklamację na adres: reklamacje@verse.pl</li>
              <li>Odpowiemy w ciągu 14 dni roboczych</li>
            </ul>
            <div className="bg-[#FFF8DE] p-4 rounded-lg">
              <p className="text-gray-700 text-sm">
                <strong>Uwaga:</strong> W przypadku uznania reklamacji, pokrywamy koszty przesyłki zwrotnej.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-linear-to-r from-[#8CA9FF] to-[#AAC4F5] rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Masz pytania?</h2>
            <p className="mb-6">
              Jeśli potrzebujesz pomocy z zwrotem lub reklamacją, skontaktuj się z naszym zespołem obsługi klienta.
            </p>
            <a 
              href="mailto:pomoc@verse.pl" 
              className="inline-block bg-white text-[#8CA9FF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Skontaktuj się z nami
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
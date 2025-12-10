'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Kontakt</h1>
            <p className="text-gray-600 text-lg">Masz pytania? Skontaktuj się z nami - chętnie pomożemy!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dane kontaktowe</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#8CA9FF] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Adres</h3>
                    <p className="text-gray-600">ul. Książkowa 123<br />00-001 Warszawa<br />Polska</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#8CA9FF] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Telefon</h3>
                    <p className="text-gray-600">+48 123 456 789<br />Pon-Pt: 9:00 - 17:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#8CA9FF] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600">kontakt@ksiegarnia.pl<br />pomoc@ksiegarnia.pl</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Wyślij wiadomość</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Imię i nazwisko</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent" placeholder="Jan Kowalski" />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent" placeholder="jan.kowalski@example.com" />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Temat</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent" placeholder="W czym mo�emy pom�c?" />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Wiadomo��</label>
                  <textarea rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent" placeholder="Twoja wiadomo��..."></textarea>
                </div>

                <button type="submit" className="w-full bg-linear-to-r from-[#8CA9FF] to-[#6B8DE3] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition duration-300">
                  Wyślij wiadomość
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

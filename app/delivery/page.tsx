'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Dostawa i płatności</h1>
            <p className="text-gray-600 text-lg">Wszystko co musisz wiedzieć o dostawie i opcjach płatności</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Metody dostawy</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-[#8CA9FF] pl-6 py-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">Kurier DPD/InPost</h3>
                  <span className="text-[#8CA9FF] font-bold text-lg">14,99 zł</span>
                </div>
                <p className="text-gray-600 mb-3">Dostawa kurierem pod wskazany adres w całej Polsce</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Czas dostawy:</span>
                    <span className="text-gray-600 ml-2">1-2 dni robocze</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Nadanie:</span>
                    <span className="text-gray-600 ml-2">W ciągu 24h</span>
                  </div>
                </div>
                <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-700 text-sm font-medium">Darmowa dostawa przy zamówieniach powyżej 100 zł!</p>
                </div>
              </div>

              <div className="border-l-4 border-[#8CA9FF] pl-6 py-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">Paczkomat InPost</h3>
                  <span className="text-[#8CA9FF] font-bold text-lg">11,99 zł</span>
                </div>
                <p className="text-gray-600 mb-3">Odbiór z wybranego paczkomatu 24/7</p>
              </div>

              <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">E-booki (dostawa cyfrowa)</h3>
                  <span className="text-green-600 font-bold text-lg">GRATIS</span>
                </div>
                <p className="text-gray-600 mb-3">Natychmiastowy dostęp po dokonaniu płatności</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Metody płatności</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Płatność online</h3>
                <p className="text-gray-600 mb-4">Szybka i bezpieczna płatność przez Przelewy24</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Za pobraniem</h3>
                <p className="text-gray-600 mb-4">Płatność gotówką przy odbiorze</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

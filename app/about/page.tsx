"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF8DE]">
      <Header />

      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              O nas ??
            </h1>
            <p className="text-xl text-gray-600">
              Z pasją do literatury od 20 lat
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Nasza Historia
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Verse powstało w 2005 roku z pasji do dobrej literatury. Zbudowaliśmy katalog obejmujący setki tytułów w różnych gatunkach - od klasyki po najnowsze 
                bestsellery.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Specjalizujemy się w publikowaniu zarówno książek papierowych, jak i e-booków, 
                dając czytelnikom wybór preferowanego formatu. Wierzymy, że każdy zasługuje na dostęp 
                do wysokiej jakości literatury, niezależnie od formy, w jakiej preferuje czytać.
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-12">
                Nasza Misja
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                naszą misją jest promowanie kultury czytelnictwa i udostępnianie najlepszych dzieł 
                literackich polskim czytelnikom. Dbamy o wysoką jakość wydań - zarówno pod względem 
                redakcyjnym, jak i graficznym.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-12">
                <div className="bg-[#FFF8DE] rounded-xl p-6 text-center">
                  <h3 className="font-bold text-gray-800 mb-2">500+</h3>
                  <p className="text-gray-600">Publikowanych tytułów</p>
                </div>
                <div className="bg-[#AAC4F5] rounded-xl p-6 text-center">
                  <h3 className="font-bold text-white mb-2">100,000+</h3>
                  <p className="text-white">Zadowolonych czytelników</p>
                </div>
                <div className="bg-[#8CA9FF] rounded-xl p-6 text-center">
                  <h3 className="font-bold text-white mb-2">20 lat</h3>
                  <p className="text-white">Doświadczenia</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-12">
                Dlaczego my?
              </h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#8CA9FF] mr-3 text-xl">·</span>
                  <span><strong>Szeroki wybór:</strong> Od klasyki literatury po najnowsze bestsellery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8CA9FF] mr-3 text-xl">·</span>
                  <span><strong>Dwa formaty:</strong> książki papierowe i e-booki</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8CA9FF] mr-3 text-xl">·</span>
                  <span><strong>Wysoka jakość:</strong> Profesjonalna redakcja i piękne wydania</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8CA9FF] mr-3 text-xl">·</span>
                  <span><strong>Szybka dostawa:</strong> Sprawna realizacja zamówień</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8CA9FF] mr-3 text-xl">·</span>
                  <span><strong>Wsparcie:</strong> Pomoc na każdym etapie zakupu</span>
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-12">
                Skontaktuj się z nami
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Masz pytania? Chcesz nawiązać współpracę? Jesteśmy do Twojej dyspozycji! 
                Skorzystaj z naszego formularza Kontaktowego lub napisz bezpośrednio na Adres: 
                <a href="mailto:Kontakt@verse.pl" className="text-[#8cał9FF] hover:text-[#AAC4F5] font-semibold ml-1">
                  Kontakt@verse.pl
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

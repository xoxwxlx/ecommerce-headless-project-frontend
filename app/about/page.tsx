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
              Z pasj¹ do literatury od 20 lat
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Nasza Historia
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Verse powsta³o w 2005 roku z pasji do dobrej literatury. Zbudowaliœmy katalog obejmuj¹cy setki tytu³ów w ró¿nych gatunkach - od klasyki po najnowsze 
                bestsellery.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Specjalizujemy siê w publikowaniu zarówno ksi¹¿ek papierowych, jak i e-booków, 
                daj¹c czytelnikom wybór preferowanego formatu. Wierzymy, ¿e ka¿dy zas³uguje na dostêp 
                do wysokiej jakoœci literatury, niezale¿nie od formy, w jakiej preferuje czytaæ.
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-12">
                Nasza Misja
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Nasz¹ misj¹ jest promowanie kultury czytelnictwa i udostêpnianie najlepszych dzie³ 
                literackich polskim czytelnikom. Dbamy o wysok¹ jakoœæ wydañ - zarówno pod wzglêdem 
                redakcyjnym, jak i graficznym.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-12">
                <div className="bg-[#FFF2C6] rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">??</div>
                  <h3 className="font-bold text-gray-800 mb-2">500+</h3>
                  <p className="text-gray-600">Publikowanych tytu³ów</p>
                </div>
                <div className="bg-[#AAC4F5] rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">??</div>
                  <h3 className="font-bold text-white mb-2">100,000+</h3>
                  <p className="text-white">Zadowolonych czytelników</p>
                </div>
                <div className="bg-[#8CA9FF] rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">?</div>
                  <h3 className="font-bold text-white mb-2">20 lat</h3>
                  <p className="text-white">Doœwiadczenia</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-12">
                Dlaczego my?
              </h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#8CA9FF] mr-3 text-xl">?</span>
                  <span><strong>Szeroki wybór:</strong> Od klasyki literatury po najnowsze bestsellery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8CA9FF] mr-3 text-xl">?</span>
                  <span><strong>Dwa formaty:</strong> Ksi¹¿ki papierowe i e-booki</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8CA9FF] mr-3 text-xl">?</span>
                  <span><strong>Wysoka jakoœæ:</strong> Profesjonalna redakcja i piêkne wydania</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8CA9FF] mr-3 text-xl">?</span>
                  <span><strong>Szybka dostawa:</strong> Sprawna realizacja zamówieñ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8CA9FF] mr-3 text-xl">?</span>
                  <span><strong>Wsparcie:</strong> Pomoc na ka¿dym etapie zakupu</span>
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-12">
                Skontaktuj siê z nami
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Masz pytania? Chcesz nawi¹zaæ wspó³pracê? Jesteœmy do Twojej dyspozycji! 
                Skorzystaj z naszego formularza kontaktowego lub napisz bezpoœrednio na adres: 
                <a href="mailto:kontakt@verse.pl" className="text-[#8CA9FF] hover:text-[#AAC4F5] font-semibold ml-1">
                  kontakt@verse.pl
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

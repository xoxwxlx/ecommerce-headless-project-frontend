'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Polityka Prywatności</h1>
            <p className="text-gray-600 text-lg">Informacje o przetwarzaniu danych osobowych</p>
            <p className="text-sm text-gray-500 mt-2">Ostatnia aktualizacja: 10 listopada 2025</p>
          </div>

          {/* Postanowienia ogólne */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Postanowienia ogólne</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych 
                przekazanych przez Użytkowników w związku z korzystaniem ze sklepu internetowego Verse 
                dostępnego pod adresem verse.pl.
              </p>
              <p>
                Administratorem danych osobowych jest <strong>Verse Sp. z o.o.</strong> z siedzibą w Warszawie, 
                ul. Książkowa 123, 00-001 Warszawa, NIP: 1234567890, REGON: 123456789.
              </p>
              <p>
                Kontakt z Administratorem możliwy jest pod adresem e-mail: <a href="mailto:rodo@verse.pl" className="text-[#8CA9FF] hover:underline">rodo@verse.pl</a> 
                lub pisemnie na adres siedziby.
              </p>
            </div>
          </section>

          {/* Podstawa prawna */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Podstawa prawna przetwarzania danych</h2>
            <div className="space-y-4 text-gray-700">
              <p>Przetwarzamy dane osobowe na podstawie:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Art. 6 ust. 1 lit. b RODO</strong> - wykonanie umowy sprzedaży lub działania na żądanie przed zawarciem umowy</li>
                <li><strong>Art. 6 ust. 1 lit. c RODO</strong> - wypełnienie obowiązków prawnych (np. wystawienie faktury, przechowywanie dokumentacji)</li>
                <li><strong>Art. 6 ust. 1 lit. f RODO</strong> - prawnie uzasadniony interes Administratora (marketing, analityka, bezpieczeństwo)</li>
                <li><strong>Art. 6 ust. 1 lit. a RODO</strong> - zgoda (newsletter, marketing)</li>
              </ul>
            </div>
          </section>

          {/* Zakres danych */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Jakie dane zbieramy?</h2>
            <div className="space-y-6">
              <div className="bg-[#FFF8DE] p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Dane do realizacji zamówień:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Imię i nazwisko</li>
                  <li>Adres dostawy i rozliczeniowy</li>
                  <li>Adres e-mail</li>
                  <li>Numer telefonu</li>
                  <li>Dane do faktury (nazwa firmy, NIP - jeśli dotyczy)</li>
                </ul>
              </div>

              <div className="bg-[#FFF8DE] p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Dane techniczne (automatycznie):</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Adres IP</li>
                  <li>Typ przeglądarki i urządzenia</li>
                  <li>Czas wizyty i aktywność na stronie</li>
                  <li>Informacje z plików cookies</li>
                </ul>
              </div>

              <div className="bg-[#FFF8DE] p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Dane marketingowe (za zgodą):</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Adres e-mail do newslettera</li>
                  <li>Historia zakupów i preferencje</li>
                  <li>Dane z profilu użytkownika</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cele przetwarzania */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. W jakim celu przetwarzamy dane?</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#8CA9FF] rounded-full mt-2 mr-3 shrink-0"></div>
                <p><strong>Realizacja zamówień</strong> - przetwarzanie zamówienia, wysyłka, kontakt w sprawie dostawy</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#8CA9FF] rounded-full mt-2 mr-3 shrink-0"></div>
                <p><strong>Obsługa reklamacji i zwrotów</strong> - rozpatrywanie reklamacji i wniosków o zwrot</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#8CA9FF] rounded-full mt-2 mr-3 shrink-0"></div>
                <p><strong>Rozliczenia finansowe</strong> - wystawianie faktur, obsługa płatności</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#8CA9FF] rounded-full mt-2 mr-3 shrink-0"></div>
                <p><strong>Marketing</strong> - wysyłka newslettera, ofert specjalnych (za zgodą)</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#8CA9FF] rounded-full mt-2 mr-3 shrink-0"></div>
                <p><strong>Analityka i statystyka</strong> - analiza ruchu, optymalizacja sklepu</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#8CA9FF] rounded-full mt-2 mr-3 shrink-0"></div>
                <p><strong>Bezpieczeństwo</strong> - wykrywanie i zapobieganie nadużyciom</p>
              </div>
            </div>
          </section>

          {/* Okres przechowywania */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Jak długo przechowujemy dane?</h2>
            <div className="space-y-4 text-gray-700">
              <p>Dane osobowe są przechowywane przez okres:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Realizacji zamówienia</strong> - do czasu wykonania umowy i wygaśnięcia roszczeń</li>
                <li><strong>Obowiązków prawnych</strong> - 5 lat (zgodnie z przepisami podatkowymi)</li>
                <li><strong>Zgody marketingowej</strong> - do momentu wycofania zgody lub usunięcia konta</li>
                <li><strong>Analityki</strong> - do 25 miesięcy (Google Analytics)</li>
              </ul>
              <div className="bg-[#FFF8DE] p-4 rounded-lg mt-4">
                <p className="text-sm">
                  <strong>Uwaga:</strong> Po upływie okresu przechowywania dane są trwale usuwane lub anonimizowane.
                </p>
              </div>
            </div>
          </section>

          {/* Udostępnianie danych */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Komu udostępniamy dane?</h2>
            <div className="space-y-4 text-gray-700">
              <p>Dane osobowe mogą być przekazywane:</p>
              <div className="space-y-3">
                <div className="border-l-4 border-[#8CA9FF] pl-4">
                  <h3 className="font-semibold mb-1">Firmom kurierskim</h3>
                  <p className="text-sm">DPD, InPost - w celu realizacji dostawy</p>
                </div>
                <div className="border-l-4 border-[#8CA9FF] pl-4">
                  <h3 className="font-semibold mb-1">Operatorom płatności</h3>
                  <p className="text-sm">Przelewy24, PayPal - w celu realizacji płatności</p>
                </div>
                <div className="border-l-4 border-[#8CA9FF] pl-4">
                  <h3 className="font-semibold mb-1">Dostawcom usług IT</h3>
                  <p className="text-sm">Hosting, systemy mailingowe, analityka</p>
                </div>
                <div className="border-l-4 border-[#8CA9FF] pl-4">
                  <h3 className="font-semibold mb-1">Biurom księgowym</h3>
                  <p className="text-sm">W zakresie prowadzenia rachunkowości</p>
                </div>
              </div>
              <p className="mt-4">
                Wszyscy odbiorcy danych są związani umowami powierzenia przetwarzania danych 
                i zobowiązani do zachowania odpowiednich środków bezpieczeństwa.
              </p>
            </div>
          </section>

          {/* Prawa użytkownika */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Twoje prawa</h2>
            <div className="space-y-4 text-gray-700">
              <p>Zgodnie z RODO przysługują Ci następujące prawa:</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-[#F0F4FF] p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Prawo dostępu</h3>
                  <p className="text-sm">Możesz uzyskać informacje o przetwarzanych danych</p>
                </div>
                <div className="bg-[#F0F4FF] p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Prawo do sprostowania</h3>
                  <p className="text-sm">Możesz poprawić nieprawidłowe dane</p>
                </div>
                <div className="bg-[#F0F4FF] p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Prawo do usunięcia</h3>
                  <p className="text-sm">Możesz żądać usunięcia danych (&quot;prawo do bycia zapomnianym&quot;)</p>
                </div>
                <div className="bg-[#F0F4FF] p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Prawo do ograniczenia</h3>
                  <p className="text-sm">Możesz ograniczyć przetwarzanie danych</p>
                </div>
                <div className="bg-[#F0F4FF] p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Prawo do przenoszenia</h3>
                  <p className="text-sm">Możesz otrzymać dane w formacie strukturalnym</p>
                </div>
                <div className="bg-[#F0F4FF] p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Prawo sprzeciwu</h3>
                  <p className="text-sm">Możesz sprzeciwić się przetwarzaniu</p>
                </div>
              </div>
              <div className="bg-[#FFF8DE] p-4 rounded-lg mt-4">
                <p className="text-sm">
                  <strong>Wniosek o realizację praw</strong> można zgłosić na adres: <a href="mailto:rodo@verse.pl" className="text-[#8CA9FF] hover:underline">rodo@verse.pl</a>
                </p>
                <p className="text-sm mt-2">
                  Przysługuje Ci również prawo do wniesienia skargi do <strong>Prezesa Urzędu Ochrony Danych Osobowych</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Pliki cookies</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Nasza strona wykorzystuje pliki cookies (ciasteczka) w celu zapewnienia prawidłowego 
                działania serwisu, personalizacji treści oraz analizy ruchu.
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-1">Cookies niezbędne</h3>
                  <p className="text-sm">Umożliwiają korzystanie z funkcji sklepu (koszyk, logowanie)</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Cookies funkcjonalne</h3>
                  <p className="text-sm">Zapamiętują preferencje użytkownika</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Cookies analityczne</h3>
                  <p className="text-sm">Google Analytics - analiza ruchu i zachowań użytkowników</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Cookies marketingowe</h3>
                  <p className="text-sm">Personalizacja reklam i ofert</p>
                </div>
              </div>
              <p className="mt-4">
                Możesz zarządzać ustawieniami cookies w swojej przeglądarce. Wyłączenie cookies może 
                wpłynąć na funkcjonalność sklepu.
              </p>
            </div>
          </section>

          {/* Bezpieczeństwo */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Bezpieczeństwo danych</h2>
            <div className="space-y-4 text-gray-700">
              <p>Stosujemy następujące środki bezpieczeństwa:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Szyfrowanie połączenia SSL/TLS (HTTPS)</li>
                <li>Bezpieczne przechowywanie haseł (hashowanie)</li>
                <li>Regularne kopie zapasowe danych</li>
                <li>Kontrola dostępu do systemów</li>
                <li>Monitoring bezpieczeństwa i aktualizacje</li>
                <li>Umowy powierzenia przetwarzania z podwykonawcami</li>
              </ul>
            </div>
          </section>

          {/* Zmiany */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Zmiany w polityce prywatności</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. 
                O wszelkich zmianach poinformujemy na stronie głównej sklepu oraz (w przypadku istotnych zmian) 
                drogą mailową.
              </p>
              <p>
                Zalecamy okresowe sprawdzanie treści Polityki Prywatności.
              </p>
            </div>
          </section>

          {/* Kontakt */}
          <section className="bg-linear-to-r from-[#8CA9FF] to-[#AAC4F5] rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Masz pytania dotyczące ochrony danych?</h2>
            <p className="mb-6">
              Skontaktuj się z naszym Inspektorem Ochrony Danych
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:rodo@verse.pl" 
                className="inline-block bg-white text-[#8CA9FF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                rodo@verse.pl
              </a>
              <a 
                href="mailto:pomoc@verse.pl" 
                className="inline-block bg-white text-[#8CA9FF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                pomoc@verse.pl
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Regulamin sklepu</h1>
            <p className="text-gray-600 text-lg">Zasady korzystania ze sklepu internetowego Verse</p>
            <p className="text-sm text-gray-500 mt-2">Obowiązuje od: 1 stycznia 2025</p>
          </div>

          {/* Definicje */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§1 Definicje</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>1.1 Sklep</strong> - sklep internetowy Verse prowadzony przez Verse Sp. z o.o., dostępny pod adresem verse.pl</p>
              <p><strong>1.2 Sprzedawca</strong> - Verse Sp. z o.o. z siedzibą w Warszawie, ul. Książkowa 123, 00-001 Warszawa, NIP: 1234567890</p>
              <p><strong>1.3 Klient</strong> - osoba fizyczna, prawna lub jednostka organizacyjna dokonująca zakupów w Sklepie</p>
              <p><strong>1.4 Konsument</strong> - osoba fizyczna dokonująca zakupów niezwiązanych z działalnością gospodarczą lub zawodową</p>
              <p><strong>1.5 Produkt</strong> - książki w formie fizycznej, e-booki oraz audiobooki oferowane w Sklepie</p>
              <p><strong>1.6 Umowa sprzedaży</strong> - umowa zawarta między Klientem a Sprzedawcą za pośrednictwem Sklepu</p>
            </div>
          </section>

          {/* Postanowienia ogólne */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§2 Postanowienia ogólne</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>2.1</strong> Niniejszy Regulamin określa zasady korzystania ze Sklepu internetowego, składania zamówień, zawierania umów sprzedaży oraz reklamacji.</p>
              <p><strong>2.2</strong> Warunkiem korzystania ze Sklepu jest zapoznanie się z Regulaminem i jego akceptacja.</p>
              <p><strong>2.3</strong> Do korzystania ze Sklepu niezbędne jest urządzenie z dostępem do Internetu oraz przeglądarka internetowa.</p>
              <p><strong>2.4</strong> Klient zobowiązany jest do korzystania ze Sklepu w sposób zgodny z prawem i dobrymi obyczajami.</p>
            </div>
          </section>

          {/* Rejestracja i konto */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§3 Rejestracja i konto użytkownika</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>3.1</strong> Zakupy w Sklepie można dokonywać jako gość lub po rejestracji konta.</p>
              <p><strong>3.2</strong> Rejestracja konta jest bezpłatna i dobrowolna.</p>
              <p><strong>3.3</strong> Podczas rejestracji Klient podaje prawdziwe dane osobowe.</p>
              <p><strong>3.4</strong> Klient zobowiązany jest do zachowania hasła w tajemnicy i nieudostępniania go osobom trzecim.</p>
              <p><strong>3.5</strong> Klient może w każdej chwili usunąć swoje konto, kontaktując się z obsługą Sklepu.</p>
            </div>
          </section>

          {/* Składanie zamówień */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§4 Składanie zamówień</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>4.1</strong> Aby złożyć zamówienie należy:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Dodać wybrane Produkty do koszyka</li>
                <li>Wybrać metodę dostawy</li>
                <li>Wybrać metodę płatności</li>
                <li>Podać dane do wysyłki i rozliczenia</li>
                <li>Zaakceptować Regulamin</li>
                <li>Kliknąć przycisk &quot;Złóż zamówienie&quot;</li>
              </ul>
              <p><strong>4.2</strong> Złożenie zamówienia stanowi ofertę zawarcia umowy sprzedaży.</p>
              <p><strong>4.3</strong> Po złożeniu zamówienia Klient otrzymuje potwierdzenie na adres e-mail.</p>
              <p><strong>4.4</strong> Umowa sprzedaży zostaje zawarta po potwierdzeniu przyjęcia zamówienia przez Sprzedawcę.</p>
            </div>
          </section>

          {/* Ceny i płatności */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§5 Ceny i płatności</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>5.1</strong> Wszystkie ceny w Sklepie podane są w złotych polskich (PLN) i zawierają podatek VAT.</p>
              <p><strong>5.2</strong> Cena Produktu widoczna na stronie jest wiążąca w chwili złożenia zamówienia.</p>
              <p><strong>5.3</strong> Całkowity koszt zamówienia (cena produktów + koszt dostawy) jest widoczny przed złożeniem zamówienia.</p>
              <p><strong>5.4</strong> Dostępne metody płatności:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Płatność online (Przelewy24, PayPal)</li>
                <li>Przelew bankowy tradycyjny</li>
                <li>Płatność za pobraniem (tylko dla wysyłek kurierem)</li>
              </ul>
              <p><strong>5.5</strong> W przypadku płatności przelewem, zamówienie jest realizowane po zaksięgowaniu wpłaty.</p>
            </div>
          </section>

          {/* Dostawa */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§6 Dostawa</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>6.1</strong> Sprzedawca oferuje następujące metody dostawy:</p>
              <div className="bg-[#FFF8DE] p-4 rounded-lg space-y-2 my-3">
                <p><strong>Kurier DPD/InPost</strong> - 14,99 zł (GRATIS powyżej 100 zł) - dostawa 1-2 dni robocze</p>
                <p><strong>Paczkomat InPost</strong> - 11,99 zł - dostawa 1-2 dni robocze</p>
                <p><strong>E-booki</strong> - GRATIS - dostawa natychmiastowa (link do pobrania)</p>
              </div>
              <p><strong>6.2</strong> Czas realizacji zamówienia wynosi do 2 dni roboczych od potwierdzenia płatności.</p>
              <p><strong>6.3</strong> E-booki są dostarczane w formie linku do pobrania wysłanego na adres e-mail.</p>
              <p><strong>6.4</strong> Ryzyko przypadkowej utraty lub uszkodzenia Produktu przechodzi na Klienta z chwilą wydania przesyłki.</p>
            </div>
          </section>

          {/* Prawo odstąpienia */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§7 Prawo odstąpienia od umowy</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>7.1</strong> Konsument ma prawo odstąpić od umowy w ciągu 14 dni od otrzymania Produktu bez podania przyczyny.</p>
              <p><strong>7.2</strong> Aby odstąpić od umowy, należy wysłać oświadczenie na adres: <span className="text-[#8CA9FF]">zwroty@verse.pl</span></p>
              <p><strong>7.3</strong> Produkt należy zwrócić w stanie nienaruszonym, w oryginalnym opakowaniu.</p>
              <p><strong>7.4</strong> <strong>Prawo odstąpienia nie przysługuje w przypadku:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>E-booków po rozpoczęciu pobierania/korzystania z treści cyfrowych</li>
                <li>Produktów rozpieczętowanych po dostarczeniu (książki w folii)</li>
                <li>Nagrań audio rozpieczętowanych po dostarczeniu</li>
              </ul>
              <p><strong>7.5</strong> Zwrot płatności następuje w ciągu 14 dni od otrzymania oświadczenia o odstąpieniu.</p>
              <p><strong>7.6</strong> Koszt odesłania Produktu pokrywa Konsument.</p>
            </div>
          </section>

          {/* Reklamacje */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§8 Reklamacje</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>8.1</strong> Sprzedawca odpowiada za wady fizyczne i prawne Produktu (rękojmia).</p>
              <p><strong>8.2</strong> Reklamację można zgłosić:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>E-mail: <span className="text-[#8CA9FF]">reklamacje@verse.pl</span></li>
                <li>Pisemnie na adres siedziby Sprzedawcy</li>
              </ul>
              <p><strong>8.3</strong> Reklamacja powinna zawierać:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Opis wady</li>
                <li>Numer zamówienia</li>
                <li>Żądanie Klienta (naprawa, wymiana, obniżenie ceny, odstąpienie)</li>
                <li>Dane kontaktowe</li>
              </ul>
              <p><strong>8.4</strong> Odpowiedź na reklamację zostanie udzielona w ciągu 14 dni.</p>
              <p><strong>8.5</strong> Koszty przesyłki reklamacyjnej pokrywa Sprzedawca (po uznaniu reklamacji).</p>
            </div>
          </section>

          {/* Dane osobowe */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§9 Ochrona danych osobowych</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>9.1</strong> Administratorem danych osobowych jest Verse Sp. z o.o.</p>
              <p><strong>9.2</strong> Dane osobowe są przetwarzane zgodnie z RODO.</p>
              <p><strong>9.3</strong> Szczegółowe informacje o przetwarzaniu danych znajdują się w <a href="/privacy-policy" className="text-[#8CA9FF] hover:underline">Polityce Prywatności</a>.</p>
              <p><strong>9.4</strong> Klient ma prawo dostępu, sprostowania, usunięcia oraz ograniczenia przetwarzania swoich danych.</p>
            </div>
          </section>

          {/* Cookies */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§10 Pliki cookies</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>10.1</strong> Sklep wykorzystuje pliki cookies w celu zapewnienia prawidłowego funkcjonowania.</p>
              <p><strong>10.2</strong> Cookies służą do:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Zapamiętywania zawartości koszyka</li>
                <li>Zapamiętywania sesji logowania</li>
                <li>Analizy ruchu na stronie</li>
                <li>Personalizacji treści i reklam</li>
              </ul>
              <p><strong>10.3</strong> Klient może zarządzać cookies w ustawieniach przeglądarki.</p>
            </div>
          </section>

          {/* Pozasądowe rozwiązywanie sporów */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§11 Pozasądowe rozwiązywanie sporów</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>11.1</strong> Konsument ma prawo skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń.</p>
              <p><strong>11.2</strong> Konsument może zwrócić się do:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Stałego polubownego sądu konsumenckiego</li>
                <li>Wojewódzkiego inspektora Inspekcji Handlowej</li>
                <li>Powiatowego (miejskiego) rzecznika konsumentów</li>
              </ul>
              <p><strong>11.3</strong> Platforma ODR: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#8CA9FF] hover:underline">https://ec.europa.eu/consumers/odr</a></p>
            </div>
          </section>

          {/* Postanowienia końcowe */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§12 Postanowienia końcowe</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>12.1</strong> W sprawach nieuregulowanych w Regulaminie stosuje się przepisy prawa polskiego, w szczególności:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Kodeksu cywilnego</li>
                <li>Ustawy o prawach konsumenta</li>
                <li>Ustawy o świadczeniu usług drogą elektroniczną</li>
              </ul>
              <p><strong>12.2</strong> Sprzedawca zastrzega sobie prawo do wprowadzania zmian w Regulaminie z ważnych przyczyn technicznych, prawnych lub organizacyjnych.</p>
              <p><strong>12.3</strong> O zmianach Regulaminu Klienci zostaną poinformowani z 14-dniowym wyprzedzeniem.</p>
              <p><strong>12.4</strong> Zmiany Regulaminu nie dotyczą zamówień złożonych przed wejściem zmian w życie.</p>
            </div>
          </section>

          {/* Kontakt */}
          <section className="bg-linear-to-r from-[#8CA9FF] to-[#AAC4F5] rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Dane kontaktowe</h2>
            <div className="space-y-2">
              <p><strong>Verse Sp. z o.o.</strong></p>
              <p>ul. Książkowa 123</p>
              <p>00-001 Warszawa</p>
              <p>NIP: 1234567890</p>
              <p>REGON: 123456789</p>
              <p>KRS: 0000123456</p>
              <div className="mt-4 pt-4 border-t border-white/30">
                <p>E-mail: <a href="mailto:kontakt@verse.pl" className="underline">kontakt@verse.pl</a></p>
                <p>Telefon: <a href="tel:+48123456789" className="underline">+48 123 456 789</a></p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
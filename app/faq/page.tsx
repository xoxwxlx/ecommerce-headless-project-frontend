'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const faqs = [
  {
    question: "Jak mogê z³o¿yæ zamówienie?",
    answer: "Aby z³o¿yæ zamówienie, wybierz interesuj¹c¹ Ciê ksi¹¿kê lub e-book, dodaj do koszyka i przejdŸ do finalizacji zamówienia. Postêpuj zgodnie z instrukcjami na ekranie."
  },
  {
    question: "Jakie metody p³atnoœci s¹ dostêpne?",
    answer: "Akceptujemy karty kredytowe, debetowe, przelewy bankowe oraz szybkie p³atnoœci online przez popularne systemy p³atnoœci."
  },
  {
    question: "Czy mogê zwróciæ produkt?",
    answer: "Tak, zgodnie z przepisami masz 14 dni na zwrot produktu bez podania przyczyny. E-booki mo¿na zwróciæ tylko jeœli nie zosta³y jeszcze pobrane."
  },
  {
    question: "Ile trwa dostawa?",
    answer: "Standardowa dostawa ksi¹¿ek fizycznych trwa 2-3 dni robocze. E-booki s¹ dostêpne natychmiast po op³aceniu zamówienia."
  },
  {
    question: "Czy muszê za³o¿yæ konto, aby zamówiæ?",
    answer: "Nie, mo¿esz z³o¿yæ zamówienie jako goœæ. Jednak posiadanie konta pozwala na œledzenie zamówieñ i szybsze zakupy w przysz³oœci."
  },
  {
    question: "Jak mogê œledziæ moj¹ przesy³kê?",
    answer: "Po wysy³ce zamówienia otrzymasz e-mail z numerem œledzenia, który pozwoli Ci monitorowaæ status przesy³ki."
  },
  {
    question: "Czy mogê anulowaæ zamówienie?",
    answer: "Zamówienie mo¿na anulowaæ w ci¹gu 1 godziny od z³o¿enia. Po tym czasie prosimy o kontakt z obs³ug¹ klienta."
  },
  {
    question: "Czy oferujecie ksi¹¿ki w jêzyku angielskim?",
    answer: "Tak, w naszej ofercie znajduj¹ siê ksi¹¿ki zarówno w jêzyku polskim, jak i angielskim oraz innych jêzykach."
  },
  {
    question: "Jak pobraæ zakupiony e-book?",
    answer: "Po op³aceniu zamówienia znajdziesz link do pobrania e-booka w swoim koncie w sekcji zamówienia oraz otrzymasz go na e-mail."
  },
  {
    question: "Czy oferujecie rabaty dla sta³ych klientów?",
    answer: "Tak, oferujemy program lojalnoœciowy oraz regularne promocje dla zarejestrowanych u¿ytkowników. Sprawdzaj nasz¹ stronê regularnie."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Najczêœciej zadawane pytania
        </h1>
        <p className="text-gray-600 text-center mb-12">
          ZnajdŸ odpowiedzi na najpopularniejsze pytania dotycz¹ce naszej ksiêgarni
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[#8CA9FF] transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#8CA9FF] to-[#AAC4F5] rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Nie znalaz³eœ odpowiedzi?</h2>
          <p className="mb-6">Skontaktuj siê z nami, a chêtnie pomo¿emy</p>
          <a
            href="/contact"
            className="inline-block bg-white text-[#8CA9FF] font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors"
          >
            Kontakt
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}


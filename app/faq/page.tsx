'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const faqs = [
  {
    question: "Jak mogę złożyć zamówienie?",
    answer: "Aby złożyć zamówienie, wybierz interesującą Cię książkę lub e-book, dodaj do koszyka i przejdź do finalizacji zamówienia. Postępuj zgodnie z instrukcjami na ekranie."
  },
  {
    question: "Jakie metody płatności są dostępne?",
    answer: "Akceptujemy karty kredytowe, debetowe, przelewy bankowe oraz szybkie płatności online przez popularne systemy płatności."
  },
  {
    question: "Czy mogę zwrócić produkt?",
    answer: "Tak, zgodnie z przepisami masz 14 dni na zwrot produktu bez podania przyczyny. E-booki można zwrócić tylko jeśli nie zostały jeszcze pobrane."
  },
  {
    question: "Ile trwa dostawa?",
    answer: "Standardowa dostawa książek fizycznych trwa 2-3 dni robocze. E-booki są dostępne natychmiast po opłaceniu zamówienia."
  },
  {
    question: "Czy muszę założyć konto, aby zamówić?",
    answer: "Nie, możesz złożyć zamówienie jako gość. Jednak posiadanie konta pozwala na śledzenie zamówień i szybsze zakupy w przyszłości."
  },
  {
    question: "Jak mogę śledzić moją przesyłkę?",
    answer: "Po wysyłce zamówienia otrzymasz e-mail z numerem śledzenia, który pozwoli Ci monitorować status przesyłki."
  },
  {
    question: "Czy mogę anulować zamówienie?",
    answer: "Zamówienie można anulować w ciągu 1 godziny od złożenia. Po tym czasie prosimy o kontakt z obsługą klienta."
  },
  {
    question: "Czy oferujecie książki w języku angielskim?",
    answer: "Tak, w naszej ofercie znajdują się książki zarówno w języku polskim, jak i angielskim oraz innych językach."
  },
  {
    question: "Jak pobrać zakupiony e-book?",
    answer: "Po opłaceniu zamówienia znajdziesz link do pobrania e-booka w swoim koncie w sekcji zamówienia oraz otrzymasz go na e-mail."
  },
  {
    question: "Czy oferujecie rabaty dla stałych klientów?",
    answer: "Tak, oferujemy program lojalnościowy oraz regularne promocje dla zarejestrowanych użytkowników. Sprawdzaj naszą stronę regularnie."
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
          Najczęściej zadawane pytania
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Znajdź odpowiedzi na najpopularniejsze pytania dotyczące naszej księgarni
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

        <div className="mt-12 bg-linear-to-r from-[#8CA9FF] to-[#AAC4F5] rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Nie znalazłeś odpowiedzi?</h2>
          <p className="mb-6">Skontaktuj się z nami, a chętnie pomożemy</p>
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


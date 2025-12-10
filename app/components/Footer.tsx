import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#8CA9FF] to-[#AAC4F5] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ksiêgarnia</h3>
            <p className="text-white/80">
              Twoje miejsce na najlepsze ksi¹¿ki i e-booki
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Sklep</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/books" className="text-white/80 hover:text-white transition-colors">
                  Ksi¹¿ki
                </Link>
              </li>
              <li>
                <Link href="/ebooks" className="text-white/80 hover:text-white transition-colors">
                  E-booki
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-white/80 hover:text-white transition-colors">
                  Autorzy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Pomoc</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-white/80 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-white/80 hover:text-white transition-colors">
                  Dostawa
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/80 hover:text-white transition-colors">
                  Zwroty
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Informacje</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-white transition-colors">
                  Regulamin
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-white/80 hover:text-white transition-colors">
                  Polityka prywatnoœci
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
          <p>&copy; {new Date().getFullYear()} Ksiêgarnia. Wszystkie prawa zastrze¿one.</p>
        </div>
      </div>
    </footer>
  );
}

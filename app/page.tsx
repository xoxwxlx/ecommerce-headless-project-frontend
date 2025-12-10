'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { getProducts } from "@/services/api";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Product {
  id: number;
  title: string;
  name?: string;
  author?: string;
  price: string | number;
  image?: string;
  cover?: string;
  image_url?: string;
  genre?: string;
  format?: string; // 'physical', 'ebook', 'both'
  product_type?: string;
  is_ebook?: boolean;
  is_physical?: boolean;
}

export default function Home() {
  const [genreSlides, setGenreSlides] = useState<{ [key: string]: number }>({});
  const [productsByGenre, setProductsByGenre] = useState<{ [key: string]: Product[] }>({});
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Za³aduj listê ¿yczeñ z localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist);
      setWishlistIds(new Set(wishlist.map((item: Product) => item.id.toString())));
    }
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await getProducts();
        
        // Mapowanie angielskich nazw gatunków na polskie
        const genreMapping: { [key: string]: string } = {
          'romance': 'Romans',
          'mystery': 'Krymina³',
          'fantasy': 'Fantasy',
          'young-adult': 'Literatura m³odzie¿owa',
          'science-fiction': 'Science Fiction',
          'thriller': 'Thriller',
          'horror': 'Horror'
        };
        
        // Grupuj produkty wed³ug gatunku z polskimi nazwami
        const grouped: { [key: string]: Product[] } = {};
        
        allProducts.forEach((product: Product) => {
          const genreEn = product.genre?.toLowerCase() || 'inne';
          const genrePl = genreMapping[genreEn] || product.genre || 'Inne';
          if (!grouped[genrePl]) {
            grouped[genrePl] = [];
          }
          grouped[genrePl].push(product);
        });
        
        // Ogranicz ka¿dy gatunek do 20 produktów
        Object.keys(grouped).forEach(genre => {
          grouped[genre] = grouped[genre].slice(0, 20);
        });
        
        setProductsByGenre(grouped);
        
        // Inicjalizuj slajdy dla ka¿dego gatunku
        const initialSlides: { [key: string]: number } = {};
        Object.keys(grouped).forEach(genre => {
          initialSlides[genre] = 0;
        });
        setGenreSlides(initialSlides);
      } catch (error) {
        console.error('? Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  const itemsPerPage = 5;
  
  const getVisibleProducts = (genre: string) => {
    const products = productsByGenre[genre] || [];
    const slide = genreSlides[genre] || 0;
    return products.slice(slide * itemsPerPage, (slide + 1) * itemsPerPage);
  };
  
  const updateSlide = (genre: string, direction: 'next' | 'prev') => {
    setGenreSlides(prev => {
      const products = productsByGenre[genre] || [];
      const totalProducts = products.length;
      const maxSlide = Math.ceil(totalProducts / itemsPerPage) - 1;
      const currentSlide = prev[genre] || 0;
      
      let newSlide = currentSlide;
      if (direction === 'next') {
        newSlide = Math.min(maxSlide, currentSlide + 1);
      } else {
        newSlide = Math.max(0, currentSlide - 1);
      }
      
      return {
        ...prev,
        [genre]: newSlide
      };
    });
  };

  const toggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    const productId = product.id.toString();
    const savedWishlist = localStorage.getItem("wishlist");
    let wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];

    if (wishlistIds.has(productId)) {
      // Usuñ z listy ¿yczeñ
      wishlist = wishlist.filter((item: Product) => item.id.toString() !== productId);
      setWishlistIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    } else {
      // Dodaj do listy ¿yczeñ
      wishlist.push({
        id: product.id,
        title: product.title || product.name,
        author: product.author,
        price: product.price,
        image: product.image_url || product.image || product.cover,
        genre: product.genre,
        format: product.format
      });
      setWishlistIds(prev => new Set(prev).add(productId));
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />

      {/* Promotional Banner */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden group cursor-pointer">
        <Link href="/products" className="block w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-[#AAC4F5] to-[#8CA9FF] transition-transform duration-700 group-hover:scale-105">
            <div className="container mx-auto px-4 h-full flex items-center justify-center text-center">
              <div className="animate-fadeIn">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  Letnia Wyprzeda¿ ??
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-6">
                  Do -50% na wybrane tytu³y
                </p>
                <span className="inline-block bg-white text-[#8CA9FF] px-8 py-3 rounded-full font-semibold hover:bg-[#FFF2C6] transition-all duration-200 hover:scale-105 shadow-lg">
                  Zobacz promocjê
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Genre Sections */}
      {loading ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <p className="text-gray-500">£adowanie ksi¹¿ek...</p>
            </div>
          </div>
        </section>
      ) : (
        // Okreœlona kolejnoœæ gatunków
        ['Romans', 'Krymina³', 'Fantasy', 'Literatura m³odzie¿owa', 'Science Fiction', 'Thriller', 'Horror']
          .filter(genre => productsByGenre[genre] && productsByGenre[genre].length > 0)
          .map((genre, index) => (
          <section 
            key={genre} 
            className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF2C6]'}`}
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-[#8CA9FF] transition-colors duration-200">
                  {genre}
                </h2>
              </div>

                <div className="relative">
                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {getVisibleProducts(genre).map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="block h-full"
                    >
                      <div className="bg-[#FFF8DE] rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex flex-col h-full relative">
                        <button
                          onClick={(e) => toggleWishlist(e, product)}
                          className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-all duration-200"
                          title={wishlistIds.has(product.id.toString()) ? "Usuñ z listy ¿yczeñ" : "Dodaj do listy ¿yczeñ"}
                        >
                          <span className="text-xl">
                            {wishlistIds.has(product.id.toString()) ? '??' : '??'}
                          </span>
                        </button>
                        
                        <div className="aspect-3/4 rounded-xl mb-3 flex items-center justify-center overflow-hidden bg-[#AAC4F5]">
                            {(product.image_url || product.image || product.cover) ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={product.image_url || product.image || product.cover}
                                alt={product.title || product.name || 'Product'}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white font-semibold">#{product.id}</span>
                            )}
                          </div>
                          <div className="flex flex-col grow">
                            <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-[#8CA9FF] transition-colors min-h-10">
                              {product.title || product.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 min-h-5">
                              {product.author || '\u00A0'}
                            </p>
                            <p className="text-sm font-bold text-[#8CA9FF] mt-auto">
                              {typeof product.price === 'number' ? `${product.price.toFixed(2)} z³` : `${product.price} z³`}
                            </p>
                          </div>
                        </div>
                      </Link>
                  ))}
                </div>                {/* Slider Controls */}
                {productsByGenre[genre].length > itemsPerPage && (
                  <div className="flex justify-center gap-4 mt-8">
                    <button
                      onClick={() => updateSlide(genre, 'prev')}
                      disabled={(genreSlides[genre] || 0) === 0}
                      className="px-6 py-2 bg-[#AAC4F5] text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#8CA9FF] transition-all duration-200 hover:scale-105 shadow-md"
                    >
                      ‹ Poprzednie
                    </button>
                    <button
                      onClick={() => updateSlide(genre, 'next')}
                      disabled={(genreSlides[genre] || 0) >= Math.ceil(productsByGenre[genre].length / itemsPerPage) - 1}
                      className="px-6 py-2 bg-[#AAC4F5] text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#8CA9FF] transition-all duration-200 hover:scale-105 shadow-md"
                    >
                      Nastêpne ›
                    </button>
                  </div>
                )}
                
                {productsByGenre[genre].length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Brak dostêpnych produktów w tej kategorii</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))
      )}

      {/* Removed TOP 100 Ebooks Section - now replaced with genre sections above */}
      <section className="hidden py-16 bg-[#FFF2C6]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Link href="/ebooks" className="group">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 group-hover:text-[#8CA9FF] transition-colors duration-200">
                TOP 100 E-booków ??
              </h2>
            </Link>
            <Link 
              href="/ebooks" 
              className="text-[#8CA9FF] hover:text-[#AAC4F5] font-medium transition-colors duration-200"
            >
              Zobacz wszystkie ›
            </Link>
          </div>

          <div className="relative hidden">
            {/* Hidden ebooks section - replaced by genre sections */}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

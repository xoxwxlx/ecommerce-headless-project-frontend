"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProduct } from "@/services/api";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Product {
  id: string;
  title?: string;
  name?: string;
  author?: string;
  price: number;
  image?: string;
  cover?: string;
  image_url?: string;
  genre?: string;
  format?: string;
  description?: string;
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'physical' | 'ebook' | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(resolvedParams.id);
        setProduct(data);
        setError(false);
        
        // Auto-select format if only one option available
        if (data.format === 'physical' || data.format === 'ebook') {
          setSelectedFormat(data.format);
        }
        
        // Check if in wishlist
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsInWishlist(wishlist.some((item: { id: string }) => item.id === resolvedParams.id));
      } catch (err) {
        console.error("Error loading product:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProduct();
  }, [resolvedParams.id]);

  const toggleWishlist = () => {
    if (!product) return;
    
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = wishlist.some((item: { id: string }) => item.id === product.id);
    
    let newWishlist;
    if (exists) {
      newWishlist = wishlist.filter((item: { id: string }) => item.id !== product.id);
    } else {
      newWishlist = [...wishlist, {
        id: product.id,
        name: product.title || product.name,
        price: product.price,
        image: product.image_url || product.image || product.cover
      }];
    }
    
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setIsInWishlist(!exists);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-600 text-xl">Ładowanie...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
        <Header />
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="mb-8">
              <Link href="/products" className="text-[#8CA9FF] hover:text-[#AAC4F5] transition-colors text-sm">
                ← Powrót do produktów
              </Link>
            </nav>
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-red-600 text-xl">Nie udało się załadować produktu</p>
              <Link href="/products" className="mt-4 inline-block text-[#8CA9FF] hover:underline">
                Wróć do listy produktów
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  function addToCart() {
    if (!product) return;
    
    // Check if format selection is required
    if (product.format === 'both' && !selectedFormat) {
      alert('Proszę wybrać format produktu (E-book lub Książka)');
      return;
    }
    
    interface CartItem {
      id: string;
      name: string;
      price: number;
      quantity: number;
      format?: 'physical' | 'ebook';
    }
    
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartFormat = selectedFormat || (product.format as 'physical' | 'ebook');
    const existingIndex = cart.findIndex((item) => 
      item.id === product.id && item.format === cartFormat
    );
    
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.title || product.name || "Product",
        price: product.price,
        quantity: 1,
        format: cartFormat,
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const displayName = product.title || product.name || "Produkt";
  const displayImage = product.image_url || product.cover || product.image;
  const isEbook = product.format === 'ebook';
  const isPhysical = product.format === 'physical';
  const isBoth = product.format === 'both';

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />
      
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="mb-8">
            <Link href="/products" className="text-[#8CA9FF] hover:text-[#AAC4F5] transition-colors text-sm">
              ← Powrót do produktów
            </Link>
          </nav>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="bg-[#AAC4F5]/30 rounded-xl flex items-center justify-center p-8">
              {displayImage ? (
                <Image
                  src={displayImage}
                  alt={displayName}
                  width={400}
                  height={500}
                  className="rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center text-gray-400 text-6xl">
                  📖
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {displayName}
                </h1>
                
                {product.author && (
                  <p className="text-lg text-gray-600 mb-4">
                    Autor: <Link 
                      href={`/author/${encodeURIComponent(product.author)}`}
                      className="font-semibold text-[#8CA9FF] hover:text-[#AAC4F5] transition-colors hover:underline"
                    >
                      {product.author}
                    </Link>
                  </p>
                )}

                {product.genre && (
                  <div className="mb-4">
                    <span className="bg-[#FFF2C6] text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {product.genre}
                    </span>
                  </div>
                )}

                <div className="mb-6 flex gap-2">
                  {isEbook && (
                    <span className="bg-[#AAC4F5] text-white px-3 py-1 rounded-full text-sm font-medium">
                      E-book 💻
                    </span>
                  )}
                  {isPhysical && (
                    <span className="bg-[#8CA9FF] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Książka 📚
                    </span>
                  )}
                  {isBoth && (
                    <>
                      <span className="bg-[#AAC4F5] text-white px-3 py-1 rounded-full text-sm font-medium">
                        E-book 💻
                      </span>
                      <span className="bg-[#8CA9FF] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Książka 📚
                      </span>
                    </>
                  )}
                </div>

                {/* Format Selection for 'both' products */}
                {isBoth && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Wybierz format:</h3>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedFormat('ebook')}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                          selectedFormat === 'ebook'
                            ? 'bg-[#AAC4F5] text-white shadow-md scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        💻 E-book
                      </button>
                      <button
                        onClick={() => setSelectedFormat('physical')}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                          selectedFormat === 'physical'
                            ? 'bg-[#8CA9FF] text-white shadow-md scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        📚 Książka
                      </button>
                    </div>
                  </div>
                )}

                {product.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Opis:</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <div className="text-4xl font-bold text-gray-900 mb-6">
                  {product.price} zł
                </div>

                <button
                  onClick={addToCart}
                  className={`w-full font-bold py-4 px-8 rounded-full text-white transition-all duration-200 shadow-md ${
                    added 
                      ? 'bg-green-500 scale-95' 
                      : 'bg-[#8CA9FF] hover:bg-[#AAC4F5] hover:scale-105'
                  }`}
                >
                  {added ? '✓ Dodano do koszyka!' : 'Dodaj do koszyka 🛒'}
                </button>

                <button
                  onClick={toggleWishlist}
                  className={`w-full font-bold py-4 px-8 rounded-full transition-all duration-200 shadow-md mt-3 ${
                    isInWishlist
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {isInWishlist ? '❤️ Usuń z listy życzeń' : '🤍 Dodaj do listy życzeń'}
                </button>

                <Link
                  href="/cart"
                  className="block w-full text-center mt-4 font-semibold py-4 px-8 rounded-full bg-[#FFF2C6] hover:bg-[#FFF8DE] hover:scale-105 transition-all duration-200 shadow-md text-gray-800"
                >
                  Przejdź do koszyka →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      <Footer />
    </div>
  );
}

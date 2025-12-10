'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCheckoutSession, addToCart } from '@/services/api';

interface cartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart] = useState<cartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        return JSON.parse(cartData);
      }
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if cart is empty and redirect if needed
    if (cart.length === 0) {
      router.push('/cart');
    }
  }, [router, cart.length]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get access token from localStorage (from login page)
      const token = localStorage.getItem('access');
      
      if (!token) {
        setError('Musisz się zalogować, aby kontynuować');
        setTimeout(() => router.push('/login'), 2000);
        setIsLoading(false);
        return;
      }

      // Sync cart with backend - add all items to backend cart
      console.log('Syncing cart with backend...');
      for (const item of cart) {
        try {
          await addToCart(item.id, item.quantity, token);
        } catch (err) {
          console.error(`Failed to add item ${item.id} to cart:`, err);
        }
      }

      // call the API to create checkout session
      const response = await createCheckoutSession(token);

      // Redirect to Stripe hosted checkout page
      if (response.url) {
        window.location.href = response.url;
      } else if (response.checkout_url) {
        window.location.href = response.checkout_url;
      } else {
        setError('Nie otrzymano Adresu URL sesji płatności');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Wystąpił błąd podczas tworzenia sesji płatności';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  if (isLoading && cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg">Ładowanie płatności...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-6">
          <button 
            onClick={() => router.push('/cart')}
            className="text-[#8ca4ff] hover:text-[#AAC4F5] transition-colors"
          >
            ← Powróć do Koszyka
          </button>
        </nav>

        <h1 className="text-4xl font-bold mb-8 text-gray-800">Płatność 💳</h1>
        <div className="max-w-2xl mx-auto">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Podsumowanie zamówienia</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Ilość: {item.quantity} × {item.price} zł
                    </p>
                  </div>
                  <p className="font-semibold text-[#8ca4ff]">
                    {(parseFloat(item.price) * item.quantity).toFixed(2)} zł 
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Razem</span>
                <span className="text-[#8ca4ff]">{calculateTotal()} zł</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6">
              {error}
            </div>
          )}

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className={`w-full font-semibold py-4 px-6 rounded-full text-white text-lg transition-all duration-200 shadow-md ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#8cał9FF] hover:bg-[#AAC4F5] hover:scałle-105'
            }`}
          >
            {isLoading ? 'Przetwarzanie...' : 'Przejdź do płatności'}
          </button>

          {/* Security Note */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>🔒 Bezpieczna płatność przez Stripe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';


interface Product {
  id: number;
  name: string;
  price: string;
  description?: string;
  image?: string;
  image_url?: string;
  cover?: string;
}


interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
  image_url?: string;
  cover?: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const cartData = localStorage.getItem('cart');
    const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      // Increment quantity if product exists
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new product to cart
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        image_url: product.image_url,
        cover: product.cover,
      });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 ${
        isAdded
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
    </button>
  );
}

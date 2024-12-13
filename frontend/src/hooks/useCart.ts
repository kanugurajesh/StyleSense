import { useState } from 'react';
import type { Product } from '../types';

export function useCart() {
  const [items, setItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setItems((prev) => [...prev, product]);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return {
    items,
    addToCart,
    removeFromCart,
    itemCount: items.length,
  };
}

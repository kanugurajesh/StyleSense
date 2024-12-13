import React from 'react';
import { X } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';

export function FavoritesDropdown() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  if (favorites.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Your favorites list is empty
      </div>
    );
  }

  return (
    <div className="w-80 max-h-96 overflow-auto">
      {favorites.map((item) => (
        <div key={item.id} className="flex items-center gap-4 p-4 border-b">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="text-sm font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="p-1"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </Button>
            <Button
              variant="ghost"
              className="p-1"
              onClick={() => toggleFavorite(item)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
} 
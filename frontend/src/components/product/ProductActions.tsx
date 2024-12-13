import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProductActionsProps {
  onAddToCart: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

export function ProductActions({ onAddToCart, onToggleFavorite, isFavorite }: ProductActionsProps) {
  return (
    <div className="absolute top-2 right-2 flex gap-2">
      <Button
        variant="ghost"
        onClick={onToggleFavorite}
        className="p-2 rounded-full bg-white/90 hover:bg-white shadow-sm"
      >
        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
      </Button>
      <Button
        variant="ghost"
        onClick={onAddToCart}
        className="p-2 rounded-full bg-white/90 hover:bg-white shadow-sm"
      >
        <ShoppingBag className="w-5 h-5" />
      </Button>
    </div>
  );
}
import React from 'react';
import type { Product } from '../../types';
import { ProductImage } from './ProductImage';
import { ProductActions } from './ProductActions';
import { ProductConfidence } from './ProductConfidence';
import { Badge } from '../ui/Badge';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="group relative">
      <ProductImage src={product.image} alt={product.name} />
      <ProductActions
        onAddToCart={handleAddToCart}
        onToggleFavorite={() => toggleFavorite(product.id)}
        isFavorite={isFavorite(product.id)}
      />
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-gray-700">{product.name}</h3>
          <Badge variant="info">{product.brand}</Badge>
        </div>
        <p className="text-sm font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <ProductConfidence confidence={product.confidence} />
      </div>
    </div>
  );
}

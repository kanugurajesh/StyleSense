import React from 'react';
import type { Product } from '../types';
import { ProductImage } from './product/ProductImage';
import { ProductActions } from './product/ProductActions';
import { ProductConfidence } from './product/ProductConfidence';
import { Badge } from './ui/Badge';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="group relative">
      <ProductImage src={product.image} alt={product.name} />
      <ProductActions
        onAddToCart={() => addToCart(product)}
        onToggleFavorite={() => toggleFavorite(product.id)}
        isFavorite={isFavorite(product.id)}
      />
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-gray-700">{product.name}</h3>
          <Badge variant="info">{product.brand}</Badge>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
        <ProductConfidence confidence={product.confidence} />
      </div>
    </div>
  );
}
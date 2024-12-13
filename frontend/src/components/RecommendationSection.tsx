import React from 'react';
import type { RecommendationSection as RecommendationSectionType } from '../types';
import { ProductCard } from './ProductCard';

interface RecommendationSectionProps {
  section: RecommendationSectionType;
}

export function RecommendationSection({ section }: RecommendationSectionProps) {
  return (
    <div className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
        <p className="mt-2 text-gray-600">{section.description}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {section.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

import type { RecommendationSection } from '../types';
import { mockProducts } from './mockProducts';

export const mockSections: RecommendationSection[] = [
  {
    title: 'Trending Now',
    description: 'Popular items based on current fashion trends',
    products: mockProducts.slice(0, 4),
  },
  {
    title: 'Recommended for You',
    description: 'Personalized picks based on your style preferences',
    products: mockProducts.slice(4, 8),
  },
];

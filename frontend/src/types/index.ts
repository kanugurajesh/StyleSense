export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  confidence: number;
}

export interface RecommendationSection {
  title: string;
  description: string;
  products: Product[];
}
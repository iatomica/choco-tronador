export type ProductCategory = 'todos' | 'bombones' | 'rama' | 'trufas' | 'alfajores';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  priceFormatted: string;
  image: string;
  tag: string;
  cocoaPct: string;
  description: string;
  notes: string[];
  stock: number;
  featured?: boolean;
}

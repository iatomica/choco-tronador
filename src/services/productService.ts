import { Product, ProductCategory } from '../types/product';
import { INITIAL_PRODUCTS } from './mockData';

const PRODUCTS_STORAGE_KEY = 'tronador_products';

export const productService = {
  getProducts(): Product[] {
    const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_PRODUCTS;
    }
  },

  getProductsByCategory(category: ProductCategory): Product[] {
    const products = this.getProducts();
    if (category === 'todos') return products;
    return products.filter(p => p.category === category);
  },

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id);
  },

  addProduct(product: Omit<Product, 'id'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`
    };
    const updated = [newProduct, ...products];
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    return newProduct;
  },

  updateStock(id: string, newStock: number): void {
    const products = this.getProducts();
    const updated = products.map(p => p.id === id ? { ...p, stock: newStock } : p);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  }
};

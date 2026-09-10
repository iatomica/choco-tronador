import React, { useState } from 'react';
import { Product, ProductCategory } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onToast: (msg: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, onQuickView, onToast }) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('todos');

  const filtered = activeCategory === 'todos'
    ? products
    : products.filter(p => p.category === activeCategory);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'todos', label: 'Todos los Sabores' },
    { id: 'bombones', label: 'Bombones de Autor' },
    { id: 'rama', label: 'Chocolate en Rama' },
    { id: 'trufas', label: 'Trufas & Cacao 70%' },
    { id: 'alfajores', label: 'Alfajores Patagónicos' }
  ];

  return (
    <section id="coleccion" className="section-padding">
      <div className="container-custom">
        
        <div className="section-header">
          <span className="eyebrow-badge">Nuestras Especialidades</span>
          <h2 className="section-title">Colección de Chocolates</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Cada pieza es moldeada a mano y rellena con materias primas seleccionadas de la Patagonia y del mundo.
          </p>
        </div>

        <div className="filter-nav">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="products-bento-grid">
          {filtered.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={onQuickView} 
              onToast={onToast} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

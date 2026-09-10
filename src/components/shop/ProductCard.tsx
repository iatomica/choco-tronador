import React from 'react';
import { Eye, Plus } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onToast: (msg: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, onToast }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, 1);
    onToast(`${product.name} agregado a la cesta`);
  };

  return (
    <div className="double-bezel-shell product-card">
      <div className="double-bezel-core">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} loading="lazy" />
          <span className="product-tag">{product.tag}</span>
        </div>
        <div className="product-content">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-desc">{product.description}</p>
          <div className="product-meta-row">
            <span className="product-price">{product.priceFormatted}</span>
            <div className="product-actions">
              <button 
                className="btn-quick-view" 
                onClick={() => onQuickView(product)} 
                title="Vista Rápida" 
                aria-label="Vista Rápida"
              >
                <Eye size={18} />
              </button>
              <button className="btn-add-cart" onClick={handleAdd}>
                <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} />
                <span>Agregar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

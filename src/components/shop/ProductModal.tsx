import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onToast }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, 1);
    onToast(`${product.name} agregado a la cesta`);
    onClose();
  };

  return (
    <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-container">
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Cerrar Modal"
        >
          <X size={18} />
        </button>

        <div className="modal-grid">
          <img src={product.image} alt={product.name} className="modal-img" />
          <div>
            <span className="eyebrow-badge" style={{ marginBottom: '0.5rem' }}>{product.tag} · {product.cocoaPct} Cacao</span>
            <h2 className="h2" style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{product.name}</h2>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '1.25rem' }}>
              {product.priceFormatted}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {product.description}
            </p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Notas de Cata
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {product.notes.map((note, idx) => (
                  <span key={idx} style={{ padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-pill)', fontSize: '0.8rem' }}>
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleAdd}>
              <span>Agregar a la Cesta</span>
              <div className="btn-icon-badge"><ArrowRight size={14} /></div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

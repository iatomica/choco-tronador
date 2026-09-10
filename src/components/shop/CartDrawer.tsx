import React, { useState } from 'react';
import { X, ShoppingBag, Gift, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  onToast: (msg: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onToast }) => {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    total, 
    appliedGiftCard, 
    giftCardDiscount, 
    applyGiftCard, 
    removeGiftCard,
    clearCart
  } = useCart();

  const [giftCodeInput, setGiftCodeInput] = useState('');

  const handleApplyGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftCodeInput.trim()) return;

    const result = applyGiftCard(giftCodeInput);
    onToast(result.message);
    if (result.success) {
      setGiftCodeInput('');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      onToast('Tu cesta está vacía');
      return;
    }
    onToast('¡Compra procesada con éxito! Gracias por tu preferencia.');
    clearCart();
    closeCart();
  };

  return (
    <div className={`cart-drawer-overlay ${isCartOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && closeCart()}>
      <div className="cart-drawer">
        
        <div className="cart-header">
          <h3 className="cart-header-title">Tu Cesta de Chocolates</h3>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Cerrar Cesta">
            <X size={18} />
          </button>
        </div>

        <div className="cart-items-list">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p>Tu cesta de chocolates está vacía.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.product.id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="cart-item-title">{item.product.name}</div>
                    <button onClick={() => removeFromCart(item.product.id)} style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="cart-item-price">${(item.product.price * item.quantity).toLocaleString('es-AR')} ARS</div>
                  <div className="flavor-counter" style={{ marginTop: '0.5rem' }}>
                    <button className="counter-btn" onClick={() => updateQuantity(item.product.id, -1)}>-</button>
                    <span className="counter-value">{item.quantity}</span>
                    <button className="counter-btn" onClick={() => updateQuantity(item.product.id, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            
            {/* Gift Card Input in Cart */}
            <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
              {appliedGiftCard ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(212,175,55,0.1)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-inner)', border: '1px solid var(--border-gold)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>Gift Card: {appliedGiftCard.code}</span>
                  <button onClick={removeGiftCard} style={{ fontSize: '0.75rem', color: '#e74c3c' }}>Quitar</button>
                </div>
              ) : (
                <form onSubmit={handleApplyGiftCard} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="Código de Gift Card" 
                    value={giftCodeInput}
                    onChange={e => setGiftCodeInput(e.target.value.toUpperCase())}
                    style={{ flexGrow: 1, padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.8rem' }}
                  />
                  <button type="submit" className="btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.78rem' }}>
                    Aplicar
                  </button>
                </form>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString('es-AR')} ARS</span>
              </div>
              {giftCardDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--accent-gold)' }}>
                  <span>Descuento Gift Card</span>
                  <span>-${giftCardDiscount.toLocaleString('es-AR')} ARS</span>
                </div>
              )}
              <div className="cart-total-row" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                <span>Total a Pagar</span>
                <span className="cart-total-price">${total.toLocaleString('es-AR')} ARS</span>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleCheckout}>
              <span>Iniciar Compra Segura</span>
              <div className="btn-icon-badge"><ArrowRight size={14} /></div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Shield, Plus, Gift, Package, Layers } from 'lucide-react';
import { Product, ProductCategory } from '../../types/product';
import { productService } from '../../services/productService';
import { giftcardService } from '../../services/giftcardService';
import { GiftCard } from '../../types/giftcard';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshProducts: () => void;
  onToast: (msg: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, onRefreshProducts, onToast }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'giftcards' | 'new-product'>('inventory');
  
  // New Product Form
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('bombones');
  const [price, setPrice] = useState<number>(15000);
  const [tag, setTag] = useState('Edición Especial');
  const [cocoaPct, setCocoaPct] = useState('70%');
  const [description, setDescription] = useState('');
  const [notesInput, setNotesInput] = useState('Cacao, Dulce de Leche');

  // GiftCard Form
  const [gcAmount, setGcAmount] = useState<number>(10000);
  const [gcRecipient, setGcRecipient] = useState('');

  if (!isOpen) return null;

  const products = productService.getProducts();
  const giftCards = giftcardService.getGiftCards();

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    productService.addProduct({
      name,
      category,
      price,
      priceFormatted: `$${price.toLocaleString('es-AR')} ARS`,
      image: '/assets/images/bombones.webp',
      tag,
      cocoaPct,
      description,
      notes: notesInput.split(',').map(n => n.trim()),
      stock: 50
    });

    onToast(`¡Producto "${name}" añadido a la fábrica!`);
    onRefreshProducts();
    setName('');
    setDescription('');
    setActiveTab('inventory');
  };

  const handleIssueGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    const newGc = giftcardService.createGiftCard(gcAmount, gcRecipient || 'Cliente VIP');
    onToast(`Gift Card ${newGc.code} emitida con éxito.`);
    setGcRecipient('');
  };

  return (
    <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-container" style={{ maxWidth: '900px', maxHeight: '85vh' }}>
        
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '1rem', right: '1rem', width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Cerrar Dashboard"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1px solid var(--border-gold)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={22} />
          </div>
          <div>
            <span className="eyebrow-badge">Panel de Administración</span>
            <h2 className="h2" style={{ fontSize: '1.75rem' }}>Maestro Chocolatero</h2>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <button 
            className={`filter-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Inventario ({products.length})
          </button>
          <button 
            className={`filter-btn ${activeTab === 'new-product' ? 'active' : ''}`}
            onClick={() => setActiveTab('new-product')}
          >
            <Plus size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Nuevo Producto
          </button>
          <button 
            className={`filter-btn ${activeTab === 'giftcards' ? 'active' : ''}`}
            onClick={() => setActiveTab('giftcards')}
          >
            <Gift size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Emitir Gift Cards ({giftCards.length})
          </button>
        </div>

        {/* Tab 1: Inventory */}
        {activeTab === 'inventory' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
              {products.map(prod => (
                <div key={prod.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-inner)', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <img src={prod.image} alt={prod.name} style={{ width: '3.5rem', height: '3.5rem', borderRadius: 'var(--radius-inner)', objectFit: 'cover' }} />
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700 }}>{prod.priceFormatted}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Stock: {prod.stock}u</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: New Product */}
        {activeTab === 'new-product' && (
          <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Nombre del Chocolate</label>
              <input 
                type="text" 
                required 
                placeholder="Ej: Bombón de Cacao & Licor" 
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.875rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Categoría</label>
              <select 
                value={category}
                onChange={e => setCategory(e.target.value as ProductCategory)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-pill)', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.875rem' }}
              >
                <option value="bombones">Bombones de Autor</option>
                <option value="rama">Chocolate en Rama</option>
                <option value="trufas">Trufas & Cacao 70%</option>
                <option value="alfajores">Alfajores Patagónicos</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Precio (ARS)</label>
              <input 
                type="number" 
                required 
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.875rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Porcentaje Cacao</label>
              <input 
                type="text" 
                value={cocoaPct}
                onChange={e => setCocoaPct(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.875rem' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Descripción Sensorial</label>
              <textarea 
                required 
                rows={3}
                placeholder="Describí los matices y texturas..." 
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-inner)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.875rem' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Guardar e Incorporar a la Tienda</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Gift Cards Emission */}
        {activeTab === 'giftcards' && (
          <div>
            <form onSubmit={handleIssueGiftCard} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end', marginBottom: '2rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Monto a Emitir (ARS)</label>
                <input 
                  type="number" 
                  value={gcAmount}
                  onChange={e => setGcAmount(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.875rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Beneficiario</label>
                <input 
                  type="text" 
                  placeholder="Ej: Cliente Frecuente" 
                  value={gcRecipient}
                  onChange={e => setGcRecipient(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.875rem' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ height: '2.75rem' }}>
                <span>Emitir</span>
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Gift Cards Emitidas</div>
              {giftCards.map(gc => (
                <div key={gc.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-inner)', padding: '0.85rem 1.25rem' }}>
                  <div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--accent-gold)' }}>{gc.code}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Asignada a: {gc.recipientName || 'Sin asignar'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700 }}>${gc.balance.toLocaleString('es-AR')} ARS</div>
                    <span className="eyebrow-badge" style={{ padding: '0.15rem 0.5rem', fontSize: '0.65rem' }}>{gc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface BoxBuilderProps {
  onToast: (msg: string) => void;
}

const BOX_FLAVORS = [
  { id: 'b-dulce-leche', name: 'Bombón Dulce de Leche & Malbec', desc: 'Relleno cremoso con reducción de Malbec' },
  { id: 'b-frambuesa', name: 'Trufa de Frambuesa Silvestre', desc: 'Cacao 70% con corazón ácido' },
  { id: 'b-avellana', name: 'Marroc Crocante de Avellana', desc: 'Gianduja artesanal con avellanas' },
  { id: 'b-rama-blanco', name: 'Rama de Chocolate Blanco & Vainilla', desc: 'Vainilla natural de Papantla' },
  { id: 'b-nuez', name: 'Nuez Caramelizada & Bitter 80%', desc: 'Toque de flor de sal marina' }
];

export const BoxBuilder: React.FC<BoxBuilderProps> = ({ onToast }) => {
  const { addToCart } = useCart();
  const [boxSize, setBoxSize] = useState<number>(12);
  const [flavors, setFlavors] = useState<Record<string, number>>({
    'b-dulce-leche': 4,
    'b-frambuesa': 4,
    'b-avellana': 4,
    'b-rama-blanco': 0,
    'b-nuez': 0
  });

  const currentCount = Object.values(flavors).reduce((a, b) => a + b, 0);

  const updateCount = (id: string, delta: number) => {
    const currentVal = flavors[id] || 0;
    if (delta > 0 && currentCount >= boxSize) {
      onToast(`La caja de ${boxSize} piezas ya está completa.`);
      return;
    }
    if (delta < 0 && currentVal <= 0) return;

    setFlavors(prev => ({ ...prev, [id]: currentVal + delta }));
  };

  const calculatePrice = () => {
    if (boxSize === 6) return 11500;
    if (boxSize === 12) return 21000;
    return 38000;
  };

  const handleAddCustomBox = () => {
    if (currentCount < boxSize) {
      onToast(`Te faltan ${boxSize - currentCount} chocolates para completar tu caja.`);
      return;
    }

    const price = calculatePrice();
    const customProduct = {
      id: `custom-box-${Date.now()}`,
      name: `Caja Personalizada Tronador (${boxSize} piezas)`,
      category: 'bombones' as const,
      price,
      priceFormatted: `$${price.toLocaleString('es-AR')} ARS`,
      image: '/assets/images/caja.webp',
      tag: 'Caja Personalizada',
      cocoaPct: 'Surtido',
      description: `Caja artesanal de ${boxSize} piezas seleccionadas a mano.`,
      notes: Object.entries(flavors).filter(([_, qty]) => qty > 0).map(([id, qty]) => {
        const item = BOX_FLAVORS.find(f => f.id === id);
        return `${qty}x ${item ? item.name : ''}`;
      }),
      stock: 99
    };

    addToCart(customProduct, 1);
    onToast('¡Caja personalizada agregada a la cesta!');
  };

  const pct = Math.min(100, (currentCount / boxSize) * 100);

  return (
    <section id="armar-caja" className="section-padding builder-section">
      <div className="container-custom">
        
        <div className="section-header">
          <span className="eyebrow-badge">Experiencia Personalizada</span>
          <h2 className="section-title">Armá tu Caja Tronador</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Elegí el tamaño de tu estuche de regalo y selecciona tus bombones y trufas favoritas pieza por pieza.
          </p>
        </div>

        <div className="builder-layout">
          
          <div>
            <div className="double-bezel-shell">
              <div className="double-bezel-core" style={{ padding: '1.5rem' }}>
                <img src="/assets/images/caja.webp" alt="Estuche de Regalo Personalizado" style={{ width: '100%', borderRadius: 'var(--radius-inner)', marginBottom: '1.5rem' }} />
                <h3 className="h3" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Estuche Rígido con Folia Dorada</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Presentación de lujo en madera noble con broche dorado y papel encerado para mantener la humedad ideal.
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                  <span>✓ Tarjeta con dedicatoria</span>
                  <span>✓ Cinta de satén</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="builder-config-box">
              <h3 className="h3" style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>1. Seleccioná el Tamaño</h3>
              
              <div className="box-size-selector">
                {[6, 12, 24].map(sz => (
                  <button 
                    key={sz} 
                    className={`box-size-btn ${boxSize === sz ? 'active' : ''}`}
                    onClick={() => { setBoxSize(sz); }}
                  >
                    <span className="box-size-num">{sz}</span>
                    <span className="box-size-label">Piezas</span>
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <span>Capacidad de la Caja</span>
                  <span style={{ color: 'var(--accent-gold)' }}>{currentCount} / {boxSize} chocolates</span>
                </div>
                <div className="box-progress-bar">
                  <div className="box-progress-fill" style={{ width: `${pct}%` }}></div>
                </div>
              </div>

              <h3 className="h3" style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>2. Elegí tus Sabores</h3>
              <div className="flavor-picker-grid">
                {BOX_FLAVORS.map(flavor => (
                  <div key={flavor.id} className="flavor-item-card">
                    <div>
                      <div className="flavor-info-title">{flavor.name}</div>
                      <div className="flavor-info-desc">{flavor.desc}</div>
                    </div>
                    <div className="flavor-counter">
                      <button className="counter-btn" onClick={() => updateCount(flavor.id, -1)}>-</button>
                      <span className="counter-value">{flavors[flavor.id] || 0}</span>
                      <button className="counter-btn" onClick={() => updateCount(flavor.id, 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Precio Total Estuche</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                    ${calculatePrice().toLocaleString('es-AR')} ARS
                  </div>
                </div>

                <button className="btn-primary" onClick={handleAddCustomBox}>
                  <span>Agregar Caja al Carrito</span>
                  <div className="btn-icon-badge"><ArrowRight size={14} /></div>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

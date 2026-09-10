import React, { useState } from 'react';
import { Gift, Check, AlertCircle, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { giftcardService } from '../../services/giftcardService';

interface GiftCardRedeemerProps {
  onToast: (msg: string) => void;
}

export const GiftCardRedeemer: React.FC<GiftCardRedeemerProps> = ({ onToast }) => {
  const { applyGiftCard, appliedGiftCard, removeGiftCard, giftCardDiscount } = useCart();
  const [code, setCode] = useState('');
  const [buyingAmount, setBuyingAmount] = useState<number>(10000);
  const [recipientName, setRecipientName] = useState('');
  const [createdCode, setCreatedCode] = useState<string | null>(null);

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const result = applyGiftCard(code);
    if (result.success) {
      onToast(result.message);
      setCode('');
    } else {
      onToast(result.message);
    }
  };

  const handleBuyGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard = giftcardService.createGiftCard(buyingAmount, recipientName || 'Amigo Chocolatero');
    setCreatedCode(newCard.code);
    onToast(`¡Gift Card creada con éxito! Código: ${newCard.code}`);
  };

  return (
    <section id="giftcards" className="section-padding" style={{ background: 'var(--bg-surface-elevated)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container-custom">
        
        <div className="section-header">
          <span className="eyebrow-badge">Experiencia de Regalo</span>
          <h2 className="section-title">Gift Cards Chocolates Tronador</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Canjeá tu código de regalo o emití una Gift Card digital personalizada para enviar a quien más quieras.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Redeem Form Card */}
          <div className="double-bezel-shell">
            <div className="double-bezel-core" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'rgba(212,175,55,0.12)', border: '1px solid var(--border-gold)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Gift size={20} />
                </div>
                <div>
                  <h3 className="h3" style={{ fontSize: '1.4rem' }}>Canjear tu Gift Card</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ingresá el código alfanumérico</div>
                </div>
              </div>

              {appliedGiftCard ? (
                <div style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-inner)', padding: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>Código: {appliedGiftCard.code}</span>
                    <span className="eyebrow-badge" style={{ padding: '0.2rem 0.5rem', fontSize: '0.65rem' }}>ACTIVA</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Descuento aplicado en carrito: <strong style={{ color: 'var(--accent-gold)' }}>${giftCardDiscount.toLocaleString('es-AR')} ARS</strong>
                  </div>
                  <button 
                    onClick={removeGiftCard} 
                    style={{ fontSize: '0.8rem', color: '#e74c3c', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Quitar Gift Card de esta compra
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRedeem} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
                  <input 
                    type="text" 
                    placeholder="Ej: TRONADOR10000" 
                    value={code} 
                    onChange={e => setCode(e.target.value.toUpperCase())}
                    style={{ padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.05em' }}
                  />
                  <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                    <span>Aplicar Código</span>
                  </button>
                </form>
              )}

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <div>💡 Códigos de prueba disponibles:</div>
                <div>• <code style={{ color: 'var(--accent-gold)' }}>TRONADOR10000</code> ($10.000 ARS)</div>
                <div>• <code style={{ color: 'var(--accent-gold)' }}>BARILOCHE5000</code> ($5.000 ARS)</div>
                <div>• <code style={{ color: 'var(--accent-gold)' }}>PATAGONIA15000</code> ($15.000 ARS)</div>
              </div>

            </div>
          </div>

          {/* Buy Gift Card Card */}
          <div className="double-bezel-shell">
            <div className="double-bezel-core" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'rgba(212,175,55,0.12)', border: '1px solid var(--border-gold)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="h3" style={{ fontSize: '1.4rem' }}>Regalá una Gift Card Digital</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Emití un código personalizado al instante</div>
                </div>
              </div>

              <form onSubmit={handleBuyGiftCard} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Seleccioná el Monto</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {[5000, 10000, 20000].map(amt => (
                      <button 
                        key={amt}
                        type="button"
                        onClick={() => setBuyingAmount(amt)}
                        className={`box-size-btn ${buyingAmount === amt ? 'active' : ''}`}
                        style={{ padding: '0.6rem 0.25rem' }}
                      >
                        <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>${amt / 1000}k</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Nombre del Destinatario (Opcional)</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Lucía Gómez" 
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.875rem' }}
                  />
                </div>

                <button type="submit" className="btn-secondary" style={{ justifyContent: 'center' }}>
                  <span>Emitir Gift Card de ${buyingAmount.toLocaleString('es-AR')} ARS</span>
                </button>
              </form>

              {createdCode && (
                <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(212,175,55,0.15)', border: '1px dashed var(--accent-gold)', borderRadius: 'var(--radius-inner)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>¡Tu nueva Gift Card está lista!</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-gold)' }}>{createdCode}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Copiá este código para canjear en la cesta</div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

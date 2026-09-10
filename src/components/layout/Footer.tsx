import React from 'react';
import { MountainLogo } from '../common/MountainLogo';

interface FooterProps {
  onToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onToast }) => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    onToast('¡Te has suscripto con éxito al Club Chocolates Tronador!');
  };

  return (
    <footer id="contacto" className="footer">
      <div className="container-custom">
        <div className="footer-grid">
          
          <div>
            <div className="nav-brand" style={{ marginBottom: '1.25rem' }}>
              <div className="nav-logo-mark">
                <MountainLogo size={20} color="var(--accent-gold)" />
              </div>
              <div>
                <span className="nav-brand-text">TRONADOR</span>
                <span className="nav-brand-sub">Sabores de Bariloche</span>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '32ch', lineHeight: '1.6' }}>
              Fábrica artesanal de chocolates y delicatessen patagónicas. Tradición y pasión al pie de los Andes.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Nuestra Fábrica</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>Av. Mitre 123, Centro</li>
              <li>San Carlos de Bariloche</li>
              <li>Río Negro, Argentina</li>
              <li>Tel: +54 (294) 442-8900</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Navegación</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><a href="#coleccion">Bombones de Autor</a></li>
              <li><a href="#coleccion">Chocolate en Rama</a></li>
              <li><a href="#armar-caja">Cajas de Regalo</a></li>
              <li><a href="#giftcards">Canjear Gift Card</a></li>
              <li><a href="#historia">Nuestra Historia</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Club Chocolates Tronador</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Recibí promociones exclusivas y lanzamientos de edición limitada.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                required 
                placeholder="Tu correo electrónico" 
                style={{ padding: '0.6rem 1rem', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.85rem', flexGrow: 1 }} 
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1rem' }}>Unirse</button>
            </form>
          </div>

        </div>

        <div className="footer-bottom">
          <div>© 2026 Chocolates Tronador. Todos los derechos reservados. Sabores de Bariloche.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#">Términos y Condiciones</a>
            <a href="#">Política de Privacidad</a>
            <a href="#">Envíos a todo el País</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

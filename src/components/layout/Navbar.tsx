import React from 'react';
import { ShoppingBag, User as UserIcon, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { MountainLogo } from '../common/MountainLogo';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenAdmin }) => {
  const { items, toggleCart } = useCart();
  const { user, isAuthenticated, role } = useAuth();

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="container-custom">
        <nav className="nav-pill">
          
          <a href="#" className="nav-brand">
            <div className="nav-logo-mark">
              <MountainLogo size={20} color="var(--accent-gold)" />
            </div>
            <div>
              <span className="nav-brand-text">TRONADOR</span>
              <span className="nav-brand-sub">Sabores de Bariloche</span>
            </div>
          </a>

          <ul className="nav-links">
            <li><a href="#coleccion" className="nav-link active">Colección</a></li>
            <li><a href="#armar-caja" className="nav-link">Armá tu Caja</a></li>
            <li><a href="#giftcards" className="nav-link">Gift Cards</a></li>
            <li><a href="#historia" className="nav-link">Nuestra Fábrica</a></li>
          </ul>

          <div className="nav-actions">
            
            {isAuthenticated && role === 'MAESTRO_CHOCOLATERO' && (
              <button 
                onClick={onOpenAdmin} 
                className="btn-secondary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', color: 'var(--accent-gold)', borderColor: 'var(--border-gold)' }}
              >
                <Shield size={14} />
                <span>Panel Maestro</span>
              </button>
            )}

            <button 
              onClick={onOpenAuth} 
              className="btn-secondary"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
            >
              <UserIcon size={14} />
              <span>{user ? user.name.split(' ')[0] : 'Ingresar'}</span>
            </button>

            <button onClick={toggleCart} className="cart-trigger" aria-label="Ver Carrito">
              <ShoppingBag size={16} />
              <span>Cesta</span>
              <span className="cart-badge">{totalCount}</span>
            </button>

          </div>
        </nav>
      </div>
    </header>
  );
};

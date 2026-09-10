import React, { useState } from 'react';
import { X, UserCheck, Shield, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onToast }) => {
  const { user, isAuthenticated, loginAsDemo, loginCustom, logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('CLIENTE');

  if (!isOpen) return null;

  const handleDemoLogin = (role: UserRole) => {
    loginAsDemo(role);
    onToast(`Accediste como ${role === 'MAESTRO_CHOCOLATERO' ? 'Maestro Chocolatero (Admin)' : 'Cliente'}`);
    onClose();
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    loginCustom(name, email, selectedRole);
    onToast(`Bienvenido ${name} (${selectedRole})`);
    onClose();
  };

  return (
    <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-container" style={{ maxWidth: '520px' }}>
        
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '1rem', right: '1rem', width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Cerrar Modal"
        >
          <X size={18} />
        </button>

        {isAuthenticated && user ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1px solid var(--border-gold)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              {user.role === 'MAESTRO_CHOCOLATERO' ? <Shield size={28} /> : <UserIcon size={28} />}
            </div>
            
            <h3 className="h3" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{user.name}</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{user.email}</div>
            <span className="eyebrow-badge" style={{ marginBottom: '1.5rem' }}>
              Rol: {user.role === 'MAESTRO_CHOCOLATERO' ? 'Maestro Chocolatero (Admin)' : 'Cliente Premium'}
            </span>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-inner)', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>ID de Usuario:</span>
                <span>{user.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Miembro desde:</span>
                <span>{user.memberSince}</span>
              </div>
            </div>

            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', borderColor: '#e74c3c', color: '#e74c3c' }} onClick={() => { logout(); onToast('Sesión cerrada'); onClose(); }}>
              <LogOut size={16} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <span className="eyebrow-badge" style={{ marginBottom: '0.5rem' }}>Acceso al Sistema</span>
              <h3 className="h3" style={{ fontSize: '1.85rem' }}>Iniciar Sesión</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Accedé como Cliente o Maestro Chocolatero (Admin)
              </p>
            </div>

            {/* Quick Demo Login Buttons */}
            <div style={{ marginBottom: '1.75rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-inner)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)', marginBottom: '0.75rem', textAlign: 'center' }}>
                Acceso Rápido Demo (1-Click)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.65rem 0.5rem', justifyContent: 'center' }} onClick={() => handleDemoLogin('CLIENTE')}>
                  <UserIcon size={14} />
                  <span>Soy Cliente</span>
                </button>
                <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.65rem 0.5rem', justifyContent: 'center', borderColor: 'var(--border-gold)', color: 'var(--accent-gold)' }} onClick={() => handleDemoLogin('MAESTRO_CHOCOLATERO')}>
                  <Shield size={14} />
                  <span>Soy Maestro</span>
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              O ingresá con tus datos
            </div>

            <form onSubmit={handleCustomLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Tu Nombre" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Correo Electrónico</label>
                <input 
                  type="email" 
                  required 
                  placeholder="tu@email.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Seleccionar Rol</label>
                <select 
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value as UserRole)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-pill)', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '0.9rem' }}
                >
                  <option value="CLIENTE">Cliente Chocolatero</option>
                  <option value="MAESTRO_CHOCOLATERO">Maestro Chocolatero (Administrador)</option>
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                <span>Ingresar al Sistema</span>
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};

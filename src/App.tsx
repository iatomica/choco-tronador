import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/shop/HeroSection';
import { HeritageBar } from './components/shop/HeritageBar';
import { ProductCatalog } from './components/shop/ProductCatalog';
import { ProductModal } from './components/shop/ProductModal';
import { BoxBuilder } from './components/shop/BoxBuilder';
import { GiftCardRedeemer } from './components/giftcard/GiftCardRedeemer';
import { CartDrawer } from './components/shop/CartDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { productService } from './services/productService';
import { Product } from './types/product';
import '../styles.css';

export const AppContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadProducts = () => {
    setProducts(productService.getProducts());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  return (
    <div className="app-root">
      <Navbar 
        onOpenAuth={() => setIsAuthOpen(true)} 
        onOpenAdmin={() => setIsAdminOpen(true)} 
      />

      <main>
        <HeroSection />
        <HeritageBar />
        <ProductCatalog 
          products={products} 
          onQuickView={product => setSelectedProduct(product)} 
          onToast={showToast} 
        />
        <BoxBuilder onToast={showToast} />
        <GiftCardRedeemer onToast={showToast} />
        
        {/* Story Section */}
        <section id="historia" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
          <div className="container-custom">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <span className="eyebrow-badge">Tradición Patagónica</span>
              <h2 className="section-title">Fábrica de Chocolates Tronador</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                En el corazón de San Carlos de Bariloche, rodeados de bosques, lagos y nieve, elaboramos diariamente nuestros chocolates. Mantenemos intacto el amor por el proceso artesanal: desde el tostado del grano hasta el envasado manual de cada caja.
              </p>
              <div style={{ display: 'inline-flex', gap: '2rem', padding: '1.5rem 2.5rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-inner)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--accent-gold)' }}>1988</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Año de Fundación</div>
                </div>
                <div style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '2rem' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--accent-gold)' }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Artesanal en Bariloche</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CartDrawer onToast={showToast} />
      
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onToast={showToast} 
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onToast={showToast} 
      />

      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        onRefreshProducts={loadProducts} 
        onToast={showToast} 
      />

      <Toast message={toastMessage} />
      <Footer onToast={showToast} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

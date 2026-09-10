import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Clock, Star } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-section hero-full-bleed">
      {/* Full-bleed Background Image with Horizontal Gradient Overlay */}
      <div className="hero-bg-image-container">
        <img 
          src="/assets/images/hero.jpg" 
          alt="Chocolates Tronador Selección Bariloche" 
          className="hero-bg-img"
        />
        <div className="hero-gradient-overlay" />
      </div>

      <div className="container-custom hero-container-relative">
        <div className="hero-content-left">
          
          <div className="eyebrow-badge eyebrow-badge-gold">
            <span>San Carlos de Bariloche · Patagonia Argentina</span>
          </div>

          <h1 className="hero-title-light">
            El Arte del Chocolate <span className="text-gold">Artesanal</span>
          </h1>

          <p className="hero-description-light">
            Fundada al pie de la Cordillera de los Andes, Fábrica de Chocolates Tronador combina recetas ancestrales, paila de cobre y granos de cacao seleccionados para crear una experiencia sensorial única.
          </p>

          <div className="hero-ctas">
            <a href="#coleccion" className="btn-primary">
              <span>Explorar Colección</span>
              <div className="btn-icon-badge"><ArrowRight size={14} /></div>
            </a>
            <a href="#giftcards" className="btn-secondary btn-secondary-glass">
              <span>Canjear Gift Card</span>
            </a>
          </div>

          <div className="hero-badges-row hero-badges-light">
            <div className="hero-feature-item">
              <ShieldCheck size={16} />
              <span>Cacao 100% Trazable</span>
            </div>
            <div className="hero-feature-item">
              <Truck size={16} />
              <span>Envío Refrigerado</span>
            </div>
            <div className="hero-feature-item">
              <Clock size={16} />
              <span>Elaboración Diaria</span>
            </div>
          </div>

        </div>

        {/* Floating Accent Badge on Right - Properly Aligned */}
        <div className="floating-experience-tag floating-tag-hero">
          <div className="floating-tag-star">
            <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
          </div>
          <div>
            <div className="floating-tag-title">Receta Original Patagónica</div>
            <div className="floating-tag-sub">Tradición desde Bariloche</div>
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Flame, Leaf, MapPin, Award } from 'lucide-react';

export const HeritageBar: React.FC = () => {
  return (
    <section className="heritage-bar">
      <div className="container-custom">
        <div className="heritage-grid">
          
          <div className="heritage-item">
            <div className="heritage-icon">
              <Flame size={20} />
            </div>
            <div>
              <h3 className="heritage-title">Paila de Cobre</h3>
              <p className="heritage-desc">Templado manual tradicional para brillo y textura perfecta.</p>
            </div>
          </div>

          <div className="heritage-item">
            <div className="heritage-icon">
              <Leaf size={20} />
            </div>
            <div>
              <h3 className="heritage-title">Sin Conservantes</h3>
              <p className="heritage-desc">Ingredientes 100% naturales, frescos de la cordillera.</p>
            </div>
          </div>

          <div className="heritage-item">
            <div className="heritage-icon">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="heritage-title">Origen Bariloche</h3>
              <p className="heritage-desc">Elaborados directamente en nuestra casa central de Av. Mitre.</p>
            </div>
          </div>

          <div className="heritage-item">
            <div className="heritage-icon">
              <Award size={20} />
            </div>
            <div>
              <h3 className="heritage-title">Maestros Chocolateros</h3>
              <p className="heritage-desc">Más de 35 años perfeccionando el sabor patagónico.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

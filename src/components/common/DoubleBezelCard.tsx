import React from 'react';

interface DoubleBezelCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const DoubleBezelCard: React.FC<DoubleBezelCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div className={`double-bezel-shell ${className}`} onClick={onClick}>
      <div className="double-bezel-core">
        {children}
      </div>
    </div>
  );
};

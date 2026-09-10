import React from 'react';

interface MountainLogoProps {
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Flat Mountain Logo Icon representing Mount Tronador (Patagonia, Bariloche).
 * Minimalist geometric twin-peak flat vector icon.
 */
export const MountainLogo: React.FC<MountainLogoProps> = ({
  size = 22,
  color = 'var(--accent-gold)',
  className = ''
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Monte Tronador"
    >
      {/* Primary Left/Main Peak */}
      <path 
        d="M2 19L8.5 7.5L13.5 16L12 19H2Z" 
        fill={color} 
        opacity="0.85" 
      />
      {/* Secondary Right Twin Peak */}
      <path 
        d="M7.5 19L15.5 5L22 19H7.5Z" 
        fill={color} 
      />
      {/* Flat Snowcap Geometry */}
      <path 
        d="M15.5 5L17.8 9L16.2 10.5L14.2 9L15.5 5Z" 
        fill="#FFFFFF" 
        opacity="0.75" 
      />
      <path 
        d="M8.5 7.5L10.2 10.5L9 11.5L7.5 10.5L8.5 7.5Z" 
        fill="#FFFFFF" 
        opacity="0.6" 
      />
    </svg>
  );
};

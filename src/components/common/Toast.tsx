import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast">
        <CheckCircle size={18} color="var(--accent-gold)" />
        <span>{message}</span>
      </div>
    </div>
  );
};

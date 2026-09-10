import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';
import { GiftCard, RedeemResult } from '../types/giftcard';
import { giftcardService } from '../services/giftcardService';

interface CartContextType {
  items: CartItem[];
  appliedGiftCard: GiftCard | null;
  giftCardDiscount: number;
  subtotal: number;
  total: number;
  isCartOpen: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  applyGiftCard: (code: string) => RedeemResult;
  removeGiftCard: () => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedGiftCard, setAppliedGiftCard] = useState<GiftCard | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems(prev => {
      return prev.map(i => {
        if (i.product.id === productId) {
          const newQty = i.quantity + delta;
          return newQty > 0 ? { ...i, quantity: newQty } : null;
        }
        return i;
      }).filter(Boolean) as CartItem[];
    });
  };

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const applyGiftCard = (code: string): RedeemResult => {
    const result = giftcardService.validateAndRedeem(code, subtotal);
    if (result.success && result.giftCard) {
      setAppliedGiftCard(result.giftCard);
    }
    return result;
  };

  const removeGiftCard = () => {
    setAppliedGiftCard(null);
  };

  const giftCardDiscount = appliedGiftCard ? Math.min(appliedGiftCard.balance, subtotal) : 0;
  const total = Math.max(0, subtotal - giftCardDiscount);

  const clearCart = () => {
    setItems([]);
    setAppliedGiftCard(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const value: CartContextType = {
    items,
    appliedGiftCard,
    giftCardDiscount,
    subtotal,
    total,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyGiftCard,
    removeGiftCard,
    clearCart,
    openCart,
    closeCart,
    toggleCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

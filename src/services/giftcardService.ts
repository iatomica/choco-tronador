import { GiftCard, RedeemResult } from '../types/giftcard';
import { INITIAL_GIFTCARDS } from './mockData';

const GIFTCARDS_STORAGE_KEY = 'tronador_giftcards';

export const giftcardService = {
  getGiftCards(): GiftCard[] {
    const data = localStorage.getItem(GIFTCARDS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(GIFTCARDS_STORAGE_KEY, JSON.stringify(INITIAL_GIFTCARDS));
      return INITIAL_GIFTCARDS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_GIFTCARDS;
    }
  },

  validateAndRedeem(code: string, currentTotal: number): RedeemResult {
    const cards = this.getGiftCards();
    const cleanCode = code.trim().toUpperCase();
    const card = cards.find(c => c.code.toUpperCase() === cleanCode);

    if (!card) {
      return {
        success: false,
        message: 'Código de Gift Card no encontrado o inválido.'
      };
    }

    if (card.status !== 'ACTIVA') {
      return {
        success: false,
        message: `La Gift Card se encuentra ${card.status.toLowerCase()}.`
      };
    }

    if (card.balance <= 0) {
      return {
        success: false,
        message: 'La Gift Card no posee saldo disponible.'
      };
    }

    const discountApplied = Math.min(card.balance, currentTotal);

    return {
      success: true,
      message: `¡Gift Card aplicada con éxito! Saldo a descontar: $${discountApplied.toLocaleString('es-AR')} ARS`,
      discountApplied,
      giftCard: card
    };
  },

  createGiftCard(amount: number, recipientName?: string, recipientEmail?: string): GiftCard {
    const cards = this.getGiftCards();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newCard: GiftCard = {
      code: `TRONADOR${amount / 1000}K-${randomSuffix}`,
      amount,
      balance: amount,
      status: 'ACTIVA',
      createdAt: new Date().toISOString().split('T')[0],
      recipientName,
      recipientEmail
    };

    const updated = [newCard, ...cards];
    localStorage.setItem(GIFTCARDS_STORAGE_KEY, JSON.stringify(updated));
    return newCard;
  }
};

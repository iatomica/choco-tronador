export type GiftCardStatus = 'ACTIVA' | 'CANJEADA' | 'EXPIRADA';

export interface GiftCard {
  code: string;
  amount: number;
  balance: number;
  status: GiftCardStatus;
  createdAt: string;
  recipientName?: string;
  recipientEmail?: string;
}

export interface RedeemResult {
  success: boolean;
  message: string;
  discountApplied?: number;
  giftCard?: GiftCard;
}

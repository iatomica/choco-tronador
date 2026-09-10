import { Product } from './product';
import { GiftCard } from './giftcard';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  appliedGiftCard: GiftCard | null;
  giftCardDiscount: number;
  subtotal: number;
  total: number;
}

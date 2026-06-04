import type { CartItem } from "../apis/cart.api.dto";

export interface CartItemModel extends CartItem {
  isSelected: boolean;
}

export interface CartSummary {
  isAllSelected: boolean;
  itemCount: number;
  totalQuantity: number;
  totalPrice: number;
  shippingFee: number;
}

export interface CartActions {
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  toggleSelection: (id: number) => void;
  toggleAllSelection: () => void;
}

export interface UseCartItemsReturn {
  items: CartItemModel[];
  summary: CartSummary;
  actions: CartActions;
}

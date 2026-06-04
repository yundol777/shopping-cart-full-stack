import type { CartItem } from "../apis/cart.api.dto";

export interface CartItemModel extends CartItem {
  isSelected: boolean;
}

export interface CartActions {
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  toggleSelection: (id: number) => void;
  toggleAllSelection: () => void;
}

export interface UseCartItemsReturn {
  items: CartItemModel[];
  isAllSelected: boolean;
  actions: CartActions;
}

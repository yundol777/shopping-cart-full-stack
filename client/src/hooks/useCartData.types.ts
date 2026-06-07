import type { CartItemsResponseDto } from "../apis/cart.api.dto";

export interface UseCartDataReturn {
  data: CartItemsResponseDto;
  loading: boolean;
  error: Error | null;
  updatingQuantity: boolean;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
}

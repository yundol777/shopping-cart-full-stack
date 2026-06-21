import type { CartItem } from "./cart.api.dto";

export interface OrderSummaryRequestDto {
  selectedCartItemIds: number[];
  selectedCouponIds: number[];
  isRemoteArea: boolean;
}

export interface OrderSummaryResponseDto {
  orderAmount: number;
  couponDiscountAmount: number;
  shippingFee: number;
  totalPaymentAmount: number;
}

export interface OrderItemsRequestDto {
  selectedCartItemIds: number[];
}

export type OrderItemResponseDto = CartItem[];
